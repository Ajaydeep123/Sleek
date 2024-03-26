import express from "express"
import cors from "cors"
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from "body-parser";
import { prismaClient } from "../clients/db";
import { User } from "./user";
import { Tweet } from "./tweet";
import { GraphqlContext } from "../interfaces";
import JWTService from "../services/jwt";
export async function initServer(){
    const app = express();
    app.use(bodyParser.json());
    app.use(cors())

    const server = new ApolloServer<GraphqlContext>({
        typeDefs:`
        ${User.types}
        ${Tweet.types}

        type Query{
            ${User.queries}
            ${Tweet.queries}
        }
        
        type Mutation{
            ${Tweet.mutations}
        }
        `,

        resolvers:{
            Query:{
                ...User.resolvers.queries,
                ...Tweet.resolvers.queries,
            },

            Mutation:{
                ...Tweet.resolvers.mutations
            },
            
            ...User.resolvers.extraResolvers,
            ...Tweet.resolvers.extraResolvers
        },
    });

    await server.start();

    app.use("/graphql", express.json(), expressMiddleware(server, {
        context: async ({req,res}) =>{
            return {
                user: req.headers.authorization ? JWTService.decodeToken(
                        req.headers.authorization.split("Bearer ")[1]
              ) : null
            };
        },
    })); 

    return app;
}