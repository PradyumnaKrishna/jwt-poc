"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.b64UrlEncode = b64UrlEncode;
exports.b64UrlDecode = b64UrlDecode;
exports.createSignature = createSignature;
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
    return __awaiter(this, void 0, void 0, function* () {
        const signatureInput = `${header}.${payload}`;
        const encoder = new TextEncoder();
        const data = encoder.encode(signatureInput);
        const key = yield crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
        const signatureBuffer = yield crypto.subtle.sign('HMAC', key, data);
        const signature = b64UrlEncode(String.fromCharCode(...new Uint8Array(signatureBuffer)));
        return signature;
    });
}
