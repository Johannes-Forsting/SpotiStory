import React, { useState, useEffect } from 'react';

import HomeScreen from "./Screens/Homescreen";
import Discover from "./Screens/Discover";
import Searching from "./Screens/Searching";
import Saved from "./Screens/Saved";
import SingleArtist from "./Screens/SingleArtist";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();


export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Search"
                    component={Searching}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Saved"
                    component={Saved}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Discover"
                    component={Discover}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="SingleArtist"
                    component={SingleArtist}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

