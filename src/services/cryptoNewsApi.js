import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = process.env.REACT_APP_API_KEY

const cryptoNewsHeaders = {
    'x-rapidapi-key': apiKey,
	'x-rapidapi-host': 'crypto-news51.p.rapidapi.com',
};

const baseUrl = 'https://crypto-news51.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders })

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            // Add custom headers here
            headers.set("Access-Control-Allow-Origin", "*");
            headers.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        
            return headers;
          },
    }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ count }) => createRequest(`/api/v1/crypto/articles?page=1&limit=${count}&time_frame=24h&format=json`),
        })
    })
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;