/* eslint-disable @typescript-eslint/no-unused-vars */
import { base64Encode, base64Decode } from "@bufbuild/protobuf/wire";

import { create, toBinary, fromBinary } from "@bufbuild/protobuf";

import {
  GetStateResponseSchema,
  UnlockWalletResponseSchema,
  WalletState,
  GetInfoResponseSchema,
  ListChannelsResponseSchema,
  ListPeersResponseSchema,
  WalletBalanceResponseSchema,
  SendCoinsResponseSchema,
  SendCoinsRequestSchema,
  NewAddressRequestSchema,
  NewAddressResponseSchema,
  ChannelBalanceResponseSchema,
  OpenChannelRequestSchema,
  ChannelPointSchema,
  CloseChannelRequestSchema,
  CloseStatusUpdateSchema,
  PendingUpdateSchema,
  ChannelCloseUpdateSchema,
  PendingChannelsResponseSchema,
  PendingChannelsRequestSchema,
} from "../proto/lightning_pb";
import type {
  OnErrorCallback,
  OnResponseCallback,
  Spec,
} from "../core/NativeTurboLnd";
import { SubscribeStateResponseSchema } from "../proto/stateservice_pb";
import {
  mockPeers,
  mockChannels,
  mockWalletBalance,
  mockGetInfoResponse,
  generateMockAddress,
  mockChannelBalanceResponse,
  generateMockTxid,
  mockPendingChannelsResponse,
} from "./responses";

let currentState: WalletState = WalletState.LOCKED;
let subscribeStateOnResponseCallbacks: {
  onResponse: OnResponseCallback;
  onError: OnErrorCallback;
}[] = [];

const callSubscribeStateOnResponseCallbacks = () => {
  subscribeStateOnResponseCallbacks.forEach((cb) => {
    cb.onResponse(
      base64Encode(
        toBinary(
          GetStateResponseSchema,
          create(GetStateResponseSchema, {
            state: currentState,
          })
        )
      )
    );
  });
};

const TurboLnd: Spec = {
  start: async (_: string) => {
    console.log("Hi from mock");
    return "";
  },

  subscribeState: (_, onResponse, onError) => {
    subscribeStateOnResponseCallbacks.push({ onResponse, onError });

    let subscribing = true;

    setTimeout(() => {
      if (!subscribing) {
        return;
      }

      const state = toBinary(
        SubscribeStateResponseSchema,
        create(SubscribeStateResponseSchema, {
          state: currentState,
        })
      );
      onResponse(base64Encode(state));
    }, 0);

    return () => {
      subscribing = false;
      console.log("unsubscribed");
    };
  },

  initWallet: async (_) => {
    // TODO(hsjoberg)
    if (currentState === WalletState.LOCKED) {
      return base64Encode(
        toBinary(
          UnlockWalletResponseSchema,
          create(UnlockWalletResponseSchema, {})
        )
      );
    }

    currentState = WalletState.UNLOCKED;
    callSubscribeStateOnResponseCallbacks();

    currentState = WalletState.RPC_ACTIVE;
    callSubscribeStateOnResponseCallbacks();

    return base64Encode(
      toBinary(
        UnlockWalletResponseSchema,
        create(UnlockWalletResponseSchema, {})
      )
    );
  },

  unlockWallet: async (_) => {
    if (currentState === WalletState.LOCKED) {
      // TODO(hsjoberg)
      return base64Encode(
        toBinary(
          UnlockWalletResponseSchema,
          create(UnlockWalletResponseSchema, {})
        )
      );
    }

    currentState = WalletState.UNLOCKED;
    callSubscribeStateOnResponseCallbacks();

    currentState = WalletState.RPC_ACTIVE;
    callSubscribeStateOnResponseCallbacks();

    return base64Encode(
      toBinary(
        UnlockWalletResponseSchema,
        create(UnlockWalletResponseSchema, {})
      )
    );
  },

  getInfo: async (_) => {
    return base64Encode(toBinary(GetInfoResponseSchema, mockGetInfoResponse));
  },

  listChannels: async (_) => {
    return base64Encode(
      toBinary(
        ListChannelsResponseSchema,
        create(ListChannelsResponseSchema, {
          channels: mockChannels,
        })
      )
    );
  },

  pendingChannels: async (request) => {
    fromBinary(PendingChannelsRequestSchema, base64Decode(request));

    return base64Encode(
      toBinary(PendingChannelsResponseSchema, mockPendingChannelsResponse)
    );
  },

  listPeers: async (_) => {
    return base64Encode(
      toBinary(
        ListPeersResponseSchema,
        create(ListPeersResponseSchema, {
          peers: mockPeers,
        })
      )
    );
  },

  walletBalance: async (_) => {
    return base64Encode(
      toBinary(WalletBalanceResponseSchema, mockWalletBalance)
    );
  },

  channelBalance: async (_) => {
    const response = create(
      ChannelBalanceResponseSchema,
      mockChannelBalanceResponse
    );

    return base64Encode(toBinary(ChannelBalanceResponseSchema, response));
  },

  newAddress: async (request) => {
    const decodedRequest = fromBinary(
      NewAddressRequestSchema,
      base64Decode(request)
    );

    const mockAddress = generateMockAddress(decodedRequest.type);

    const response = create(NewAddressResponseSchema, {
      address: mockAddress,
    });

    await new Promise((resolve) => setTimeout(resolve, 100));

    return base64Encode(toBinary(NewAddressResponseSchema, response));
  },

  sendCoins: async (request) => {
    const decodedRequest = fromBinary(
      SendCoinsRequestSchema,
      base64Decode(request)
    );

    if (decodedRequest.amount <= BigInt(0) && !decodedRequest.sendAll) {
      throw new Error("Invalid amount");
    }

    if (!decodedRequest.addr) {
      throw new Error("Invalid address");
    }

    const mockTxid = Math.random().toString(36).substring(2, 15);

    const response = create(SendCoinsResponseSchema, {
      txid: mockTxid,
    });

    return base64Encode(toBinary(SendCoinsResponseSchema, response));
  },

  openChannelSync: async (request) => {
    const decodedRequest = fromBinary(
      OpenChannelRequestSchema,
      base64Decode(request)
    );

    // Simulate some basic validation
    if (decodedRequest.localFundingAmount <= BigInt(0)) {
      throw new Error("Invalid local funding amount");
    }

    if (decodedRequest.nodePubkey.length === 0) {
      throw new Error("Invalid node pubkey");
    }

    const mockChannelPoint = create(ChannelPointSchema, {
      fundingTxid: {
        case: "fundingTxidStr",
        value:
          "17625c43f15b77bfb61f8ff5cd95e56e3999378cdfc7d3851cd4d0b2a12c2a23",
      },
      outputIndex: 0,
    });

    return base64Encode(toBinary(ChannelPointSchema, mockChannelPoint));
  },

  closeChannel: (request, onResponse, onError) => {
    const decodedRequest = fromBinary(
      CloseChannelRequestSchema,
      base64Decode(request)
    );

    // Check if the channel point is provided
    if (!decodedRequest.channelPoint) {
      onError("Channel point is required");
      return () => {};
    }

    let isClosing = true;
    const closingTime = decodedRequest.force ? 2000 : 5000; // Force close is faster
    const intervalId = setInterval(() => {
      if (!isClosing) {
        clearInterval(intervalId);
        return;
      }

      // Simulate channel closing process
      const closeUpdate = create(CloseStatusUpdateSchema, {
        update: {
          case: "closePending",
          value: create(PendingUpdateSchema, {
            txid: new Uint8Array(Buffer.from(generateMockTxid(), "hex")),
            outputIndex: decodedRequest?.channelPoint?.outputIndex,
          }),
        },
      });

      onResponse(base64Encode(toBinary(CloseStatusUpdateSchema, closeUpdate)));
    }, 1000);

    // Simulate channel close completion
    setTimeout(() => {
      isClosing = false;

      const finalUpdate = create(CloseStatusUpdateSchema, {
        update: {
          case: "chanClose",
          value: create(ChannelCloseUpdateSchema, {
            closingTxid: new Uint8Array(Buffer.from(generateMockTxid(), "hex")),
            success: true,
          }),
        },
      });

      onResponse(base64Encode(toBinary(CloseStatusUpdateSchema, finalUpdate)));
    }, closingTime);

    // Return an unsubscribe function
    return () => {
      isClosing = false;
      clearInterval(intervalId);
    };
  },

  // Add placeholders for the remaining functions
  getTransactions: async (_data) => {
    // TODO: Implement getTransactions
    return "";
  },

  listUnspent: async (_data) => {
    // TODO: Implement getTransactions
    return "";
  },

  estimateFee: async (_data) => {
    // TODO: Implement estimateFee
    return "";
  },

  subscribeTransactions: (_data, _onResponse, _onError) => {
    // TODO: Implement subscribeTransactions
    return () => {};
  },

  sendMany: async (_data) => {
    // TODO: Implement sendMany
    return "";
  },

  signMessage: async (_data) => {
    // TODO: Implement signMessage
    return "";
  },

  verifyMessage: async (_data) => {
    // TODO: Implement verifyMessage
    return "";
  },

  connectPeer: async (_data) => {
    // TODO: Implement connectPeer
    return "";
  },

  disconnectPeer: async (_data) => {
    // TODO: Implement disconnectPeer
    return "";
  },

  subscribePeerEvents: (_data, _onResponse, _onError) => {
    // TODO: Implement subscribePeerEvents
    return () => {};
  },

  getRecoveryInfo: async (_data) => {
    // TODO: Implement getRecoveryInfo
    return "";
  },

  subscribeChannelEvents: (_data, _onResponse, _onError) => {
    // TODO: Implement subscribeChannelEvents
    return () => {};
  },

  closedChannels: async (_data) => {
    // TODO: Implement closedChannels
    return "";
  },

  openChannel: (_data, _onResponse, _onError) => {
    // TODO: Implement openChannel
    return () => {};
  },

  batchOpenChannel: async (_data) => {
    // TODO: Implement batchOpenChannel
    return "";
  },

  fundingStateStep: async (_data) => {
    // TODO: Implement fundingStateStep
    return "";
  },

  channelAcceptor: (_onResponse, _onError) => {
    // TODO: Implement channelAcceptor
    return {
      send: () => true,
      stop: () => true,
    };
  },

  abandonChannel: async (_data) => {
    // TODO: Implement abandonChannel
    return "";
  },

  sendPayment: (_onResponse, _onError) => {
    // TODO: Implement sendPayment
    return {
      send: () => true,
      stop: () => true,
    };
  },

  sendPaymentSync: async (_data) => {
    // TODO: Implement sendPaymentSync
    return "";
  },

  sendToRoute: (_onResponse, _onError) => {
    // TODO: Implement sendToRoute
    return {
      send: () => true,
      stop: () => true,
    };
  },

  sendToRouteSync: async (_data) => {
    // TODO: Implement sendToRouteSync
    return "";
  },

  addInvoice: async (_data) => {
    // TODO: Implement addInvoice
    return "";
  },

  listInvoices: async (_data) => {
    // TODO: Implement listInvoices
    return "";
  },

  lookupInvoice: async (_data) => {
    // TODO: Implement lookupInvoice
    return "";
  },

  subscribeInvoices: (_data, _onResponse, _onError) => {
    // TODO: Implement subscribeInvoices
    return () => {};
  },

  decodePayReq: async (_data) => {
    // TODO: Implement decodePayReq
    return "";
  },

  listPayments: async (_data) => {
    // TODO: Implement listPayments
    return "";
  },

  deletePayment: async (_data) => {
    // TODO: Implement deletePayment
    return "";
  },

  deleteAllPayments: async (_data) => {
    // TODO: Implement deleteAllPayments
    return "";
  },

  describeGraph: async (_data) => {
    // TODO: Implement describeGraph
    return "";
  },

  getNodeMetrics: async (_data) => {
    // TODO: Implement getNodeMetrics
    return "";
  },

  getChanInfo: async (_data) => {
    // TODO: Implement getChanInfo
    return "";
  },

  getNodeInfo: async (_data) => {
    // TODO: Implement getNodeInfo
    return "";
  },

  queryRoutes: async (_data) => {
    // TODO: Implement queryRoutes
    return "";
  },

  getNetworkInfo: async (_data) => {
    // TODO: Implement getNetworkInfo
    return "";
  },

  stopDaemon: async (_data) => {
    // TODO: Implement stopDaemon
    return "";
  },

  subscribeChannelGraph: (_data, _onResponse, _onError) => {
    // TODO: Implement subscribeChannelGraph
    return () => {};
  },

  debugLevel: async (_data) => {
    // TODO: Implement debugLevel
    return "";
  },

  feeReport: async (_data) => {
    // TODO: Implement feeReport
    return "";
  },

  updateChannelPolicy: async (_data) => {
    // TODO: Implement updateChannelPolicy
    return "";
  },

  forwardingHistory: async (_data) => {
    // TODO: Implement forwardingHistory
    return "";
  },

  exportChannelBackup: async (_data) => {
    // TODO: Implement exportChannelBackup
    return "";
  },

  exportAllChannelBackups: async (_data) => {
    // TODO: Implement exportAllChannelBackups
    return "";
  },

  verifyChanBackup: async (_data) => {
    // TODO: Implement verifyChanBackup
    return "";
  },

  restoreChannelBackups: async (_data) => {
    // TODO: Implement restoreChannelBackups
    return "";
  },

  subscribeChannelBackups: (_data, _onResponse, _onError) => {
    // TODO: Implement subscribeChannelBackups
    return () => {};
  },

  bakeMacaroon: async (_data) => {
    // TODO: Implement bakeMacaroon
    return "";
  },

  listMacaroonIDs: async (_data) => {
    // TODO: Implement listMacaroonIDs
    return "";
  },

  deleteMacaroonID: async (_data) => {
    // TODO: Implement deleteMacaroonID
    return "";
  },

  listPermissions: async (_data) => {
    // TODO: Implement listPermissions
    return "";
  },

  checkMacaroonPermissions: async (_data) => {
    // TODO: Implement checkMacaroonPermissions
    return "";
  },

  registerRPCMiddleware: (_onResponse, _onError) => {
    // TODO: Implement registerRPCMiddleware
    return {
      send: () => true,
      stop: () => true,
    };
  },

  sendCustomMessage: async (_data) => {
    // TODO: Implement sendCustomMessage
    return "";
  },

  subscribeCustomMessages: (_data, _onResponse, _onError) => {
    // TODO: Implement subscribeCustomMessages
    return () => {};
  },

  listAliases: async (_data) => {
    // TODO: Implement listAliases
    return "";
  },

  lookupHtlcResolution: async (_data) => {
    // TODO: Implement lookupHtlcResolution
    return "";
  },

  genSeed: async (_data) => {
    // TODO: Implement genSeed
    return "";
  },

  changePassword: async (_data) => {
    // TODO: Implement changePassword
    return "";
  },

  getState: async (_data) => {
    // TODO: Implement getState
    return "";
  },

  autopilotStatus: async (_data) => {
    // TODO: Implement autopilotStatus
    return "";
  },

  autopilotModifyStatus: async (_data) => {
    // TODO: Implement autopilotModifyStatus
    return "";
  },

  autopilotQueryScores: async (_data) => {
    // TODO: Implement autopilotQueryScores
    return "";
  },

  autopilotSetScores: async (_data) => {
    // TODO: Implement autopilotSetScores
    return "";
  },

  chainNotifierRegisterConfirmationsNtfn: (_data, _onResponse, _onError) => {
    // TODO: Implement chainNotifierRegisterConfirmationsNtfn
    return () => {};
  },

  chainNotifierRegisterSpendNtfn: (_data, _onResponse, _onError) => {
    // TODO: Implement chainNotifierRegisterSpendNtfn
    return () => {};
  },

  chainNotifierRegisterBlockEpochNtfn: (_data, _onResponse, _onError) => {
    // TODO: Implement chainNotifierRegisterBlockEpochNtfn
    return () => {};
  },

  invoicesSubscribeSingleInvoice: (_data, _onResponse, _onError) => {
    // TODO: Implement invoicesSubscribeSingleInvoice
    return () => {};
  },

  invoicesCancelInvoice: async (_data) => {
    // TODO: Implement invoicesCancelInvoice
    return "";
  },

  invoicesAddHoldInvoice: async (_data) => {
    // TODO: Implement invoicesAddHoldInvoice
    return "";
  },

  invoicesSettleInvoice: async (_data) => {
    // TODO: Implement invoicesSettleInvoice
    return "";
  },

  invoicesLookupInvoiceV2: async (_data) => {
    // TODO: Implement invoicesLookupInvoiceV2
    return "";
  },

  neutrinoKitStatus: async (_data) => {
    // TODO: Implement neutrinoKitStatus
    return "";
  },

  neutrinoKitAddPeer: async (_data) => {
    // TODO: Implement neutrinoKitAddPeer
    return "";
  },

  neutrinoKitDisconnectPeer: async (_data) => {
    // TODO: Implement neutrinoKitDisconnectPeer
    return "";
  },

  neutrinoKitIsBanned: async (_data) => {
    // TODO: Implement neutrinoKitIsBanned
    return "";
  },

  neutrinoKitGetBlockHeader: async (_data) => {
    // TODO: Implement neutrinoKitGetBlockHeader
    return "";
  },

  neutrinoKitGetBlock: async (_data) => {
    // TODO: Implement neutrinoKitGetBlock
    return "";
  },

  neutrinoKitGetCFilter: async (_data) => {
    // TODO: Implement neutrinoKitGetCFilter
    return "";
  },

  neutrinoKitGetBlockHash: async (_data) => {
    // TODO: Implement neutrinoKitGetBlockHash
    return "";
  },

  peersUpdateNodeAnnouncement: async (_data) => {
    // TODO: Implement peersUpdateNodeAnnouncement
    return "";
  },

  routerSendPaymentV2: (_data, _onResponse, _onError) => {
    // TODO: Implement routerSendPaymentV2
    return () => {};
  },

  routerTrackPaymentV2: (_data, _onResponse, _onError) => {
    // TODO: Implement routerTrackPaymentV2
    return () => {};
  },

  routerTrackPayments: (_data, _onResponse, _onError) => {
    // TODO: Implement routerTrackPayments
    return () => {};
  },

  routerEstimateRouteFee: async (_data) => {
    // TODO: Implement routerEstimateRouteFee
    return "";
  },

  routerSendToRoute: async (_data) => {
    // TODO: Implement routerSendToRoute
    return "";
  },

  routerSendToRouteV2: async (_data) => {
    // TODO: Implement routerSendToRouteV2
    return "";
  },

  routerResetMissionControl: async (_data) => {
    // TODO: Implement routerResetMissionControl
    return "";
  },

  routerQueryMissionControl: async (_data) => {
    // TODO: Implement routerQueryMissionControl
    return "";
  },

  routerXImportMissionControl: async (_data) => {
    // TODO: Implement routerXImportMissionControl
    return "";
  },

  routerGetMissionControlConfig: async (_data) => {
    // TODO: Implement routerGetMissionControlConfig
    return "";
  },

  routerSetMissionControlConfig: async (_data) => {
    // TODO: Implement routerSetMissionControlConfig
    return "";
  },

  routerQueryProbability: async (_data) => {
    // TODO: Implement routerQueryProbability
    return "";
  },

  routerBuildRoute: async (_data) => {
    // TODO: Implement routerBuildRoute
    return "";
  },

  routerSubscribeHtlcEvents: (_data, _onResponse, _onError) => {
    // TODO: Implement routerSubscribeHtlcEvents
    return () => {};
  },

  routerSendPayment: (_data, _onResponse, _onError) => {
    // TODO: Implement routerSendPayment
    return () => {};
  },

  routerTrackPayment: (_data, _onResponse, _onError) => {
    // TODO: Implement routerTrackPayment
    return () => {};
  },

  routerHtlcInterceptor: (_onResponse, _onError) => {
    // TODO: Implement routerHtlcInterceptor
    return {
      send: () => true,
      stop: () => true,
    };
  },

  routerUpdateChanStatus: async (_data) => {
    // TODO: Implement routerUpdateChanStatus
    return "";
  },

  signerSignOutputRaw: async (_data) => {
    // TODO: Implement signerSignOutputRaw
    return "";
  },

  signerComputeInputScript: async (_data) => {
    // TODO: Implement signerComputeInputScript
    return "";
  },

  signerSignMessage: async (_data) => {
    // TODO: Implement signerSignMessage
    return "";
  },

  signerVerifyMessage: async (_data) => {
    // TODO: Implement signerVerifyMessage
    return "";
  },

  signerDeriveSharedKey: async (_data) => {
    // TODO: Implement signerDeriveSharedKey
    return "";
  },

  signerMuSig2CombineKeys: async (_data) => {
    // TODO: Implement signerMuSig2CombineKeys
    return "";
  },

  signerMuSig2CreateSession: async (_data) => {
    // TODO: Implement signerMuSig2CreateSession
    return "";
  },

  signerMuSig2RegisterNonces: async (_data) => {
    // TODO: Implement signerMuSig2RegisterNonces
    return "";
  },

  signerMuSig2Sign: async (_data) => {
    // TODO: Implement signerMuSig2Sign
    return "";
  },

  signerMuSig2CombineSig: async (_data) => {
    // TODO: Implement signerMuSig2CombineSig
    return "";
  },

  signerMuSig2Cleanup: async (_data) => {
    // TODO: Implement signerMuSig2Cleanup
    return "";
  },

  versionerGetVersion: async (_data) => {
    // TODO: Implement versionerGetVersion
    return "";
  },

  walletKitListUnspent: async (_data) => {
    // TODO: Implement walletKitListUnspent
    return "";
  },

  walletKitLeaseOutput: async (_data) => {
    // TODO: Implement walletKitLeaseOutput
    return "";
  },

  walletKitReleaseOutput: async (_data) => {
    // TODO: Implement walletKitReleaseOutput
    return "";
  },

  walletKitListLeases: async (_data) => {
    // TODO: Implement walletKitListLeases
    return "";
  },

  walletKitDeriveNextKey: async (_data) => {
    // TODO: Implement walletKitDeriveNextKey
    return "";
  },

  walletKitDeriveKey: async (_data) => {
    // TODO: Implement walletKitDeriveKey
    return "";
  },

  walletKitNextAddr: async (_data) => {
    // TODO: Implement walletKitNextAddr
    return "";
  },

  walletKitListAccounts: async (_data) => {
    // TODO: Implement walletKitListAccounts
    return "";
  },

  walletKitRequiredReserve: async (_data) => {
    // TODO: Implement walletKitRequiredReserve
    return "";
  },

  walletKitListAddresses: async (_data) => {
    // TODO: Implement walletKitListAddresses
    return "";
  },

  walletKitSignMessageWithAddr: async (_data) => {
    // TODO: Implement walletKitSignMessageWithAddr
    return "";
  },

  walletKitVerifyMessageWithAddr: async (_data) => {
    // TODO: Implement walletKitVerifyMessageWithAddr
    return "";
  },

  walletKitImportAccount: async (_data) => {
    // TODO: Implement walletKitImportAccount
    return "";
  },

  walletKitImportPublicKey: async (_data) => {
    // TODO: Implement walletKitImportPublicKey
    return "";
  },

  walletKitImportTapscript: async (_data) => {
    // TODO: Implement walletKitImportTapscript
    return "";
  },

  walletKitPublishTransaction: async (_data) => {
    // TODO: Implement walletKitPublishTransaction
    return "";
  },

  walletKitSendOutputs: async (_data) => {
    // TODO: Implement walletKitSendOutputs
    return "";
  },

  walletKitEstimateFee: async (_data) => {
    // TODO: Implement walletKitEstimateFee
    return "";
  },

  walletKitPendingSweeps: async (_data) => {
    // TODO: Implement walletKitPendingSweeps
    return "";
  },

  walletKitBumpFee: async (_data) => {
    // TODO: Implement walletKitBumpFee
    return "";
  },

  walletKitListSweeps: async (_data) => {
    // TODO: Implement walletKitListSweeps
    return "";
  },

  walletKitLabelTransaction: async (_data) => {
    // TODO: Implement walletKitLabelTransaction
    return "";
  },

  walletKitFundPsbt: async (_data) => {
    // TODO: Implement walletKitFundPsbt
    return "";
  },

  walletKitSignPsbt: async (_data) => {
    // TODO: Implement walletKitSignPsbt
    return "";
  },

  walletKitFinalizePsbt: async (_data) => {
    // TODO: Implement walletKitFinalizePsbt
    return "";
  },

  watchtowerGetInfo: async (_data) => {
    // TODO: Implement watchtowerGetInfo
    return "";
  },

  watchtowerClientAddTower: async (_data) => {
    // TODO: Implement watchtowerClientAddTower
    return "";
  },

  watchtowerClientRemoveTower: async (_data) => {
    // TODO: Implement watchtowerClientRemoveTower
    return "";
  },

  watchtowerClientListTowers: async (_data) => {
    // TODO: Implement watchtowerClientListTowers
    return "";
  },

  watchtowerClientGetTowerInfo: async (_data) => {
    // TODO: Implement watchtowerClientGetTowerInfo
    return "";
  },

  watchtowerClientStats: async (_data) => {
    // TODO: Implement watchtowerClientStats
    return "";
  },

  watchtowerClientPolicy: async (_data) => {
    // TODO: Implement watchtowerClientPolicy
    return "";
  },
};

export default TurboLnd;
