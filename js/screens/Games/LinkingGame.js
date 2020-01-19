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

    const navigationParams = {  //init navigation params for the next screen
        round: props
            .navigation
            .getParam('round', ''),
        playStyle: props
            .navigation
            .getParam('playStyle', 'competitive'),
        userWins: 0,
        explanation: "empty",
        info: "yep"
    }

    const evaluateAnswer = () => {
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