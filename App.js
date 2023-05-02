import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import {CLIENT_SECRET, CLIENT_ID} from '@env';

export default function App() {
  const [Token, setToken] = useState(null);
  const [Artist, setArtist] = useState(null);

  let artistString = "2ZQifdPOptKHxTaYTLh0BC"

    useEffect( () => {
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
        getToken();
        async function getArtist() {
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
        getArtist();

    }, [])

  return (
      <View style={styles.container}>
        <Text>TOKEN:</Text>
        <Text>{Token ? Token.access_token : 'Loading Token...'}</Text>
        <Text>NAME: {Artist ? Artist.name : 'Loading Artist name...'}</Text>
        <Text>GENRE: {Artist ? Artist.genres[0] : 'Loading genre...'}</Text>
        <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});