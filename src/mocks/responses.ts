import {
  ChannelSchema,
  type Channel,
  type Peer,
  Peer_SyncType,
  CommitmentType,
  ChannelConstraintsSchema,
  PeerSchema,
  FeatureSchema,
  TimestampedErrorSchema,
  WalletBalanceResponseSchema,
  GetInfoResponseSchema,
  AddressType,
  ChannelBalanceResponseSchema,
  AmountSchema,
  WalletAccountBalanceSchema,
} from "../proto/lightning_pb";
import { create } from "@bufbuild/protobuf";

export const mockGetInfoResponse = create(GetInfoResponseSchema, {
  version: "0.18.3-beta",
  commitHash:
    "03f10c03894188447dbf0a88691387972d93416cc6f2f6e0c0d3505b38f6db8eb5",
  identityPubkey: "03abcdef...",
  alias: "mock-node",
  color: "#3399ff",
  numPendingChannels: 1,
  numActiveChannels: 2,
  numInactiveChannels: 0,
  numPeers: 3,
  blockHeight: 700000,
  blockHash: "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
  bestHeaderTimestamp: BigInt(1630000000),
  syncedToChain: true,
  syncedToGraph: true,
  testnet: false,
  chains: [
    {
      chain: "bitcoin",
      network: "mainnet",
    },
  ],
  uris: [
    "03f10c03894188447dbf0a88691387972d93416cc6f2f6e0c0d3505b38f6db8eb5@127.0.0.1:9735",
  ],
  features: {
    0: {
      name: "data-loss-protect",
      isRequired: true,
      isKnown: true,
    },
    5: {
      name: "upfront-shutdown-script",
      isRequired: false,
      isKnown: true,
    },
  },

  requireHtlcInterceptor: false,
  storeFinalHtlcResolutions: true,
});

export const mockChannels: Channel[] = [
  create(ChannelSchema, {
    active: true,
    remotePubkey:
      "03f10c03894188447dbf0a88691387972d93416cc6f2f6e0c0d3505b38f6db8eb5",
    channelPoint: "txid:0",
    chanId: "1234567890123456",
    capacity: BigInt(1000000),
    localBalance: BigInt(500000),
    remoteBalance: BigInt(500000),
    commitFee: BigInt(100),
    commitWeight: BigInt(724),
    feePerKw: BigInt(12500),
    unsettledBalance: BigInt(0),
    totalSatoshisSent: BigInt(100000),
    totalSatoshisReceived: BigInt(200000),
    numUpdates: BigInt(30),
    pendingHtlcs: [],
    csvDelay: 144,
    private: false,
    initiator: true,
    chanStatusFlags: "ChanStatusDefault",
    localChanReserveSat: BigInt(10000),
    remoteChanReserveSat: BigInt(10000),
    staticRemoteKey: true,
    commitmentType: CommitmentType.ANCHORS,
    lifetime: BigInt(3600),
    uptime: BigInt(3500),
    closeAddress: "",
    pushAmountSat: BigInt(50000),
    thawHeight: 0,
    localConstraints: create(ChannelConstraintsSchema, {
      csvDelay: 144,
      chanReserveSat: BigInt(10000),
      dustLimitSat: BigInt(354),
      maxPendingAmtMsat: BigInt(99000000),
      minHtlcMsat: BigInt(1),
      maxAcceptedHtlcs: 483,
    }),
    remoteConstraints: create(ChannelConstraintsSchema, {
      csvDelay: 144,
      chanReserveSat: BigInt(10000),
      dustLimitSat: BigInt(354),
      maxPendingAmtMsat: BigInt(99000000),
      minHtlcMsat: BigInt(1),
      maxAcceptedHtlcs: 483,
    }),
    aliasScids: [BigInt(1234567)],
    zeroConf: false,
    zeroConfConfirmedScid: BigInt(0),
    peerAlias: "mock-peer",
    peerScidAlias: "9876543210987654",
    memo: "Mock channel for testing",
  }),
];

export const mockPeers: Peer[] = [
  create(PeerSchema, {
    pubKey:
      "03f10c03894188447dbf0a88691387972d93416cc6f2f6e0c0d3505b38f6db8eb5",
    address: "127.0.0.1:9735",
    bytesSent: BigInt(1000000),
    bytesRecv: BigInt(2000000),
    satSent: BigInt(50000),
    satRecv: BigInt(75000),
    inbound: false,
    pingTime: BigInt(50), // 50 milliseconds
    syncType: Peer_SyncType.ACTIVE_SYNC,
    features: {
      0: create(FeatureSchema, {
        name: "data-loss-protect",
        isRequired: true,
        isKnown: true,
      }),
      5: create(FeatureSchema, {
        name: "upfront-shutdown-script",
        isRequired: false,
        isKnown: true,
      }),
    },
    errors: [
      create(TimestampedErrorSchema, {
        timestamp: BigInt(Date.now() * 1000000), // Current time in nanoseconds
        error: "Mock error message",
      }),
    ],
    flapCount: 2,
    lastFlapNs: BigInt((Date.now() - 3600000) * 1000000), // 1 hour ago in nanoseconds
    lastPingPayload: new Uint8Array([1, 2, 3, 4, 5]),
  }),
];

export const mockWalletBalance = create(WalletBalanceResponseSchema, {
  totalBalance: BigInt(10000000),
  confirmedBalance: BigInt(9000000),
  unconfirmedBalance: BigInt(1000000),
  lockedBalance: BigInt(500000),
  reservedBalanceAnchorChan: BigInt(200000),
  accountBalance: {
    default: create(WalletAccountBalanceSchema, {
      confirmedBalance: BigInt(8000000),
      unconfirmedBalance: BigInt(900000),
    }),
    savings: create(WalletAccountBalanceSchema, {
      confirmedBalance: BigInt(1000000),
      unconfirmedBalance: BigInt(100000),
    }),
  },
});

export const generateMockAddress = (type: AddressType): string => {
  const prefix = (() => {
    switch (type) {
      case AddressType.WITNESS_PUBKEY_HASH:
      case AddressType.UNUSED_WITNESS_PUBKEY_HASH:
        return "bc1q";
      case AddressType.NESTED_PUBKEY_HASH:
      case AddressType.UNUSED_NESTED_PUBKEY_HASH:
        return "3";
      case AddressType.TAPROOT_PUBKEY:
      case AddressType.UNUSED_TAPROOT_PUBKEY:
        return "bc1p";
      default:
        return "bc1q";
    }
  })();

  const randomPart = Array.from(
    { length: 30 },
    () => "0123456789abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 36)]
  ).join("");

  return `${prefix}${randomPart}`;
};

const createMockAmount = (sat: number, msat: number) =>
  create(AmountSchema, {
    sat: BigInt(sat),
    msat: BigInt(msat),
  });

export const mockChannelBalanceResponse = create(ChannelBalanceResponseSchema, {
  balance: BigInt(1000000),
  pendingOpenBalance: BigInt(200000),
  localBalance: createMockAmount(800000, 800000000),
  remoteBalance: createMockAmount(200000, 200000000),
  unsettledLocalBalance: createMockAmount(50000, 50000000),
  unsettledRemoteBalance: createMockAmount(30000, 30000000),
  pendingOpenLocalBalance: createMockAmount(150000, 150000000),
  pendingOpenRemoteBalance: createMockAmount(50000, 50000000),
});

export const generateMockTxid = () => {
  return Array.from({ length: 32 }, () =>
    Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0")
  ).join("");
};
