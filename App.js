import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import {CLIENT_SECRET, CLIENT_ID} from '@env';

export default function App() {
  const [Data, setData] = useState(null);
  const [Token, setToken] = useState(null);

    useEffect(() => {
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

    }, [])


  /*useEffect(() => {
    async function fetchData() {
      const dataFromAPI = await fetch("https://randomuser.me/api/")
          .then(res => res.json())
          .catch(error => console.error(error));
      setData(dataFromAPI);
    }
    fetchData();
  }, []);*/

  return (
      <View style={styles.container}>
        {/*<Text>Random person from API: </Text>
        <Text>{Data ? Data.results[0].name.title : 'Loading...'}</Text>
        <Text>{Data ? Data.results[0].name.first : 'Loading...'}</Text>
        <Text>{Data ? Data.results[0].name.last : 'Loading...'}</Text>*/}
        <Text>{Token ? Token.access_token : 'Loading Token...'}</Text>
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