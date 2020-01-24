import React, {useState, useEffect} from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
    ScrollView,
    SafeAreaView,
    PanResponder,
    Animated
} from 'react-native';

import {StackActions} from 'react-navigation';
import HomeButton from '../../components/HomeButton';
import NextButton from '../../components/NextButton';
import DragableLink from '../../components/Games/DragableLink';
import HeaderText from '../../components/HeaderText';
import BackgroundContainer from "../../components/BackgroundContainer"
import firebase from "../../../config/firebase";
//import component safe data : 2 * 3 * 4 * 5, standing for the 4 fields

export default function App(props) {

    const headerColor = {
        color: 'green'
    }

    const userId = props
        .navigation
        .getParam("userId", '1')
    const userId2 = props
    .navigation
    .getParam("userId2", '1')

    const [gameId,
        setGameId] = useState(0);

    const linkingGameId = 2
    const round = props //Get round
        .navigation
        .getParam('round', '')

    let game = props //set the played game (MultipleChoice = 0) in the array with the round
        .navigation
        .getParam("Game", '')

    if (!game[round - 1]) {
        if (round != '' && game != '') {
            game.push({[round]: linkingGameId, UserWins: 0, userId: userId})
        } else {
            game = [
                {
                    1: linkingGameId,
                    UserWins: 0,
                    userId: userId
                }
            ]; //if round is not, set set it to 0
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
        explanation: "empty",
        info: "yep",
        Game: game,
        userId: userId,
        userId2: userId2
    }

    const _fetchData = async() => {

        //fetch()
        const db = firebase.firestore()

        var random = Math.floor(Math.random() * 100000) + 1;
        //const ref = db.collection('MultipleChoiceSets') 
        

        /*async function GetMultipleChoiceSet(db) {
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
        try {
            data1 = await GetMultipleChoiceSet(db);
            setData(data1);
            setIsLoading(false);

        } catch (err) {
            console.log('Error getting documents', err)
            setIsLoading(false);
        }*/

        setGameId(1);
    }

    useEffect(() => { // code to run on component mount

        _fetchData()

    }, [props.navigation]) //pass an empty array to call it just with the first call --> }, [])

    const evaluateAnswer = () => {

        const n = 0;
        if (n === 1) { // if solution given by the user is right
            navigationParams.userWins = 1;
            navigationParams.Game[round - 1].UserWins = 1
            navigationParams.Game[round - 1].gameId = gameId
        } else {
            navigationParams.Game[round - 1].UserWins = 0
            navigationParams.Game[round - 1].gameId = gameId
        }

        const pushSolutionScreen = StackActions.push({routeName: 'Solution', params: navigationParams}); //Create stack push actions for screens so the navigation will always be stacked on top of the stack tree

        props
            .navigation
            .dispatch(pushSolutionScreen);
    }

    const showNextButton = true;

    return (
        <BackgroundContainer >
            <View style={styles.container}>
                <HeaderText style={headerColor} text="Linking Game"></HeaderText>
                <DragableLink text="text"></DragableLink>
            </View>
            <NextButton
                navigateFunction={evaluateAnswer}
                nextButtonTitle={"Next"}
                visible={showNextButton}></NextButton>
        </BackgroundContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: 45,
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
    }
});