import React, {useState, useLayoutEffect, useEffect} from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    SafeAreaView,
    Text,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';

import HistoryEntryFinishedGame from "./HistoryEntryFinishedGame"
import HistoryEntryStartedGame from "./HistoryEntryStartedGame"
import HistoryEntryAfterOpp from "./HistoryEntryAfterOpp"
import HistoryEntryFinishedGameOpp from './HistoryEntryFinishedGameOpp';

import firebase from "../../../config/firebase";
import BackgroundContainer from '../BackgroundContainer';
import {human} from 'react-native-typography'
import {withNavigation} from 'react-navigation';


const GameHistory = (props) => {

    const navigation = props.navigation

    const [games, //contains pressed button numbers of user, all pressed: [2,3,4,5]
        setGames] = useState({started: 0, finished: 0, userId: "", games_played: []});

    const [isLoading,
        setIsLoading] = useState(true);

    const _fetchData = async() => {

        //setIsLoading(true)
        const db = firebase.firestore()

        var random = Math.floor(Math.random() * 100000) + 1;
        //const ref = db.collection('MultipleChoiceSets')
        console.log(random)

        const GetUserId = async() => {
            //return await AsyncStorage.getItem('username');
            return await AsyncStorage.getItem('userId');
        };
        const userId = await GetUserId()

        const navToResult = props.navigation.getParam("showResult", 0) 

        //Rewrite with onsnapshot --> just fetch changes
        async function GetStartedGames(db) {
            let startedGames = [];
            let campaignsRef = db.collection('PlayedGames')
            let activeRef = await campaignsRef
                .where('userId', '==', userId)
                .where('finished', '==', 0)
                .orderBy('started')
                .get();
            var i = 0;
            for (doc of activeRef.docs) {
                startedGames.push(doc.data())
                startedGames[i].id = doc.id
                const started = new Date(startedGames[i].started)
                startedGames[i].started = ("0" + (started.getMonth() + 1)).slice(-2) + "/" + ("0" + started.getDay()).slice(-2) + "/" + (started.getUTCFullYear().toString().substr(-2))
                startedGames[i].startedGame = 1
                i++;
            }

            return startedGames;
        }

        async function GetStartedGamesByOpp(db) {
            let startedGames = [];
            let campaignsRef = db.collection('PlayedGames')
            let activeRef = await campaignsRef
                .where('userId2', '==', userId)
                .where('finished', '==', 0)
                .orderBy('started')
                .get();
            var i = 0;
            for (doc of activeRef.docs) {
                startedGames.push(doc.data())
                startedGames[i].id = doc.id
                const started = new Date(startedGames[i].started)
                startedGames[i].started = ("0" + (started.getMonth() + 1)).slice(-2) + "/" + ("0" + started.getDay()).slice(-2) + "/" + (started.getUTCFullYear().toString().substr(-2))
                i++;
            }

            return startedGames;
        }

        async function GetFinishedGames(db) {
            let finishedGames = [];
            let campaignsRef = db.collection('PlayedGames')
            let activeRef = await campaignsRef
                .where('userId', '==', userId)
                .where('finished', '>', '0')
                .orderBy('finished')
                .limit(20)
                .get();
            var i = 0;
            for (doc of activeRef.docs) {
                finishedGames.push(doc.data())
                finishedGames[i].id = doc.id
                const started = new Date(finishedGames[i].started)
                const finished = new Date(finishedGames[i].finished)
                finishedGames[i].started = ("0" + (started.getMonth() + 1)).slice(-2) + "/" + ("0" + started.getDay()).slice(-2) + "/" + (started.getUTCFullYear().toString().substr(-2))
                finishedGames[i].finished = ("0" + (started.getMonth() + 1)).slice(-2) + "/" + ("0" + finished.getDay()).slice(-2) + "/" + (finished.getUTCFullYear().toString().substr(-2))
                finishedGames[i].showResult = navToResult
                i++;
                console.log("test")
            }
            return finishedGames;
        }

        async function GetFinishedGamesOpp(db) {
            let finishedGames = [];
            let campaignsRef = db.collection('PlayedGames')
            let activeRef = await campaignsRef
                .where('userId2', '==', userId)
                .where('finished', '>', '0')
                .orderBy('finished')
                .limit(20)
                .get();
            var i = 0;
            for (doc of activeRef.docs) {
                finishedGames.push(doc.data())
                finishedGames[i].id = doc.id
                const started = new Date(finishedGames[i].started)
                const finished = new Date(finishedGames[i].finished)
                finishedGames[i].started = ("0" + (started.getMonth() + 1)).slice(-2) + "/" + ("0" + started.getDay()).slice(-2) + "/" + (started.getUTCFullYear().toString().substr(-2))
                finishedGames[i].finished = ("0" + (started.getMonth() + 1)).slice(-2) + "/" + ("0" + finished.getDay()).slice(-2) + "/" + (finished.getUTCFullYear().toString().substr(-2))
                finishedGames[i].finishedGameOpp = true
                finishedGames[i].showResult = navToResult
                i++;
                console.log("test")
            }
            return finishedGames;
        }

        try {
            const startedGamesByOpp = await GetStartedGamesByOpp(db);
            const startedGames = await GetStartedGames(db);
            const finishedGames = await GetFinishedGames(db);
            const finishedGamesOpp = await GetFinishedGamesOpp(db);
            const fetchedGames = startedGamesByOpp.concat(startedGames, finishedGames, finishedGamesOpp);
            setGames(fetchedGames);
            setIsLoading(false);
            //let i = 100000* 1000000/3 /9/8;

        } catch (err) {
            console.log('Error getting game data', err)
            //setIsLoading(false);
        }
    }

    //const isFocused = props.navigation.isFocused();

    useLayoutEffect(() => {
        const isFocused = props
            .navigation
            .isFocused();

        // manually judge if the screen is focused if did, fire api call
        if (isFocused) {
            // do the same API calls here
            _fetchData()
        }

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

    function Item({ //return different History Items
        started,
        userId,
        userId2,
        username,
        username2,
        result,
        finished,
        startedGame,
        games_played,
        playedGameDocId,
        games_playedUser2,
        finishedGameOpp,
        showResult
    }) { //Each item in the list will be render like this item
        if (finishedGameOpp) {
            return (
                <HistoryEntryFinishedGameOpp
                    started={started}
                    userId={userId}
                    userId2={userId2}
                    username={username}
                    username2={username2}
                    result={result}
                    finished={finished}
                    games_played={games_played}
                    games_playedUser2={games_playedUser2}
                    showResult={showResult}
                    playedGameDocId={playedGameDocId}></HistoryEntryFinishedGameOpp>
            );
        } else if (finished) {
            return (
                <HistoryEntryFinishedGameOpp
                    userId={userId}
                    started={started}
                    userId2={userId2}
                    username={username}
                    username2={username2}
                    result={result}
                    finished={finished}
                    games_played={games_played}
                    showResult={showResult}
                    playedGameDocId={playedGameDocId}></HistoryEntryFinishedGameOpp>
            );
        } else if (startedGame) {
            return (
                <HistoryEntryStartedGame
                    userId={userId}
                    started={started}
                    userId2={userId2}
                    username={username}
                    username2={username2}
                    result={result}
                    finished={finished}
                    games_played={games_played}
                    playedGameDocId={playedGameDocId}></HistoryEntryStartedGame>
            );
        } else {
            return (
                <HistoryEntryAfterOpp
                    started={started}
                    userId={userId}
                    userId2={userId2}
                    username={username}
                    username2={username2}
                    result={result}
                    finished={finished}
                    games_played={games_played}
                    playedGameDocId={playedGameDocId}></HistoryEntryAfterOpp>
            );
        }
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <Text style={[human.title1, styles.titel]}>Game History</Text>
                <FlatList
                    data={games}
                    renderItem={({item}) => <Item
                    started={item.started}
                    userId={item.userId}
                    userId2={item.userId2}
                    username={item.username}
                    username2={item.username2}
                    result={item.result}
                    finished={item.finished}
                    startedGame={item.startedGame}
                    games_played={item.games_played}
                    games_playedUser2={item.games_playedUser2}
                    finishedGameOpp={item.finishedGameOpp}
                    showResult={item.showResult}
                    playedGameDocId
                    ={item.id}
                    id={item.id}/>}
                    keyExtractor={item => item.id}/>
            </SafeAreaView>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20,
        marginHorizontal: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        //justifyContent: 'center', borderWidth: 1
        borderRadius: 10,
        minWidth: "90%",
        //marginTop: 10
    },
    titel: {
        marginTop: 10,
        marginBottom: 0,
        textAlign: "center"
    },
    text: {
        fontSize: 42,
        //borderWidth: 1,
        padding: 5,
        margin: 10,
        textAlign: "center"
    },
    activityIndicator: {
        justifyContent: "center",
        flex: 1
    }
});

export default withNavigation(GameHistory)

const style = {};
