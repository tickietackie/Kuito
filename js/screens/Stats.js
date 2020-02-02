import React, {Component, useState, useLayoutEffect, useEffect} from 'react';
import {
    Platform,
    StyleSheet,
    SafeAreaView,
    Button,
    StatusBar,
    View,
    Text,
    AsyncStorage
} from 'react-native';

import {material} from 'react-native-typography';

import firebase from "../../config/firebase";
import {withNavigation} from 'react-navigation';

import BackgroundContainer from '../components/BackgroundContainer';
import HeaderText from '../components/HeaderText';

import GameHistory from '../components/GameHistory/GameHistoryComponent'

export default function Leaderboard(props) {

    const [KDA,
        setKDA] = useState({
            wins: "-",
            remis: "-",
            losses: "-"
        });

    const [elo,
        setElo] = useState("-");

    const navigation = props.navigation

    const [isLoading,
        setIsLoading] = useState(false);

    const _fetchData = async() => {

        //setIsLoading(true)
        const db = firebase.firestore()

        var random = Math.floor(Math.random() * 100000) + 1;

        const GetUserId = async() => {
            //return await AsyncStorage.getItem('username');
            return await AsyncStorage.getItem('userId');
        };

        const userId = await GetUserId();

        //Rewrite with onsnapshot --> just fetch changes
        async function GetUserElo() {
            let startedGames = [];
            let campaignsRef = db.collection('users')
            let activeRef = await campaignsRef
                .where('userId', '==', userId)
                .get();
            var i = 0;
            for (doc of activeRef.docs) {
                const data= doc.data();
                return data.elo
            }
        }

        let KDA = {
            wins: 0,
            remis: 0,
            losses: 0
        }

        async function GetUserKDAPart1() {
            let campaignsRef = db.collection('PlayedGames')
            let activeRef = await campaignsRef
                .where('userId', '==', userId)
                .where("finished", ">", "0")
                .get();
            var i = 0;
            for (doc of activeRef.docs) {
                const data = doc.data();
                if (data.user1Wins === 1 && data.user2Wins === 0) {
                    KDA.wins++;
                }
                else if (data.user1Wins === 0 && data.user2Wins === 1) {
                    KDA.losses++;
                }
                else if (data.user1Wins === 0 && data.user2Wins === 0) {
                    KDA.remis++;
                }
            }
        }

        async function GetUserKDAPart2() {
            let campaignsRef = db.collection('PlayedGames')
            let activeRef = await campaignsRef
                .where('userId2', '==', userId)
                .where("finished", ">", "0")
                .get();
            var i = 0;
            for (doc of activeRef.docs) {
                const data = doc.data();
                if (data.user1Wins === 0 && data.user2Wins === 1) {
                    KDA.wins++;
                }
                else if (data.user1Wins === 1 && data.user2Wins === 0) {
                    KDA.losses++;
                }
                else if (data.user1Wins === 0 && data.user2Wins === 0) {
                    KDA.remis++;
                }
            }
        }

        try {
            const elo = await GetUserElo()
            await GetUserKDAPart1()
            await GetUserKDAPart2()
            setElo(elo)
            setKDA(KDA)
        } catch (err) {
            console.log('Error getting game data', err)
            //setIsLoading(false);
        }
    }

    useEffect(() => { // code to run on component mount

        const GetUserId = async() => {
            //return await AsyncStorage.getItem('username');
            return await AsyncStorage.getItem('userId');
        };

        const userId = "empty"
        

        //_fetchData()
        const db = firebase.firestore();
        const ref = db
            .collection('users')
            .where('userId', '==', userId)
                    
        /*return ref.onSnapshot(querySnapshot => {
            let fetchedUserData = [];
            let i = 0;
            querySnapshot.forEach(doc => {
                const data = doc.data()
                fetchedUserData.push(data.elo);
            });
            setElo(fetchedUserData)

            if (isLoading) {
                setIsLoading(false)
            }
        });*/

    }, []) //pass an empty array to call it just with the first call --> }, [])

    useLayoutEffect(() => {     //useLayoutEffect to trigger every time the screen is navigated towards

        
        const isFocused = props
            .navigation
            .isFocused();

        // manually judge if the screen is focused if did, fire api call
        if (isFocused) {
            // do the same API calls here
            _fetchData()
        }

        //Workaround because react navigation doesn't support hooks yet, this should be updated with release of react navigation V5
        const navFocusListener = navigation.addListener('didFocus', () => {
            // do some API calls here

            _fetchData()
        });

        return () => {
            navFocusListener.remove();
        };
    }, []);

    //pass an empty array to call it just with the first call --> }, [])

    if (isLoading === true) { //return loading screen, if data is loading
        return (
            <BackgroundContainer>
                <View style={styles.container}>
                    <Text style={[human.title1, styles.titel]}>Game History</Text>
                    <View style={styles.activityIndicator}>
                        <ActivityIndicator size="large" color="darkorange"></ActivityIndicator>
                    </View>
                </View>
            </BackgroundContainer>
        )
    }

    return (
        <BackgroundContainer>
            <StatusBar hidden />
            <SafeAreaView style={styles.container}>
                <View style={styles.eloContainer}>
                    <Text style={[material.display2, styles.eloText]}>Current rtgØ: {elo}</Text>
                </View>
                <View style={styles.kdaContainer}>
                    <View style={styles.win}>
                        <Text style={[material.display1, styles.kdaText]}>{KDA.wins}</Text>
                    </View>
                    <View style={styles.remi}>
                        <Text style={[material.display1, styles.kdaText]}>{KDA.remis}</Text>
                    </View>
                    <View style={styles.lose}>
                        <Text style={[material.display1, styles.kdaText]}>{KDA.losses}</Text>
                    </View>
                </View>
            </SafeAreaView>
            <GameHistory></GameHistory>
        </BackgroundContainer>

    );

}

const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    eloContainer: {
        minHeight: "0%",
        margin: "0%",
        marginBottom: "3%",
        alignItems: 'center',
        justifyContent: "center"
    },
    eloText: {
        color: "#006666",
        textAlign: "center"
    },
    kdaContainer: {
        padding: "5%",
        width: "80%",
        minHeight: "10%",
        flexDirection: "row",
        paddingBottom: "20%"
    },
    win: {
        flex: 1,
        backgroundColor: "limegreen",
        alignItems: "center",
        justifyContent: "center"
    },
    remi: {
        flex: 1,
        backgroundColor: "gold",
        alignItems: "center",
        justifyContent: "center"
    },
    lose: {
        flex: 1,
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center"
    },
    kdaText: {
        color: "black"
    },
});
