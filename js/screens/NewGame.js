import React, {useState} from 'react';
import {
    Button,
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    ScrollView,
    AsyncStorage,
    TouchableHighlight
} from 'react-native';

import {material} from 'react-native-typography';

import GameHistory from "../components/GameHistory"
import BackgroundContainer from '../components/BackgroundContainer';

export default function App(props) {

    async function NavigateToRandomGame() {

        GetUserId = async() => {
            return await AsyncStorage.getItem('userToken');
        };

        const userId = await GetUserId()

        const navigationProperties = {
            round: 1,
            playStyle: 'competetive',
            userId: userId
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
        <BackgroundContainer>
            <View style={styles.container}>
                <TouchableHighlight
                    style={styles.startButton}
                    onPress={() => props.navigation.navigate("Categories")}
                    underlayColor="white">
                    <View style={styles.button}>
                        <Text style={[material.button, styles.buttonText]}>Train yourself</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.startButton}
                    onPress={() => (NavigateToRandomGame())}
                    underlayColor="white">
                    <View style={styles.button}>
                        <Text style={[material.button, styles.buttonText]}>Random opponent</Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.GameHistory}>
                    <GameHistory></GameHistory>
                </View>

            </View>
        </BackgroundContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        //backgroundColor: '#CEF6CE',
        flex: 1,
    },
    GameHistory: {
        flex: 5,
    },
    scrollView: {
        backgroundColor: 'white',
        marginHorizontal: 20
    },
    text: {
        marginTop: 10,
        color: "white"
    },
    startButton: {
        borderRadius: 10,
        margin: 25,
        flex: 1,
        backgroundColor: 'forestgreen',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: "white",
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 2
        },
        elevation: 2,
    }

});