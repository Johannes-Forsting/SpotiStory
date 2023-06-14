import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import Footer from '../config/Footer';
import React, { useState, useEffect } from "react";
import { database } from "../config/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";

const artistCollection = 'artists';

export function readDB(setArtists) {
    const collectionRef = collection(database, artistCollection);
    const q = query(collectionRef, ref => ref.orderBy('createdAt', 'desc'));
    onSnapshot(q, snapshot => {
        const artists = snapshot.docs.map(doc => {
            return {
                ...doc.data(),
                key: doc.id
            };
        });
        setArtists(artists);
    });
}

function checkName(name, maxLength){
    if(name.length <= maxLength){
        return name
    } else{
        return name.substring(0, maxLength) + "..."
    }
}

export default function Saved({navigation}) {
    const [artists, setArtists] = useState([]);


    useEffect(() => {
        readDB(setArtists); // Pass the setArtists function to the readDB function
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header} >Your saved artists</Text>
            </View>
            <View style={styles.artists}>
                <ScrollView style={styles.scroll}>
                    {artists.map(artist => (

                        <TouchableOpacity
                            key={artist.id}
                            style={styles.artist}
                            onPress={() => navigation.navigate("SingleArtist", {artist})}
                        >
                            <Image
                                style={styles.artistImage}
                                source={{
                                    uri: artist.images[0].url,
                                }}
                            />
                            <Text style={styles.artistName}>{checkName(artist.name, 20)}</Text>
                        </TouchableOpacity>
                        ))}
                </ScrollView>
            </View>
            <ScrollView></ScrollView>
            <View>
                <Footer navigation={navigation} />

            </View>
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
    header: {
        color: "#FFFFFF",
        fontSize: 30,
        fontWeight: "bold"
    },
    headerContainer:{
        display:"flex",
        flexDirection:"row",
        width:"100%",
        alignItems: "flex-start",
        paddingHorizontal:"10%",
        justifyContent:"space-between",
    },
    artists: {
        display: "flex",
        width: "100%",
        justifyContent: 'center',

        alignItems: "center",
        marginTop: 30

    },
    scroll: {
       height: "77%"
    },
    artist: {
        display: "flex",
        flexDirection: "row",
        width: 300,
        padding: 10,
        alignItems: "center",
        borderColor: "#FFFFFF",
        borderRadius: 40,
        margin: 5,
        backgroundColor: "#252525",


    },
    artistName: {
        color: "#FFFFFF",
        fontSize: 20,
        marginLeft: 20,
    },
    artistImage: {
        width: 50,
        height: 50,
        marginLeft: 4,
        borderRadius: 40,
    }


});
