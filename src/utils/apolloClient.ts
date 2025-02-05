import {
    ApolloClient,
    InMemoryCache,
    NormalizedCache,
    gql,
    Observable,
    ApolloLink
} from '@apollo/client'

import { createUploadLink } from 'apollo-upload-client'
import { onError } from '@apollo/client/link/error'


async function accessToken(client: ApolloClient<NormalizedCache>) {
    try {
        const { data } = await client.mutate({
            mutation: gql`
                mutation RefreshToken {
                    accessToken
                }
            `
        });

        const newAccessToken = data?.RefreshToken
        if(!newAccessToken){
            throw new Error("New access token not received")
        }
    } catch (err) {
        console.error('Error refreshing token:', err);
        throw err; 
    }
}