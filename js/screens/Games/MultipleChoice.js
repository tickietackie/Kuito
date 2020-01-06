import React, {useState, useEffect} from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
    ScrollView,
    SafeAreaView
} from 'react-native';

import {StackActions} from 'react-navigation';
import HomeButton from '../../components/HomeButton';
//import component

export default function App(props) {
    const text = "One question for answers!";
    const navigationParams = {
        round: props
            .navigation
            .getParam('round', ''),
        playStyle: props
            .navigation
            .getParam('playStyle', 'competitive')
    }

    const pushSolutionScreen = StackActions.push({routeName: 'Solution', params: navigationParams}); //Create stack push actions for screens so the navigation will always be stacked on top of the stack tree
    const showHomeButton = props.navigation.getParam('playStyle', 'competitive') === "training" ? true : false; //Show Home button in traing view
    const homeButtonStyle = "";

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.friendsList}>
                <ScrollView>
                    <Text>{text}</Text>
                    <Text>round: {JSON.stringify(props.navigation.getParam('round', ''))}</Text>
                    <Text>playStyle: {JSON.stringify(props.navigation.getParam('playStyle', ''))}</Text>
                </ScrollView>
            </SafeAreaView>
            <HomeButton visible={showHomeButton} style={homeButtonStyle}></HomeButton>
            <View style={styles.nextContainer}>
                <Button
                    title="Next"
                    onPress={() => props.navigation.dispatch(pushSolutionScreen)}/>
            </View>
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
        right: 3
    }
});