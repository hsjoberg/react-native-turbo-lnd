"use strict";

// @generated by protoc-gen-es v2.0.0 with parameter "target=ts"
// @generated from file chainrpc/chainkit.proto (package chainrpc, syntax proto3)
/* eslint-disable */

import { fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv1";
/**
 * Describes the file chainrpc/chainkit.proto.
 */
export const file_chainrpc_chainkit = /*@__PURE__*/
fileDesc("ChdjaGFpbnJwYy9jaGFpbmtpdC5wcm90bxIIY2hhaW5ycGMiJQoPR2V0QmxvY2tSZXF1ZXN0EhIKCmJsb2NrX2hhc2gYASABKAwiJQoQR2V0QmxvY2tSZXNwb25zZRIRCglyYXdfYmxvY2sYASABKAwiFQoTR2V0QmVzdEJsb2NrUmVxdWVzdCJAChRHZXRCZXN0QmxvY2tSZXNwb25zZRISCgpibG9ja19oYXNoGAEgASgMEhQKDGJsb2NrX2hlaWdodBgCIAEoBSIrChNHZXRCbG9ja0hhc2hSZXF1ZXN0EhQKDGJsb2NrX2hlaWdodBgBIAEoAyIqChRHZXRCbG9ja0hhc2hSZXNwb25zZRISCgpibG9ja19oYXNoGAEgASgMMusBCghDaGFpbktpdBJBCghHZXRCbG9jaxIZLmNoYWlucnBjLkdldEJsb2NrUmVxdWVzdBoaLmNoYWlucnBjLkdldEJsb2NrUmVzcG9uc2USTQoMR2V0QmVzdEJsb2NrEh0uY2hhaW5ycGMuR2V0QmVzdEJsb2NrUmVxdWVzdBoeLmNoYWlucnBjLkdldEJlc3RCbG9ja1Jlc3BvbnNlEk0KDEdldEJsb2NrSGFzaBIdLmNoYWlucnBjLkdldEJsb2NrSGFzaFJlcXVlc3QaHi5jaGFpbnJwYy5HZXRCbG9ja0hhc2hSZXNwb25zZUIwWi5naXRodWIuY29tL2xpZ2h0bmluZ25ldHdvcmsvbG5kL2xucnBjL2NoYWlucnBjYgZwcm90bzM");

/**
 * @generated from message chainrpc.GetBlockRequest
 */

/**
 * Describes the message chainrpc.GetBlockRequest.
 * Use `create(GetBlockRequestSchema)` to create a new message.
 */
export const GetBlockRequestSchema = /*@__PURE__*/
messageDesc(file_chainrpc_chainkit, 0);

/**
 * TODO(ffranr): The neutrino GetBlock response includes many
 * additional helpful fields. Consider adding them here also.
 *
 * @generated from message chainrpc.GetBlockResponse
 */

/**
 * Describes the message chainrpc.GetBlockResponse.
 * Use `create(GetBlockResponseSchema)` to create a new message.
 */
export const GetBlockResponseSchema = /*@__PURE__*/
messageDesc(file_chainrpc_chainkit, 1);

/**
 * @generated from message chainrpc.GetBestBlockRequest
 */

/**
 * Describes the message chainrpc.GetBestBlockRequest.
 * Use `create(GetBestBlockRequestSchema)` to create a new message.
 */
export const GetBestBlockRequestSchema = /*@__PURE__*/
messageDesc(file_chainrpc_chainkit, 2);

/**
 * @generated from message chainrpc.GetBestBlockResponse
 */

/**
 * Describes the message chainrpc.GetBestBlockResponse.
 * Use `create(GetBestBlockResponseSchema)` to create a new message.
 */
export const GetBestBlockResponseSchema = /*@__PURE__*/
messageDesc(file_chainrpc_chainkit, 3);

/**
 * @generated from message chainrpc.GetBlockHashRequest
 */

/**
 * Describes the message chainrpc.GetBlockHashRequest.
 * Use `create(GetBlockHashRequestSchema)` to create a new message.
 */
export const GetBlockHashRequestSchema = /*@__PURE__*/
messageDesc(file_chainrpc_chainkit, 4);

/**
 * @generated from message chainrpc.GetBlockHashResponse
 */

/**
 * Describes the message chainrpc.GetBlockHashResponse.
 * Use `create(GetBlockHashResponseSchema)` to create a new message.
 */
export const GetBlockHashResponseSchema = /*@__PURE__*/
messageDesc(file_chainrpc_chainkit, 5);

/**
 * ChainKit is a service that can be used to get information from the
 * chain backend.
 *
 * @generated from service chainrpc.ChainKit
 */
export const ChainKit = /*@__PURE__*/
serviceDesc(file_chainrpc_chainkit, 0);
//# sourceMappingURL=chainkit_pb.js.map