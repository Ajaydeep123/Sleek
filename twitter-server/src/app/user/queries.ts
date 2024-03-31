export const queries = `#graphql
    verifyGoogleToken(token:String!):String
    getCurrentUser: User
    getUserById(id:ID!):User
    `;


// in getCurrentUser  query we are not accessing any parameters, instead we'll be reading header. So, in such a case we have "context" provided by graphql
