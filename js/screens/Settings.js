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
import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';
import firebase from "../../config/firebase";
import Loading from "../components/Loading";
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

    async function GetPushNotificationToken() {
        const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        // only asks if permissions have not already been determined, because iOS won't
        // necessarily prompt the user a second time. On Android, permissions are
        // granted on app installation, so `askAsync` will never prompt the user Stop
        // here if the user did not grant permissions
        if (status !== 'granted') {
            alert('No notification permissions!');
            return;
        }

        // Get the token that identifies this device
        let token = await Notifications.getExpoPushTokenAsync();
        await AsyncStorage.setItem('token', token);

        return token;
    }

    const GetUserId = async() => {
        return await AsyncStorage.getItem('userId');
    };

    async function UpdateUser(db, token) { //Update user elo and KDA

        const userId = await GetUserId()

        let userRef = db
            .collection('users')
            .doc(userId)

        let updateduser = await userRef.set({
            token: token
        }, {merge: true});

    }

    async function SetUpPushNotficications() {
        token = await GetPushNotificationToken()
        try {
            const db = firebase.firestore()
            await UpdateUser(db, token)
            alert("Success!")
        } catch (error) {
            alert(error + "Could not set up push notifications!")
        }
    }

    return (
        <BackgroundContainer>
            <View style={styles.container}>
                <SafeAreaView style={styles.settingsContainer}>
                    <ScrollView >
                        <Text style={styles.ScrollView}>Username: {username}</Text>
                        <Text style={styles.ScrollView}>User id: {id}</Text>
                        <View style={styles.startButton}>
                            <Button
                                title="Reconfigure push notifications"
                                onPress={() => SetUpPushNotficications()}/>
                            <Button title="Sign Out" onPress={() => _signOutAsync()}/>
                            <Button title="Send Push" onPress={() => SendPush()}/>
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