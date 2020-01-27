import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    SafeAreaView,
    Text,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';
import {human} from 'react-native-typography'
import HistoryEntryFinishedGame from "./HistoryEntryFinishedGame"
import HistoryEntryStartedGame from "./HistoryEntryStartedGame"
import HistoryEntryAfterOpp from "./HistoryEntryAfterOpp"
import firebase from "../../../config/firebase";
import BackgroundContainer from '../BackgroundContainer';

export default function block(props) {

    const [games, //contains pressed button numbers of user, all pressed: [2,3,4,5]
        setGames] = useState({started: 0, finished: 0, userId: "", games_played: []});

    const [isLoading,
        setIsLoading] = useState(true);

    const _fetchData = async() => {

        //fetch()
        const db = firebase.firestore()

        var random = Math.floor(Math.random() * 100000) + 1;
        //const ref = db.collection('MultipleChoiceSets')
        console.log(random)

        const GetUserId = async() => {
            //return await AsyncStorage.getItem('username');
            return await AsyncStorage.getItem('userId');
        };
        const userId = await GetUserId()

        const GetUsername = async() => {
            //return await AsyncStorage.getItem('username');
            return await AsyncStorage.getItem('username');
        };

        const username = await GetUserId()

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
                i++;
                console.log("test")
            }
            return finishedGames;
        }

        try {
            const startedGamesByOpp = await GetStartedGamesByOpp(db);
            const startedGames = await GetStartedGames(db);
            const finishedGames = await GetFinishedGames(db);
            const fetchedGames = startedGamesByOpp.concat(startedGames, finishedGames);
            setGames(fetchedGames);
            setIsLoading(false);
            //let i = 100000* 1000000/3 /9/8;

        } catch (err) {
            console.log('Error getting game data', err)
            //setIsLoading(false);
        }
    }

    useEffect(() => { // code to run on component mount

        _fetchData()

    }, [props.navigation]) //pass an empty array to call it just with the first call --> }, [])

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

    function Item({     //return different History Items
        started,
        userId2,
        result,
        resultAbbr,
        finished,
        startedGame,
        games_played,
        playedGameDocId,
        games_playedUser2
    }) { //Each item in the list will be render like this item
        if (finished) {
            return (
                <HistoryEntryFinishedGame
                    started={started}
                    userId2={userId2}
                    result={result}
                    finished={finished}
                    games_played={games_played}
                    games_playedUser2={games_playedUser2}
                    playedGameDocId={playedGameDocId}
                    resultAbbr={resultAbbr}></HistoryEntryFinishedGame>
            );
        } else if (startedGame) {
            return (
                <HistoryEntryStartedGame
                    started={started}
                    userId2={userId2}
                    result={result}
                    finished={finished}
                    games_played={games_played}
                    playedGameDocId={playedGameDocId}
                    resultAbbr={resultAbbr}></HistoryEntryStartedGame>
            );
        } else {
            return (
                <HistoryEntryAfterOpp
                    started={started}
                    userId2={userId2}
                    result={result}
                    finished={finished}
                    games_played={games_played}
                    playedGameDocId={playedGameDocId}
                    resultAbbr={resultAbbr}></HistoryEntryAfterOpp>
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
                    userId2={item.userId2}
                    result={item.result}
                    finished={item.finished}
                    startedGame={item.startedGame}
                    games_played={item.games_played}
                    games_playedUser2={item.games_playedUser2}
                    playedGameDocId ={item.id}
                    id={item.id}
                    resultAbbr={item.resultAbbr}/>}
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

const style = {};
