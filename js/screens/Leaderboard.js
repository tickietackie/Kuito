import React, {Component, useState} from 'react';
import {
    Platform,
    StyleSheet,
    SafeAreaView,
    Button,
    View
} from 'react-native';

import BackgroundContainer from '../components/BackgroundContainer';
import HeaderText from '../components/HeaderText';

import GameHistory from '../components/GameHistory/GameHistoryComponent'

export default function Leaderboard(props) {

    const [random,
        setRandom] = useState(Math.floor(Math.random() * 100000) + 1);

    //var random = Math.floor(Math.random() * 100000) + 1;

    const navigationProperties = {
        round: 1,
        playStyle: 'competetive',
        randomId: random,
        userId: "abc"
    };

    const game = [
        {1: 1, UserWins: 1, userId: "abc", gameId: "OJjrseCfzKXo77BdDKVg"},
        {2: 0, UserWins: 0, userId: "abc", gameId: "HSiwNxBCMSmS0kRgR7LD"},
        {3: 1, UserWins: 1, userId: "abc", gameId: "O4qZ90l3qIbEvlebuev3"}
    ]


    const navigationPropertiesResult = {
        round: 3,
        playStyle: 'competetive',
        randomId: random,
        Game: game,
        userId: "abc",
    };

    const navigate = () => {
        setRandom(Math.floor(Math.random() * 100000) + 1);
        props
            .navigation
            .navigate("MultipleChoice", navigationProperties)
    }

    return (
        <BackgroundContainer>
            <SafeAreaView style={styles.container}>
                <HeaderText text="Leaderboard"></HeaderText>
                <Button
                    title="Linking"
                    onPress={() => props.navigation.navigate("LinkingGame", navigationProperties)}/>
                <Button
                    title="Guess"
                    onPress={() => props.navigation.navigate("GuessPicture", navigationProperties)}/>
                <Button title="Multiple" onPress={() => navigate()}/>
                <Button
                    title="Solution"
                    onPress={() => props.navigation.navigate("Solution", navigationPropertiesResult)}/>
                <Button
                    title="Result"
                    onPress={() => props.navigation.navigate("Result", navigationPropertiesResult)}/>
            </SafeAreaView>
            <GameHistory showResult={true}></GameHistory>
        </BackgroundContainer>

    );

}

const styles = StyleSheet.create({
    container: {
        paddingTop: "0%"
    },
    button: {
        marginBottom: 30,
        width: 260,
        alignItems: 'center',
        backgroundColor: '#2196F3'
    },
    buttonText: {
        textAlign: 'center',
        padding: 20,
        color: 'white'
    },
    container2: {
        flex: 1,
        backgroundColor: '#EFFBEF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 42,
        color: "black",
        padding: 5,
        margin: 10,
        backgroundColor: "red"
    }
});
