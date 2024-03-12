const queries = {
    verifyGoogleToken: (parent:any, {token}:{token:string}) => {
        return token;
    }
}

export const resolvers = { queries };
