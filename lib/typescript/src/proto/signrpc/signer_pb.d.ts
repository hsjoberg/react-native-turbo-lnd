import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file signrpc/signer.proto.
 */
export declare const file_signrpc_signer: GenFile;
/**
 * @generated from message signrpc.KeyLocator
 */
export type KeyLocator = Message<"signrpc.KeyLocator"> & {
    /**
     * The family of key being identified.
     *
     * @generated from field: int32 key_family = 1;
     */
    keyFamily: number;
    /**
     * The precise index of the key being identified.
     *
     * @generated from field: int32 key_index = 2;
     */
    keyIndex: number;
};
/**
 * Describes the message signrpc.KeyLocator.
 * Use `create(KeyLocatorSchema)` to create a new message.
 */
export declare const KeyLocatorSchema: GenMessage<KeyLocator>;
/**
 * @generated from message signrpc.KeyDescriptor
 */
export type KeyDescriptor = Message<"signrpc.KeyDescriptor"> & {
    /**
     *
     * The raw bytes of the public key in the key pair being identified. Either
     * this or the KeyLocator must be specified.
     *
     * @generated from field: bytes raw_key_bytes = 1;
     */
    rawKeyBytes: Uint8Array;
    /**
     *
     * The key locator that identifies which private key to use for signing.
     * Either this or the raw bytes of the target public key must be specified.
     *
     * @generated from field: signrpc.KeyLocator key_loc = 2;
     */
    keyLoc?: KeyLocator;
};
/**
 * Describes the message signrpc.KeyDescriptor.
 * Use `create(KeyDescriptorSchema)` to create a new message.
 */
export declare const KeyDescriptorSchema: GenMessage<KeyDescriptor>;
/**
 * @generated from message signrpc.TxOut
 */
export type TxOut = Message<"signrpc.TxOut"> & {
    /**
     * The value of the output being spent.
     *
     * @generated from field: int64 value = 1;
     */
    value: bigint;
    /**
     * The script of the output being spent.
     *
     * @generated from field: bytes pk_script = 2;
     */
    pkScript: Uint8Array;
};
/**
 * Describes the message signrpc.TxOut.
 * Use `create(TxOutSchema)` to create a new message.
 */
export declare const TxOutSchema: GenMessage<TxOut>;
/**
 * @generated from message signrpc.SignDescriptor
 */
export type SignDescriptor = Message<"signrpc.SignDescriptor"> & {
    /**
     *
     * A descriptor that precisely describes *which* key to use for signing. This
     * may provide the raw public key directly, or require the Signer to re-derive
     * the key according to the populated derivation path.
     *
     * Note that if the key descriptor was obtained through walletrpc.DeriveKey,
     * then the key locator MUST always be provided, since the derived keys are not
     * persisted unlike with DeriveNextKey.
     *
     * @generated from field: signrpc.KeyDescriptor key_desc = 1;
     */
    keyDesc?: KeyDescriptor;
    /**
     *
     * A scalar value that will be added to the private key corresponding to the
     * above public key to obtain the private key to be used to sign this input.
     * This value is typically derived via the following computation:
     *
     * derivedKey = privkey + sha256(perCommitmentPoint || pubKey) mod N
     *
     * @generated from field: bytes single_tweak = 2;
     */
    singleTweak: Uint8Array;
    /**
     *
     * A private key that will be used in combination with its corresponding
     * private key to derive the private key that is to be used to sign the target
     * input. Within the Lightning protocol, this value is typically the
     * commitment secret from a previously revoked commitment transaction. This
     * value is in combination with two hash values, and the original private key
     * to derive the private key to be used when signing.
     *
     * k = (privKey*sha256(pubKey || tweakPub) +
     * tweakPriv*sha256(tweakPub || pubKey)) mod N
     *
     * @generated from field: bytes double_tweak = 3;
     */
    doubleTweak: Uint8Array;
    /**
     *
     * The 32 byte input to the taproot tweak derivation that is used to derive
     * the output key from an internal key: outputKey = internalKey +
     * tagged_hash("tapTweak", internalKey || tapTweak).
     *
     * When doing a BIP 86 spend, this field can be an empty byte slice.
     *
     * When doing a normal key path spend, with the output key committing to an
     * actual script root, then this field should be: the tapscript root hash.
     *
     * @generated from field: bytes tap_tweak = 10;
     */
    tapTweak: Uint8Array;
    /**
     *
     * The full script required to properly redeem the output. This field will
     * only be populated if a p2tr, p2wsh or a p2sh output is being signed. If a
     * taproot script path spend is being attempted, then this should be the raw
     * leaf script.
     *
     * @generated from field: bytes witness_script = 4;
     */
    witnessScript: Uint8Array;
    /**
     *
     * A description of the output being spent. The value and script MUST be
     * provided.
     *
     * @generated from field: signrpc.TxOut output = 5;
     */
    output?: TxOut;
    /**
     *
     * The target sighash type that should be used when generating the final
     * sighash, and signature.
     *
     * @generated from field: uint32 sighash = 7;
     */
    sighash: number;
    /**
     *
     * The target input within the transaction that should be signed.
     *
     * @generated from field: int32 input_index = 8;
     */
    inputIndex: number;
    /**
     *
     * The sign method specifies how the input should be signed. Depending on the
     * method, either the tap_tweak, witness_script or both need to be specified.
     * Defaults to SegWit v0 signing to be backward compatible with older RPC
     * clients.
     *
     * @generated from field: signrpc.SignMethod sign_method = 9;
     */
    signMethod: SignMethod;
};
/**
 * Describes the message signrpc.SignDescriptor.
 * Use `create(SignDescriptorSchema)` to create a new message.
 */
export declare const SignDescriptorSchema: GenMessage<SignDescriptor>;
/**
 * @generated from message signrpc.SignReq
 */
export type SignReq = Message<"signrpc.SignReq"> & {
    /**
     * The raw bytes of the transaction to be signed.
     *
     * @generated from field: bytes raw_tx_bytes = 1;
     */
    rawTxBytes: Uint8Array;
    /**
     * A set of sign descriptors, for each input to be signed.
     *
     * @generated from field: repeated signrpc.SignDescriptor sign_descs = 2;
     */
    signDescs: SignDescriptor[];
    /**
     *
     * The full list of UTXO information for each of the inputs being spent. This
     * is required when spending one or more taproot (SegWit v1) outputs.
     *
     * @generated from field: repeated signrpc.TxOut prev_outputs = 3;
     */
    prevOutputs: TxOut[];
};
/**
 * Describes the message signrpc.SignReq.
 * Use `create(SignReqSchema)` to create a new message.
 */
export declare const SignReqSchema: GenMessage<SignReq>;
/**
 * @generated from message signrpc.SignResp
 */
export type SignResp = Message<"signrpc.SignResp"> & {
    /**
     *
     * A set of signatures realized in a fixed 64-byte format ordered in ascending
     * input order.
     *
     * @generated from field: repeated bytes raw_sigs = 1;
     */
    rawSigs: Uint8Array[];
};
/**
 * Describes the message signrpc.SignResp.
 * Use `create(SignRespSchema)` to create a new message.
 */
export declare const SignRespSchema: GenMessage<SignResp>;
/**
 * @generated from message signrpc.InputScript
 */
export type InputScript = Message<"signrpc.InputScript"> & {
    /**
     * The serializes witness stack for the specified input.
     *
     * @generated from field: repeated bytes witness = 1;
     */
    witness: Uint8Array[];
    /**
     *
     * The optional sig script for the specified witness that will only be set if
     * the input specified is a nested p2sh witness program.
     *
     * @generated from field: bytes sig_script = 2;
     */
    sigScript: Uint8Array;
};
/**
 * Describes the message signrpc.InputScript.
 * Use `create(InputScriptSchema)` to create a new message.
 */
export declare const InputScriptSchema: GenMessage<InputScript>;
/**
 * @generated from message signrpc.InputScriptResp
 */
export type InputScriptResp = Message<"signrpc.InputScriptResp"> & {
    /**
     * The set of fully valid input scripts requested.
     *
     * @generated from field: repeated signrpc.InputScript input_scripts = 1;
     */
    inputScripts: InputScript[];
};
/**
 * Describes the message signrpc.InputScriptResp.
 * Use `create(InputScriptRespSchema)` to create a new message.
 */
export declare const InputScriptRespSchema: GenMessage<InputScriptResp>;
/**
 * @generated from message signrpc.SignMessageReq
 */
export type SignMessageReq = Message<"signrpc.SignMessageReq"> & {
    /**
     *
     * The message to be signed. When using REST, this field must be encoded as
     * base64.
     *
     * @generated from field: bytes msg = 1;
     */
    msg: Uint8Array;
    /**
     * The key locator that identifies which key to use for signing.
     *
     * @generated from field: signrpc.KeyLocator key_loc = 2;
     */
    keyLoc?: KeyLocator;
    /**
     * Double-SHA256 hash instead of just the default single round.
     *
     * @generated from field: bool double_hash = 3;
     */
    doubleHash: boolean;
    /**
     *
     * Use the compact (pubkey recoverable) format instead of the raw lnwire
     * format. This option cannot be used with Schnorr signatures.
     *
     * @generated from field: bool compact_sig = 4;
     */
    compactSig: boolean;
    /**
     *
     * Use Schnorr signature. This option cannot be used with compact format.
     *
     * @generated from field: bool schnorr_sig = 5;
     */
    schnorrSig: boolean;
    /**
     *
     * The optional Taproot tweak bytes to apply to the private key before creating
     * a Schnorr signature. The private key is tweaked as described in BIP-341:
     * privKey + h_tapTweak(internalKey || tapTweak)
     *
     * @generated from field: bytes schnorr_sig_tap_tweak = 6;
     */
    schnorrSigTapTweak: Uint8Array;
};
/**
 * Describes the message signrpc.SignMessageReq.
 * Use `create(SignMessageReqSchema)` to create a new message.
 */
export declare const SignMessageReqSchema: GenMessage<SignMessageReq>;
/**
 * @generated from message signrpc.SignMessageResp
 */
export type SignMessageResp = Message<"signrpc.SignMessageResp"> & {
    /**
     *
     * The signature for the given message in the fixed-size LN wire format.
     *
     * @generated from field: bytes signature = 1;
     */
    signature: Uint8Array;
};
/**
 * Describes the message signrpc.SignMessageResp.
 * Use `create(SignMessageRespSchema)` to create a new message.
 */
export declare const SignMessageRespSchema: GenMessage<SignMessageResp>;
/**
 * @generated from message signrpc.VerifyMessageReq
 */
export type VerifyMessageReq = Message<"signrpc.VerifyMessageReq"> & {
    /**
     * The message over which the signature is to be verified. When using
     * REST, this field must be encoded as base64.
     *
     * @generated from field: bytes msg = 1;
     */
    msg: Uint8Array;
    /**
     *
     * The fixed-size LN wire encoded signature to be verified over the given
     * message. When using REST, this field must be encoded as base64.
     *
     * @generated from field: bytes signature = 2;
     */
    signature: Uint8Array;
    /**
     *
     * The public key the signature has to be valid for. When using REST, this
     * field must be encoded as base64. If the is_schnorr_sig option is true, then
     * the public key is expected to be in the 32-byte x-only serialization
     * according to BIP-340.
     *
     * @generated from field: bytes pubkey = 3;
     */
    pubkey: Uint8Array;
    /**
     *
     * Specifies if the signature is a Schnorr signature.
     *
     * @generated from field: bool is_schnorr_sig = 4;
     */
    isSchnorrSig: boolean;
};
/**
 * Describes the message signrpc.VerifyMessageReq.
 * Use `create(VerifyMessageReqSchema)` to create a new message.
 */
export declare const VerifyMessageReqSchema: GenMessage<VerifyMessageReq>;
/**
 * @generated from message signrpc.VerifyMessageResp
 */
export type VerifyMessageResp = Message<"signrpc.VerifyMessageResp"> & {
    /**
     * Whether the signature was valid over the given message.
     *
     * @generated from field: bool valid = 1;
     */
    valid: boolean;
};
/**
 * Describes the message signrpc.VerifyMessageResp.
 * Use `create(VerifyMessageRespSchema)` to create a new message.
 */
export declare const VerifyMessageRespSchema: GenMessage<VerifyMessageResp>;
/**
 * @generated from message signrpc.SharedKeyRequest
 */
export type SharedKeyRequest = Message<"signrpc.SharedKeyRequest"> & {
    /**
     * The ephemeral public key to use for the DH key derivation.
     *
     * @generated from field: bytes ephemeral_pubkey = 1;
     */
    ephemeralPubkey: Uint8Array;
    /**
     *
     * Deprecated. The optional key locator of the local key that should be used.
     * If this parameter is not set then the node's identity private key will be
     * used.
     *
     * @generated from field: signrpc.KeyLocator key_loc = 2 [deprecated = true];
     * @deprecated
     */
    keyLoc?: KeyLocator;
    /**
     *
     * A key descriptor describes the key used for performing ECDH. Either a key
     * locator or a raw public key is expected, if neither is supplied, defaults to
     * the node's identity private key.
     *
     * @generated from field: signrpc.KeyDescriptor key_desc = 3;
     */
    keyDesc?: KeyDescriptor;
};
/**
 * Describes the message signrpc.SharedKeyRequest.
 * Use `create(SharedKeyRequestSchema)` to create a new message.
 */
export declare const SharedKeyRequestSchema: GenMessage<SharedKeyRequest>;
/**
 * @generated from message signrpc.SharedKeyResponse
 */
export type SharedKeyResponse = Message<"signrpc.SharedKeyResponse"> & {
    /**
     * The shared public key, hashed with sha256.
     *
     * @generated from field: bytes shared_key = 1;
     */
    sharedKey: Uint8Array;
};
/**
 * Describes the message signrpc.SharedKeyResponse.
 * Use `create(SharedKeyResponseSchema)` to create a new message.
 */
export declare const SharedKeyResponseSchema: GenMessage<SharedKeyResponse>;
/**
 * @generated from message signrpc.TweakDesc
 */
export type TweakDesc = Message<"signrpc.TweakDesc"> & {
    /**
     *
     * Tweak is the 32-byte value that will modify the public key.
     *
     * @generated from field: bytes tweak = 1;
     */
    tweak: Uint8Array;
    /**
     *
     * Specifies if the target key should be converted to an x-only public key
     * before tweaking. If true, then the public key will be mapped to an x-only
     * key before the tweaking operation is applied.
     *
     * @generated from field: bool is_x_only = 2;
     */
    isXOnly: boolean;
};
/**
 * Describes the message signrpc.TweakDesc.
 * Use `create(TweakDescSchema)` to create a new message.
 */
export declare const TweakDescSchema: GenMessage<TweakDesc>;
/**
 * @generated from message signrpc.TaprootTweakDesc
 */
export type TaprootTweakDesc = Message<"signrpc.TaprootTweakDesc"> & {
    /**
     *
     * The root hash of the tapscript tree if a script path is committed to. If
     * the MuSig2 key put on chain doesn't also commit to a script path (BIP-0086
     * key spend only), then this needs to be empty and the key_spend_only field
     * below must be set to true. This is required because gRPC cannot
     * differentiate between a zero-size byte slice and a nil byte slice (both
     * would be serialized the same way). So the extra boolean is required.
     *
     * @generated from field: bytes script_root = 1;
     */
    scriptRoot: Uint8Array;
    /**
     *
     * Indicates that the above script_root is expected to be empty because this
     * is a BIP-0086 key spend only commitment where only the internal key is
     * committed to instead of also including a script root hash.
     *
     * @generated from field: bool key_spend_only = 2;
     */
    keySpendOnly: boolean;
};
/**
 * Describes the message signrpc.TaprootTweakDesc.
 * Use `create(TaprootTweakDescSchema)` to create a new message.
 */
export declare const TaprootTweakDescSchema: GenMessage<TaprootTweakDesc>;
/**
 * @generated from message signrpc.MuSig2CombineKeysRequest
 */
export type MuSig2CombineKeysRequest = Message<"signrpc.MuSig2CombineKeysRequest"> & {
    /**
     *
     * A list of all public keys (serialized in 32-byte x-only format for v0.4.0
     * and 33-byte compressed format for v1.0.0rc2!) participating in the signing
     * session. The list will always be sorted lexicographically internally. This
     * must include the local key which is described by the above key_loc.
     *
     * @generated from field: repeated bytes all_signer_pubkeys = 1;
     */
    allSignerPubkeys: Uint8Array[];
    /**
     *
     * A series of optional generic tweaks to be applied to the the aggregated
     * public key.
     *
     * @generated from field: repeated signrpc.TweakDesc tweaks = 2;
     */
    tweaks: TweakDesc[];
    /**
     *
     * An optional taproot specific tweak that must be specified if the MuSig2
     * combined key will be used as the main taproot key of a taproot output
     * on-chain.
     *
     * @generated from field: signrpc.TaprootTweakDesc taproot_tweak = 3;
     */
    taprootTweak?: TaprootTweakDesc;
    /**
     *
     * The mandatory version of the MuSig2 BIP draft to use. This is necessary to
     * differentiate between the changes that were made to the BIP while this
     * experimental RPC was already released. Some of those changes affect how the
     * combined key and nonces are created.
     *
     * @generated from field: signrpc.MuSig2Version version = 4;
     */
    version: MuSig2Version;
};
/**
 * Describes the message signrpc.MuSig2CombineKeysRequest.
 * Use `create(MuSig2CombineKeysRequestSchema)` to create a new message.
 */
export declare const MuSig2CombineKeysRequestSchema: GenMessage<MuSig2CombineKeysRequest>;
/**
 * @generated from message signrpc.MuSig2CombineKeysResponse
 */
export type MuSig2CombineKeysResponse = Message<"signrpc.MuSig2CombineKeysResponse"> & {
    /**
     *
     * The combined public key (in the 32-byte x-only format) with all tweaks
     * applied to it. If a taproot tweak is specified, this corresponds to the
     * taproot key that can be put into the on-chain output.
     *
     * @generated from field: bytes combined_key = 1;
     */
    combinedKey: Uint8Array;
    /**
     *
     * The raw combined public key (in the 32-byte x-only format) before any tweaks
     * are applied to it. If a taproot tweak is specified, this corresponds to the
     * internal key that needs to be put into the witness if the script spend path
     * is used.
     *
     * @generated from field: bytes taproot_internal_key = 2;
     */
    taprootInternalKey: Uint8Array;
    /**
     *
     * The version of the MuSig2 BIP that was used to combine the keys.
     *
     * @generated from field: signrpc.MuSig2Version version = 4;
     */
    version: MuSig2Version;
};
/**
 * Describes the message signrpc.MuSig2CombineKeysResponse.
 * Use `create(MuSig2CombineKeysResponseSchema)` to create a new message.
 */
export declare const MuSig2CombineKeysResponseSchema: GenMessage<MuSig2CombineKeysResponse>;
/**
 * @generated from message signrpc.MuSig2SessionRequest
 */
export type MuSig2SessionRequest = Message<"signrpc.MuSig2SessionRequest"> & {
    /**
     *
     * The key locator that identifies which key to use for signing.
     *
     * @generated from field: signrpc.KeyLocator key_loc = 1;
     */
    keyLoc?: KeyLocator;
    /**
     *
     * A list of all public keys (serialized in 32-byte x-only format for v0.4.0
     * and 33-byte compressed format for v1.0.0rc2!) participating in the signing
     * session. The list will always be sorted lexicographically internally. This
     * must include the local key which is described by the above key_loc.
     *
     * @generated from field: repeated bytes all_signer_pubkeys = 2;
     */
    allSignerPubkeys: Uint8Array[];
    /**
     *
     * An optional list of all public nonces of other signing participants that
     * might already be known.
     *
     * @generated from field: repeated bytes other_signer_public_nonces = 3;
     */
    otherSignerPublicNonces: Uint8Array[];
    /**
     *
     * A series of optional generic tweaks to be applied to the the aggregated
     * public key.
     *
     * @generated from field: repeated signrpc.TweakDesc tweaks = 4;
     */
    tweaks: TweakDesc[];
    /**
     *
     * An optional taproot specific tweak that must be specified if the MuSig2
     * combined key will be used as the main taproot key of a taproot output
     * on-chain.
     *
     * @generated from field: signrpc.TaprootTweakDesc taproot_tweak = 5;
     */
    taprootTweak?: TaprootTweakDesc;
    /**
     *
     * The mandatory version of the MuSig2 BIP draft to use. This is necessary to
     * differentiate between the changes that were made to the BIP while this
     * experimental RPC was already released. Some of those changes affect how the
     * combined key and nonces are created.
     *
     * @generated from field: signrpc.MuSig2Version version = 6;
     */
    version: MuSig2Version;
};
/**
 * Describes the message signrpc.MuSig2SessionRequest.
 * Use `create(MuSig2SessionRequestSchema)` to create a new message.
 */
export declare const MuSig2SessionRequestSchema: GenMessage<MuSig2SessionRequest>;
/**
 * @generated from message signrpc.MuSig2SessionResponse
 */
export type MuSig2SessionResponse = Message<"signrpc.MuSig2SessionResponse"> & {
    /**
     *
     * The unique ID that represents this signing session. A session can be used
     * for producing a signature a single time. If the signing fails for any
     * reason, a new session with the same participants needs to be created.
     *
     * @generated from field: bytes session_id = 1;
     */
    sessionId: Uint8Array;
    /**
     *
     * The combined public key (in the 32-byte x-only format) with all tweaks
     * applied to it. If a taproot tweak is specified, this corresponds to the
     * taproot key that can be put into the on-chain output.
     *
     * @generated from field: bytes combined_key = 2;
     */
    combinedKey: Uint8Array;
    /**
     *
     * The raw combined public key (in the 32-byte x-only format) before any tweaks
     * are applied to it. If a taproot tweak is specified, this corresponds to the
     * internal key that needs to be put into the witness if the script spend path
     * is used.
     *
     * @generated from field: bytes taproot_internal_key = 3;
     */
    taprootInternalKey: Uint8Array;
    /**
     *
     * The two public nonces the local signer uses, combined into a single value
     * of 66 bytes. Can be split into the two 33-byte points to get the individual
     * nonces.
     *
     * @generated from field: bytes local_public_nonces = 4;
     */
    localPublicNonces: Uint8Array;
    /**
     *
     * Indicates whether all nonces required to start the signing process are known
     * now.
     *
     * @generated from field: bool have_all_nonces = 5;
     */
    haveAllNonces: boolean;
    /**
     *
     * The version of the MuSig2 BIP that was used to create the session.
     *
     * @generated from field: signrpc.MuSig2Version version = 6;
     */
    version: MuSig2Version;
};
/**
 * Describes the message signrpc.MuSig2SessionResponse.
 * Use `create(MuSig2SessionResponseSchema)` to create a new message.
 */
export declare const MuSig2SessionResponseSchema: GenMessage<MuSig2SessionResponse>;
/**
 * @generated from message signrpc.MuSig2RegisterNoncesRequest
 */
export type MuSig2RegisterNoncesRequest = Message<"signrpc.MuSig2RegisterNoncesRequest"> & {
    /**
     *
     * The unique ID of the signing session those nonces should be registered with.
     *
     * @generated from field: bytes session_id = 1;
     */
    sessionId: Uint8Array;
    /**
     *
     * A list of all public nonces of other signing participants that should be
     * registered.
     *
     * @generated from field: repeated bytes other_signer_public_nonces = 3;
     */
    otherSignerPublicNonces: Uint8Array[];
};
/**
 * Describes the message signrpc.MuSig2RegisterNoncesRequest.
 * Use `create(MuSig2RegisterNoncesRequestSchema)` to create a new message.
 */
export declare const MuSig2RegisterNoncesRequestSchema: GenMessage<MuSig2RegisterNoncesRequest>;
/**
 * @generated from message signrpc.MuSig2RegisterNoncesResponse
 */
export type MuSig2RegisterNoncesResponse = Message<"signrpc.MuSig2RegisterNoncesResponse"> & {
    /**
     *
     * Indicates whether all nonces required to start the signing process are known
     * now.
     *
     * @generated from field: bool have_all_nonces = 1;
     */
    haveAllNonces: boolean;
};
/**
 * Describes the message signrpc.MuSig2RegisterNoncesResponse.
 * Use `create(MuSig2RegisterNoncesResponseSchema)` to create a new message.
 */
export declare const MuSig2RegisterNoncesResponseSchema: GenMessage<MuSig2RegisterNoncesResponse>;
/**
 * @generated from message signrpc.MuSig2SignRequest
 */
export type MuSig2SignRequest = Message<"signrpc.MuSig2SignRequest"> & {
    /**
     *
     * The unique ID of the signing session to use for signing.
     *
     * @generated from field: bytes session_id = 1;
     */
    sessionId: Uint8Array;
    /**
     *
     * The 32-byte SHA256 digest of the message to sign.
     *
     * @generated from field: bytes message_digest = 2;
     */
    messageDigest: Uint8Array;
    /**
     *
     * Cleanup indicates that after signing, the session state can be cleaned up,
     * since another participant is going to be responsible for combining the
     * partial signatures.
     *
     * @generated from field: bool cleanup = 3;
     */
    cleanup: boolean;
};
/**
 * Describes the message signrpc.MuSig2SignRequest.
 * Use `create(MuSig2SignRequestSchema)` to create a new message.
 */
export declare const MuSig2SignRequestSchema: GenMessage<MuSig2SignRequest>;
/**
 * @generated from message signrpc.MuSig2SignResponse
 */
export type MuSig2SignResponse = Message<"signrpc.MuSig2SignResponse"> & {
    /**
     *
     * The partial signature created by the local signer.
     *
     * @generated from field: bytes local_partial_signature = 1;
     */
    localPartialSignature: Uint8Array;
};
/**
 * Describes the message signrpc.MuSig2SignResponse.
 * Use `create(MuSig2SignResponseSchema)` to create a new message.
 */
export declare const MuSig2SignResponseSchema: GenMessage<MuSig2SignResponse>;
/**
 * @generated from message signrpc.MuSig2CombineSigRequest
 */
export type MuSig2CombineSigRequest = Message<"signrpc.MuSig2CombineSigRequest"> & {
    /**
     *
     * The unique ID of the signing session to combine the signatures for.
     *
     * @generated from field: bytes session_id = 1;
     */
    sessionId: Uint8Array;
    /**
     *
     * The list of all other participants' partial signatures to add to the current
     * session.
     *
     * @generated from field: repeated bytes other_partial_signatures = 2;
     */
    otherPartialSignatures: Uint8Array[];
};
/**
 * Describes the message signrpc.MuSig2CombineSigRequest.
 * Use `create(MuSig2CombineSigRequestSchema)` to create a new message.
 */
export declare const MuSig2CombineSigRequestSchema: GenMessage<MuSig2CombineSigRequest>;
/**
 * @generated from message signrpc.MuSig2CombineSigResponse
 */
export type MuSig2CombineSigResponse = Message<"signrpc.MuSig2CombineSigResponse"> & {
    /**
     *
     * Indicates whether all partial signatures required to create a final, full
     * signature are known yet. If this is true, then the final_signature field is
     * set, otherwise it is empty.
     *
     * @generated from field: bool have_all_signatures = 1;
     */
    haveAllSignatures: boolean;
    /**
     *
     * The final, full signature that is valid for the combined public key.
     *
     * @generated from field: bytes final_signature = 2;
     */
    finalSignature: Uint8Array;
};
/**
 * Describes the message signrpc.MuSig2CombineSigResponse.
 * Use `create(MuSig2CombineSigResponseSchema)` to create a new message.
 */
export declare const MuSig2CombineSigResponseSchema: GenMessage<MuSig2CombineSigResponse>;
/**
 * @generated from message signrpc.MuSig2CleanupRequest
 */
export type MuSig2CleanupRequest = Message<"signrpc.MuSig2CleanupRequest"> & {
    /**
     *
     * The unique ID of the signing session that should be removed/cleaned up.
     *
     * @generated from field: bytes session_id = 1;
     */
    sessionId: Uint8Array;
};
/**
 * Describes the message signrpc.MuSig2CleanupRequest.
 * Use `create(MuSig2CleanupRequestSchema)` to create a new message.
 */
export declare const MuSig2CleanupRequestSchema: GenMessage<MuSig2CleanupRequest>;
/**
 * @generated from message signrpc.MuSig2CleanupResponse
 */
export type MuSig2CleanupResponse = Message<"signrpc.MuSig2CleanupResponse"> & {};
/**
 * Describes the message signrpc.MuSig2CleanupResponse.
 * Use `create(MuSig2CleanupResponseSchema)` to create a new message.
 */
export declare const MuSig2CleanupResponseSchema: GenMessage<MuSig2CleanupResponse>;
/**
 * @generated from enum signrpc.SignMethod
 */
export declare enum SignMethod {
    /**
     *
     * Specifies that a SegWit v0 (p2wkh, np2wkh, p2wsh) input script should be
     * signed.
     *
     * @generated from enum value: SIGN_METHOD_WITNESS_V0 = 0;
     */
    WITNESS_V0 = 0,
    /**
     *
     * Specifies that a SegWit v1 (p2tr) input should be signed by using the
     * BIP0086 method (commit to internal key only).
     *
     * @generated from enum value: SIGN_METHOD_TAPROOT_KEY_SPEND_BIP0086 = 1;
     */
    TAPROOT_KEY_SPEND_BIP0086 = 1,
    /**
     *
     * Specifies that a SegWit v1 (p2tr) input should be signed by using a given
     * taproot hash to commit to in addition to the internal key.
     *
     * @generated from enum value: SIGN_METHOD_TAPROOT_KEY_SPEND = 2;
     */
    TAPROOT_KEY_SPEND = 2,
    /**
     *
     * Specifies that a SegWit v1 (p2tr) input should be spent using the script
     * path and that a specific leaf script should be signed for.
     *
     * @generated from enum value: SIGN_METHOD_TAPROOT_SCRIPT_SPEND = 3;
     */
    TAPROOT_SCRIPT_SPEND = 3
}
/**
 * Describes the enum signrpc.SignMethod.
 */
export declare const SignMethodSchema: GenEnum<SignMethod>;
/**
 * @generated from enum signrpc.MuSig2Version
 */
export declare enum MuSig2Version {
    /**
     *
     * The default value on the RPC is zero for enums so we need to represent an
     * invalid/undefined version by default to make sure clients upgrade their
     * software to set the version explicitly.
     *
     * @generated from enum value: MUSIG2_VERSION_UNDEFINED = 0;
     */
    MUSIG2_VERSION_UNDEFINED = 0,
    /**
     *
     * The version of MuSig2 that lnd 0.15.x shipped with, which corresponds to the
     * version v0.4.0 of the MuSig2 BIP draft.
     *
     * @generated from enum value: MUSIG2_VERSION_V040 = 1;
     */
    MUSIG2_VERSION_V040 = 1,
    /**
     *
     * The current version of MuSig2 which corresponds to the version v1.0.0rc2 of
     * the MuSig2 BIP draft.
     *
     * @generated from enum value: MUSIG2_VERSION_V100RC2 = 2;
     */
    MUSIG2_VERSION_V100RC2 = 2
}
/**
 * Describes the enum signrpc.MuSig2Version.
 */
export declare const MuSig2VersionSchema: GenEnum<MuSig2Version>;
/**
 * Signer is a service that gives access to the signing functionality of the
 * daemon's wallet.
 *
 * @generated from service signrpc.Signer
 */
export declare const Signer: GenService<{
    /**
     *
     * SignOutputRaw is a method that can be used to generated a signature for a
     * set of inputs/outputs to a transaction. Each request specifies details
     * concerning how the outputs should be signed, which keys they should be
     * signed with, and also any optional tweaks. The return value is a fixed
     * 64-byte signature (the same format as we use on the wire in Lightning).
     *
     * If we are  unable to sign using the specified keys, then an error will be
     * returned.
     *
     * @generated from rpc signrpc.Signer.SignOutputRaw
     */
    signOutputRaw: {
        methodKind: "unary";
        input: typeof SignReqSchema;
        output: typeof SignRespSchema;
    };
    /**
     *
     * ComputeInputScript generates a complete InputIndex for the passed
     * transaction with the signature as defined within the passed SignDescriptor.
     * This method should be capable of generating the proper input script for both
     * regular p2wkh/p2tr outputs and p2wkh outputs nested within a regular p2sh
     * output.
     *
     * Note that when using this method to sign inputs belonging to the wallet,
     * the only items of the SignDescriptor that need to be populated are pkScript
     * in the TxOut field, the value in that same field, and finally the input
     * index.
     *
     * @generated from rpc signrpc.Signer.ComputeInputScript
     */
    computeInputScript: {
        methodKind: "unary";
        input: typeof SignReqSchema;
        output: typeof InputScriptRespSchema;
    };
    /**
     *
     * SignMessage signs a message with the key specified in the key locator. The
     * returned signature is fixed-size LN wire format encoded.
     *
     * The main difference to SignMessage in the main RPC is that a specific key is
     * used to sign the message instead of the node identity private key.
     *
     * @generated from rpc signrpc.Signer.SignMessage
     */
    signMessage: {
        methodKind: "unary";
        input: typeof SignMessageReqSchema;
        output: typeof SignMessageRespSchema;
    };
    /**
     *
     * VerifyMessage verifies a signature over a message using the public key
     * provided. The signature must be fixed-size LN wire format encoded.
     *
     * The main difference to VerifyMessage in the main RPC is that the public key
     * used to sign the message does not have to be a node known to the network.
     *
     * @generated from rpc signrpc.Signer.VerifyMessage
     */
    verifyMessage: {
        methodKind: "unary";
        input: typeof VerifyMessageReqSchema;
        output: typeof VerifyMessageRespSchema;
    };
    /**
     *
     * DeriveSharedKey returns a shared secret key by performing Diffie-Hellman key
     * derivation between the ephemeral public key in the request and the node's
     * key specified in the key_desc parameter. Either a key locator or a raw
     * public key is expected in the key_desc, if neither is supplied, defaults to
     * the node's identity private key:
     * P_shared = privKeyNode * ephemeralPubkey
     * The resulting shared public key is serialized in the compressed format and
     * hashed with sha256, resulting in the final key length of 256bit.
     *
     * @generated from rpc signrpc.Signer.DeriveSharedKey
     */
    deriveSharedKey: {
        methodKind: "unary";
        input: typeof SharedKeyRequestSchema;
        output: typeof SharedKeyResponseSchema;
    };
    /**
     *
     * MuSig2CombineKeys (experimental!) is a stateless helper RPC that can be used
     * to calculate the combined MuSig2 public key from a list of all participating
     * signers' public keys. This RPC is completely stateless and deterministic and
     * does not create any signing session. It can be used to determine the Taproot
     * public key that should be put in an on-chain output once all public keys are
     * known. A signing session is only needed later when that output should be
     * _spent_ again.
     *
     * NOTE: The MuSig2 BIP is not final yet and therefore this API must be
     * considered to be HIGHLY EXPERIMENTAL and subject to change in upcoming
     * releases. Backward compatibility is not guaranteed!
     *
     * @generated from rpc signrpc.Signer.MuSig2CombineKeys
     */
    muSig2CombineKeys: {
        methodKind: "unary";
        input: typeof MuSig2CombineKeysRequestSchema;
        output: typeof MuSig2CombineKeysResponseSchema;
    };
    /**
     *
     * MuSig2CreateSession (experimental!) creates a new MuSig2 signing session
     * using the local key identified by the key locator. The complete list of all
     * public keys of all signing parties must be provided, including the public
     * key of the local signing key. If nonces of other parties are already known,
     * they can be submitted as well to reduce the number of RPC calls necessary
     * later on.
     *
     * NOTE: The MuSig2 BIP is not final yet and therefore this API must be
     * considered to be HIGHLY EXPERIMENTAL and subject to change in upcoming
     * releases. Backward compatibility is not guaranteed!
     *
     * @generated from rpc signrpc.Signer.MuSig2CreateSession
     */
    muSig2CreateSession: {
        methodKind: "unary";
        input: typeof MuSig2SessionRequestSchema;
        output: typeof MuSig2SessionResponseSchema;
    };
    /**
     *
     * MuSig2RegisterNonces (experimental!) registers one or more public nonces of
     * other signing participants for a session identified by its ID. This RPC can
     * be called multiple times until all nonces are registered.
     *
     * NOTE: The MuSig2 BIP is not final yet and therefore this API must be
     * considered to be HIGHLY EXPERIMENTAL and subject to change in upcoming
     * releases. Backward compatibility is not guaranteed!
     *
     * @generated from rpc signrpc.Signer.MuSig2RegisterNonces
     */
    muSig2RegisterNonces: {
        methodKind: "unary";
        input: typeof MuSig2RegisterNoncesRequestSchema;
        output: typeof MuSig2RegisterNoncesResponseSchema;
    };
    /**
     *
     * MuSig2Sign (experimental!) creates a partial signature using the local
     * signing key that was specified when the session was created. This can only
     * be called when all public nonces of all participants are known and have been
     * registered with the session. If this node isn't responsible for combining
     * all the partial signatures, then the cleanup flag should be set, indicating
     * that the session can be removed from memory once the signature was produced.
     *
     * NOTE: The MuSig2 BIP is not final yet and therefore this API must be
     * considered to be HIGHLY EXPERIMENTAL and subject to change in upcoming
     * releases. Backward compatibility is not guaranteed!
     *
     * @generated from rpc signrpc.Signer.MuSig2Sign
     */
    muSig2Sign: {
        methodKind: "unary";
        input: typeof MuSig2SignRequestSchema;
        output: typeof MuSig2SignResponseSchema;
    };
    /**
     *
     * MuSig2CombineSig (experimental!) combines the given partial signature(s)
     * with the local one, if it already exists. Once a partial signature of all
     * participants is registered, the final signature will be combined and
     * returned.
     *
     * NOTE: The MuSig2 BIP is not final yet and therefore this API must be
     * considered to be HIGHLY EXPERIMENTAL and subject to change in upcoming
     * releases. Backward compatibility is not guaranteed!
     *
     * @generated from rpc signrpc.Signer.MuSig2CombineSig
     */
    muSig2CombineSig: {
        methodKind: "unary";
        input: typeof MuSig2CombineSigRequestSchema;
        output: typeof MuSig2CombineSigResponseSchema;
    };
    /**
     *
     * MuSig2Cleanup (experimental!) allows a caller to clean up a session early in
     * cases where it's obvious that the signing session won't succeed and the
     * resources can be released.
     *
     * NOTE: The MuSig2 BIP is not final yet and therefore this API must be
     * considered to be HIGHLY EXPERIMENTAL and subject to change in upcoming
     * releases. Backward compatibility is not guaranteed!
     *
     * @generated from rpc signrpc.Signer.MuSig2Cleanup
     */
    muSig2Cleanup: {
        methodKind: "unary";
        input: typeof MuSig2CleanupRequestSchema;
        output: typeof MuSig2CleanupResponseSchema;
    };
}>;
//# sourceMappingURL=signer_pb.d.ts.map