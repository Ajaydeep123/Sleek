import express from "express"
import cors from "cors"
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from "body-parser";
import { prismaClient } from "../clients/db";
import { User } from "./user";
import { GraphqlContext } from "../interfaces";
import JWTService from "../services/jwt";
export async function initServer(){
    const app = express();
    app.use(bodyParser.json());
    app.use(cors())

    const server = new ApolloServer<GraphqlContext>({
        typeDefs:`
        ${User.types}
        
        type Query{
            ${User.queries}
        }`,
        resolvers:{
            Query:{
                ...User.resolvers.queries
            },
        },
    });

    await server.start();

    app.use("/graphql", express.json(), expressMiddleware(server, {
        context: async ({req,res}) =>{
            return {
                user: req.headers.authorization ?
                JWTService.decodeToken(req.headers.authorization) : null
            };
        },
    })); 

    return app;
}