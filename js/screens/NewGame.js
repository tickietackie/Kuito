import React, {useState} from 'react';
import {
    Button,
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    ScrollView,
    AsyncStorage
} from 'react-native';

import GameHistory from "../components/GameHistory"

export default function App(props) {

    async function NavigateToRandomGame() {

        GetUserId = async() => {
            return await AsyncStorage.getItem('userToken');
        };

        const userId = await GetUserId()

        const navigationProperties = {
            round: 1,
            playStyle: 'competetive',
            userId : userId
        };

        var RandomNumber = Math.floor(Math.random() * 3) + 1;
        setRand(RandomNumber); //change random state for next render
        props
            .navigation
            .navigate(RandomScreen, navigationProperties); //naviaget to random game
    }

    const [rand,
        setRand] = useState(Math.floor(Math.random() * 3) + 1); //Set random starting number for the random game vs opponent

    let RandomScreen = "";
    if (rand === 1) {
        RandomScreen = "GuessPicture";
    } else if (rand === 2) {
        RandomScreen = "LinkingGame"
    } else {
        RandomScreen = "MultipleChoice"
    }

    return (
        <View style={styles.container}>
            <View style={styles.startButton}>
                <Button
                    title="Train yourself"
                    onPress={() => props.navigation.navigate("Categories")}/>
            </View>
            <View style={styles.startButton}>
                <Button title="Random opponent" onPress={() => (NavigateToRandomGame())}/>
            </View>
            <View style={styles.friendsList}>
                <GameHistory></GameHistory>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#CEF6CE',
        flex: 1,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5
    },
    friendsList: {
        flex: 5,
        margin: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1
    },
    scrollView: {
        backgroundColor: 'white',
        marginHorizontal: 20
    },
    text: {
        fontSize: 42
    },
    startButton: {
        margin: 5,
        borderWidth: 1,
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }

});