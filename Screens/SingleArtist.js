import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Button, ScrollView, Image, TouchableOpacity} from 'react-native';
import { StackActions } from '@react-navigation/native';
import Footer from '../config/Footer';
import React from "react";
import { useRoute } from '@react-navigation/native';

export default function SingleArtist({ navigation }) {
    const route = useRoute();
    const { artist } = route.params;

    return (
        <View style={styles.container}>
            <TouchableOpacity
            style={styles.follow}
            >
                <Text>Follow</Text>
            </TouchableOpacity>
            <Image
                style={styles.artistImage}
                source={{
                    uri: artist.images[0].url,
                }}
            />
            <Text style={styles.header}>{artist.name}</Text>
            <Text style={styles.topTracks}>Top tracks</Text>



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
    follow: {
        borderColor: "#FFFFFF",
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        padding: 3,
        marginBottom: 5,
        display: "flex",
        justifyContent: "flex-end"
    },
    header: {
        color: "#FFFFFF",
        fontSize: 40,
        paddingTop: 10
    },
    artistImage: {
        width: 300,
        height: 300
    },
    topTracks: {

    }
});