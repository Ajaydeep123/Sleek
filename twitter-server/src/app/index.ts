import express from "express"
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from "body-parser";
import { prismaClient } from "../clients/db";

export async function initServer(){
    const app = express();
    app.use(bodyParser.json());
    prismaClient.user.create({
        data:{
            
        }
    })
    const server = new ApolloServer({
        typeDefs:`
        type Query{
            sayHello:String,
            sayHelloToMe(name:String!):String
        }`,
        resolvers:{
            Query:{
                sayHello:() => `Hello World from Apollo Server`,
                sayHelloToMe:(parent:any, {name}:{name:string}) => `Hello ${name} from Apollo Server`
            },
        },
    });

    await server.start();

    app.use("/graphql", express.json(), expressMiddleware(server)) 

    return app;
}