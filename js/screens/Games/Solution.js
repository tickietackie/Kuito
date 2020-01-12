import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import NextButton from '../../components/NextButton';
import HomeButton from '../../components/HomeButton';
import BackgroundContainer from "../../components/BackgroundContainer"
import {material} from 'react-native-typography';
import HeaderText from '../../components/HeaderText';

export default function App(props) {
    const text = "This is the Solution";
    if (props.visible === false) {
        //return null;
    }

    const round = props
        .navigation
        .getParam('round', '');

    const NavigateToRandomGame = () => {

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
                        <Text style= {material.headline}>Explanation</Text>
                        <Text style={[material.display0, styles.scrollViewText]}>{explanation}</Text>
                    </ScrollView>
                </SafeAreaView>
                <SafeAreaView style={styles.safeArea}>
                    <ScrollView style={styles.infoContainer}>
                        <Text style= {material.headline}>Additional info</Text>
                        <Text style={[material.display0, styles.scrollViewText]}>{info}</Text>
                    </ScrollView>
                </SafeAreaView>
            </View>
            <HomeButton visible={showHomeButton} style={homeButtonStyle}></HomeButton>
            <NextButton
                navigateFunction={NavigateToRandomGame}
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
        paddingBottom: 40,
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
        margin: 5,
        borderRadius: 5,
        width: 250,
        paddingRight: 10,
        paddingLeft: 10
    },
    explanationContainer: {
        padding: 10,
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
        paddingBottom: 15,
    },
    scrollViewText :{
        marginBottom: 20,
    },
    infoContainer: {
        padding: 10,  
        marginBottom: 5,
    }
});