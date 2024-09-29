import { base64Encode } from "@bufbuild/protobuf/wire";
import { create, toBinary } from "@bufbuild/protobuf";

import {
  GetStateResponseSchema,
  UnlockWalletResponseSchema,
  WalletState,
} from "../proto/lightning_pb";
import type {
  OnErrorCallback,
  OnResponseCallback,
  Spec,
} from "../core/NativeTurboLnd";
import { SubscribeStateResponseSchema } from "../proto/stateservice_pb";

let currentState: WalletState = WalletState.LOCKED;
// We need this in order to handle walletUnlock and initWallet
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
};

export default TurboLnd;
