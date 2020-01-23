import React, {useState, useRef} from 'react';
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
//import component safe data : 2 * 3 * 4 * 5, standing for the 4 fields

export default function App(props) {

    const headerColor = {
        color: 'green'
    }

    const linkingGameId = 2
    const round = props //Get round
        .navigation
        .getParam('round', '')

    let game = props //set the played game (MultipleChoice = 0) in the array with the round
        .navigation
        .getParam("Game", '')

    if (round != '' && game != '') {
        game.push({[round]: 0, UserWins: 0})
    } else {
        game = [
            {
                1: multipleChoiceId,
                UserWins: 0
            }
        ]; //if round is not, set set it to 0
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
        Game: game
    }

    const evaluateAnswer = () => {

        const n = 0;
        if (n === 1) { // if solution given by the user is right
            pushSolutionScreen.params.userWins = 1;
            navigationParams.Game[round - 1].UserWins = 1
        } else {
            navigationParams.Game[round - 1].UserWins = 0
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