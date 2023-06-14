import {StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Footer from '../config/Footer';
import React from "react";
import { useOptions } from '../config/TokenHandler';

export async function findArtists(options, artist){
    const getArtists = await fetch("https://api.spotify.com/v1/search?q=" + artist.toString() + "&type=artist", options)
        .then((res) => res.json())
        .catch((error) => console.error(error));

    const artists = []

    for (let i = 0; i < 50; i++) {
        if (getArtists.artists.items[i]){
            artists.push(getArtists.artists.items[i])
        }
    }

    return artists
}

function handleSearchArtist(options, search, setArtists) {
    findArtists(options, search)
        .then((artistObjects) => setArtists(artistObjects))
        .catch((error) => console.error(error));
}



export default  function Searching({navigation}) {
    const [textInputValue, setTextInputValue] = React.useState('');
    const [artists, setArtists] = React.useState([]);
    const options = useOptions();


    return (
        <View style={styles.container}>
            <View style={styles.searchInputContainer}>
                <Text style={styles.header}>Search</Text>
                <TextInput
                    placeholderTextColor={"#000000"}
                    placeholder={"What are you looking for?"}
                    style={styles.searchInput}
                    onChangeText={text => setTextInputValue(text)}
                    value={textInputValue}
                />
            </View>
            <View style={styles.searchButtonContainer}>
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={() => handleSearchArtist(options, textInputValue, setArtists)}>
                    <Text style={styles.buttonText}>Search Artist</Text>
                </TouchableOpacity>

            </View>
            <ScrollView style={styles.resultsContainer}>
                {artists.map((artist) => (
                    <TouchableOpacity
                        key={artist.id}
                        style={styles.itemButton}
                        onPress={() => navigation.navigate("SingleArtist", {artist})}
                    >
                        <Text style={styles.itemText}>{artist.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
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
        paddingTop: 80
    },

    searchButtonContainer:{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        gap: 20,
        paddingBottom:30,
    },

    searchInputContainer:{
        paddingBottom:20,
        paddingTop:10
    },

    resultsContainer:{
        maxHeight:450
    },

    searchInput:{
        color: "#000000",
        width: 300,
        maxHeight: 50,
        textAlign: "left",
        fontWeight: "bold",
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderRadius: 5,
    },

    searchButton:{
        backgroundColor:"#1Db954",
        width:300,
        maxHeight:45,
        minHeight:45,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius:25,
    },

    itemButton:{
        width:300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

    },

    itemText:{
        color:"#ffffff",
        fontWeight:"bold",
        fontSize:22,
        padding:12
    },

    buttonText:{
        color:"#FFFFFF",
        fontWeight:"bold",
    },

    header: {
        color: "#FFFFFF",
        fontSize: 30,
        paddingBottom:15,
        fontWeight: "bold"
    }
})
