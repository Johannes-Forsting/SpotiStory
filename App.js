import React, { useState, useEffect } from 'react';
import {WebView} from 'react-native-webview'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

import {CLIENT_SECRET, CLIENT_ID} from '@env';

export default function App() {
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

  return (
      <View style={styles.container}>
          <View style={styles.header}>
              <Text style={styles.header}>SPOTI</Text>
              <Text style={[styles.header, styles.indentet]}>STORY</Text>
          </View>

          {/*<TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
          />
          <Button
              onPress={getInfo}
              title="Change artist"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
          />
            <Text>NAME: {Artist ? Artist.name : 'Loading Artist name...'}</Text>
            <Text>GENRE: {Artist ? Artist.genres[0] : 'Loading genre...'}</Text>
            <StatusBar style="auto" />*/}

      </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#353535',
    alignItems: 'center',
    display: "flex",
      paddingTop: "20%"

  },
    input: {
        borderWidth: 2,
        width: "50%",
        height: 40
    }, webview: {
      backgroundColor: "red"
    },
    header: {
      color: "#1DB954",
        fontSize: 30,
        fontWeight: 'bold'
    },
    indentet: {
      marginLeft: "15%",
    }
});