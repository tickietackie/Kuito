import React, {useState, useEffect} from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
    ScrollView,
    SafeAreaView,
    AsyncStorage
} from 'react-native';
import {SettingsScreen} from "react-native-settings-screen"
import BackgroundContainer from '../components/BackgroundContainer';
//import component

export default function App(props) {

    if (props.visible === false) {
        //return null;
    }

    const [username,
        setUsername] = useState("");

    const [id,
        setId] = useState(0);

    const _fetchData = async() => {
        const GetUserId = async() => {
            return await AsyncStorage.getItem('userId');
        };

        const GetUsername = async() => {
            return await AsyncStorage.getItem('username');
        };
        const username = await GetUsername()
        console.log("test")
        setUsername(username)
        const id = await GetUserId()
        setId(id)

    }

    useEffect(() => { // code to run on component mount

        _fetchData()

    },) //pass an empty array to call it just with the first call --> }, [])

    const _signOutAsync = async() => {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            console.log(error)
        }

        props
            .navigation
            .navigate('Auth');
    };

    return (
        <BackgroundContainer>
            <View style={styles.container}>
                <SafeAreaView style={styles.settingsContainer}>
                    <ScrollView >
                        <Text style={styles.ScrollView}>Username: {username}</Text>
                        <Text style={styles.ScrollView}>User id: {id}</Text>
                        <View style={styles.startButton}>
                            <Button title="Sign Out" onPress={() => _signOutAsync()}/>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        </BackgroundContainer>
    );
}

const styles = StyleSheet.create({
    settingsContainer: {
        margin: "4%"
    },
    ScrollView: {
        padding: "4%"
    },
    backContainer: {
        position: "absolute",
        bottom: 10,
        alignItems: 'center'
    },
    nextContainer: {
        position: "absolute",
        bottom: 10,
        right: 3
    }
});