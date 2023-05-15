import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Button, ScrollView, Image, TouchableOpacity} from 'react-native';
import { StackActions } from '@react-navigation/native';
import Footer from '../config/Footer';
import React from "react";

export default function Discover({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Discover</Text>
                <TouchableOpacity>
                    <Image style={styles.shuffleButton} source={require("../assets/random-icon.png")}></Image>
                </TouchableOpacity>
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
        alignItems: "center",
    },

    headerContainer:{
        display:"flex",
        flexDirection:"row",
        width:"100%",
        alignItems: "flex-start",
        paddingTop: "25%",
        paddingHorizontal:"10%",
        justifyContent:"space-between",
    },

    header: {
        color: "#FFFFFF",
        fontSize: 30,
        fontWeight: "bold"
    },

    shuffleButton:{
        height:"auto",
        minHeight:40,
        minWidth:50,
        width:"auto",
    }




});
