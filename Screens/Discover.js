import {ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Footer from '../config/Footer';
import React, {useEffect, useState} from "react";
import {useOptions} from "../config/TokenHandler";

const types = ["album", "artist", "playlist", "track"];
const randomOffset = Math.floor(Math.random() * 1000);
const characters = 'abcdefghijklmnopqrstuvwxyz';

function getRandomQuery() {
    let randomSearch = '';
    const randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length));
    switch (Math.round(Math.random())) {
        case 0:
            randomSearch = randomCharacter + '%';
            break;
        case 1:
            randomSearch = '%' + randomCharacter + '%';
            break;
    }
    randomSearch = encodeURIComponent(randomSearch)
    return randomSearch;
}

async function fetchItem(queryString, queryType, options){
    return await fetch("https://api.spotify.com/v1/search?q=" + queryString + "&type=" + queryType + "&offset=" + randomOffset, options)
        .then((res) => res.json())
        .catch((error) => console.error(error))
}

export default function Discover({ navigation }) {
    const options = useOptions();
    const [itemsArray, setItemsArray] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            setItemsArray([]);
            setIsLoading(true);
            try {
                if (options) {
                    for (let i = 0; i < 6; i++) {
                        const response = await fetchItem(getRandomQuery(), types[1], options);
                        console.log(response)
                        setItemsArray((prevItemsArray) => [...prevItemsArray, response]);
                        console.log("https://api.spotify.com/v1/search?q=" + getRandomQuery() + "&type=" + types[1] + "&offset=" + randomOffset)
                        console.log(itemsArray)
                    }
                    setIsLoading(false);
                }
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };
        fetchItems();
    }, [options]);



    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Discover</Text>
                <TouchableOpacity>
                    <Image style={styles.shuffleButton} source={require("../assets/random-icon.png")}></Image>
                </TouchableOpacity>
            </View>
            <View style={styles.categoriesContainer}>
                {isLoading ? (
                    <ActivityIndicator color="#FFFFFF" size="large" />
                ) : (
                    itemsArray.map((item) => {
                        switch (item.artists.items[0].type) {
                            case 'artist':
                                return (
                                    <TouchableOpacity style={styles.categoryContainer}>
                                        <Text style={styles.categoryText}>Artist</Text>
                                        <Text style={styles.itemName}>{item.artists.items[0].name}</Text>
                                    </TouchableOpacity>
                                );
                            case 'album':
                                return (
                                    <TouchableOpacity style={styles.categoryContainer}>
                                        <Text style={styles.categoryText}>Album</Text>
                                    </TouchableOpacity>
                                );
                            case 'playlist':
                                return (
                                    <TouchableOpacity style={styles.categoriesContainer}>
                                        <Text style={styles.categoryText}>Playlist</Text>
                                    </TouchableOpacity>
                                );
                            case 'track':
                                return (
                                    <TouchableOpacity style={styles.categoriesContainer}>
                                        <Text style={styles.categoryText}>Track</Text>
                                    </TouchableOpacity>
                                );
                            default:
                                return (
                                    <TouchableOpacity style={styles.categoriesContainer}>
                                        <Text style={styles.categoryText}>NO CASE MATCH</Text>
                                    </TouchableOpacity>
                                ); // or any other component for other types
                        }
                    })
                )}
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
    },

    categoriesContainer:{
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"space-between",
        width:"100%",
        paddingTop:"25%",
        paddingHorizontal:"10%",
        gap:10
    },

    categoryContainer:{
        display:"flex",
        width:"48%",
        borderRadius:5,
        height:100,
        backgroundColor:"#1Db954",
        shadowOffset:{width:3, height:5},
        shadowRadius:10,
        shadowOpacity:.3,
        justifyContent:"center",
        alignItems:"center",
    },

    categoryText:{
        maxWidth:"90%",
        color:"#FFFFFF",
        fontWeight:"bold",
        fontSize:18,
    },

    itemName:{
        maxWidth:"90%",
        color:"#FFFFFF",
        fontWeight:"bold",
        fontSize:18,
    }




});
