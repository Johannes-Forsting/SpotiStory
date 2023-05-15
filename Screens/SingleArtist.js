import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Button, ScrollView, Image, TouchableOpacity} from 'react-native';
import { StackActions } from '@react-navigation/native';
import Footer from '../config/Footer';
import React, {useEffect} from "react";
import { useRoute } from '@react-navigation/native';
import {useOptions, useToken} from "../config/TokenHandler";

export async function findTopTracks(options, artistID) {
    try {
        const getTopTracks = await fetch(
            "https://api.spotify.com/v1/artists/" + artistID.toString() + "/top-tracks?market=DK", options);
        const topTracks = await getTopTracks.json();
        return topTracks;
    } catch (error) {
        console.error(error);
        return null;
    }
}


export default function SingleArtist({ navigation }) {
    const route = useRoute();
    const { artist } = route.params;
    const token = useToken();
    const options = useOptions(token);






    return (
        <View style={styles.container}>
            <View style={styles.buttons}>

                <TouchableOpacity
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>


                <TouchableOpacity
                style={styles.button}
                >
                    <Text style={styles.buttonText}>Follow</Text>
                </TouchableOpacity>

            </View>
            <Image
                style={styles.artistImage}
                source={{
                    uri: artist.images[0].url,
                }}
            />
            <Text style={styles.header}>{artist.name}</Text>

            <View style={styles.topTracksView}>
                <Text style={styles.topTracks}>Top tracks kommer til at være her i en scrollable liste</Text>


            </View>


            <ScrollView></ScrollView>
            <View><Footer navigation={navigation}/></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#353535',
        alignItems: 'center',
        display: "flex",
        paddingTop: "20%",
    },
    buttons: {
        display: "flex",
        flexDirection: "row",
        width: "85%",
        justifyContent: "space-between",

    },
    button: {
        borderColor: "#FFFFFF",
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 15,
        paddingRight: 15,
        padding: 3,
        marginBottom: 10,
        textAlign: "right"
    },
    buttonText: {
        color: "#FFFFFF"
    },
    header: {
        color: "#FFFFFF",
        fontSize: 40,
        paddingTop: 10
    },
    artistImage: {
        width: 250,
        height: 250
    },
    topTracks: {
        alignSelf: "flex-start",
        backgroundColor: "grey",
        fontSize: 30
    }
});