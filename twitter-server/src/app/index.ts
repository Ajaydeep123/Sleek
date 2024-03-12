import express from "express"
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from "body-parser";
import { prismaClient } from "../clients/db";
import { User } from "./user";
export async function initServer(){
    const app = express();
    app.use(bodyParser.json());

    const server = new ApolloServer({
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

    app.use("/graphql", express.json(), expressMiddleware(server)) 

    return app;
}