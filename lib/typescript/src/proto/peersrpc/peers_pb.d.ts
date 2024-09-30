import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv1";
import type { FeatureBit, Op } from "../lightning_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file peersrpc/peers.proto.
 */
export declare const file_peersrpc_peers: GenFile;
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
export declare const UpdateAddressActionSchema: GenMessage<UpdateAddressAction>;
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
export declare const UpdateFeatureActionSchema: GenMessage<UpdateFeatureAction>;
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
export declare const NodeAnnouncementUpdateRequestSchema: GenMessage<NodeAnnouncementUpdateRequest>;
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
export declare const NodeAnnouncementUpdateResponseSchema: GenMessage<NodeAnnouncementUpdateResponse>;
/**
 * UpdateAction is used to determine the kind of action we are referring to.
 *
 * @generated from enum peersrpc.UpdateAction
 */
export declare enum UpdateAction {
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
    REMOVE = 1
}
/**
 * Describes the enum peersrpc.UpdateAction.
 */
export declare const UpdateActionSchema: GenEnum<UpdateAction>;
/**
 * @generated from enum peersrpc.FeatureSet
 */
export declare enum FeatureSet {
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
    SET_INVOICE_AMP = 4
}
/**
 * Describes the enum peersrpc.FeatureSet.
 */
export declare const FeatureSetSchema: GenEnum<FeatureSet>;
/**
 * Peers is a service that can be used to get information and interact
 * with the other nodes of the network.
 *
 * @generated from service peersrpc.Peers
 */
export declare const Peers: GenService<{
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
    };
}>;
//# sourceMappingURL=peers_pb.d.ts.map