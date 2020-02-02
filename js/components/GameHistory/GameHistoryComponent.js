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

    const [startedGames,
        setStartedGames] = useState([]);
    const [startedGamesByOpp,
        setStartedGamesByOpp] = useState([]);
    const [finishedGames,
        setFinishedGames] = useState([]);
    const [finishedGamesOpp,
        setFinishedGamesOpp] = useState([]);

    const fetchedGames = startedGamesByOpp.concat(startedGames, finishedGames, finishedGamesOpp);

    const GetUserId = async() => {
        //return await AsyncStorage.getItem('username');
        return await AsyncStorage.getItem('userId');
    };

    const _fetchData2 = async() => {
        const db = firebase.firestore();

        const userId = await GetUserId()

        const ref = db
            .collection('PlayedGames')
            .where('userId', '==', userId)
            .where('finished', '>', '0')
            .orderBy('finished', 'desc')
            .limit(20)

        return ref.onSnapshot(querySnapshot => {
            let fetchedfinishedGames = [];
            let i = 0;

            querySnapshot.forEach(doc => { //Set up listener to query new data evrytime it is changed in the backend

                const navToResult = props
                    .navigation
                    .getParam("showResult", 0)

                fetchedfinishedGames.push(doc.data())

                fetchedfinishedGames[i].id = doc.id

                const started = new Date(fetchedfinishedGames[i].started);
                const year = fetchedfinishedGames[i]
                    .finished
                    .split("-")[0];
                const month = fetchedfinishedGames[i]
                    .finished
                    .split("-")[1] - 1;
                const day = fetchedfinishedGames[i]
                    .finished
                    .split("-")[2]
                    .split(" ")[0];

                fetchedfinishedGames[i].finished = (month + 1) + "/" + day + "/" + year

                fetchedfinishedGames[i].started = ("0" + (started.getMonth() + 1)).slice(-2) + "/" + ("0" + started.getDay()).slice(-2) + "/" + (started.getUTCFullYear().toString().substr(-2))

                fetchedfinishedGames[i].showResult = navToResult
                i++;
            });
            setFinishedGames(fetchedfinishedGames)

            if (isLoading) {
                setIsLoading(false)
            }
        });
    }

    const _fetchData3 = async() => {
        const db = firebase.firestore();

        const userId = await GetUserId()

        const ref = db
            .collection('PlayedGames')
            .where('userId2', '==', userId)
            .where('finished', '>', '0')
            .orderBy('finished', 'desc')
            .limit(20)

        return ref.onSnapshot(querySnapshot => {
            let fetchedfinishedGames = [];
            let i = 0;

            querySnapshot.forEach(doc => { //Set up listener to query new data evrytime it is changed in the backend

                const navToResult = props
                    .navigation
                    .getParam("showResult", 0)

                fetchedfinishedGames.push(doc.data())

                fetchedfinishedGames[i].id = doc.id

                const started = new Date(fetchedfinishedGames[i].started);
                const year = fetchedfinishedGames[i]
                    .finished
                    .split("-")[0];
                const month = fetchedfinishedGames[i]
                    .finished
                    .split("-")[1] - 1;
                const day = fetchedfinishedGames[i]
                    .finished
                    .split("-")[2]
                    .split(" ")[0];

                fetchedfinishedGames[i].finished = (month + 1) + "/" + day + "/" + year

                fetchedfinishedGames[i].started = ("0" + (started.getMonth() + 1)).slice(-2) + "/" + ("0" + started.getDay()).slice(-2) + "/" + (started.getUTCFullYear().toString().substr(-2))
                fetchedfinishedGames[i].finishedGameOpp = true
                fetchedfinishedGames[i].showResult = navToResult
                i++;
            });
            setFinishedGamesOpp(fetchedfinishedGames)

            if (isLoading) {
                setIsLoading(false)
            }
        });
    }

    const _fetchData4 = async() => {
        const db = firebase.firestore();

        const userId = await GetUserId()

        const ref = db
            .collection('PlayedGames')
            .where('userId2', '==', userId)
            .where('finished', '==', 0)
            .orderBy('started', 'desc')

        return ref.onSnapshot(querySnapshot => {
            let fetchedStartedGames = [];
            let i = 0;

            querySnapshot.forEach(doc => { //Set up listener to query new data evrytime it is changed in the backend

                fetchedStartedGames.push(doc.data())
                fetchedStartedGames[i].id = doc.id
                const started = new Date(fetchedStartedGames[i].started)
                fetchedStartedGames[i].started = ("0" + (started.getMonth() + 1)).slice(-2) + "/" + ("0" + started.getDay()).slice(-2) + "/" + (started.getUTCFullYear().toString().substr(-2))
                i++;
            });
            setStartedGamesByOpp(fetchedStartedGames)

            if (isLoading) {
                setIsLoading(false)
            }
        });
    }

    const _fetchData5 = async() => {
        const db = firebase.firestore();

        const userId = await GetUserId()

        const ref = db
            .collection('PlayedGames')
            .where('userId', '==', userId)
            .where('finished', '==', 0)
            .orderBy('started', 'desc')

        return ref.onSnapshot(querySnapshot => {
            let fetchedStartedGames = [];
            let i = 0;

            querySnapshot.forEach(doc => { //Set up listener to query new data evrytime it is changed in the backend

                const navToResult = props
                    .navigation
                    .getParam("showResult", 0)

                fetchedStartedGames.push(doc.data())
                fetchedStartedGames[i].id = doc.id
                const started = new Date(fetchedStartedGames[i].started)
                fetchedStartedGames[i].started = ("0" + (started.getMonth() + 1)).slice(-2) + "/" + ("0" + started.getDay()).slice(-2) + "/" + (started.getUTCFullYear().toString().substr(-2))
                fetchedStartedGames[i].startedGame = 1
                fetchedStartedGames[i].showResult = navToResult
                i++;
            });
            setStartedGames(fetchedStartedGames)

            if (isLoading) {
                setIsLoading(false)
            }
        });
    }

    useEffect(() => { // code to run on component mount
        _fetchData2()
        _fetchData3()
        _fetchData4()
        _fetchData5()
    }, []) //pass an empty array to call it just with the first call --> }, [])

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

    function FinishedGamesOpp({ //return different History Items
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
    }

    function FinishedGames({ //return different History Items
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
        return (
            <HistoryEntryFinishedGame
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
                playedGameDocId={playedGameDocId}></HistoryEntryFinishedGame>
        );
    }

    function StartedGames({ //return different History Items
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
                showResult={showResult}
                playedGameDocId={playedGameDocId}></HistoryEntryStartedGame>
        );
    }

    function StartedGamesByOpp({ //return different History Items
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
                <HistoryEntryFinishedGame
                    userId={userId}
                    started={started}
                    userId2={userId2}
                    username={username}
                    username2={username2}
                    result={result}
                    finished={finished}
                    games_played={games_played}
                    games_playedUser2={games_playedUser2}
                    showResult={showResult}
                    playedGameDocId={playedGameDocId}></HistoryEntryFinishedGame>
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
                    showResult={showResult}
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
                    data={fetchedGames}
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
