import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import NextButton from '../../components/Buttons/NextButton';
import HomeButton from '../../components/Buttons/HomeButton';
import BackgroundContainer from "../../components/BackgroundContainer"
import {material} from 'react-native-typography';
import HeaderText from '../../components/HeaderText';

import firebase from "../../../config/firebase";

export default function App(props) {
    if (props.visible === false) {
        //return null;
    }

    const [data, //contains pressed button numbers of user, all pressed: [2,3,4,5]
        setData] = useState({
        question: "",
        answer_1: "",
        answer_2: "",
        answer_3: "",
        answer_4: "",
        solution: 3,
        explanation: "",
        info: ""
    });

    const [gameId,
        setGameId] = useState(0);

    const [isLoading,
        setIsLoading] = useState(true);

    const round = props
        .navigation
        .getParam('round', '');
    const roundLength = 3; //Rounds after the game ends

    const playedGameDocId = props
        .navigation
        .getParam("playedGameDocId", 0)

    const initLoading = round >= roundLength
        ? true
        : false;

    const username = props
        .navigation
        .getParam('username', 0);
    const username2 = props
        .navigation
        .getParam('username2', 0);
    const userId = props
        .navigation
        .getParam("userId", '1')
    const userId2 = props
        .navigation
        .getParam("userId2", '1');

    let navigationParams = "";

    async function PersistGameData() { //fetch()
        const db = firebase.firestore()

        var random = Math.floor(Math.random() * 100000) + 1;
        //const ref = db.collection('MultipleChoiceSets')
        console.log(random)

        async function AddGameDataToDb(db) {
            // Add a new document with a generated id.
            const navigation = props.navigation

            const gameRounds = navigation.getParam('Game', '');

            let game = {
                userId: userId,
                games_played: gameRounds,
                finished: 0,
                userId2: userId2,
                username: username,
                username2: username2
            }

            if (!game.created) {
                const today = new Date();
                const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                const dateTime = date + ' ' + time;
                game.started = dateTime;
            }

            let playedGamesRef = db.collection('PlayedGames');
            let savedGame = await playedGamesRef.add(game)
            //for (doc of savedGame.docs) { return doc.data(); } console.log (savedGame);
        }
        try {
            await AddGameDataToDb(db);
            setIsLoading(false);

        } catch (err) {
            console.log('Error saving document', err)
            setIsLoading(false);
        }
    }

    async function UpdateGameData() {
        const db = firebase.firestore()

        const navigation = props.navigation

        var random = Math.floor(Math.random() * 100000) + 1;
        //const ref = db.collection('MultipleChoiceSets')
        console.log(random)

        let user1Wins = 0;
        let user2Wins = 0;

        let i = 0;

        let eloUser = 0;

        navigationParams

        async function GetUser1Data() {
            let campaignsRef = db.collection('users')
            let activeRef = await campaignsRef
                .where('userId', '==', userId)
                .get();
            for (doc of activeRef.docs) {
                const data = doc.data()
                eloUser = data.elo
            }
        }

        let eloUser2 = 0;

        async function GetUser2Data() {
            let campaignsRef = db.collection('users')
            let activeRef = await campaignsRef
                .where('userId', '==', userId2)
                .get();
            for (doc of activeRef.docs) {
                const data = doc.data()
                eloUser2 = data.elo
            }
        }

        const CalculateNewElo = async(EloUser1, EloUser2, user1Win, user2Win) => {
            const Eb = 1 / (1 + 10 ^ ((EloUser1 - EloUser2) / 400))
            const Ea = 1 - Eb

            let NewElo = {
                NewEloUser1: 0,
                NewEloUser2: 0,
                EloGainUser1: 0,
                EloGainUser2: 0
            }

            if (user1Win === 1) { //player 1 won
                NewElo.EloGainUser2 = Math.floor(10 * (0 - Ea))
                NewElo.NewEloUser2 = EloUser2 + NewElo.EloGainUser2
                NewElo.EloGainUser1 = Math.ceil(10 * (1 - Eb))
                NewElo.NewEloUser1 = EloUser1 + NewElo.EloGainUser1
            } else if (user2Win === 1) { //player 2 won
                NewElo.EloGainUser2 = Math.ceil(10 * (1 - Ea))
                NewElo.NewEloUser2 = EloUser2 + NewElo.EloGainUser2
                NewElo.EloGainUser1 = Math.floor(10 * (0 - Eb))
                NewElo.NewEloUser1 = EloUser1 + NewElo.EloGainUser1
            } else { //remi
                NewElo.EloGainUser2 = Math.round(10 * (0, 5 - Ea))
                NewElo.NewEloUser2 = EloUser2 + NewElo.EloGainUser2
                NewElo.EloGainUser1 = Math.round(10 * (0, 5 - Eb))
                NewElo.NewEloUser1 = EloUser1 + NewElo.EloGainUser1
            }
            return NewElo;
        }

        const gameUser2Rounds = navigation.getParam('GameUser2', '');
        const gameRounds = navigation.getParam('Game', '');

        gameUser2Rounds.forEach(element => {
            if (gameUser2Rounds[i].UserWins) {
                user2Wins++;
            }
            if (gameRounds[i].UserWins) {
                user1Wins++;
            }
            i++;
        });

        if (user1Wins > user2Wins) {
            user1Wins = 1
            user2Wins = 0
        } else if (user1Wins < user2Wins) {
            user1Wins = 0
            user2Wins = 1
        } else {
            user1Wins = 0
            user2Wins = 0
        }

        async function UpdateGameDataInDb(db) { //Update existing properties of the played game

            const today = new Date();
            const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const dateTime = date + ' ' + time;
            const finished = dateTime;
            
            let playedGamesRef = db
                .collection('PlayedGames')
                .doc(playedGameDocId)
            let savedGame = await playedGamesRef.update({finished: finished});

        }

        async function UpdateUser1Data(db, NewElo) { //Update existing properties of the played game

            let userRef = db
                .collection('users')
                .doc(userId)
            const newElo = NewElo.NewEloUser1
            let savedGame = await userRef.update({elo: newElo});
        }

        async function UpdateUser2Data(db, NewElo) { //Update existing properties of the played game

            let userRef = db
                .collection('users')
                .doc(userId2)
            const newElo2 = NewElo.NewEloUser2
            let savedGame = await userRef.update({elo: newElo2});
        }

        async function AddGameUser2DataToDb(db, NewElo) {
            // Add second played games of user 2 to the existing game

            let playedGamesRef = db
                .collection('PlayedGames')
                .doc(playedGameDocId)
            let savedGame = await playedGamesRef.set({
                games_playedUser2: gameUser2Rounds,
                eloGainUser1: NewElo.EloGainUser1,
                eloGainUser2: NewElo.EloGainUser2,
                user1Wins: user1Wins,
                user2Wins, user2Wins
            }, {merge: true});

        }
        try {
            await GetUser1Data()
            await GetUser2Data()
            const NewElo = await CalculateNewElo(eloUser, eloUser2, user1Wins, user2Wins);
            await UpdateGameDataInDb(db, NewElo);
            await UpdateUser1Data(db, NewElo)
            await UpdateUser2Data(db, NewElo)
            await AddGameUser2DataToDb(db, NewElo, user1Wins, user2Wins);

            navigationParams.NewElo = NewElo;
            setIsLoading(false);

        } catch (err) {
            console.log('Error updating document', err)
            setIsLoading(false);
        }
    }

    const NavigateToNextScreen = async() => {

        navigationParams = { //Get round and playstyle from last screen
            round: Number.parseInt(props.navigation.getParam('round', ''), 10) + 1, //inc round
            playStyle: props //Set playStyle again to the last playstyle for next screen
                .navigation
                .getParam('playStyle', 'competitive'),
            GameUser2: props
                .navigation
                .getParam('GameUser2', ''),
            Game: props //Set playStyle again to the last playstyle for next screen
                .navigation
                .getParam('Game', ''),
            userId: userId,
            userId2: userId2,
            username: username,
            username2: username2,
            playAfterOpponent: props
                .navigation
                .getParam('playAfterOpponent', 0),
            playedGameDocId: props
                .navigation
                .getParam("playedGameDocId", 0)
        };

        let RandomScreen = "";

        if (props.navigation.getParam('playStyle', 'competitive') === 'competetive') {

            if (props.navigation.getParam("playAfterOpponent", 0)) { //check if played as the second player
                if (round >= roundLength) { //if round is finished as the second player-> navigate to result screen and update game data
                    await UpdateGameData()
                    console.log("updated gamedata")
                    RandomScreen = StackActions.push({routeName: 'Result', params: navigationParams});
                } else {

                    const game = props //Set playStyle again to the last playstyle for next screen
                        .navigation
                        .getParam('Game', '')

                    const nextGameType = game[round].gameType;

                    let screen = ""
                    if (nextGameType === 0) {
                        screen = "MultipleChoice"
                    } else if (nextGameType === 1) {
                        screen = "GuessPicture"
                    } else {
                        screen = "LinkingGame"
                    }

                    RandomScreen = StackActions.push({routeName: screen, params: navigationParams});

                }
            } else {
                if (round >= roundLength) { //if round is finished -> navigate to result screen and set game data in database
                    await PersistGameData()
                    RandomScreen = StackActions.push({routeName: 'Result', params: navigationParams});
                } else {
                    if (rand === 1) { //Create stack push actions for screens so the navigation will always be stacked on top of the stack tree
                        RandomScreen = StackActions.push({routeName: 'LinkingGame', params: navigationParams});
                    } else if (rand === 2) {
                        RandomScreen = StackActions.push({routeName: 'MultipleChoice', params: navigationParams});
                    } else {
                        RandomScreen = StackActions.push({routeName: 'GuessPicture', params: navigationParams});
                    }
                }
            }

        } else { //Replace last route with the solution screen, to avoid endless stacking in traing mode
            RandomScreen = StackActions.replace({
                index: 0,
                params: navigationParams,
                routeName: "",
                actions: [NavigationActions.navigate({routeName: ''})]
            });
            if (rand === 1) { //Create stack push actions for screens so the navigation will always be stacked on top of the stack tree
                //RandomScreen = StackActions.push({routeName: 'LinkingGame', params: navigationParams});
                RandomScreen.routeName = "LinkingGame";
                RandomScreen.actions[0].routeName = "LinkingGame";
            } else if (rand === 2) {
                // RandomScreen = StackActions.push({routeName: 'MultipleChoice', params:
                // navigationParams});
                RandomScreen.routeName = "MultipleChoice";
                RandomScreen.actions[0].routeName = "MultipleChoice";
            } else {
                // RandomScreen = StackActions.push({routeName: 'GuessPicture', params:
                // navigationParams});
                RandomScreen.routeName = "GuessPicture";
                RandomScreen.actions[0].routeName = "GuessPicture";
            }
        }

        var RandomNumber = Math.floor(Math.random() * 3) + 1;
        setRand(RandomNumber); //change random state for next render

        props
            .navigation
            .dispatch(RandomScreen); //navigate to random screen
    }

    const [rand,
        setRand] = useState(Math.floor(Math.random() * 3) + 1); //Set random starting number for the random game vs opponent

    let showNextButton = true;
    let homeButtonStyle = "";
    let nextButtonTitle = "Next";

    if (round >= roundLength && props.navigation.getParam('playStyle', 'competitive') === "competetive") { //Do not display the next button after 3 rounds
        showNextButton = true
        nextButtonTitle
        homeButtonStyle = {
            justifyContent: "center",
            left: "auto"
        }

    };
    const showHomeButton = false;

    const solutionContainerColor = props
        .navigation
        .getParam('userWins', 0) === 1
        ? {
            backgroundColor: "green"
        }
        : {
            backgroundColor: "red"
        };
    const response = solutionContainerColor.backgroundColor == "green"
        ? "You're right!"
        : "Sorry, that's wrong"
    const explanation = props
        .navigation
        .getParam('explanation', '-');
    const info = props
        .navigation
        .getParam('info', '-')

    return (
        <BackgroundContainer>
            <View style={styles.container}>
                <HeaderText text="Solution"></HeaderText>
                <View style={[styles.solutionContainer, solutionContainerColor]}>
                    <Text style={material.headline}>{response}</Text>
                </View>
                <SafeAreaView style={styles.safeArea}>
                    <ScrollView style={styles.explanationContainer}>
                        <Text style={material.headline}>Explanation</Text>
                        <Text style={[material.display0, styles.scrollViewText]}>{explanation}</Text>
                    </ScrollView>
                </SafeAreaView>
                <SafeAreaView style={styles.safeArea}>
                    <ScrollView style={styles.infoContainer}>
                        <Text style={material.headline}>Did you know?</Text>
                        <Text style={[material.display0, styles.scrollViewText]}>{info}</Text>
                    </ScrollView>
                </SafeAreaView>
            </View>
            <HomeButton visible={showHomeButton} style={homeButtonStyle}></HomeButton>
            <NextButton
                navigateFunction={NavigateToNextScreen}
                nextButtonTitle={nextButtonTitle}
                visible={showNextButton}></NextButton>
        </BackgroundContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 45,
        paddingBottom: 40
    },
    backContainer: {
        position: "absolute",
        bottom: 10,
        left: 3
    },
    nextContainer: {
        position: "absolute",
        bottom: 10,
        right: 5
    },
    solutionContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#A9E2F3",
        marginBottom: 40,
        margin: 0,
        borderRadius: 5,
        width: 250,
        paddingRight: 5,
        paddingLeft: 5
    },
    explanationContainer: {
        padding: 10
    },
    infoContainer: {
        padding: 10,
        marginBottom: 5
    },
    safeArea: {
        flex: 3,
        backgroundColor: "#A9E2F3",
        marginBottom: 40,
        margin: 5,
        borderRadius: 5,
        width: 300,
        //shadowOpacity: 0.75, shadowRadius: 2,
        shadowColor: 'black',
        /*shadowOffset: {
            width: 0.2,
            height: 0.2,
        },
        elevation: 2,*/
        paddingBottom: 15
    },
    scrollViewText: {
        marginBottom: 20
    }
});