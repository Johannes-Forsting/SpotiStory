import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

export default class Footer extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.button, styles.button1]}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Text style={styles.buttonText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.button2]}
                    onPress={() => navigation.navigate("Search")}
                >
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.button1]}
                    onPress={() => navigation.navigate("Saved")}
                >
                    <Text style={styles.buttonText}>Saved</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.button2]}
                    onPress={() => navigation.navigate("Discover")}
                >
                    <Text style={styles.buttonText}>Discover</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#353535',
        height: 50,

    },

    button: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        width: "25%",
        height: 90,
        backgroundColor:"#252525"
    },

    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#FFFFFF",
        textAlign: 'center',
    },
});
