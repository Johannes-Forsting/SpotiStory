import {StyleSheet, Text, View, Button, TextInput, TouchableOpacity} from 'react-native';

export default function App() {
    return (
        <View style={styles.container}>
            <TextInput placeholderTextColor={"#1DB954"} placeholder={"Search"} style={styles.searchInput}>
            </TextInput>
            <View style={styles.searchButtonContainer}>
                <TouchableOpacity style={styles.searchButton}>
                    <Text style={styles.buttonText}>Search Artist</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.searchButton}>
                    <Text style={styles.buttonText}>Search Album</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.searchButton}>
                    <Text style={styles.buttonText}>Search Genre</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#353535',
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            gap: 100
        },

        searchButtonContainer:{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            gap: 20
        },

        searchInput:{
            color: "#1DB954",
            width: 250,
            maxHeight: 45,
            textAlign: "left",
            fontWeight: "bold",
            paddingHorizontal: 20,
            flex: 1,
            backgroundColor: "#555555",
            borderRadius: 25,
        },

        searchButton:{
            backgroundColor:"#1Db954",
            width:250,
            maxHeight:40,
            minHeight:40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius:25,
        },

        buttonText:{
            color:"#252525",
            fontWeight:"bold",

        }





    }
)