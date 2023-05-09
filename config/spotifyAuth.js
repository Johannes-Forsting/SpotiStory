import {Text} from "react-native";
import {WebView} from "react-native-webview";
import React, {useEffect, useState} from "react";

import {CLIENT_SECRET, CLIENT_ID} from '@env';


const [accessToken, setAccessToken] = useState(null);
const REDIRECT_URI = "localhost:8080/spotify-auth"
const authUrl = "https://accounts.spotify.com/authorize?client_id=" + CLIENT_ID + "&response_type=token&redirect_uri=" + REDIRECT_URI + "&scope=user-read-email%20user-read-private";

function handleNavigationStateChange(state) {
    // Check if the WebView has navigated to the final page after the user authorizes your app
    if (state.url.startsWith(REDIRECT_URI) && state.url.includes('access_token=')) {
        // Extract the access token from the URL
        const accessToken = state.url.split('access_token=')[1].split('&')[0];
        setAccessToken(accessToken);
    }
}

return (
    <>
        {accessToken ? (
            // Display your app UI with the access token
            <Text>Access token: {accessToken}</Text>
        ) : (
            // Display the WebView with the Spotify authorization page
            <WebView
                source={{ uri: authUrl }}
                onNavigationStateChange={handleNavigationStateChange}
            />
        )}
    </>
);





//Link til autharization. Brug af client ID, redirect URI og response type
//https://accounts.spotify.com/en/authorize?client_id=fc9ae9d9128745a6bd09dc06766a708e&redirect_uri=localhost:8080&response_type=token


