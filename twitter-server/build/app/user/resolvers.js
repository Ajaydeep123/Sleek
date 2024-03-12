"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const queries = {
    verifyGoogleToken: (parent, { token }) => {
        return token;
    }
};
exports.resolvers = { queries };
