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


const [Token, setToken] = useState(null);
const [Artist, setArtist] = useState(null);
const [text, onChangeText] = React.useState('Useless Text');




//Link til autharization. Brug af client ID, redirect URI og response type
//https://accounts.spotify.com/en/authorize?client_id=fc9ae9d9128745a6bd09dc06766a708e&redirect_uri=localhost:8080&response_type=token

async function getToken(){
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "grant_type=client_credentials&client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET
    };
    const getTokenData = await fetch("https://accounts.spotify.com/api/token", options)
        .then(res => res.json())
        .catch(error => console.error(error));
    setToken(getTokenData);
}

async function getArtist(artistString) {
    const options = {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + Token.access_token.toString()
        }
    };
    const getArtistData = await fetch("https://api.spotify.com/v1/artists/" + artistString, options)
        .then(res => res.json())
        .catch(error => console.error(error));
    setArtist(getArtistData);
}

useEffect( () => {
    getToken();
}, [])

useEffect( () => {
    if (Token) {
        const lilNas = "7jVv8c5Fj3E9VhNjxT4snq"
        getArtist(lilNas);
    }
}, [Token])

function getInfo(){
    const lilNas = "7jVv8c5Fj3E9VhNjxT4snq"
    const kimLarsen = "2ZQifdPOptKHxTaYTLh0BC"
    let artist = kimLarsen
    if(text.toLowerCase() === "kim"){
        artist = kimLarsen
    }else if(text.toLowerCase() === "lil"){
        artist = lilNas
    }
    getArtist(artist)
}