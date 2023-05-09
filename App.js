import React, { useState, useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';


import HomeScreen from "./Screens/homescreen";
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
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}