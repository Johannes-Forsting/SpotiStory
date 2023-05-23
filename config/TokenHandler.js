import {CLIENT_ID, CLIENT_SECRET} from '@env';
import React, {useEffect, useState} from "react";

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
    return getTokenData
}
/*
export function useToken() {
    const [token, setToken] = useState(null);
    async function fetchData() {
        const tokenData = await getTokenData();
        setToken(tokenData);
    }
    useEffect(() => {
        fetchData();
    }, []);
    return token;
}
 */

export async function getOptions(token) {
    return {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
}

export function useOptions() {
    const [token, setToken] = useState(null);
    const [options, setOptions] = useState(null);

    async function fetchData() {
        const tokenData = await getTokenData();
        setToken(tokenData);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (token) {
            const fetchOptions = async () => {
                const option = await getOptions(token.access_token);
                setOptions(option);
            };
            fetchOptions();
        }
    }, [token]);

    return options;
}
