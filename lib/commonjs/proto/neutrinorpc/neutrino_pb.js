"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.file_neutrinorpc_neutrino = exports.StatusResponseSchema = exports.StatusRequestSchema = exports.NeutrinoKit = exports.IsBannedResponseSchema = exports.IsBannedRequestSchema = exports.GetCFilterResponseSchema = exports.GetCFilterRequestSchema = exports.GetBlockResponseSchema = exports.GetBlockRequestSchema = exports.GetBlockHeaderResponseSchema = exports.GetBlockHeaderRequestSchema = exports.GetBlockHashResponseSchema = exports.GetBlockHashRequestSchema = exports.DisconnectPeerResponseSchema = exports.DisconnectPeerRequestSchema = exports.AddPeerResponseSchema = exports.AddPeerRequestSchema = void 0;
var _codegenv = require("@bufbuild/protobuf/codegenv1");
// @generated by protoc-gen-es v2.0.0 with parameter "target=ts"
// @generated from file neutrinorpc/neutrino.proto (package neutrinorpc, syntax proto3)
/* eslint-disable */

/**
 * Describes the file neutrinorpc/neutrino.proto.
 */
const file_neutrinorpc_neutrino = exports.file_neutrinorpc_neutrino = /*@__PURE__*/
(0, _codegenv.fileDesc)("ChpuZXV0cmlub3JwYy9uZXV0cmluby5wcm90bxILbmV1dHJpbm9ycGMiDwoNU3RhdHVzUmVxdWVzdCJpCg5TdGF0dXNSZXNwb25zZRIOCgZhY3RpdmUYASABKAgSDgoGc3luY2VkGAIgASgIEhQKDGJsb2NrX2hlaWdodBgDIAEoBRISCgpibG9ja19oYXNoGAQgASgJEg0KBXBlZXJzGAUgAygJIiQKDkFkZFBlZXJSZXF1ZXN0EhIKCnBlZXJfYWRkcnMYASABKAkiEQoPQWRkUGVlclJlc3BvbnNlIisKFURpc2Nvbm5lY3RQZWVyUmVxdWVzdBISCgpwZWVyX2FkZHJzGAEgASgJIhgKFkRpc2Nvbm5lY3RQZWVyUmVzcG9uc2UiJQoPSXNCYW5uZWRSZXF1ZXN0EhIKCnBlZXJfYWRkcnMYASABKAkiIgoQSXNCYW5uZWRSZXNwb25zZRIOCgZiYW5uZWQYASABKAgiJQoVR2V0QmxvY2tIZWFkZXJSZXF1ZXN0EgwKBGhhc2gYASABKAkiogIKFkdldEJsb2NrSGVhZGVyUmVzcG9uc2USDAoEaGFzaBgBIAEoCRIVCg1jb25maXJtYXRpb25zGAIgASgDEhUKDXN0cmlwcGVkX3NpemUYAyABKAMSDAoEc2l6ZRgEIAEoAxIOCgZ3ZWlnaHQYBSABKAMSDgoGaGVpZ2h0GAYgASgFEg8KB3ZlcnNpb24YByABKAUSEwoLdmVyc2lvbl9oZXgYCCABKAkSEgoKbWVya2xlcm9vdBgJIAEoCRIMCgR0aW1lGAogASgDEg0KBW5vbmNlGAsgASgNEgwKBGJpdHMYDCABKAkSCwoDbnR4GA0gASgFEhsKE3ByZXZpb3VzX2Jsb2NrX2hhc2gYDiABKAkSDwoHcmF3X2hleBgPIAEoDCIfCg9HZXRCbG9ja1JlcXVlc3QSDAoEaGFzaBgBIAEoCSKoAgoQR2V0QmxvY2tSZXNwb25zZRIMCgRoYXNoGAEgASgJEhUKDWNvbmZpcm1hdGlvbnMYAiABKAMSFQoNc3RyaXBwZWRfc2l6ZRgDIAEoAxIMCgRzaXplGAQgASgDEg4KBndlaWdodBgFIAEoAxIOCgZoZWlnaHQYBiABKAUSDwoHdmVyc2lvbhgHIAEoBRITCgt2ZXJzaW9uX2hleBgIIAEoCRISCgptZXJrbGVyb290GAkgASgJEgoKAnR4GAogAygJEgwKBHRpbWUYCyABKAMSDQoFbm9uY2UYDCABKA0SDAoEYml0cxgNIAEoCRILCgNudHgYDiABKAUSGwoTcHJldmlvdXNfYmxvY2tfaGFzaBgPIAEoCRIPCgdyYXdfaGV4GBAgASgMIiEKEUdldENGaWx0ZXJSZXF1ZXN0EgwKBGhhc2gYASABKAkiJAoSR2V0Q0ZpbHRlclJlc3BvbnNlEg4KBmZpbHRlchgBIAEoDCIlChNHZXRCbG9ja0hhc2hSZXF1ZXN0Eg4KBmhlaWdodBgBIAEoBSIkChRHZXRCbG9ja0hhc2hSZXNwb25zZRIMCgRoYXNoGAEgASgJMocFCgtOZXV0cmlub0tpdBJBCgZTdGF0dXMSGi5uZXV0cmlub3JwYy5TdGF0dXNSZXF1ZXN0GhsubmV1dHJpbm9ycGMuU3RhdHVzUmVzcG9uc2USRAoHQWRkUGVlchIbLm5ldXRyaW5vcnBjLkFkZFBlZXJSZXF1ZXN0GhwubmV1dHJpbm9ycGMuQWRkUGVlclJlc3BvbnNlElkKDkRpc2Nvbm5lY3RQZWVyEiIubmV1dHJpbm9ycGMuRGlzY29ubmVjdFBlZXJSZXF1ZXN0GiMubmV1dHJpbm9ycGMuRGlzY29ubmVjdFBlZXJSZXNwb25zZRJHCghJc0Jhbm5lZBIcLm5ldXRyaW5vcnBjLklzQmFubmVkUmVxdWVzdBodLm5ldXRyaW5vcnBjLklzQmFubmVkUmVzcG9uc2USWQoOR2V0QmxvY2tIZWFkZXISIi5uZXV0cmlub3JwYy5HZXRCbG9ja0hlYWRlclJlcXVlc3QaIy5uZXV0cmlub3JwYy5HZXRCbG9ja0hlYWRlclJlc3BvbnNlEkcKCEdldEJsb2NrEhwubmV1dHJpbm9ycGMuR2V0QmxvY2tSZXF1ZXN0Gh0ubmV1dHJpbm9ycGMuR2V0QmxvY2tSZXNwb25zZRJNCgpHZXRDRmlsdGVyEh4ubmV1dHJpbm9ycGMuR2V0Q0ZpbHRlclJlcXVlc3QaHy5uZXV0cmlub3JwYy5HZXRDRmlsdGVyUmVzcG9uc2USWAoMR2V0QmxvY2tIYXNoEiAubmV1dHJpbm9ycGMuR2V0QmxvY2tIYXNoUmVxdWVzdBohLm5ldXRyaW5vcnBjLkdldEJsb2NrSGFzaFJlc3BvbnNlIgOIAgFCM1oxZ2l0aHViLmNvbS9saWdodG5pbmduZXR3b3JrL2xuZC9sbnJwYy9uZXV0cmlub3JwY2IGcHJvdG8z");

/**
 * @generated from message neutrinorpc.StatusRequest
 */

/**
 * Describes the message neutrinorpc.StatusRequest.
 * Use `create(StatusRequestSchema)` to create a new message.
 */
const StatusRequestSchema = exports.StatusRequestSchema = /*@__PURE__*/
(0, _codegenv.messageDesc)(file_neutrinorpc_neutrino, 0);

/**
 * @generated from message neutrinorpc.StatusResponse
 */

/**
 * Describes the message neutrinorpc.StatusResponse.
 * Use `create(StatusResponseSchema)` to create a new message.
 */
const StatusResponseSchema = exports.StatusResponseSchema = /*@__PURE__*/
(0, _codegenv.messageDesc)(file_neutrinorpc_neutrino, 1);

/**
 * @generated from message neutrinorpc.AddPeerRequest
 */

/**
 * Describes the message neutrinorpc.AddPeerRequest.
 * Use `create(AddPeerRequestSchema)` to create a new message.
 */
const AddPeerRequestSchema = exports.AddPeerRequestSchema = /*@__PURE__*/
(0, _codegenv.messageDesc)(file_neutrinorpc_neutrino, 2);

/**
 * @generated from message neutrinorpc.AddPeerResponse
 */

/**
 * Describes the message neutrinorpc.AddPeerResponse.
 * Use `create(AddPeerResponseSchema)` to create a new message.
 */
const AddPeerResponseSchema = exports.AddPeerResponseSchema = /*@__PURE__*/
(0, _codegenv.messageDesc)(file_neutrinorpc_neutrino, 3);

/**
 * @generated from message neutrinorpc.DisconnectPeerRequest
 */

/**
 * Describes the message neutrinorpc.DisconnectPeerRequest.
 * Use `create(DisconnectPeerRequestSchema)` to create a new message.
 */
const DisconnectPeerRequestSchema = exports.DisconnectPeerRequestSchema = /*@__PURE__*/
(0, _codegenv.messageDesc)(file_neutrinorpc_neutrino, 4);

/**
 * @generated from message neutrinorpc.DisconnectPeerResponse
 */

/**
 * Describes the message neutrinorpc.DisconnectPeerResponse.
 * Use `create(DisconnectPeerResponseSchema)` to create a new message.
 */
const DisconnectPeerResponseSchema = exports.DisconnectPeerResponseSchema = /*@__PURE__*/
(0, _codegenv.messageDesc)(file_neutrinorpc_neutrino, 5);

/**
 * @generated from message neutrinorpc.IsBannedRequest
 */

/**
 * Describes the message neutrinorpc.IsBannedRequest.
 * Use `create(IsBannedRequestSchema)` to create a new message.
 */
const IsBannedRequestSchema = exports.IsBannedRequestSchema = /*@__PURE__*/
(0, _codegenv.messageDesc)(file_neutrinorpc_neutrino, 6);

/**
 * @generated from message neutrinorpc.IsBannedResponse
 */

/**
 * Describes the message neutrinorpc.IsBannedResponse.
 * Use `create(IsBannedResponseSchema)` to create a new message.
 */
const IsBannedResponseSchema = exports.IsBannedResponseSchema = /*@__PURE__*/
(0, _codegenv.messageDesc)(file_neutrinorpc_neutrino, 7);

/**
 * @generated from message neutrinorpc.GetBlockHeaderRequest
 */

/**
 * Describes the message neutrinorpc.GetBlockHeaderRequest.
 * Use `create(GetBlockHeaderRequestSchema)` to create a new message.
 */
const GetBlockHeaderRequestSchema = exports.GetBlockHeaderRequestSchema = /*@__PURE__*/
(0, _codegenv.messageDesc)(file_neutrinorpc_neutrino, 8);

/**
 * @generated from message neutrinorpc.GetBlockHeaderResponse
 */

/**
 * Describes the message neutrinorpc.GetBlockHeaderResponse.
 * Use `create(GetBlockHeaderResponseSchema)` to create a new message.
 */
const GetBlockHeaderResponseSchema = exports.GetBlockHeaderResponseSchema = /*@__PURE__*/
(0, _codegenv.messageDesc)(file_neutrinorpc_neutrino, 9);

/**
 * @generated from message neutrinorpc.GetBlockRequest
 */

/**
 * Describes the message neutrinorpc.GetBlockRequest.
 * Use `create(GetBlockRequestSchema)` to create a new message.
 */
const GetBlockRequestSchema = exports.GetBlockRequestSchema = /*@__PURE__*/
(0, _codegenv.messageDesc)(file_neutrinorpc_neutrino, 10);

/**
 * @generated from message neutrinorpc.GetBlockResponse
 */

/**
 * Describes the message neutrinorpc.GetBlockResponse.
 * Use `create(GetBlockResponseSchema)` to create a new message.
 */
const GetBlockResponseSchema = exports.GetBlockResponseSchema = /*@__PURE__*/
(0, _codegenv.messageDesc)(file_neutrinorpc_neutrino, 11);

/**
 * @generated from message neutrinorpc.GetCFilterRequest
 */

/**
 * Describes the message neutrinorpc.GetCFilterRequest.
 * Use `create(GetCFilterRequestSchema)` to create a new message.
 */
const GetCFilterRequestSchema = exports.GetCFilterRequestSchema = /*@__PURE__*/
(0, _codegenv.messageDesc)(file_neutrinorpc_neutrino, 12);

/**
 * @generated from message neutrinorpc.GetCFilterResponse
 */

/**
 * Describes the message neutrinorpc.GetCFilterResponse.
 * Use `create(GetCFilterResponseSchema)` to create a new message.
 */
const GetCFilterResponseSchema = exports.GetCFilterResponseSchema = /*@__PURE__*/
(0, _codegenv.messageDesc)(file_neutrinorpc_neutrino, 13);

/**
 * @generated from message neutrinorpc.GetBlockHashRequest
 */

/**
 * Describes the message neutrinorpc.GetBlockHashRequest.
 * Use `create(GetBlockHashRequestSchema)` to create a new message.
 */
const GetBlockHashRequestSchema = exports.GetBlockHashRequestSchema = /*@__PURE__*/
(0, _codegenv.messageDesc)(file_neutrinorpc_neutrino, 14);

/**
 * @generated from message neutrinorpc.GetBlockHashResponse
 */

/**
 * Describes the message neutrinorpc.GetBlockHashResponse.
 * Use `create(GetBlockHashResponseSchema)` to create a new message.
 */
const GetBlockHashResponseSchema = exports.GetBlockHashResponseSchema = /*@__PURE__*/
(0, _codegenv.messageDesc)(file_neutrinorpc_neutrino, 15);

/**
 * NeutrinoKit is a service that can be used to get information about the
 * current state of the neutrino instance, fetch blocks and add/remove peers.
 *
 * @generated from service neutrinorpc.NeutrinoKit
 */
const NeutrinoKit = exports.NeutrinoKit = /*@__PURE__*/
(0, _codegenv.serviceDesc)(file_neutrinorpc_neutrino, 0);
//# sourceMappingURL=neutrino_pb.js.map