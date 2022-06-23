import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: 'https://api-sa-east-1.graphcms.com/v2/cl4o3wfn80fg201xi6csggabp/master',
    cache: new InMemoryCache(),
})