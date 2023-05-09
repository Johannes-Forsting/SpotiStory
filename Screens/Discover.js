import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Button, ScrollView} from 'react-native';
import { StackActions } from '@react-navigation/native';
import Footer from '../config/Footer';
import React from "react";

export default function Discover({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>"Discover screen" Indsæt lort her</Text>
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
        paddingTop: "30%",
    },
    header: {
        color: "#FFFFFF",
        fontSize: 40

    }
});