"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _wire = require("@bufbuild/protobuf/wire");
var _protobuf = require("@bufbuild/protobuf");
var _lightning_pb = require("../proto/lightning_pb.js");
var _stateservice_pb = require("../proto/stateservice_pb.js");
var _responses = require("./responses.js");
/* eslint-disable @typescript-eslint/no-unused-vars */

let currentState = _lightning_pb.WalletState.LOCKED;
let subscribeStateOnResponseCallbacks = [];
const callSubscribeStateOnResponseCallbacks = () => {
  subscribeStateOnResponseCallbacks.forEach(cb => {
    cb.onResponse((0, _wire.base64Encode)((0, _protobuf.toBinary)(_lightning_pb.GetStateResponseSchema, (0, _protobuf.create)(_lightning_pb.GetStateResponseSchema, {
      state: currentState
    }))));
  });
};
const TurboLnd = {
  start: async _ => {
    console.log("Hi from mock");
    return "";
  },
  subscribeState: (_, onResponse, onError) => {
    subscribeStateOnResponseCallbacks.push({
      onResponse,
      onError
    });
    let subscribing = true;
    setTimeout(() => {
      if (!subscribing) {
        return;
      }
      const state = (0, _protobuf.toBinary)(_stateservice_pb.SubscribeStateResponseSchema, (0, _protobuf.create)(_stateservice_pb.SubscribeStateResponseSchema, {
        state: currentState
      }));
      onResponse((0, _wire.base64Encode)(state));
    }, 0);
    return () => {
      subscribing = false;
      console.log("unsubscribed");
    };
  },
  initWallet: async _ => {
    // TODO(hsjoberg)
    if (currentState === _lightning_pb.WalletState.LOCKED) {
      return (0, _wire.base64Encode)((0, _protobuf.toBinary)(_lightning_pb.UnlockWalletResponseSchema, (0, _protobuf.create)(_lightning_pb.UnlockWalletResponseSchema, {})));
    }
    currentState = _lightning_pb.WalletState.UNLOCKED;
    callSubscribeStateOnResponseCallbacks();
    currentState = _lightning_pb.WalletState.RPC_ACTIVE;
    callSubscribeStateOnResponseCallbacks();
    return (0, _wire.base64Encode)((0, _protobuf.toBinary)(_lightning_pb.UnlockWalletResponseSchema, (0, _protobuf.create)(_lightning_pb.UnlockWalletResponseSchema, {})));
  },
  unlockWallet: async _ => {
    if (currentState === _lightning_pb.WalletState.LOCKED) {
      // TODO(hsjoberg)
      return (0, _wire.base64Encode)((0, _protobuf.toBinary)(_lightning_pb.UnlockWalletResponseSchema, (0, _protobuf.create)(_lightning_pb.UnlockWalletResponseSchema, {})));
    }
    currentState = _lightning_pb.WalletState.UNLOCKED;
    callSubscribeStateOnResponseCallbacks();
    currentState = _lightning_pb.WalletState.RPC_ACTIVE;
    callSubscribeStateOnResponseCallbacks();
    return (0, _wire.base64Encode)((0, _protobuf.toBinary)(_lightning_pb.UnlockWalletResponseSchema, (0, _protobuf.create)(_lightning_pb.UnlockWalletResponseSchema, {})));
  },
  getInfo: async _ => {
    return (0, _wire.base64Encode)((0, _protobuf.toBinary)(_lightning_pb.GetInfoResponseSchema, _responses.mockGetInfoResponse));
  },
  listChannels: async _ => {
    return (0, _wire.base64Encode)((0, _protobuf.toBinary)(_lightning_pb.ListChannelsResponseSchema, (0, _protobuf.create)(_lightning_pb.ListChannelsResponseSchema, {
      channels: _responses.mockChannels
    })));
  },
  pendingChannels: async request => {
    (0, _protobuf.fromBinary)(_lightning_pb.PendingChannelsRequestSchema, (0, _wire.base64Decode)(request));
    return (0, _wire.base64Encode)((0, _protobuf.toBinary)(_lightning_pb.PendingChannelsResponseSchema, _responses.mockPendingChannelsResponse));
  },
  listPeers: async _ => {
    return (0, _wire.base64Encode)((0, _protobuf.toBinary)(_lightning_pb.ListPeersResponseSchema, (0, _protobuf.create)(_lightning_pb.ListPeersResponseSchema, {
      peers: _responses.mockPeers
    })));
  },
  walletBalance: async _ => {
    return (0, _wire.base64Encode)((0, _protobuf.toBinary)(_lightning_pb.WalletBalanceResponseSchema, _responses.mockWalletBalance));
  },
  channelBalance: async _ => {
    const response = (0, _protobuf.create)(_lightning_pb.ChannelBalanceResponseSchema, _responses.mockChannelBalanceResponse);
    return (0, _wire.base64Encode)((0, _protobuf.toBinary)(_lightning_pb.ChannelBalanceResponseSchema, response));
  },
  newAddress: async request => {
    const decodedRequest = (0, _protobuf.fromBinary)(_lightning_pb.NewAddressRequestSchema, (0, _wire.base64Decode)(request));
    const mockAddress = (0, _responses.generateMockAddress)(decodedRequest.type);
    const response = (0, _protobuf.create)(_lightning_pb.NewAddressResponseSchema, {
      address: mockAddress
    });
    await new Promise(resolve => setTimeout(resolve, 100));
    return (0, _wire.base64Encode)((0, _protobuf.toBinary)(_lightning_pb.NewAddressResponseSchema, response));
  },
  sendCoins: async request => {
    const decodedRequest = (0, _protobuf.fromBinary)(_lightning_pb.SendCoinsRequestSchema, (0, _wire.base64Decode)(request));
    if (decodedRequest.amount <= BigInt(0) && !decodedRequest.sendAll) {
      throw new Error("Invalid amount");
    }
    if (!decodedRequest.addr) {
      throw new Error("Invalid address");
    }
    const mockTxid = Math.random().toString(36).substring(2, 15);
    const response = (0, _protobuf.create)(_lightning_pb.SendCoinsResponseSchema, {
      txid: mockTxid
    });
    return (0, _wire.base64Encode)((0, _protobuf.toBinary)(_lightning_pb.SendCoinsResponseSchema, response));
  },
  openChannelSync: async request => {
    const decodedRequest = (0, _protobuf.fromBinary)(_lightning_pb.OpenChannelRequestSchema, (0, _wire.base64Decode)(request));

    // Simulate some basic validation
    if (decodedRequest.localFundingAmount <= BigInt(0)) {
      throw new Error("Invalid local funding amount");
    }
    if (decodedRequest.nodePubkey.length === 0) {
      throw new Error("Invalid node pubkey");
    }
    const mockChannelPoint = (0, _protobuf.create)(_lightning_pb.ChannelPointSchema, {
      fundingTxid: {
        case: "fundingTxidStr",
        value: "17625c43f15b77bfb61f8ff5cd95e56e3999378cdfc7d3851cd4d0b2a12c2a23"
      },
      outputIndex: 0
    });
    return (0, _wire.base64Encode)((0, _protobuf.toBinary)(_lightning_pb.ChannelPointSchema, mockChannelPoint));
  },
  closeChannel: (request, onResponse, onError) => {
    const decodedRequest = (0, _protobuf.fromBinary)(_lightning_pb.CloseChannelRequestSchema, (0, _wire.base64Decode)(request));

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
      const closeUpdate = (0, _protobuf.create)(_lightning_pb.CloseStatusUpdateSchema, {
        update: {
          case: "closePending",
          value: (0, _protobuf.create)(_lightning_pb.PendingUpdateSchema, {
            txid: new Uint8Array(Buffer.from((0, _responses.generateMockTxid)(), "hex")),
            outputIndex: decodedRequest?.channelPoint?.outputIndex
          })
        }
      });
      onResponse((0, _wire.base64Encode)((0, _protobuf.toBinary)(_lightning_pb.CloseStatusUpdateSchema, closeUpdate)));
    }, 1000);

    // Simulate channel close completion
    setTimeout(() => {
      isClosing = false;
      const finalUpdate = (0, _protobuf.create)(_lightning_pb.CloseStatusUpdateSchema, {
        update: {
          case: "chanClose",
          value: (0, _protobuf.create)(_lightning_pb.ChannelCloseUpdateSchema, {
            closingTxid: new Uint8Array(Buffer.from((0, _responses.generateMockTxid)(), "hex")),
            success: true
          })
        }
      });
      onResponse((0, _wire.base64Encode)((0, _protobuf.toBinary)(_lightning_pb.CloseStatusUpdateSchema, finalUpdate)));
    }, closingTime);

    // Return an unsubscribe function
    return () => {
      isClosing = false;
      clearInterval(intervalId);
    };
  },
  // Add placeholders for the remaining functions
  getTransactions: async _data => {
    throw new Error("getTransactions Not Implemented");
  },
  listUnspent: async _data => {
    throw new Error("listUnspent Not Implemented");
  },
  estimateFee: async _data => {
    throw new Error("estimateFee Not Implemented");
  },
  subscribeTransactions: (_data, _onResponse, _onError) => {
    throw new Error("subscribeTransactions Not Implemented");
  },
  sendMany: async _data => {
    throw new Error("sendMany Not Implemented");
  },
  signMessage: async _data => {
    throw new Error("signMessage Not Implemented");
  },
  verifyMessage: async _data => {
    throw new Error("verifyMessage Not Implemented");
  },
  connectPeer: async _data => {
    throw new Error("connectPeer Not Implemented");
  },
  disconnectPeer: async _data => {
    throw new Error("disconnectPeer Not Implemented");
  },
  subscribePeerEvents: (_data, _onResponse, _onError) => {
    throw new Error("subscribePeerEvents Not Implemented");
  },
  getRecoveryInfo: async _data => {
    throw new Error("getRecoveryInfo Not Implemented");
  },
  subscribeChannelEvents: (_data, _onResponse, _onError) => {
    throw new Error("subscribeChannelEvents Not Implemented");
  },
  closedChannels: async _data => {
    throw new Error("closedChannels Not Implemented");
  },
  openChannel: (_data, _onResponse, _onError) => {
    throw new Error("openChannel Not Implemented");
  },
  batchOpenChannel: async _data => {
    throw new Error("batchOpenChannel Not Implemented");
  },
  fundingStateStep: async _data => {
    throw new Error("fundingStateStep Not Implemented");
  },
  channelAcceptor: (_onResponse, _onError) => {
    throw new Error("channelAcceptor Not Implemented");
  },
  abandonChannel: async _data => {
    throw new Error("abandonChannel Not Implemented");
  },
  sendPayment: (_onResponse, _onError) => {
    throw new Error("sendPayment Not Implemented");
  },
  sendPaymentSync: async _data => {
    throw new Error("sendPaymentSync Not Implemented");
  },
  sendToRoute: (_onResponse, _onError) => {
    throw new Error("sendToRoute Not Implemented");
  },
  sendToRouteSync: async _data => {
    throw new Error("sendToRouteSync Not Implemented");
  },
  addInvoice: async _data => {
    throw new Error("addInvoice Not Implemented");
  },
  listInvoices: async _data => {
    throw new Error("listInvoices Not Implemented");
  },
  lookupInvoice: async _data => {
    throw new Error("lookupInvoice Not Implemented");
  },
  subscribeInvoices: (_data, _onResponse, _onError) => {
    throw new Error("subscribeInvoices Not Implemented");
  },
  decodePayReq: async _data => {
    throw new Error("decodePayReq Not Implemented");
  },
  listPayments: async _data => {
    throw new Error("listPayments Not Implemented");
  },
  deletePayment: async _data => {
    throw new Error("deletePayment Not Implemented");
  },
  deleteAllPayments: async _data => {
    throw new Error("deleteAllPayments Not Implemented");
  },
  describeGraph: async _data => {
    throw new Error("describeGraph Not Implemented");
  },
  getNodeMetrics: async _data => {
    throw new Error("getNodeMetrics Not Implemented");
  },
  getChanInfo: async _data => {
    throw new Error("getChanInfo Not Implemented");
  },
  getNodeInfo: async _data => {
    throw new Error("getNodeInfo Not Implemented");
  },
  queryRoutes: async _data => {
    throw new Error("queryRoutes Not Implemented");
  },
  getNetworkInfo: async _data => {
    throw new Error("getNetworkInfo Not Implemented");
  },
  stopDaemon: async _data => {
    throw new Error("stopDaemon Not Implemented");
  },
  subscribeChannelGraph: (_data, _onResponse, _onError) => {
    throw new Error("subscribeChannelGraph Not Implemented");
  },
  debugLevel: async _data => {
    throw new Error("debugLevel Not Implemented");
  },
  feeReport: async _data => {
    throw new Error("feeReport Not Implemented");
  },
  updateChannelPolicy: async _data => {
    throw new Error("updateChannelPolicy Not Implemented");
  },
  forwardingHistory: async _data => {
    throw new Error("forwardingHistory Not Implemented");
  },
  exportChannelBackup: async _data => {
    throw new Error("exportChannelBackup Not Implemented");
  },
  exportAllChannelBackups: async _data => {
    throw new Error("exportAllChannelBackups Not Implemented");
  },
  verifyChanBackup: async _data => {
    throw new Error("verifyChanBackup Not Implemented");
  },
  restoreChannelBackups: async _data => {
    throw new Error("restoreChannelBackups Not Implemented");
  },
  subscribeChannelBackups: (_data, _onResponse, _onError) => {
    throw new Error("subscribeChannelBackups Not Implemented");
  },
  bakeMacaroon: async _data => {
    throw new Error("bakeMacaroon Not Implemented");
  },
  listMacaroonIDs: async _data => {
    throw new Error("listMacaroonIDs Not Implemented");
  },
  deleteMacaroonID: async _data => {
    throw new Error("deleteMacaroonID Not Implemented");
  },
  listPermissions: async _data => {
    throw new Error("listPermissions Not Implemented");
  },
  checkMacaroonPermissions: async _data => {
    throw new Error("checkMacaroonPermissions Not Implemented");
  },
  registerRPCMiddleware: (_onResponse, _onError) => {
    throw new Error("registerRPCMiddleware Not Implemented");
  },
  sendCustomMessage: async _data => {
    throw new Error("sendCustomMessage Not Implemented");
  },
  subscribeCustomMessages: (_data, _onResponse, _onError) => {
    throw new Error("subscribeCustomMessages Not Implemented");
  },
  listAliases: async _data => {
    throw new Error("listAliases Not Implemented");
  },
  lookupHtlcResolution: async _data => {
    throw new Error("lookupHtlcResolution Not Implemented");
  },
  genSeed: async _data => {
    throw new Error("genSeed Not Implemented");
  },
  changePassword: async _data => {
    throw new Error("changePassword Not Implemented");
  },
  getState: async _data => {
    throw new Error("getState Not Implemented");
  },
  autopilotStatus: async _data => {
    throw new Error("autopilotStatus Not Implemented");
  },
  autopilotModifyStatus: async _data => {
    throw new Error("autopilotModifyStatus Not Implemented");
  },
  autopilotQueryScores: async _data => {
    throw new Error("autopilotQueryScores Not Implemented");
  },
  autopilotSetScores: async _data => {
    throw new Error("autopilotSetScores Not Implemented");
  },
  chainNotifierRegisterConfirmationsNtfn: (_data, _onResponse, _onError) => {
    throw new Error("chainNotifierRegisterConfirmationsNtfn Not Implemented");
  },
  chainNotifierRegisterSpendNtfn: (_data, _onResponse, _onError) => {
    throw new Error("chainNotifierRegisterSpendNtfn Not Implemented");
  },
  chainNotifierRegisterBlockEpochNtfn: (_data, _onResponse, _onError) => {
    throw new Error("chainNotifierRegisterBlockEpochNtfn Not Implemented");
  },
  invoicesSubscribeSingleInvoice: (_data, _onResponse, _onError) => {
    throw new Error("invoicesSubscribeSingleInvoice Not Implemented");
  },
  invoicesCancelInvoice: async _data => {
    throw new Error("invoicesCancelInvoice Not Implemented");
  },
  invoicesAddHoldInvoice: async _data => {
    throw new Error("invoicesAddHoldInvoice Not Implemented");
  },
  invoicesSettleInvoice: async _data => {
    throw new Error("invoicesSettleInvoice Not Implemented");
  },
  invoicesLookupInvoiceV2: async _data => {
    throw new Error("invoicesLookupInvoiceV2 Not Implemented");
  },
  neutrinoKitStatus: async _data => {
    throw new Error("neutrinoKitStatus Not Implemented");
  },
  neutrinoKitAddPeer: async _data => {
    throw new Error("neutrinoKitAddPeer Not Implemented");
  },
  neutrinoKitDisconnectPeer: async _data => {
    throw new Error("neutrinoKitDisconnectPeer Not Implemented");
  },
  neutrinoKitIsBanned: async _data => {
    throw new Error("neutrinoKitIsBanned Not Implemented");
  },
  neutrinoKitGetBlockHeader: async _data => {
    throw new Error("neutrinoKitGetBlockHeader Not Implemented");
  },
  neutrinoKitGetBlock: async _data => {
    throw new Error("neutrinoKitGetBlock Not Implemented");
  },
  neutrinoKitGetCFilter: async _data => {
    throw new Error("neutrinoKitGetCFilter Not Implemented");
  },
  neutrinoKitGetBlockHash: async _data => {
    throw new Error("neutrinoKitGetBlockHash Not Implemented");
  },
  peersUpdateNodeAnnouncement: async _data => {
    throw new Error("peersUpdateNodeAnnouncement Not Implemented");
  },
  routerSendPaymentV2: (_data, _onResponse, _onError) => {
    throw new Error("routerSendPaymentV2 Not Implemented");
  },
  routerTrackPaymentV2: (_data, _onResponse, _onError) => {
    throw new Error("routerTrackPaymentV2 Not Implemented");
  },
  routerTrackPayments: (_data, _onResponse, _onError) => {
    throw new Error("routerTrackPayments Not Implemented");
  },
  routerEstimateRouteFee: async _data => {
    throw new Error("routerEstimateRouteFee Not Implemented");
  },
  routerSendToRoute: async _data => {
    throw new Error("routerSendToRoute Not Implemented");
  },
  routerSendToRouteV2: async _data => {
    throw new Error("routerSendToRouteV2 Not Implemented");
  },
  routerResetMissionControl: async _data => {
    throw new Error("routerResetMissionControl Not Implemented");
  },
  routerQueryMissionControl: async _data => {
    throw new Error("routerQueryMissionControl Not Implemented");
  },
  routerXImportMissionControl: async _data => {
    throw new Error("routerXImportMissionControl Not Implemented");
  },
  routerGetMissionControlConfig: async _data => {
    throw new Error("routerGetMissionControlConfig Not Implemented");
  },
  routerSetMissionControlConfig: async _data => {
    throw new Error("routerSetMissionControlConfig Not Implemented");
  },
  routerQueryProbability: async _data => {
    throw new Error("routerQueryProbability Not Implemented");
  },
  routerBuildRoute: async _data => {
    throw new Error("routerBuildRoute Not Implemented");
  },
  routerSubscribeHtlcEvents: (_data, _onResponse, _onError) => {
    throw new Error("routerSubscribeHtlcEvents Not Implemented");
  },
  routerSendPayment: (_data, _onResponse, _onError) => {
    throw new Error("routerSendPayment Not Implemented");
  },
  routerTrackPayment: (_data, _onResponse, _onError) => {
    throw new Error("routerTrackPayment Not Implemented");
  },
  routerHtlcInterceptor: (_onResponse, _onError) => {
    throw new Error("routerHtlcInterceptor Not Implemented");
  },
  routerUpdateChanStatus: async _data => {
    throw new Error("routerUpdateChanStatus Not Implemented");
  },
  signerSignOutputRaw: async _data => {
    throw new Error("signerSignOutputRaw Not Implemented");
  },
  signerComputeInputScript: async _data => {
    throw new Error("signerComputeInputScript Not Implemented");
  },
  signerSignMessage: async _data => {
    throw new Error("signerSignMessage Not Implemented");
  },
  signerVerifyMessage: async _data => {
    throw new Error("signerVerifyMessage Not Implemented");
  },
  signerDeriveSharedKey: async _data => {
    throw new Error("signerDeriveSharedKey Not Implemented");
  },
  signerMuSig2CombineKeys: async _data => {
    throw new Error("signerMuSig2CombineKeys Not Implemented");
  },
  signerMuSig2CreateSession: async _data => {
    throw new Error("signerMuSig2CreateSession Not Implemented");
  },
  signerMuSig2RegisterNonces: async _data => {
    throw new Error("signerMuSig2RegisterNonces Not Implemented");
  },
  signerMuSig2Sign: async _data => {
    throw new Error("signerMuSig2Sign Not Implemented");
  },
  signerMuSig2CombineSig: async _data => {
    throw new Error("signerMuSig2CombineSig Not Implemented");
  },
  signerMuSig2Cleanup: async _data => {
    throw new Error("signerMuSig2Cleanup Not Implemented");
  },
  versionerGetVersion: async _data => {
    throw new Error("versionerGetVersion Not Implemented");
  },
  walletKitListUnspent: async _data => {
    throw new Error("walletKitListUnspent Not Implemented");
  },
  walletKitLeaseOutput: async _data => {
    throw new Error("walletKitLeaseOutput Not Implemented");
  },
  walletKitReleaseOutput: async _data => {
    throw new Error("walletKitReleaseOutput Not Implemented");
  },
  walletKitListLeases: async _data => {
    throw new Error("walletKitListLeases Not Implemented");
  },
  walletKitDeriveNextKey: async _data => {
    throw new Error("walletKitDeriveNextKey Not Implemented");
  },
  walletKitDeriveKey: async _data => {
    throw new Error("walletKitDeriveKey Not Implemented");
  },
  walletKitNextAddr: async _data => {
    throw new Error("walletKitNextAddr Not Implemented");
  },
  walletKitListAccounts: async _data => {
    throw new Error("walletKitListAccounts Not Implemented");
  },
  walletKitRequiredReserve: async _data => {
    throw new Error("walletKitRequiredReserve Not Implemented");
  },
  walletKitListAddresses: async _data => {
    throw new Error("walletKitListAddresses Not Implemented");
  },
  walletKitSignMessageWithAddr: async _data => {
    throw new Error("walletKitSignMessageWithAddr Not Implemented");
  },
  walletKitVerifyMessageWithAddr: async _data => {
    throw new Error("walletKitVerifyMessageWithAddr Not Implemented");
  },
  walletKitImportAccount: async _data => {
    throw new Error("walletKitImportAccount Not Implemented");
  },
  walletKitImportPublicKey: async _data => {
    throw new Error("walletKitImportPublicKey Not Implemented");
  },
  walletKitImportTapscript: async _data => {
    throw new Error("walletKitImportTapscript Not Implemented");
  },
  walletKitPublishTransaction: async _data => {
    throw new Error("walletKitPublishTransaction Not Implemented");
  },
  walletKitSendOutputs: async _data => {
    throw new Error("walletKitSendOutputs Not Implemented");
  },
  walletKitEstimateFee: async _data => {
    throw new Error("walletKitEstimateFee Not Implemented");
  },
  walletKitPendingSweeps: async _data => {
    throw new Error("walletKitPendingSweeps Not Implemented");
  },
  walletKitBumpFee: async _data => {
    throw new Error("walletKitBumpFee Not Implemented");
  },
  walletKitListSweeps: async _data => {
    throw new Error("walletKitListSweeps Not Implemented");
  },
  walletKitLabelTransaction: async _data => {
    throw new Error("walletKitLabelTransaction Not Implemented");
  },
  walletKitFundPsbt: async _data => {
    throw new Error("walletKitFundPsbt Not Implemented");
  },
  walletKitSignPsbt: async _data => {
    throw new Error("walletKitSignPsbt Not Implemented");
  },
  walletKitFinalizePsbt: async _data => {
    throw new Error("walletKitFinalizePsbt Not Implemented");
  },
  watchtowerGetInfo: async _data => {
    throw new Error("watchtowerGetInfo Not Implemented");
  },
  watchtowerClientAddTower: async _data => {
    throw new Error("watchtowerClientAddTower Not Implemented");
  },
  watchtowerClientRemoveTower: async _data => {
    throw new Error("watchtowerClientRemoveTower Not Implemented");
  },
  watchtowerClientListTowers: async _data => {
    throw new Error("watchtowerClientListTowers Not Implemented");
  },
  watchtowerClientGetTowerInfo: async _data => {
    throw new Error("watchtowerClientGetTowerInfo Not Implemented");
  },
  watchtowerClientStats: async _data => {
    throw new Error("watchtowerClientStats Not Implemented");
  },
  watchtowerClientPolicy: async _data => {
    throw new Error("watchtowerClientPolicy Not Implemented");
  }
};
var _default = exports.default = TurboLnd;
//# sourceMappingURL=index.js.map