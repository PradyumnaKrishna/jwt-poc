"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b64UrlEncode = b64UrlEncode;
exports.b64UrlDecode = b64UrlDecode;
exports.createSignature = createSignature;
const crypto = require("crypto");
function encodeUrlsafe(base64) {
    return base64
        .replace(/\+/g, '-') // Convert '+' to '-'
        .replace(/\//g, '_') // Convert '/' to '_'
        .replace(/=+$/, ''); // Remove ending '='
}
function decodeUrlsafe(base64) {
    const padding = base64.length % 4;
    if (padding) {
        base64 += '='.repeat(4 - padding);
    }
    return base64
        .replace(/\-/g, '+') // Convert '-' to '+'
        .replace(/\_/g, '/'); // Convert '_' to '/'
}
function b64UrlEncode(str) {
    return encodeUrlsafe(btoa(str));
}
function b64UrlDecode(base64) {
    return atob(decodeUrlsafe(base64));
}
function createSignature(header, payload, secret) {
    const signatureInput = `${header}.${payload}`;
    const signature = crypto.createHmac('sha256', secret)
        .update(signatureInput).digest('base64');
    return encodeUrlsafe(signature);
}
