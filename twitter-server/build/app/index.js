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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initServer = void 0;
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = require("../clients/db");
function initServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        app.use(body_parser_1.default.json());
        db_1.prismaClient.user.create({
            data: {}
        });
        const server = new server_1.ApolloServer({
            typeDefs: `
        type Query{
            sayHello:String,
            sayHelloToMe(name:String!):String
        }`,
            resolvers: {
                Query: {
                    sayHello: () => `Hello World from Apollo Server`,
                    sayHelloToMe: (parent, { name }) => `Hello ${name} from Apollo Server`
                },
            },
        });
        yield server.start();
        app.use("/graphql", express_1.default.json(), (0, express4_1.expressMiddleware)(server));
        return app;
    });
}
exports.initServer = initServer;
