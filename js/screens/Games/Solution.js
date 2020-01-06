import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import {SettingsScreen} from "react-native-settings-screen"
//import component

import {StackActions, NavigationActions} from 'react-navigation';
import NextButton from '../../components/NextButton';
import HomeButton from '../../components/HomeButton';

export default function App(props) {
    const text = "This is the Solution";
    if (props.visible === false) {
        //return null;
    }

    const round = props
        .navigation
        .getParam('round', '');

    function NavigateToRandomGame() {

        const navigationParams = { //Get round and playstyle from last screen
            round: Number.parseInt(props.navigation.getParam('round', ''), 10) + 1, //inc round
            playStyle: props //Set playStyle again to the last playstyle for next screen
                .navigation
                .getParam('playStyle', 'competitive')
        };

        let RandomScreen = "";

        if (props.navigation.getParam('playStyle', 'competitive') === 'competetive') {
            if (rand === 1) { //Create stack push actions for screens so the navigation will always be stacked on top of the stack tree
                RandomScreen = StackActions.push({routeName: 'LinkingGame', params: navigationParams});
            } else if (rand === 2) {
                RandomScreen = StackActions.push({routeName: 'MultipleChoice', params: navigationParams});
            } else {
                RandomScreen = StackActions.push({routeName: 'GuessPicture', params: navigationParams});
            }
        } else { //Replace last route with the the solution screen, to avoid endless stacking in traing mode
            if (rand === 1) { //Create stack push actions for screens so the navigation will always be stacked on top of the stack tree
                //RandomScreen = StackActions.push({routeName: 'LinkingGame', params: navigationParams});
                RandomScreen = StackActions.replace({
                    index: 0,
                    params: navigationParams,
                    routeName: "LinkingGame",
                    actions: [NavigationActions.navigate({routeName: 'LinkingGame'})]
                });
            } else if (rand === 2) {
                // RandomScreen = StackActions.push({routeName: 'MultipleChoice', params:
                // navigationParams});
                RandomScreen = StackActions.replace({
                    index: 0,
                    params: navigationParams,
                    routeName: "MultipleChoice",
                    actions: [NavigationActions.navigate({routeName: 'MultipleChoice'})]
                });
            } else {
                // RandomScreen = StackActions.push({routeName: 'GuessPicture', params:
                // navigationParams});
                RandomScreen = StackActions.replace({
                    index: 0,
                    params: navigationParams,
                    routeName: "GuessPicture",
                    actions: [NavigationActions.navigate({routeName: 'GuessPicture'})]
                });
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
    const nextButtonTitle = "Next";

    let showNextButton = true;
    let homeButtonStyle = "";
    if (round >= 3 && props.navigation.getParam('playStyle', 'competitive') === "competetive") { //Do not display the next button after 3 rounds
        showNextButton = false
        homeButtonStyle = {
            justifyContent: "center",
            left: "auto"
        }
    };
    const showHomeButton = true;

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.friendsList}>
                <ScrollView>
                    <Text>{text}</Text>
                    <Text>{round}</Text>
                </ScrollView>
            </SafeAreaView>
            <HomeButton
                visible={showHomeButton}
                
                style={homeButtonStyle}></HomeButton>
            <NextButton
                navigateTo={NavigateToRandomGame}
                nextButtonTitle={nextButtonTitle}
                visible={showNextButton}></NextButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgrey',
        alignItems: 'center',
        justifyContent: 'center'
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
    }
});