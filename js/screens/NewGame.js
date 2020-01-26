import React, {useState} from 'react';
import {
    Button,
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    ScrollView,
    AsyncStorage,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';

import {material} from 'react-native-typography';

import firebase from "../../config/firebase";
import GameHistory from "../components/GameHistory/GameHistoryComponent"
import BackgroundContainer from '../components/BackgroundContainer';

export default function App(props) {

    const [isLoading,
        setIsLoading] = useState(false);

    async function NavigateToRandomGame() {

        setIsLoading(true);

        const GetUserId = async() => {
            //return await AsyncStorage.getItem('username');
            return await AsyncStorage.getItem('userToken');
        };

        const GetRandomUser = async(db, userIdRandom) => { //Get a random opponent => get random second user id, but ignore own userid
            let campaignsRef = db.collection('users')
            let activeRef = await campaignsRef
                .where('random', '>=', random)
                .where('random', '>', userIdRandom) //("not" queries are not supported by firestore, therefore > and <)
                .orderBy('random')
                .limit(1)
                .get();
            for (doc of activeRef.docs) {
                return doc.id;
            }
        }

        const GetRandomUser2 = async(db, userIdRandom) => { //Get a random opponent => get random second user id, but ignore own userid
            let campaignsRef = db.collection('users')
            let activeRef = await campaignsRef
                .where('random', '>=', random)
                .where('random', '<', userIdRandom) //("not" queries are not supported by firestore, therefore > and <)
                .orderBy('random')
                .limit(1)
                .get();
            for (doc of activeRef.docs) {
                return doc.id;
            }
        }

        const random = Math.floor(Math.random() * 100000) + 1;
        console.log("random:" + random)

        let randomUserId = 0;
        let userId = 0;
        const userIdRandom = await AsyncStorage.getItem('userRandom'); 
        try {

            let x=0;
            while (randomUserId === 0) {
                userId = await GetUserId()
                const db = firebase.firestore();
                const fetchedRandomUserId = await GetRandomUser(db, userIdRandom) //Get random user id
                //If user id is the same perform another query, to complete the "not same user id" logic
                const fetchedRandomUserId2 = await GetRandomUser2(db, userIdRandom)
                if (fetchedRandomUserId !== userId && fetchedRandomUserId) {
                    randomUserId = fetchedRandomUserId
                } else if (fetchedRandomUserId2 !== userId && fetchedRandomUserId2) {
                    randomUserId = fetchedRandomUserId2
                } else {
                    randomUserId = 0;
                }
                if (x >= 10) {
                    break;
                }
                x++;
            }
        } catch (err) {
            console.log('Error getting userIds', err)
            alert("Failed to get your data. Please check your internet connection and retry!")
            setIsLoading(false);
            return;
        }

        if (!randomUserId) {
            alert("Failed to find a second user. Please check your internet connection!")
            setIsLoading(false);
            return;
        }

        const navigationProperties = {
            round: 1,
            playStyle: 'competetive',
            userId: userId,
            userId2: randomUserId
        };

        var RandomNumber = Math.floor(Math.random() * 3) + 1;

        let RandomScreen = "";
        if (RandomNumber === 1) {
            RandomScreen = "GuessPicture";
        } else if (RandomNumber === 2) {
            RandomScreen = "LinkingGame"
        } else {
            RandomScreen = "MultipleChoice"
        }

        //setRand(RandomNumber); //change random state for next render
        setIsLoading(false);
        props
            .navigation
            .navigate(RandomScreen, navigationProperties); //naviaget to random game
    }

    //const [rand,
        //setRand] = useState(Math.floor(Math.random() * 3) + 1); //Set random starting number for the random game vs opponent

    if (isLoading === true) { //return loading screen, if data is loading
        return (
            <BackgroundContainer>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="darkorange"></ActivityIndicator>
                </View>
            </BackgroundContainer>
        )
    }

    return (
        <BackgroundContainer>
            <View style={styles.container}>
                <TouchableHighlight
                    style={styles.startButton}
                    onPress={() => props.navigation.navigate("Categories")}
                    underlayColor="white">
                    <View style={styles.button}>
                        <Text style={[material.button, styles.buttonText]}>Train yourself</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.startButton}
                    onPress={() => (NavigateToRandomGame())}
                    underlayColor="white">
                    <View style={styles.button}>
                        <Text style={[material.button, styles.buttonText]}>Random opponent</Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.GameHistory}>
                    <GameHistory></GameHistory>
                </View>
            </View>
        </BackgroundContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        //backgroundColor: '#CEF6CE',
        flex: 1,
        alignItems: "center"
    },
    GameHistory: {
        flex: 5
    },
    scrollView: {
        backgroundColor: 'white',
        marginHorizontal: 20
    },
    text: {
        marginTop: 10,
        color: "white"
    },
    buttonText: {
        padding: "5%",
    },
    startButton: {
        margin: 15,
        borderRadius: 10,
        minWidth: "85%",
        aspectRatio: 1/4,
        flex: 1,
        backgroundColor: 'forestgreen',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: "white",
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 2
        },
        elevation: 2
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        minWidth: "85%",
    }

});