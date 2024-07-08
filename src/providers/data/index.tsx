import graphqlDataProvider, { GraphQLClient, liveProvider as graphqlLiveProvider } from "@refinedev/nestjs-query";
import { fetchWrapper } from "./fetch-wrapper";
import { createClient } from "graphql-ws";

//endpoints
export const API_BASE_URL = "https://api.crm.refine.dev"
export const API_URL = `${API_BASE_URL}/graphql`
export const WS_URL = "wss://api.crm.refine.dev/graphql"


//graphql http isteklerini yönetir
export const client = new GraphQLClient(API_URL, {
    fetch: (url: string, options: RequestInit) => {
        try {
            return fetchWrapper(url, options);
        } catch (err) {
            return Promise.reject(err as Error);
        }
    }
})


//websocket tabanlı graphql isteklerini yönetir
export const wsClient = typeof window !== "undefined"
    ? createClient({
        url: WS_URL,
        connectionParams: () => {
            const accessToken = localStorage.getItem("access_token");
            return {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        }
    })
    : undefined;


//graphql sorguları gerçekleştirir ve api ile iletişim kurar
export const dataProvider = graphqlDataProvider(client);
//gerçek zamanlı veri değişimleri 
export const liveProvider = wsClient ? graphqlLiveProvider(wsClient) : undefined