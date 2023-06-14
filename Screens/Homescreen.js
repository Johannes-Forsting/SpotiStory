import {StyleSheet, View, ScrollView, Text, Image} from 'react-native';
import Footer from '../config/Footer';

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.header}>SPOTI</Text>
                <Text style={[styles.header, styles.indented]}>STORY</Text>
            </View>
            <View style={styles.spaceProper}>
                <Image
                    style={styles.logo}
                    source={require("../assets/SpotifyLogo.png")}
                />
            </View>
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
        paddingTop: "50%",
    },

    header: {
        color: "#1DB954",
        fontSize: 70,
        fontWeight: 'bold',
        gap: -25
    },

    indented: {
        marginLeft: "15%",
    },

    logo: {
        marginTop: "10%",
        width: 200,
        height: 200
    },

    spaceProper: {
        flex: 1
    },
});
