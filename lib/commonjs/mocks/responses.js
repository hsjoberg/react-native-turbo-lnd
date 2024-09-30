"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mockWalletBalance = exports.mockPendingChannelsResponse = exports.mockPeers = exports.mockGetInfoResponse = exports.mockChannels = exports.mockChannelBalanceResponse = exports.generateMockTxid = exports.generateMockAddress = void 0;
var _lightning_pb = require("../proto/lightning_pb.js");
var _protobuf = require("@bufbuild/protobuf");
const mockGetInfoResponse = exports.mockGetInfoResponse = (0, _protobuf.create)(_lightning_pb.GetInfoResponseSchema, {
  version: "0.18.3-beta",
  commitHash: "03f10c03894188447dbf0a88691387972d93416cc6f2f6e0c0d3505b38f6db8eb5",
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
  chains: [{
    chain: "bitcoin",
    network: "mainnet"
  }],
  uris: ["03f10c03894188447dbf0a88691387972d93416cc6f2f6e0c0d3505b38f6db8eb5@127.0.0.1:9735"],
  features: {
    0: {
      name: "data-loss-protect",
      isRequired: true,
      isKnown: true
    },
    5: {
      name: "upfront-shutdown-script",
      isRequired: false,
      isKnown: true
    }
  },
  requireHtlcInterceptor: false,
  storeFinalHtlcResolutions: true
});
const mockChannels = exports.mockChannels = [(0, _protobuf.create)(_lightning_pb.ChannelSchema, {
  active: true,
  remotePubkey: "03f10c03894188447dbf0a88691387972d93416cc6f2f6e0c0d3505b38f6db8eb5",
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
  commitmentType: _lightning_pb.CommitmentType.ANCHORS,
  lifetime: BigInt(3600),
  uptime: BigInt(3500),
  closeAddress: "",
  pushAmountSat: BigInt(50000),
  thawHeight: 0,
  localConstraints: (0, _protobuf.create)(_lightning_pb.ChannelConstraintsSchema, {
    csvDelay: 144,
    chanReserveSat: BigInt(10000),
    dustLimitSat: BigInt(354),
    maxPendingAmtMsat: BigInt(99000000),
    minHtlcMsat: BigInt(1),
    maxAcceptedHtlcs: 483
  }),
  remoteConstraints: (0, _protobuf.create)(_lightning_pb.ChannelConstraintsSchema, {
    csvDelay: 144,
    chanReserveSat: BigInt(10000),
    dustLimitSat: BigInt(354),
    maxPendingAmtMsat: BigInt(99000000),
    minHtlcMsat: BigInt(1),
    maxAcceptedHtlcs: 483
  }),
  aliasScids: [BigInt(1234567)],
  zeroConf: false,
  zeroConfConfirmedScid: BigInt(0),
  peerAlias: "mock-peer",
  peerScidAlias: "9876543210987654",
  memo: "Mock channel for testing"
})];
const mockPeers = exports.mockPeers = [(0, _protobuf.create)(_lightning_pb.PeerSchema, {
  pubKey: "03f10c03894188447dbf0a88691387972d93416cc6f2f6e0c0d3505b38f6db8eb5",
  address: "127.0.0.1:9735",
  bytesSent: BigInt(1000000),
  bytesRecv: BigInt(2000000),
  satSent: BigInt(50000),
  satRecv: BigInt(75000),
  inbound: false,
  pingTime: BigInt(50),
  // 50 milliseconds
  syncType: _lightning_pb.Peer_SyncType.ACTIVE_SYNC,
  features: {
    0: (0, _protobuf.create)(_lightning_pb.FeatureSchema, {
      name: "data-loss-protect",
      isRequired: true,
      isKnown: true
    }),
    5: (0, _protobuf.create)(_lightning_pb.FeatureSchema, {
      name: "upfront-shutdown-script",
      isRequired: false,
      isKnown: true
    })
  },
  errors: [(0, _protobuf.create)(_lightning_pb.TimestampedErrorSchema, {
    timestamp: BigInt(Date.now() * 1000000),
    // Current time in nanoseconds
    error: "Mock error message"
  })],
  flapCount: 2,
  lastFlapNs: BigInt((Date.now() - 3600000) * 1000000),
  // 1 hour ago in nanoseconds
  lastPingPayload: new Uint8Array([1, 2, 3, 4, 5])
})];
const mockWalletBalance = exports.mockWalletBalance = (0, _protobuf.create)(_lightning_pb.WalletBalanceResponseSchema, {
  totalBalance: BigInt(10000000),
  confirmedBalance: BigInt(9000000),
  unconfirmedBalance: BigInt(1000000),
  lockedBalance: BigInt(500000),
  reservedBalanceAnchorChan: BigInt(200000),
  accountBalance: {
    default: (0, _protobuf.create)(_lightning_pb.WalletAccountBalanceSchema, {
      confirmedBalance: BigInt(8000000),
      unconfirmedBalance: BigInt(900000)
    }),
    savings: (0, _protobuf.create)(_lightning_pb.WalletAccountBalanceSchema, {
      confirmedBalance: BigInt(1000000),
      unconfirmedBalance: BigInt(100000)
    })
  }
});
const generateMockAddress = type => {
  const prefix = (() => {
    switch (type) {
      case _lightning_pb.AddressType.WITNESS_PUBKEY_HASH:
      case _lightning_pb.AddressType.UNUSED_WITNESS_PUBKEY_HASH:
        return "bc1q";
      case _lightning_pb.AddressType.NESTED_PUBKEY_HASH:
      case _lightning_pb.AddressType.UNUSED_NESTED_PUBKEY_HASH:
        return "3";
      case _lightning_pb.AddressType.TAPROOT_PUBKEY:
      case _lightning_pb.AddressType.UNUSED_TAPROOT_PUBKEY:
        return "bc1p";
      default:
        return "bc1q";
    }
  })();
  const randomPart = Array.from({
    length: 30
  }, () => "0123456789abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 36)]).join("");
  return `${prefix}${randomPart}`;
};
exports.generateMockAddress = generateMockAddress;
const createMockAmount = (sat, msat) => (0, _protobuf.create)(_lightning_pb.AmountSchema, {
  sat: BigInt(sat),
  msat: BigInt(msat)
});
const mockChannelBalanceResponse = exports.mockChannelBalanceResponse = (0, _protobuf.create)(_lightning_pb.ChannelBalanceResponseSchema, {
  balance: BigInt(1000000),
  pendingOpenBalance: BigInt(200000),
  localBalance: createMockAmount(800000, 800000000),
  remoteBalance: createMockAmount(200000, 200000000),
  unsettledLocalBalance: createMockAmount(50000, 50000000),
  unsettledRemoteBalance: createMockAmount(30000, 30000000),
  pendingOpenLocalBalance: createMockAmount(150000, 150000000),
  pendingOpenRemoteBalance: createMockAmount(50000, 50000000)
});
const generateMockTxid = () => {
  return Array.from({
    length: 32
  }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, "0")).join("");
};
exports.generateMockTxid = generateMockTxid;
const mockPendingChannelsResponse = exports.mockPendingChannelsResponse = (0, _protobuf.create)(_lightning_pb.PendingChannelsResponseSchema, {
  totalLimboBalance: BigInt(1000000),
  pendingOpenChannels: [{
    channel: {
      remoteNodePub: "03f10c03894188447dbf0a88691387972d93416cc6f2f6e0c0d3505b38f6db8eb5",
      channelPoint: "txid:1",
      capacity: BigInt(500000),
      localBalance: BigInt(250000),
      remoteBalance: BigInt(250000)
    },
    commitFee: BigInt(100),
    commitWeight: BigInt(724),
    feePerKw: BigInt(12500)
  }],
  pendingClosingChannels: [],
  pendingForceClosingChannels: [{
    channel: {
      remoteNodePub: "03f10c03894188447dbf0a88691387972d93416cc6f2f6e0c0d3505b38f6db8eb5",
      channelPoint: "17625c43f15b77bfb61f8ff5cd95e56e3999378cdfc7d3851cd4d0b2a12c2a23:2",
      capacity: BigInt(1000000),
      localBalance: BigInt(400000),
      remoteBalance: BigInt(600000)
    },
    closingTxid: "17625c43f15b77bfb61f8ff5cd95e56e3999378cdfc7d3851cd4d0b2a12c2a23",
    limboBalance: BigInt(400000),
    maturityHeight: 700100,
    blocksTilMaturity: 90,
    recoveredBalance: BigInt(0),
    pendingHtlcs: []
  }],
  waitingCloseChannels: [{
    channel: {
      remoteNodePub: "03f10c03894188447dbf0a88691387972d93416cc6f2f6e0c0d3505b38f6db8eb5",
      channelPoint: "17625c43f15b77bfb61f8ff5cd95e56e3999378cdfc7d3851cd4d0b2a12c2a23:3",
      capacity: BigInt(750000),
      localBalance: BigInt(350000),
      remoteBalance: BigInt(400000)
    },
    limboBalance: BigInt(350000)
  }]
});
//# sourceMappingURL=responses.js.map