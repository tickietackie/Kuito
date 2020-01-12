import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    Button,
    View
} from 'react-native';

import BackgroundContainer from '../components/BackgroundContainer';
import HeaderText from '../components/HeaderText';

import GameHistory from '../components/GameHistory'

export default function Leaderboard(props) {

        return (
          <BackgroundContainer>
              <View style={styles.container}>
                <HeaderText text="Leaderboard"></HeaderText>
                <Button
                    title="Linking"
                    onPress={() => props.navigation.navigate("LinkingGame")}/>
                <Button
                    title="Guess"
                    onPress={() => props.navigation.navigate("GuessPicture")}/>
                <Button
                    title="Multiple"
                    onPress={() => props.navigation.navigate("MultipleChoice")}/>
            </View>
            <GameHistory></GameHistory>
          </BackgroundContainer>

        );
    
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 45,
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
        backgroundColor: "red",
    }
});
