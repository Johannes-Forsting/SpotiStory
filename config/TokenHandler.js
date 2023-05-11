import { CLIENT_SECRET, CLIENT_ID } from '@env';
import React, {useState, useEffect} from "react";

export async function getTokenData() {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    };
    const getTokenData = await fetch('https://accounts.spotify.com/api/token', options)
        .then((res) => res.json())
        .catch((error) => console.error(error));
    return getTokenData;
}

export async function getOptions(token) {
    const returnOptions = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return returnOptions;
}

export function useToken() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const tokenData = await getTokenData();
            setToken(tokenData);
        }
        fetchData();
    }, []);

    return token;
}

export function useOptions(token) {
    const [options, setOptions] = useState(null);

    useEffect(() => {
        if (token) {
            async function fetchOptions() {
                const option = await getOptions(token.access_token);
                setOptions(option);
            }
            fetchOptions();
        }
    }, [token]);

    return options;
}