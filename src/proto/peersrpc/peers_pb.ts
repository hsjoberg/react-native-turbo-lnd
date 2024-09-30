// @generated by protoc-gen-es v2.0.0 with parameter "target=ts"
// @generated from file peersrpc/peers.proto (package peersrpc, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv1";
import type { FeatureBit, Op } from "../lightning_pb";
import { file_lightning } from "../lightning_pb";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file peersrpc/peers.proto.
 */
export const file_peersrpc_peers: GenFile = /*@__PURE__*/
  fileDesc("ChRwZWVyc3JwYy9wZWVycy5wcm90bxIIcGVlcnNycGMiTgoTVXBkYXRlQWRkcmVzc0FjdGlvbhImCgZhY3Rpb24YASABKA4yFi5wZWVyc3JwYy5VcGRhdGVBY3Rpb24SDwoHYWRkcmVzcxgCIAEoCSJlChNVcGRhdGVGZWF0dXJlQWN0aW9uEiYKBmFjdGlvbhgBIAEoDjIWLnBlZXJzcnBjLlVwZGF0ZUFjdGlvbhImCgtmZWF0dXJlX2JpdBgCIAEoDjIRLmxucnBjLkZlYXR1cmVCaXQirQEKHU5vZGVBbm5vdW5jZW1lbnRVcGRhdGVSZXF1ZXN0EjYKD2ZlYXR1cmVfdXBkYXRlcxgBIAMoCzIdLnBlZXJzcnBjLlVwZGF0ZUZlYXR1cmVBY3Rpb24SDQoFY29sb3IYAiABKAkSDQoFYWxpYXMYAyABKAkSNgoPYWRkcmVzc191cGRhdGVzGAQgAygLMh0ucGVlcnNycGMuVXBkYXRlQWRkcmVzc0FjdGlvbiI4Ch5Ob2RlQW5ub3VuY2VtZW50VXBkYXRlUmVzcG9uc2USFgoDb3BzGAEgAygLMgkubG5ycGMuT3AqIwoMVXBkYXRlQWN0aW9uEgcKA0FERBAAEgoKBlJFTU9WRRABKmkKCkZlYXR1cmVTZXQSDAoIU0VUX0lOSVQQABIVChFTRVRfTEVHQUNZX0dMT0JBTBABEhAKDFNFVF9OT0RFX0FOThACEg8KC1NFVF9JTlZPSUNFEAMSEwoPU0VUX0lOVk9JQ0VfQU1QEAQydAoFUGVlcnMSawoWVXBkYXRlTm9kZUFubm91bmNlbWVudBInLnBlZXJzcnBjLk5vZGVBbm5vdW5jZW1lbnRVcGRhdGVSZXF1ZXN0GigucGVlcnNycGMuTm9kZUFubm91bmNlbWVudFVwZGF0ZVJlc3BvbnNlQjBaLmdpdGh1Yi5jb20vbGlnaHRuaW5nbmV0d29yay9sbmQvbG5ycGMvcGVlcnNycGNiBnByb3RvMw", [file_lightning]);

/**
 * @generated from message peersrpc.UpdateAddressAction
 */
export type UpdateAddressAction = Message<"peersrpc.UpdateAddressAction"> & {
  /**
   * Determines the kind of action.
   *
   * @generated from field: peersrpc.UpdateAction action = 1;
   */
  action: UpdateAction;

  /**
   * The address used to apply the update action.
   *
   * @generated from field: string address = 2;
   */
  address: string;
};

/**
 * Describes the message peersrpc.UpdateAddressAction.
 * Use `create(UpdateAddressActionSchema)` to create a new message.
 */
export const UpdateAddressActionSchema: GenMessage<UpdateAddressAction> = /*@__PURE__*/
  messageDesc(file_peersrpc_peers, 0);

/**
 * @generated from message peersrpc.UpdateFeatureAction
 */
export type UpdateFeatureAction = Message<"peersrpc.UpdateFeatureAction"> & {
  /**
   * Determines the kind of action.
   *
   * @generated from field: peersrpc.UpdateAction action = 1;
   */
  action: UpdateAction;

  /**
   * The feature bit used to apply the update action.
   *
   * @generated from field: lnrpc.FeatureBit feature_bit = 2;
   */
  featureBit: FeatureBit;
};

/**
 * Describes the message peersrpc.UpdateFeatureAction.
 * Use `create(UpdateFeatureActionSchema)` to create a new message.
 */
export const UpdateFeatureActionSchema: GenMessage<UpdateFeatureAction> = /*@__PURE__*/
  messageDesc(file_peersrpc_peers, 1);

/**
 * @generated from message peersrpc.NodeAnnouncementUpdateRequest
 */
export type NodeAnnouncementUpdateRequest = Message<"peersrpc.NodeAnnouncementUpdateRequest"> & {
  /**
   * Set of changes for the features that the node supports.
   *
   * @generated from field: repeated peersrpc.UpdateFeatureAction feature_updates = 1;
   */
  featureUpdates: UpdateFeatureAction[];

  /**
   * Color is the node's color in hex code format.
   *
   * @generated from field: string color = 2;
   */
  color: string;

  /**
   * Alias or nick name of the node.
   *
   * @generated from field: string alias = 3;
   */
  alias: string;

  /**
   * Set of changes for the node's known addresses.
   *
   * @generated from field: repeated peersrpc.UpdateAddressAction address_updates = 4;
   */
  addressUpdates: UpdateAddressAction[];
};

/**
 * Describes the message peersrpc.NodeAnnouncementUpdateRequest.
 * Use `create(NodeAnnouncementUpdateRequestSchema)` to create a new message.
 */
export const NodeAnnouncementUpdateRequestSchema: GenMessage<NodeAnnouncementUpdateRequest> = /*@__PURE__*/
  messageDesc(file_peersrpc_peers, 2);

/**
 * @generated from message peersrpc.NodeAnnouncementUpdateResponse
 */
export type NodeAnnouncementUpdateResponse = Message<"peersrpc.NodeAnnouncementUpdateResponse"> & {
  /**
   * @generated from field: repeated lnrpc.Op ops = 1;
   */
  ops: Op[];
};

/**
 * Describes the message peersrpc.NodeAnnouncementUpdateResponse.
 * Use `create(NodeAnnouncementUpdateResponseSchema)` to create a new message.
 */
export const NodeAnnouncementUpdateResponseSchema: GenMessage<NodeAnnouncementUpdateResponse> = /*@__PURE__*/
  messageDesc(file_peersrpc_peers, 3);

/**
 * UpdateAction is used to determine the kind of action we are referring to.
 *
 * @generated from enum peersrpc.UpdateAction
 */
export enum UpdateAction {
  /**
   * ADD indicates this is an "insertion" kind of action.
   *
   * @generated from enum value: ADD = 0;
   */
  ADD = 0,

  /**
   * REMOVE indicates this is a "deletion" kind of action.
   *
   * @generated from enum value: REMOVE = 1;
   */
  REMOVE = 1,
}

/**
 * Describes the enum peersrpc.UpdateAction.
 */
export const UpdateActionSchema: GenEnum<UpdateAction> = /*@__PURE__*/
  enumDesc(file_peersrpc_peers, 0);

/**
 * @generated from enum peersrpc.FeatureSet
 */
export enum FeatureSet {
  /**
   * 
   * SET_INIT identifies features that should be sent in an Init message to
   * a remote peer.
   *
   * @generated from enum value: SET_INIT = 0;
   */
  SET_INIT = 0,

  /**
   * 
   * SET_LEGACY_GLOBAL identifies features that should be set in the legacy
   * GlobalFeatures field of an Init message, which maintains backwards
   * compatibility with nodes that haven't implemented flat features.
   *
   * @generated from enum value: SET_LEGACY_GLOBAL = 1;
   */
  SET_LEGACY_GLOBAL = 1,

  /**
   * 
   * SET_NODE_ANN identifies features that should be advertised on node
   * announcements.
   *
   * @generated from enum value: SET_NODE_ANN = 2;
   */
  SET_NODE_ANN = 2,

  /**
   * 
   * SET_INVOICE identifies features that should be advertised on invoices
   * generated by the daemon.
   *
   * @generated from enum value: SET_INVOICE = 3;
   */
  SET_INVOICE = 3,

  /**
   * 
   * SET_INVOICE_AMP identifies the features that should be advertised on
   * AMP invoices generated by the daemon.
   *
   * @generated from enum value: SET_INVOICE_AMP = 4;
   */
  SET_INVOICE_AMP = 4,
}

/**
 * Describes the enum peersrpc.FeatureSet.
 */
export const FeatureSetSchema: GenEnum<FeatureSet> = /*@__PURE__*/
  enumDesc(file_peersrpc_peers, 1);

/**
 * Peers is a service that can be used to get information and interact
 * with the other nodes of the network.
 *
 * @generated from service peersrpc.Peers
 */
export const Peers: GenService<{
  /**
   * lncli: peers updatenodeannouncement
   * UpdateNodeAnnouncement allows the caller to update the node parameters
   * and broadcasts a new version of the node announcement to its peers.
   *
   * @generated from rpc peersrpc.Peers.UpdateNodeAnnouncement
   */
  updateNodeAnnouncement: {
    methodKind: "unary";
    input: typeof NodeAnnouncementUpdateRequestSchema;
    output: typeof NodeAnnouncementUpdateResponseSchema;
  },
}> = /*@__PURE__*/
  serviceDesc(file_peersrpc_peers, 0);
