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

    await new Promise((resolve) => setTimeout(resolve, 500));

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
};

export default TurboLnd;
