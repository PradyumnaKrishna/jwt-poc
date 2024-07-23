"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode_jwt = encode_jwt;
exports.decode_jwt = decode_jwt;
exports.validate_jwt = validate_jwt;
const utils = require("./utils");
function encode_jwt(secret, id, payload, ttl = 3600) {
    const header = {
        alg: 'HS256',
        typ: 'JWT'
    };
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + ttl;
    const encodedHeader = utils.b64UrlEncode(JSON.stringify(header));
    const encodedPayload = utils.b64UrlEncode(JSON.stringify({ id, payload, exp, iat }));
    const signature = utils.createSignature(encodedHeader, encodedPayload, secret);
    return `${encodedHeader}.${encodedPayload}.${signature}`;
}
function decode_jwt(secret, token) {
    try {
        const [encodedHeader, encodedPayload, signature] = token.split('.');
        const payload = JSON.parse(utils.b64UrlDecode(encodedPayload));
        const expectedSignature = utils.createSignature(encodedHeader, encodedPayload, secret);
        if (signature !== expectedSignature) {
            throw new Error('Invalid signature');
        }
        const expiresAt = new Date(payload.exp * 1000);
        return { id: payload.id, payload: payload.payload, expiresAt };
    }
    catch (error) {
        throw error;
    }
}
function validate_jwt(secret, token) {
    try {
        const current_time = new Date();
        const payload = decode_jwt(secret, token);
        if (payload.expiresAt < current_time) {
            return false;
        }
        return true;
    }
    catch (error) {
        return false;
    }
}
