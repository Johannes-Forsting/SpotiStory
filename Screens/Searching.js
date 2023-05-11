import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Button, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { StackActions } from '@react-navigation/native';
import Footer from '../config/Footer';
import React from "react";
import { useToken, useOptions } from '../config/TokenHandler';
let name = []


export async function findArtists(options, artist){
    const getArtists = await fetch("https://api.spotify.com/v1/search?q=" + artist.toString() + "&type=artist", options)
        .then((res) => res.json())
        .catch((error) => console.error(error));
    return getArtists.artists.items[0].name.toString()
}

function handleSearchArtist(options, search, setArtistName) {
    findArtists(options, search)
        .then((artist) => setArtistName(artist))
        .catch((error) => console.error(error));
}



export default  function Searching({navigation}) {
    const [textInputValue, setTextInputValue] = React.useState('');
    const [artistName, setArtistName] = React.useState('');
    const token = useToken();
    const options = useOptions(token);


    return (
        <View style={styles.container}>
            <TextInput
                placeholderTextColor={"#1DB954"}
                placeholder={"Search"}
                style={styles.searchInput}
                onChangeText={text => setTextInputValue(text)}
                value={textInputValue}
            />
            <View style={styles.searchButtonContainer}>
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={() => handleSearchArtist(options, textInputValue, setArtistName)}>
                    <Text style={styles.buttonText}>Search Artist</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.searchButton}
                >
                    <Text style={styles.buttonText}>Search Album</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.searchButton}>
                    <Text style={styles.buttonText}>Search Genre</Text>
                </TouchableOpacity>

            </View>
            <Text style={styles.header}>{artistName ? artistName: "waiting for name..."}</Text>
            <ScrollView></ScrollView>
            <View><Footer navigation={navigation}/></View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#353535',
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        gap: 100,
        paddingTop: 80
    },

    searchButtonContainer:{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        gap: 20
    },

    searchInput:{
        color: "#1DB954",
        width: 250,
        maxHeight: 45,
        textAlign: "left",
        fontWeight: "bold",
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: "#555555",
        borderRadius: 25,
    },

    searchButton:{
        backgroundColor:"#1Db954",
        width:250,
        maxHeight:40,
        minHeight:40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius:25,
    },

    buttonText:{
        color:"#252525",
        fontWeight:"bold",

    },
    header: {
        color: "#FFFFFF",
        fontSize: 40

    }

})
