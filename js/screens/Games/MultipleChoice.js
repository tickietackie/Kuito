import React, {useState, useEffect} from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
    ScrollView,
    SafeAreaView,
    ActivityIndicator
} from 'react-native';

import firebase from "../../../config/firebase";

import {StackActions} from 'react-navigation';
import HomeButton from '../../components/Buttons/HomeButton';
import NextButton from '../../components/Buttons/NextButton';
import HeaderText from '../../components/HeaderText';
import Block from '../../components/Games/Block';
import QuestionCard from '../../components/Games/QuestionCard';
import BackgroundContainer from "../../components/BackgroundContainer"
//import component safe data : 2 * 3 * 4 * 5, standing for the 4 fields

export default function App(props) {

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

    const round = props //Get round
        .navigation
        .getParam('round', 1)

    const _fetchData = async() => {

        //fetch()
        const db = firebase.firestore()

        var random = Math.floor(Math.random() * 100000) + 1;
        //const ref = db.collection('MultipleChoiceSets') console.log(random)

        async function GetMultipleChoiceSet(db) {
            let campaignsRef = db.collection('MultipleChoiceSets')
            let activeRef = await campaignsRef
                .where('random', '>=', random)
                .orderBy('random')
                .limit(1)
                .get();
            for (doc of activeRef.docs) {
                setGameId(doc.id)
                return doc.data();
            }
        }

        async function GetSpecificMultipleChoiceSet(db) {
            const gameId = navigationParams.Game[round - 1].gameId
            let campaignsRef = db
                .collection('MultipleChoiceSets')
                .doc(gameId);
            let doc = await campaignsRef.get();
            setGameId(doc.id)
            return doc.data();
        }

        try {
            let data1 = "";
            if (props.navigation.getParam("playAfterOpponent", 0)) {
                data1 = await GetSpecificMultipleChoiceSet(db);
            } else {
                data1 = await GetMultipleChoiceSet(db);
            }
            setData(data1);
            setIsLoading(false);

        } catch (err) {
            console.log('Error getting documents', err)
            setIsLoading(false);
        }

    }

    useEffect(() => { // code to run on component mount

        _fetchData()

    }, [props.navigation]) //pass an empty array to call it just with the first call --> }, [])

    const evaluateAnswer = () => {

        let n = data.solution;
        let i = userAnswer.message.length;
        while (i > 0) { //determine if the solution given by the user is right
            i = i - 1;
            if (n % userAnswer.message[0] == 0) {
                n = n / userAnswer.message[0];
                userAnswer.message[0] = 121; // set to sth n is not dividable
                continue;
            }
            if (n % userAnswer.message[1] == 0) {
                n = n / userAnswer.message[1];
                userAnswer.message[1] = 121; // set to sth n is not dividable
                continue;
            }

            if (n % userAnswer.message[2] == 0) {
                n = n / userAnswer.message[2];
                userAnswer.message[2] = 121; // set to sth n is not dividable
                continue;
            }

            if (n % userAnswer.message[3] == 0) {
                n = n / userAnswer.message[3];
                userAnswer.message[3] = 121; // set to sth n is not dividable
                continue;
            }
            n = 121; //if not dividable by any number, wrong answer
            break;
        }

        if (n === 1) { // if solution given by the user is right
            if (!props.navigation.getParam("playAfterOpponent", 0)) {
                navigationParams.Game[round - 1].UserWins = 1
                navigationParams.Game[round - 1].gameId = gameId
            } else {
                navigationParams.GameUser2[round - 1].UserWins = 1
                navigationParams.GameUser2[round - 1].gameId = gameId
            }
            navigationParams.userWins = 1;

        } else {
            if (!props.navigation.getParam("playAfterOpponent", 0)) {
                navigationParams.Game[round - 1].UserWins = 0
                navigationParams.Game[round - 1].gameId = gameId
            } else {
                navigationParams.GameUser2[round - 1].UserWins = 0
                navigationParams.GameUser2[round - 1].gameId = gameId
            }
        }

        const pushSolutionScreen = StackActions.push({routeName: 'Solution', params: navigationParams}); //Create stack push actions for screens so the navigation will always be stacked on top of the stack tree

        props
            .navigation
            .dispatch(pushSolutionScreen);

        setIsLoading(true)
    }

    const userId = props
        .navigation
        .getParam("userId", '1')
    const userId2 = props
        .navigation
        .getParam("userId2", '1');

    const gameType = 0 //gametyp 2 is the linking game

    let game = props //set the played game (MultipleChoice = 0) in the array with the round
        .navigation
        .getParam("Game", '')

    let gameUser2 = props //set the played game (MultipleChoice = 0) in the array with the round
        .navigation
        .getParam("GameUser2", '')

    let username = props
        .navigation
        .getParam('username', 0);
    let username2 = props
        .navigation
        .getParam('username2', 0);

    if (!props.navigation.getParam("playAfterOpponent", 0)) { //set played games for the first player
        if (!game[round - 1]) {
            if (round != '' && game != '') {
                game.push({gameType: gameType, UserWins: 0, userId: userId, username: username})
            } else {
                game = [
                    {
                        gameType: gameType,
                        UserWins: 0,
                        userId: userId,
                        username: username
                    }
                ]; //if round is not, set set it to 0
            }
        }
    } else {
        if (!gameUser2[round - 1]) { //set games for the player, playing second
            if (round != '' && gameUser2 != '') {
                gameUser2.push({gameType: gameType, UserWins: 0, userId2: userId2, username2: username2})
            } else {
                gameUser2 = [
                    {
                        gameType: gameType,
                        UserWins: 0,
                        userId2: userId2,
                        username2: username2
                    }
                ]; //if round is not, set set it to 0
            }
        }
    }

    const navigationParams = { //init navigation params for the next screen
        round: props
            .navigation
            .getParam('round', ''),
        playStyle: props
            .navigation
            .getParam('playStyle', 'competitive'),
        userWins: 0,
        explanation: data.explanation,
        info: data.info,
        Game: game,
        GameUser2: gameUser2,
        userId: userId,
        userId2: userId2,
        username: username,
        username2: username2,
        playAfterOpponent: props
            .navigation
            .getParam("playAfterOpponent", 0),
        playedGameDocId: props
            .navigation
            .getParam("playedGameDocId", 0),
        tokenUser2: props
            .navigation
            .getParam("tokenUser2", ''),
        tokenUser: props
            .navigation
            .getParam("tokenUser", '')
    }

    const headerColor = {
        color: 'green'
    }

    const [userAnswer, //contains pressed button numbers of user, all pressed: [2,3,4,5]
        setUserAnswer] = useState({
        message: [0, 0, 0, 0]
    });

    const showHomeButton = props //Show home button only in training mode
        .navigation
        .getParam('playStyle', 'competitive') === "training"
        ? true
        : false; //Show Home button in traing view
    const homeButtonStyle = "";

    const [showNextButton, //contains pressed button numbers of user, all pressed: [2,3,4,5]
        setShowNextButton] = useState(false);

    const callbackFunction = (childData) => {
        setUserAnswer({message: childData})
        //if array not empty show next button (user has pressed at leasat one button)
        setShowNextButton(childData.length >= 1
            ? true
            : false);
    }

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
        <BackgroundContainer >
            <SafeAreaView style={styles.container}>
                <HeaderText style={headerColor} text="Multiple Choice"></HeaderText>
                <QuestionCard text={data}></QuestionCard>
                <Block parentCallback={callbackFunction} text={data}></Block>
                <HomeButton visible={showHomeButton} style={homeButtonStyle}></HomeButton>
                <NextButton
                    navigateFunction={evaluateAnswer}
                    nextButtonTitle={"Next"}
                    visible={showNextButton}></NextButton>
            </SafeAreaView>
        </BackgroundContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: "8%",
        flex: 1
    },
    backContainer: {
        position: "absolute",
        bottom: 10,
        left: 3
    },
    nextContainer: {
        position: "absolute",
        bottom: 10,
        right: 3
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center"
    }
});