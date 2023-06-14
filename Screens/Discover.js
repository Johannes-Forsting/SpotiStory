import {ActivityIndicator, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Footer from '../config/Footer';
import React, {useCallback, useEffect, useState} from "react";
import {useOptions} from "../config/TokenHandler";

const types = ["album", "artist", "playlist", "track"];

function getRandomOffset(){
    return Math.floor(Math.random() * 1000);
}

function getRandomQuery() {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
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

async function fetchItem(queryString, queryType, randomOffset, options){
    return await fetch("https://api.spotify.com/v1/search?q=" + queryString + "&type=" + queryType + "&offset=" + randomOffset + "&limit=1", options)
        .then((res) => res.json())
        .catch((error) => console.error(error))
}

export default function Discover({ navigation }) {
    const options = useOptions();
    const [itemsArray, setItemsArray] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchItems = useCallback(async () => {
        setIsLoading(true);
        try {
            if (options) {
                let tempItemsArray = [];
                let fetchedIds = [];
                while (tempItemsArray.length < 8) {
                    const response = await fetchItem(getRandomQuery(), types[1], getRandomOffset(), options);
                    let item;
                    switch (types[1]){
                        case 'artist':
                            item = response.artists.items[0]
                            break
                        case 'album':
                            item = response.albums.items[0]
                            break
                        case 'playlist':
                            item = response.playlists.items[0]
                            break
                        case 'track':
                            item = response.tracks.items[0]
                            break
                    }
                    // Only add item to array if it is not undefined and not already fetched
                    if (item && !fetchedIds.includes(item.id)) {
                        fetchedIds.push(item.id);
                        tempItemsArray.push(item);
                    }
                }
                setItemsArray(tempItemsArray);
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }, [options]);


    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Discover</Text>
                <TouchableOpacity onPress={fetchItems} disabled={isLoading}>
                    <Image style={styles.shuffleButton} source={require("../assets/random-icon.png")}></Image>
                </TouchableOpacity>
            </View>
            <View style={styles.categoriesContainer}>
                {isLoading ? (
                    <ActivityIndicator color="#FFFFFF" size="large" />
                ) : (
                    itemsArray.map((item) => {

                        const imageUrl = item && item.images && item.images.length > 0 ? item.images[0].url : null;
                        return imageUrl ? (
                            <TouchableOpacity onPress={()=>navigation.navigate("SingleArtist",{artist: item})} key={item.id} style={styles.categoryContainer}>
                                <ImageBackground
                                    source={{ uri: imageUrl }}
                                    style={styles.backgroundImage}>
                                    {/*<Text style={styles.categoryText}>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</Text>*/}
                                    <Text style={styles.itemName}>{item.name}</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity key={item.id} style={styles.categoryContainer}>
                                <View style={styles.noImageBackground}>
                                    {/*<Text style={styles.categoryText}>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</Text>*/}
                                    <Text style={styles.itemName}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )
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

    itemName:{
        maxWidth:"90%",
        color:"#FFFFFF",
        fontWeight:"bold",
        fontSize:18,
        textShadowOffset:{width:1, height:1},
        textShadowRadius:2,
        textShadowColor:"#000000",
        alignItems:"center"
    },

    backgroundImage: {
        flex: 1,
        width:"100%",
        borderRadius:.1,
        justifyContent: "center",
        alignItems: "center"
    },

    noImageBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1Db954"
    }

});
