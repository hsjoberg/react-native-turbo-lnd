"use strict";

// @generated by protoc-gen-es v2.0.0 with parameter "target=ts"
// @generated from file routerrpc/router.proto (package routerrpc, syntax proto3)
/* eslint-disable */

import { enumDesc, fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv1";
import { file_lightning } from "../lightning_pb.js";
/**
 * Describes the file routerrpc/router.proto.
 */
export const file_routerrpc_router = /*@__PURE__*/
fileDesc("ChZyb3V0ZXJycGMvcm91dGVyLnByb3RvEglyb3V0ZXJycGMitwUKElNlbmRQYXltZW50UmVxdWVzdBIMCgRkZXN0GAEgASgMEgsKA2FtdBgCIAEoAxIQCghhbXRfbXNhdBgMIAEoAxIUCgxwYXltZW50X2hhc2gYAyABKAwSGAoQZmluYWxfY2x0dl9kZWx0YRgEIAEoBRIUCgxwYXltZW50X2FkZHIYFCABKAwSFwoPcGF5bWVudF9yZXF1ZXN0GAUgASgJEhcKD3RpbWVvdXRfc2Vjb25kcxgGIAEoBRIVCg1mZWVfbGltaXRfc2F0GAcgASgDEhYKDmZlZV9saW1pdF9tc2F0GA0gASgDEh4KEG91dGdvaW5nX2NoYW5faWQYCCABKARCBBgBMAESGQoRb3V0Z29pbmdfY2hhbl9pZHMYEyADKAQSFwoPbGFzdF9ob3BfcHVia2V5GA4gASgMEhIKCmNsdHZfbGltaXQYCSABKAUSJQoLcm91dGVfaGludHMYCiADKAsyEC5sbnJwYy5Sb3V0ZUhpbnQSUQoTZGVzdF9jdXN0b21fcmVjb3JkcxgLIAMoCzI0LnJvdXRlcnJwYy5TZW5kUGF5bWVudFJlcXVlc3QuRGVzdEN1c3RvbVJlY29yZHNFbnRyeRIaChJhbGxvd19zZWxmX3BheW1lbnQYDyABKAgSKAoNZGVzdF9mZWF0dXJlcxgQIAMoDjIRLmxucnBjLkZlYXR1cmVCaXQSEQoJbWF4X3BhcnRzGBEgASgNEhsKE25vX2luZmxpZ2h0X3VwZGF0ZXMYEiABKAgSGwoTbWF4X3NoYXJkX3NpemVfbXNhdBgVIAEoBBILCgNhbXAYFiABKAgSEQoJdGltZV9wcmVmGBcgASgBGjgKFkRlc3RDdXN0b21SZWNvcmRzRW50cnkSCwoDa2V5GAEgASgEEg0KBXZhbHVlGAIgASgMOgI4ASJIChNUcmFja1BheW1lbnRSZXF1ZXN0EhQKDHBheW1lbnRfaGFzaBgBIAEoDBIbChNub19pbmZsaWdodF91cGRhdGVzGAIgASgIIjMKFFRyYWNrUGF5bWVudHNSZXF1ZXN0EhsKE25vX2luZmxpZ2h0X3VwZGF0ZXMYASABKAgiMAoPUm91dGVGZWVSZXF1ZXN0EgwKBGRlc3QYASABKAwSDwoHYW10X3NhdBgCIAEoAyJFChBSb3V0ZUZlZVJlc3BvbnNlEhgKEHJvdXRpbmdfZmVlX21zYXQYASABKAMSFwoPdGltZV9sb2NrX2RlbGF5GAIgASgDIl4KElNlbmRUb1JvdXRlUmVxdWVzdBIUCgxwYXltZW50X2hhc2gYASABKAwSGwoFcm91dGUYAiABKAsyDC5sbnJwYy5Sb3V0ZRIVCg1za2lwX3RlbXBfZXJyGAMgASgIIkgKE1NlbmRUb1JvdXRlUmVzcG9uc2USEAoIcHJlaW1hZ2UYASABKAwSHwoHZmFpbHVyZRgCIAEoCzIOLmxucnBjLkZhaWx1cmUiHAoaUmVzZXRNaXNzaW9uQ29udHJvbFJlcXVlc3QiHQobUmVzZXRNaXNzaW9uQ29udHJvbFJlc3BvbnNlIhwKGlF1ZXJ5TWlzc2lvbkNvbnRyb2xSZXF1ZXN0IkoKG1F1ZXJ5TWlzc2lvbkNvbnRyb2xSZXNwb25zZRIlCgVwYWlycxgCIAMoCzIWLnJvdXRlcnJwYy5QYWlySGlzdG9yeUoECAEQAiJUChxYSW1wb3J0TWlzc2lvbkNvbnRyb2xSZXF1ZXN0EiUKBXBhaXJzGAEgAygLMhYucm91dGVycnBjLlBhaXJIaXN0b3J5Eg0KBWZvcmNlGAIgASgIIh8KHVhJbXBvcnRNaXNzaW9uQ29udHJvbFJlc3BvbnNlIm8KC1BhaXJIaXN0b3J5EhEKCW5vZGVfZnJvbRgBIAEoDBIPCgdub2RlX3RvGAIgASgMEiQKB2hpc3RvcnkYByABKAsyEy5yb3V0ZXJycGMuUGFpckRhdGFKBAgDEARKBAgEEAVKBAgFEAZKBAgGEAcimQEKCFBhaXJEYXRhEhEKCWZhaWxfdGltZRgBIAEoAxIUCgxmYWlsX2FtdF9zYXQYAiABKAMSFQoNZmFpbF9hbXRfbXNhdBgEIAEoAxIUCgxzdWNjZXNzX3RpbWUYBSABKAMSFwoPc3VjY2Vzc19hbXRfc2F0GAYgASgDEhgKEHN1Y2Nlc3NfYW10X21zYXQYByABKANKBAgDEAQiIAoeR2V0TWlzc2lvbkNvbnRyb2xDb25maWdSZXF1ZXN0IlIKH0dldE1pc3Npb25Db250cm9sQ29uZmlnUmVzcG9uc2USLwoGY29uZmlnGAEgASgLMh8ucm91dGVycnBjLk1pc3Npb25Db250cm9sQ29uZmlnIlEKHlNldE1pc3Npb25Db250cm9sQ29uZmlnUmVxdWVzdBIvCgZjb25maWcYASABKAsyHy5yb3V0ZXJycGMuTWlzc2lvbkNvbnRyb2xDb25maWciIQofU2V0TWlzc2lvbkNvbnRyb2xDb25maWdSZXNwb25zZSKTAwoUTWlzc2lvbkNvbnRyb2xDb25maWcSHQoRaGFsZl9saWZlX3NlY29uZHMYASABKARCAhgBEhsKD2hvcF9wcm9iYWJpbGl0eRgCIAEoAkICGAESEgoGd2VpZ2h0GAMgASgCQgIYARIfChdtYXhpbXVtX3BheW1lbnRfcmVzdWx0cxgEIAEoDRImCh5taW5pbXVtX2ZhaWx1cmVfcmVsYXhfaW50ZXJ2YWwYBSABKAQSPwoFbW9kZWwYBiABKA4yMC5yb3V0ZXJycGMuTWlzc2lvbkNvbnRyb2xDb25maWcuUHJvYmFiaWxpdHlNb2RlbBIvCgdhcHJpb3JpGAcgASgLMhwucm91dGVycnBjLkFwcmlvcmlQYXJhbWV0ZXJzSAASLwoHYmltb2RhbBgIIAEoCzIcLnJvdXRlcnJwYy5CaW1vZGFsUGFyYW1ldGVyc0gAIiwKEFByb2JhYmlsaXR5TW9kZWwSCwoHQVBSSU9SSRAAEgsKB0JJTU9EQUwQAUIRCg9Fc3RpbWF0b3JDb25maWciUAoRQmltb2RhbFBhcmFtZXRlcnMSEwoLbm9kZV93ZWlnaHQYASABKAESEgoKc2NhbGVfbXNhdBgCIAEoBBISCgpkZWNheV90aW1lGAMgASgEInIKEUFwcmlvcmlQYXJhbWV0ZXJzEhkKEWhhbGZfbGlmZV9zZWNvbmRzGAEgASgEEhcKD2hvcF9wcm9iYWJpbGl0eRgCIAEoARIOCgZ3ZWlnaHQYAyABKAESGQoRY2FwYWNpdHlfZnJhY3Rpb24YBCABKAEiTwoXUXVlcnlQcm9iYWJpbGl0eVJlcXVlc3QSEQoJZnJvbV9ub2RlGAEgASgMEg8KB3RvX25vZGUYAiABKAwSEAoIYW10X21zYXQYAyABKAMiVQoYUXVlcnlQcm9iYWJpbGl0eVJlc3BvbnNlEhMKC3Byb2JhYmlsaXR5GAEgASgBEiQKB2hpc3RvcnkYAiABKAsyEy5yb3V0ZXJycGMuUGFpckRhdGEiiAEKEUJ1aWxkUm91dGVSZXF1ZXN0EhAKCGFtdF9tc2F0GAEgASgDEhgKEGZpbmFsX2NsdHZfZGVsdGEYAiABKAUSHAoQb3V0Z29pbmdfY2hhbl9pZBgDIAEoBEICMAESEwoLaG9wX3B1YmtleXMYBCADKAwSFAoMcGF5bWVudF9hZGRyGAUgASgMIjEKEkJ1aWxkUm91dGVSZXNwb25zZRIbCgVyb3V0ZRgBIAEoCzIMLmxucnBjLlJvdXRlIhwKGlN1YnNjcmliZUh0bGNFdmVudHNSZXF1ZXN0IssECglIdGxjRXZlbnQSGwoTaW5jb21pbmdfY2hhbm5lbF9pZBgBIAEoBBIbChNvdXRnb2luZ19jaGFubmVsX2lkGAIgASgEEhgKEGluY29taW5nX2h0bGNfaWQYAyABKAQSGAoQb3V0Z29pbmdfaHRsY19pZBgEIAEoBBIUCgx0aW1lc3RhbXBfbnMYBSABKAQSMgoKZXZlbnRfdHlwZRgGIAEoDjIeLnJvdXRlcnJwYy5IdGxjRXZlbnQuRXZlbnRUeXBlEjAKDWZvcndhcmRfZXZlbnQYByABKAsyFy5yb3V0ZXJycGMuRm9yd2FyZEV2ZW50SAASOQoSZm9yd2FyZF9mYWlsX2V2ZW50GAggASgLMhsucm91dGVycnBjLkZvcndhcmRGYWlsRXZlbnRIABIuCgxzZXR0bGVfZXZlbnQYCSABKAsyFi5yb3V0ZXJycGMuU2V0dGxlRXZlbnRIABIzCg9saW5rX2ZhaWxfZXZlbnQYCiABKAsyGC5yb3V0ZXJycGMuTGlua0ZhaWxFdmVudEgAEjYKEHN1YnNjcmliZWRfZXZlbnQYCyABKAsyGi5yb3V0ZXJycGMuU3Vic2NyaWJlZEV2ZW50SAASNQoQZmluYWxfaHRsY19ldmVudBgMIAEoCzIZLnJvdXRlcnJwYy5GaW5hbEh0bGNFdmVudEgAIjwKCUV2ZW50VHlwZRILCgdVTktOT1dOEAASCAoEU0VORBABEgsKB1JFQ0VJVkUQAhILCgdGT1JXQVJEEANCBwoFZXZlbnQidgoISHRsY0luZm8SGQoRaW5jb21pbmdfdGltZWxvY2sYASABKA0SGQoRb3V0Z29pbmdfdGltZWxvY2sYAiABKA0SGQoRaW5jb21pbmdfYW10X21zYXQYAyABKAQSGQoRb3V0Z29pbmdfYW10X21zYXQYBCABKAQiMQoMRm9yd2FyZEV2ZW50EiEKBGluZm8YASABKAsyEy5yb3V0ZXJycGMuSHRsY0luZm8iEgoQRm9yd2FyZEZhaWxFdmVudCIfCgtTZXR0bGVFdmVudBIQCghwcmVpbWFnZRgBIAEoDCIzCg5GaW5hbEh0bGNFdmVudBIPCgdzZXR0bGVkGAEgASgIEhAKCG9mZmNoYWluGAIgASgIIhEKD1N1YnNjcmliZWRFdmVudCKuAQoNTGlua0ZhaWxFdmVudBIhCgRpbmZvGAEgASgLMhMucm91dGVycnBjLkh0bGNJbmZvEjAKDHdpcmVfZmFpbHVyZRgCIAEoDjIaLmxucnBjLkZhaWx1cmUuRmFpbHVyZUNvZGUSMAoOZmFpbHVyZV9kZXRhaWwYAyABKA4yGC5yb3V0ZXJycGMuRmFpbHVyZURldGFpbBIWCg5mYWlsdXJlX3N0cmluZxgEIAEoCSJyCg1QYXltZW50U3RhdHVzEiYKBXN0YXRlGAEgASgOMhcucm91dGVycnBjLlBheW1lbnRTdGF0ZRIQCghwcmVpbWFnZRgCIAEoDBIhCgVodGxjcxgEIAMoCzISLmxucnBjLkhUTENBdHRlbXB0SgQIAxAEIi4KCkNpcmN1aXRLZXkSDwoHY2hhbl9pZBgBIAEoBBIPCgdodGxjX2lkGAIgASgEIrEDChtGb3J3YXJkSHRsY0ludGVyY2VwdFJlcXVlc3QSMwoUaW5jb21pbmdfY2lyY3VpdF9rZXkYASABKAsyFS5yb3V0ZXJycGMuQ2lyY3VpdEtleRIcChRpbmNvbWluZ19hbW91bnRfbXNhdBgFIAEoBBIXCg9pbmNvbWluZ19leHBpcnkYBiABKA0SFAoMcGF5bWVudF9oYXNoGAIgASgMEiIKGm91dGdvaW5nX3JlcXVlc3RlZF9jaGFuX2lkGAcgASgEEhwKFG91dGdvaW5nX2Ftb3VudF9tc2F0GAMgASgEEhcKD291dGdvaW5nX2V4cGlyeRgEIAEoDRJRCg5jdXN0b21fcmVjb3JkcxgIIAMoCzI5LnJvdXRlcnJwYy5Gb3J3YXJkSHRsY0ludGVyY2VwdFJlcXVlc3QuQ3VzdG9tUmVjb3Jkc0VudHJ5EhIKCm9uaW9uX2Jsb2IYCSABKAwSGAoQYXV0b19mYWlsX2hlaWdodBgKIAEoBRo0ChJDdXN0b21SZWNvcmRzRW50cnkSCwoDa2V5GAEgASgEEg0KBXZhbHVlGAIgASgMOgI4ASLlAQocRm9yd2FyZEh0bGNJbnRlcmNlcHRSZXNwb25zZRIzChRpbmNvbWluZ19jaXJjdWl0X2tleRgBIAEoCzIVLnJvdXRlcnJwYy5DaXJjdWl0S2V5EjMKBmFjdGlvbhgCIAEoDjIjLnJvdXRlcnJwYy5SZXNvbHZlSG9sZEZvcndhcmRBY3Rpb24SEAoIcHJlaW1hZ2UYAyABKAwSFwoPZmFpbHVyZV9tZXNzYWdlGAQgASgMEjAKDGZhaWx1cmVfY29kZRgFIAEoDjIaLmxucnBjLkZhaWx1cmUuRmFpbHVyZUNvZGUibwoXVXBkYXRlQ2hhblN0YXR1c1JlcXVlc3QSJwoKY2hhbl9wb2ludBgBIAEoCzITLmxucnBjLkNoYW5uZWxQb2ludBIrCgZhY3Rpb24YAiABKA4yGy5yb3V0ZXJycGMuQ2hhblN0YXR1c0FjdGlvbiIaChhVcGRhdGVDaGFuU3RhdHVzUmVzcG9uc2UqgQQKDUZhaWx1cmVEZXRhaWwSCwoHVU5LTk9XThAAEg0KCU5PX0RFVEFJTBABEhAKDE9OSU9OX0RFQ09ERRACEhUKEUxJTktfTk9UX0VMSUdJQkxFEAMSFAoQT05fQ0hBSU5fVElNRU9VVBAEEhQKEEhUTENfRVhDRUVEU19NQVgQBRIYChRJTlNVRkZJQ0lFTlRfQkFMQU5DRRAGEhYKEklOQ09NUExFVEVfRk9SV0FSRBAHEhMKD0hUTENfQUREX0ZBSUxFRBAIEhUKEUZPUldBUkRTX0RJU0FCTEVEEAkSFAoQSU5WT0lDRV9DQU5DRUxFRBAKEhUKEUlOVk9JQ0VfVU5ERVJQQUlEEAsSGwoXSU5WT0lDRV9FWFBJUllfVE9PX1NPT04QDBIUChBJTlZPSUNFX05PVF9PUEVOEA0SFwoTTVBQX0lOVk9JQ0VfVElNRU9VVBAOEhQKEEFERFJFU1NfTUlTTUFUQ0gQDxIWChJTRVRfVE9UQUxfTUlTTUFUQ0gQEBIVChFTRVRfVE9UQUxfVE9PX0xPVxAREhAKDFNFVF9PVkVSUEFJRBASEhMKD1VOS05PV05fSU5WT0lDRRATEhMKD0lOVkFMSURfS0VZU0VORBAUEhMKD01QUF9JTl9QUk9HUkVTUxAVEhIKDkNJUkNVTEFSX1JPVVRFEBYqrgEKDFBheW1lbnRTdGF0ZRINCglJTl9GTElHSFQQABINCglTVUNDRUVERUQQARISCg5GQUlMRURfVElNRU9VVBACEhMKD0ZBSUxFRF9OT19ST1VURRADEhAKDEZBSUxFRF9FUlJPUhAEEiQKIEZBSUxFRF9JTkNPUlJFQ1RfUEFZTUVOVF9ERVRBSUxTEAUSHwobRkFJTEVEX0lOU1VGRklDSUVOVF9CQUxBTkNFEAYqPAoYUmVzb2x2ZUhvbGRGb3J3YXJkQWN0aW9uEgoKBlNFVFRMRRAAEggKBEZBSUwQARIKCgZSRVNVTUUQAio1ChBDaGFuU3RhdHVzQWN0aW9uEgoKBkVOQUJMRRAAEgsKB0RJU0FCTEUQARIICgRBVVRPEAIytQwKBlJvdXRlchJACg1TZW5kUGF5bWVudFYyEh0ucm91dGVycnBjLlNlbmRQYXltZW50UmVxdWVzdBoOLmxucnBjLlBheW1lbnQwARJCCg5UcmFja1BheW1lbnRWMhIeLnJvdXRlcnJwYy5UcmFja1BheW1lbnRSZXF1ZXN0Gg4ubG5ycGMuUGF5bWVudDABEkIKDVRyYWNrUGF5bWVudHMSHy5yb3V0ZXJycGMuVHJhY2tQYXltZW50c1JlcXVlc3QaDi5sbnJwYy5QYXltZW50MAESSwoQRXN0aW1hdGVSb3V0ZUZlZRIaLnJvdXRlcnJwYy5Sb3V0ZUZlZVJlcXVlc3QaGy5yb3V0ZXJycGMuUm91dGVGZWVSZXNwb25zZRJRCgtTZW5kVG9Sb3V0ZRIdLnJvdXRlcnJwYy5TZW5kVG9Sb3V0ZVJlcXVlc3QaHi5yb3V0ZXJycGMuU2VuZFRvUm91dGVSZXNwb25zZSIDiAIBEkIKDVNlbmRUb1JvdXRlVjISHS5yb3V0ZXJycGMuU2VuZFRvUm91dGVSZXF1ZXN0GhIubG5ycGMuSFRMQ0F0dGVtcHQSZAoTUmVzZXRNaXNzaW9uQ29udHJvbBIlLnJvdXRlcnJwYy5SZXNldE1pc3Npb25Db250cm9sUmVxdWVzdBomLnJvdXRlcnJwYy5SZXNldE1pc3Npb25Db250cm9sUmVzcG9uc2USZAoTUXVlcnlNaXNzaW9uQ29udHJvbBIlLnJvdXRlcnJwYy5RdWVyeU1pc3Npb25Db250cm9sUmVxdWVzdBomLnJvdXRlcnJwYy5RdWVyeU1pc3Npb25Db250cm9sUmVzcG9uc2USagoVWEltcG9ydE1pc3Npb25Db250cm9sEicucm91dGVycnBjLlhJbXBvcnRNaXNzaW9uQ29udHJvbFJlcXVlc3QaKC5yb3V0ZXJycGMuWEltcG9ydE1pc3Npb25Db250cm9sUmVzcG9uc2UScAoXR2V0TWlzc2lvbkNvbnRyb2xDb25maWcSKS5yb3V0ZXJycGMuR2V0TWlzc2lvbkNvbnRyb2xDb25maWdSZXF1ZXN0Gioucm91dGVycnBjLkdldE1pc3Npb25Db250cm9sQ29uZmlnUmVzcG9uc2UScAoXU2V0TWlzc2lvbkNvbnRyb2xDb25maWcSKS5yb3V0ZXJycGMuU2V0TWlzc2lvbkNvbnRyb2xDb25maWdSZXF1ZXN0Gioucm91dGVycnBjLlNldE1pc3Npb25Db250cm9sQ29uZmlnUmVzcG9uc2USWwoQUXVlcnlQcm9iYWJpbGl0eRIiLnJvdXRlcnJwYy5RdWVyeVByb2JhYmlsaXR5UmVxdWVzdBojLnJvdXRlcnJwYy5RdWVyeVByb2JhYmlsaXR5UmVzcG9uc2USSQoKQnVpbGRSb3V0ZRIcLnJvdXRlcnJwYy5CdWlsZFJvdXRlUmVxdWVzdBodLnJvdXRlcnJwYy5CdWlsZFJvdXRlUmVzcG9uc2USVAoTU3Vic2NyaWJlSHRsY0V2ZW50cxIlLnJvdXRlcnJwYy5TdWJzY3JpYmVIdGxjRXZlbnRzUmVxdWVzdBoULnJvdXRlcnJwYy5IdGxjRXZlbnQwARJNCgtTZW5kUGF5bWVudBIdLnJvdXRlcnJwYy5TZW5kUGF5bWVudFJlcXVlc3QaGC5yb3V0ZXJycGMuUGF5bWVudFN0YXR1cyIDiAIBMAESTwoMVHJhY2tQYXltZW50Eh4ucm91dGVycnBjLlRyYWNrUGF5bWVudFJlcXVlc3QaGC5yb3V0ZXJycGMuUGF5bWVudFN0YXR1cyIDiAIBMAESZgoPSHRsY0ludGVyY2VwdG9yEicucm91dGVycnBjLkZvcndhcmRIdGxjSW50ZXJjZXB0UmVzcG9uc2UaJi5yb3V0ZXJycGMuRm9yd2FyZEh0bGNJbnRlcmNlcHRSZXF1ZXN0KAEwARJbChBVcGRhdGVDaGFuU3RhdHVzEiIucm91dGVycnBjLlVwZGF0ZUNoYW5TdGF0dXNSZXF1ZXN0GiMucm91dGVycnBjLlVwZGF0ZUNoYW5TdGF0dXNSZXNwb25zZUIxWi9naXRodWIuY29tL2xpZ2h0bmluZ25ldHdvcmsvbG5kL2xucnBjL3JvdXRlcnJwY2IGcHJvdG8z", [file_lightning]);

/**
 * @generated from message routerrpc.SendPaymentRequest
 */

/**
 * Describes the message routerrpc.SendPaymentRequest.
 * Use `create(SendPaymentRequestSchema)` to create a new message.
 */
export const SendPaymentRequestSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 0);

/**
 * @generated from message routerrpc.TrackPaymentRequest
 */

/**
 * Describes the message routerrpc.TrackPaymentRequest.
 * Use `create(TrackPaymentRequestSchema)` to create a new message.
 */
export const TrackPaymentRequestSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 1);

/**
 * @generated from message routerrpc.TrackPaymentsRequest
 */

/**
 * Describes the message routerrpc.TrackPaymentsRequest.
 * Use `create(TrackPaymentsRequestSchema)` to create a new message.
 */
export const TrackPaymentsRequestSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 2);

/**
 * @generated from message routerrpc.RouteFeeRequest
 */

/**
 * Describes the message routerrpc.RouteFeeRequest.
 * Use `create(RouteFeeRequestSchema)` to create a new message.
 */
export const RouteFeeRequestSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 3);

/**
 * @generated from message routerrpc.RouteFeeResponse
 */

/**
 * Describes the message routerrpc.RouteFeeResponse.
 * Use `create(RouteFeeResponseSchema)` to create a new message.
 */
export const RouteFeeResponseSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 4);

/**
 * @generated from message routerrpc.SendToRouteRequest
 */

/**
 * Describes the message routerrpc.SendToRouteRequest.
 * Use `create(SendToRouteRequestSchema)` to create a new message.
 */
export const SendToRouteRequestSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 5);

/**
 * @generated from message routerrpc.SendToRouteResponse
 */

/**
 * Describes the message routerrpc.SendToRouteResponse.
 * Use `create(SendToRouteResponseSchema)` to create a new message.
 */
export const SendToRouteResponseSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 6);

/**
 * @generated from message routerrpc.ResetMissionControlRequest
 */

/**
 * Describes the message routerrpc.ResetMissionControlRequest.
 * Use `create(ResetMissionControlRequestSchema)` to create a new message.
 */
export const ResetMissionControlRequestSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 7);

/**
 * @generated from message routerrpc.ResetMissionControlResponse
 */

/**
 * Describes the message routerrpc.ResetMissionControlResponse.
 * Use `create(ResetMissionControlResponseSchema)` to create a new message.
 */
export const ResetMissionControlResponseSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 8);

/**
 * @generated from message routerrpc.QueryMissionControlRequest
 */

/**
 * Describes the message routerrpc.QueryMissionControlRequest.
 * Use `create(QueryMissionControlRequestSchema)` to create a new message.
 */
export const QueryMissionControlRequestSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 9);

/**
 * QueryMissionControlResponse contains mission control state.
 *
 * @generated from message routerrpc.QueryMissionControlResponse
 */

/**
 * Describes the message routerrpc.QueryMissionControlResponse.
 * Use `create(QueryMissionControlResponseSchema)` to create a new message.
 */
export const QueryMissionControlResponseSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 10);

/**
 * @generated from message routerrpc.XImportMissionControlRequest
 */

/**
 * Describes the message routerrpc.XImportMissionControlRequest.
 * Use `create(XImportMissionControlRequestSchema)` to create a new message.
 */
export const XImportMissionControlRequestSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 11);

/**
 * @generated from message routerrpc.XImportMissionControlResponse
 */

/**
 * Describes the message routerrpc.XImportMissionControlResponse.
 * Use `create(XImportMissionControlResponseSchema)` to create a new message.
 */
export const XImportMissionControlResponseSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 12);

/**
 * PairHistory contains the mission control state for a particular node pair.
 *
 * @generated from message routerrpc.PairHistory
 */

/**
 * Describes the message routerrpc.PairHistory.
 * Use `create(PairHistorySchema)` to create a new message.
 */
export const PairHistorySchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 13);

/**
 * @generated from message routerrpc.PairData
 */

/**
 * Describes the message routerrpc.PairData.
 * Use `create(PairDataSchema)` to create a new message.
 */
export const PairDataSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 14);

/**
 * @generated from message routerrpc.GetMissionControlConfigRequest
 */

/**
 * Describes the message routerrpc.GetMissionControlConfigRequest.
 * Use `create(GetMissionControlConfigRequestSchema)` to create a new message.
 */
export const GetMissionControlConfigRequestSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 15);

/**
 * @generated from message routerrpc.GetMissionControlConfigResponse
 */

/**
 * Describes the message routerrpc.GetMissionControlConfigResponse.
 * Use `create(GetMissionControlConfigResponseSchema)` to create a new message.
 */
export const GetMissionControlConfigResponseSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 16);

/**
 * @generated from message routerrpc.SetMissionControlConfigRequest
 */

/**
 * Describes the message routerrpc.SetMissionControlConfigRequest.
 * Use `create(SetMissionControlConfigRequestSchema)` to create a new message.
 */
export const SetMissionControlConfigRequestSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 17);

/**
 * @generated from message routerrpc.SetMissionControlConfigResponse
 */

/**
 * Describes the message routerrpc.SetMissionControlConfigResponse.
 * Use `create(SetMissionControlConfigResponseSchema)` to create a new message.
 */
export const SetMissionControlConfigResponseSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 18);

/**
 * @generated from message routerrpc.MissionControlConfig
 */

/**
 * Describes the message routerrpc.MissionControlConfig.
 * Use `create(MissionControlConfigSchema)` to create a new message.
 */
export const MissionControlConfigSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 19);

/**
 * @generated from enum routerrpc.MissionControlConfig.ProbabilityModel
 */
export let MissionControlConfig_ProbabilityModel = /*#__PURE__*/function (MissionControlConfig_ProbabilityModel) {
  MissionControlConfig_ProbabilityModel[MissionControlConfig_ProbabilityModel["APRIORI"] = 0] = "APRIORI";
  MissionControlConfig_ProbabilityModel[MissionControlConfig_ProbabilityModel["BIMODAL"] = 1] = "BIMODAL";
  return MissionControlConfig_ProbabilityModel;
}({});

/**
 * Describes the enum routerrpc.MissionControlConfig.ProbabilityModel.
 */
export const MissionControlConfig_ProbabilityModelSchema = /*@__PURE__*/
enumDesc(file_routerrpc_router, 19, 0);

/**
 * @generated from message routerrpc.BimodalParameters
 */

/**
 * Describes the message routerrpc.BimodalParameters.
 * Use `create(BimodalParametersSchema)` to create a new message.
 */
export const BimodalParametersSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 20);

/**
 * @generated from message routerrpc.AprioriParameters
 */

/**
 * Describes the message routerrpc.AprioriParameters.
 * Use `create(AprioriParametersSchema)` to create a new message.
 */
export const AprioriParametersSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 21);

/**
 * @generated from message routerrpc.QueryProbabilityRequest
 */

/**
 * Describes the message routerrpc.QueryProbabilityRequest.
 * Use `create(QueryProbabilityRequestSchema)` to create a new message.
 */
export const QueryProbabilityRequestSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 22);

/**
 * @generated from message routerrpc.QueryProbabilityResponse
 */

/**
 * Describes the message routerrpc.QueryProbabilityResponse.
 * Use `create(QueryProbabilityResponseSchema)` to create a new message.
 */
export const QueryProbabilityResponseSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 23);

/**
 * @generated from message routerrpc.BuildRouteRequest
 */

/**
 * Describes the message routerrpc.BuildRouteRequest.
 * Use `create(BuildRouteRequestSchema)` to create a new message.
 */
export const BuildRouteRequestSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 24);

/**
 * @generated from message routerrpc.BuildRouteResponse
 */

/**
 * Describes the message routerrpc.BuildRouteResponse.
 * Use `create(BuildRouteResponseSchema)` to create a new message.
 */
export const BuildRouteResponseSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 25);

/**
 * @generated from message routerrpc.SubscribeHtlcEventsRequest
 */

/**
 * Describes the message routerrpc.SubscribeHtlcEventsRequest.
 * Use `create(SubscribeHtlcEventsRequestSchema)` to create a new message.
 */
export const SubscribeHtlcEventsRequestSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 26);

/**
 * 
 * HtlcEvent contains the htlc event that was processed. These are served on a
 * best-effort basis; events are not persisted, delivery is not guaranteed
 * (in the event of a crash in the switch, forward events may be lost) and
 * some events may be replayed upon restart. Events consumed from this package
 * should be de-duplicated by the htlc's unique combination of incoming and
 * outgoing channel id and htlc id. [EXPERIMENTAL]
 *
 * @generated from message routerrpc.HtlcEvent
 */

/**
 * Describes the message routerrpc.HtlcEvent.
 * Use `create(HtlcEventSchema)` to create a new message.
 */
export const HtlcEventSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 27);

/**
 * @generated from enum routerrpc.HtlcEvent.EventType
 */
export let HtlcEvent_EventType = /*#__PURE__*/function (HtlcEvent_EventType) {
  HtlcEvent_EventType[HtlcEvent_EventType["UNKNOWN"] = 0] = "UNKNOWN";
  HtlcEvent_EventType[HtlcEvent_EventType["SEND"] = 1] = "SEND";
  HtlcEvent_EventType[HtlcEvent_EventType["RECEIVE"] = 2] = "RECEIVE";
  HtlcEvent_EventType[HtlcEvent_EventType["FORWARD"] = 3] = "FORWARD";
  return HtlcEvent_EventType;
}({});

/**
 * Describes the enum routerrpc.HtlcEvent.EventType.
 */
export const HtlcEvent_EventTypeSchema = /*@__PURE__*/
enumDesc(file_routerrpc_router, 27, 0);

/**
 * @generated from message routerrpc.HtlcInfo
 */

/**
 * Describes the message routerrpc.HtlcInfo.
 * Use `create(HtlcInfoSchema)` to create a new message.
 */
export const HtlcInfoSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 28);

/**
 * @generated from message routerrpc.ForwardEvent
 */

/**
 * Describes the message routerrpc.ForwardEvent.
 * Use `create(ForwardEventSchema)` to create a new message.
 */
export const ForwardEventSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 29);

/**
 * @generated from message routerrpc.ForwardFailEvent
 */

/**
 * Describes the message routerrpc.ForwardFailEvent.
 * Use `create(ForwardFailEventSchema)` to create a new message.
 */
export const ForwardFailEventSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 30);

/**
 * @generated from message routerrpc.SettleEvent
 */

/**
 * Describes the message routerrpc.SettleEvent.
 * Use `create(SettleEventSchema)` to create a new message.
 */
export const SettleEventSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 31);

/**
 * @generated from message routerrpc.FinalHtlcEvent
 */

/**
 * Describes the message routerrpc.FinalHtlcEvent.
 * Use `create(FinalHtlcEventSchema)` to create a new message.
 */
export const FinalHtlcEventSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 32);

/**
 * @generated from message routerrpc.SubscribedEvent
 */

/**
 * Describes the message routerrpc.SubscribedEvent.
 * Use `create(SubscribedEventSchema)` to create a new message.
 */
export const SubscribedEventSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 33);

/**
 * @generated from message routerrpc.LinkFailEvent
 */

/**
 * Describes the message routerrpc.LinkFailEvent.
 * Use `create(LinkFailEventSchema)` to create a new message.
 */
export const LinkFailEventSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 34);

/**
 * @generated from message routerrpc.PaymentStatus
 */

/**
 * Describes the message routerrpc.PaymentStatus.
 * Use `create(PaymentStatusSchema)` to create a new message.
 */
export const PaymentStatusSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 35);

/**
 * @generated from message routerrpc.CircuitKey
 */

/**
 * Describes the message routerrpc.CircuitKey.
 * Use `create(CircuitKeySchema)` to create a new message.
 */
export const CircuitKeySchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 36);

/**
 * @generated from message routerrpc.ForwardHtlcInterceptRequest
 */

/**
 * Describes the message routerrpc.ForwardHtlcInterceptRequest.
 * Use `create(ForwardHtlcInterceptRequestSchema)` to create a new message.
 */
export const ForwardHtlcInterceptRequestSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 37);

/**
 * *
 * ForwardHtlcInterceptResponse enables the caller to resolve a previously hold
 * forward. The caller can choose either to:
 * - `Resume`: Execute the default behavior (usually forward).
 * - `Reject`: Fail the htlc backwards.
 * - `Settle`: Settle this htlc with a given preimage.
 *
 * @generated from message routerrpc.ForwardHtlcInterceptResponse
 */

/**
 * Describes the message routerrpc.ForwardHtlcInterceptResponse.
 * Use `create(ForwardHtlcInterceptResponseSchema)` to create a new message.
 */
export const ForwardHtlcInterceptResponseSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 38);

/**
 * @generated from message routerrpc.UpdateChanStatusRequest
 */

/**
 * Describes the message routerrpc.UpdateChanStatusRequest.
 * Use `create(UpdateChanStatusRequestSchema)` to create a new message.
 */
export const UpdateChanStatusRequestSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 39);

/**
 * @generated from message routerrpc.UpdateChanStatusResponse
 */

/**
 * Describes the message routerrpc.UpdateChanStatusResponse.
 * Use `create(UpdateChanStatusResponseSchema)` to create a new message.
 */
export const UpdateChanStatusResponseSchema = /*@__PURE__*/
messageDesc(file_routerrpc_router, 40);

/**
 * @generated from enum routerrpc.FailureDetail
 */
export let FailureDetail = /*#__PURE__*/function (FailureDetail) {
  FailureDetail[FailureDetail["UNKNOWN"] = 0] = "UNKNOWN";
  FailureDetail[FailureDetail["NO_DETAIL"] = 1] = "NO_DETAIL";
  FailureDetail[FailureDetail["ONION_DECODE"] = 2] = "ONION_DECODE";
  FailureDetail[FailureDetail["LINK_NOT_ELIGIBLE"] = 3] = "LINK_NOT_ELIGIBLE";
  FailureDetail[FailureDetail["ON_CHAIN_TIMEOUT"] = 4] = "ON_CHAIN_TIMEOUT";
  FailureDetail[FailureDetail["HTLC_EXCEEDS_MAX"] = 5] = "HTLC_EXCEEDS_MAX";
  FailureDetail[FailureDetail["INSUFFICIENT_BALANCE"] = 6] = "INSUFFICIENT_BALANCE";
  FailureDetail[FailureDetail["INCOMPLETE_FORWARD"] = 7] = "INCOMPLETE_FORWARD";
  FailureDetail[FailureDetail["HTLC_ADD_FAILED"] = 8] = "HTLC_ADD_FAILED";
  FailureDetail[FailureDetail["FORWARDS_DISABLED"] = 9] = "FORWARDS_DISABLED";
  FailureDetail[FailureDetail["INVOICE_CANCELED"] = 10] = "INVOICE_CANCELED";
  FailureDetail[FailureDetail["INVOICE_UNDERPAID"] = 11] = "INVOICE_UNDERPAID";
  FailureDetail[FailureDetail["INVOICE_EXPIRY_TOO_SOON"] = 12] = "INVOICE_EXPIRY_TOO_SOON";
  FailureDetail[FailureDetail["INVOICE_NOT_OPEN"] = 13] = "INVOICE_NOT_OPEN";
  FailureDetail[FailureDetail["MPP_INVOICE_TIMEOUT"] = 14] = "MPP_INVOICE_TIMEOUT";
  FailureDetail[FailureDetail["ADDRESS_MISMATCH"] = 15] = "ADDRESS_MISMATCH";
  FailureDetail[FailureDetail["SET_TOTAL_MISMATCH"] = 16] = "SET_TOTAL_MISMATCH";
  FailureDetail[FailureDetail["SET_TOTAL_TOO_LOW"] = 17] = "SET_TOTAL_TOO_LOW";
  FailureDetail[FailureDetail["SET_OVERPAID"] = 18] = "SET_OVERPAID";
  FailureDetail[FailureDetail["UNKNOWN_INVOICE"] = 19] = "UNKNOWN_INVOICE";
  FailureDetail[FailureDetail["INVALID_KEYSEND"] = 20] = "INVALID_KEYSEND";
  FailureDetail[FailureDetail["MPP_IN_PROGRESS"] = 21] = "MPP_IN_PROGRESS";
  FailureDetail[FailureDetail["CIRCULAR_ROUTE"] = 22] = "CIRCULAR_ROUTE";
  return FailureDetail;
}({});

/**
 * Describes the enum routerrpc.FailureDetail.
 */
export const FailureDetailSchema = /*@__PURE__*/
enumDesc(file_routerrpc_router, 0);

/**
 * @generated from enum routerrpc.PaymentState
 */
export let PaymentState = /*#__PURE__*/function (PaymentState) {
  PaymentState[PaymentState["IN_FLIGHT"] = 0] = "IN_FLIGHT";
  PaymentState[PaymentState["SUCCEEDED"] = 1] = "SUCCEEDED";
  PaymentState[PaymentState["FAILED_TIMEOUT"] = 2] = "FAILED_TIMEOUT";
  PaymentState[PaymentState["FAILED_NO_ROUTE"] = 3] = "FAILED_NO_ROUTE";
  PaymentState[PaymentState["FAILED_ERROR"] = 4] = "FAILED_ERROR";
  PaymentState[PaymentState["FAILED_INCORRECT_PAYMENT_DETAILS"] = 5] = "FAILED_INCORRECT_PAYMENT_DETAILS";
  PaymentState[PaymentState["FAILED_INSUFFICIENT_BALANCE"] = 6] = "FAILED_INSUFFICIENT_BALANCE";
  return PaymentState;
}({});

/**
 * Describes the enum routerrpc.PaymentState.
 */
export const PaymentStateSchema = /*@__PURE__*/
enumDesc(file_routerrpc_router, 1);

/**
 * @generated from enum routerrpc.ResolveHoldForwardAction
 */
export let ResolveHoldForwardAction = /*#__PURE__*/function (ResolveHoldForwardAction) {
  ResolveHoldForwardAction[ResolveHoldForwardAction["SETTLE"] = 0] = "SETTLE";
  ResolveHoldForwardAction[ResolveHoldForwardAction["FAIL"] = 1] = "FAIL";
  ResolveHoldForwardAction[ResolveHoldForwardAction["RESUME"] = 2] = "RESUME";
  return ResolveHoldForwardAction;
}({});

/**
 * Describes the enum routerrpc.ResolveHoldForwardAction.
 */
export const ResolveHoldForwardActionSchema = /*@__PURE__*/
enumDesc(file_routerrpc_router, 2);

/**
 * @generated from enum routerrpc.ChanStatusAction
 */
export let ChanStatusAction = /*#__PURE__*/function (ChanStatusAction) {
  ChanStatusAction[ChanStatusAction["ENABLE"] = 0] = "ENABLE";
  ChanStatusAction[ChanStatusAction["DISABLE"] = 1] = "DISABLE";
  ChanStatusAction[ChanStatusAction["AUTO"] = 2] = "AUTO";
  return ChanStatusAction;
}({});

/**
 * Describes the enum routerrpc.ChanStatusAction.
 */
export const ChanStatusActionSchema = /*@__PURE__*/
enumDesc(file_routerrpc_router, 3);

/**
 * Router is a service that offers advanced interaction with the router
 * subsystem of the daemon.
 *
 * @generated from service routerrpc.Router
 */
export const Router = /*@__PURE__*/
serviceDesc(file_routerrpc_router, 0);
//# sourceMappingURL=router_pb.js.map