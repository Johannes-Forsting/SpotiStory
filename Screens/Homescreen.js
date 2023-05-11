import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Button, View, ScrollView, Text, Image} from 'react-native';
import Footer from '../config/Footer';
import React, {useState, useEffect} from "react";








export default function HomeScreen({ navigation }) {


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.header}>SPOTI</Text>
                <Text style={[styles.header, styles.indented]}>STORY</Text>
            </View>
            <Image
                style={styles.logo}
                source={require("../assets/SpotifyLogo.png")}
            />
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
        paddingTop: "30%"

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
        fontSize: 70,
        fontWeight: 'bold',
    },
    indented: {
        marginLeft: "15%",
    },
    buttons: {
        display: "flex",
        flexDirection: "row"
    },
    logo: {
        marginTop: "30%",
        width: 200,
        height: 200
    }
});