import { GraphQLFormattedError } from "graphql"
import { url } from "inspector";

type Error = {
    message: string;
    statusCode: string;
}

export const customFetch = async (url: string, options: RequestInit): Promise<Response> => {
    const accessToken = localStorage.getItem('access_token');
    const headers = options.headers as Record<string, string>;

    return await fetch(url, {
        ...options,
        headers: {
            ...headers,
            Authorization: headers.Authorization || `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            // Apollo Client'ın GraphQL isteklerinin güvenli ve uyumlu bir şekilde işlenmesini sağlamak için tarayıcının preflight isteklerini zorunlu kılar. 
            "Apollo-Require-Preflight": "true",
        }
    })
}

export const getGraphQLErros = (body: Record<"errors", GraphQLFormattedError[] | undefined>): Error | null => {
    if (!body) {
        return {
            message: "Unknown eror",
            statusCode: "INTERNAL_SERVER_ERROR",
        }
    }

    if ("errors" in body) {
        const errors = body.errors;
        const messages = errors?.map((error) => error.message).join("");
        const code = errors?.[0].extensions?.code;
        return {
            message: messages || JSON.stringify(errors),
            statusCode: code || 500
        }
    }

    return null;
}

export const fetchWrapper = async (url: string, options: RequestInit) => {
    const resonse = customFetch(url, options);
    const responseClone = (await resonse).clone();
    const body = await responseClone.json();

    const error = getGraphQLErros(body);

    if (error) {
        throw error;
    }

    // return getGraphQLErros(body) ? error : resonse
    return resonse;
}




