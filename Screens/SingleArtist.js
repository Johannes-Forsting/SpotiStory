
import {StyleSheet, Text, View, Button, ScrollView, Image, TouchableOpacity} from 'react-native';
import Footer from '../config/Footer';
import React, {useEffect, useState} from "react";
import { useRoute } from '@react-navigation/native';
import {useOptions} from "../config/TokenHandler";
import {database} from "../config/firebase";
import {readDB} from "../Screens/Saved";
import {collection, doc, addDoc, deleteDoc, where, query , getDocs} from "firebase/firestore";
const artistCollection = 'artists'

async function findTopTracks(options, artistID) {
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


function isInList(artist, listOfArtists){
    let isInList = false
    for (let i = 0; i < listOfArtists.length; i++) {
        if(listOfArtists[i].id === artist.id){
            isInList = true
        }
    }
    return isInList
}

async function saveArtist(artist, listOfArtists){
    if(isInList(artist, listOfArtists)){
        await removeFromList(artist);
    }else{
        await addDoc(collection(database, artistCollection), artist);
    }
}

async function removeFromList(artist) {
    try {
        const artistsRef = collection(database, artistCollection);
        const q = query(artistsRef, where("id", "==", artist.id));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((docSnapshot) => {
            deleteDoc(doc(database, artistCollection, docSnapshot.id));
        });

        console.log("Artist removed successfully");
    } catch (error) {
        console.error("Error removing artist:", error);
    }
}

function getFollowText(artist, listOfArtists){
    if(isInList(artist, listOfArtists)){
        return "Following"
    }
    return "Follow"
}


export default function SingleArtist({ navigation }) {
    const [topTracks, setTopTracks] = useState([]);
    const [artists, setArtists] = useState([]);
    const route = useRoute();
    const { artist } = route.params;
    const options = useOptions();


    var buttonProps = {
        style: isInList(artist, artists) ? [styles.button, styles.following]: [styles.button, styles.notFollowing],
        onPress :() => saveArtist(artist, artists)
    };




    useEffect(() => {
        const fetchTopTracks = async () => {
            try {
                if (options) {
                    const response = await findTopTracks(options, artist.id);
                    if (response && response.tracks) {
                        setTopTracks(response.tracks);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchTopTracks();
    }, [options, artist.id]);

    useEffect(() => {
        readDB(setArtists);
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.buttons}>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.buttonText}
                    >Back</Text>
                </TouchableOpacity>

                <TouchableOpacity {...buttonProps}>
                    <Text
                        style={isInList(artist, artists) ? styles.buttonTextFollowing: styles.buttonTextNotFollowing}
                    >
                        {getFollowText(artist, artists)}</Text>
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
                <Text style={styles.topTrackHeader}>TOP TRACKS</Text>
                {topTracks.slice(0, 5).map((track, index) => (
                    <Text style={styles.trackName} key={track.id}>
                        {`${index + 1}. ${track.name}`}
                    </Text>
                ))}
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
      color:"#FFFFFF"
    },
    buttonTextFollowing: {
        color: "#1DB954"
    },
    buttonTextNotFollowing: {
        color: "white"
    },
    header: {
        color: "#FFFFFF",
        fontSize: 40,
        paddingTop: 10,

    },
    artistImage: {
        width: 250,
        height: 250,
        borderRadius: 200
    },
    topTracksView: {
        backgroundColor: "#404040",
        width: "90%",
        padding: 15
    },
    topTrackHeader: {
        alignSelf: "center",
        fontSize: 20,
        fontWeight: "bold",
        color: "#1DB954",
        marginBottom: 30
    },
    trackName: {
        color: "#FFFFFF",
        fontSize: 16,
        marginTop: 10,
    },
    following: {
        borderColor: "#1DB954"
    },
    notFollowing: {
        borderColor: "white"
    }
});
