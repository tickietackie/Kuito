import React, {useState} from 'react';
import {
    Button,
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    ScrollView
} from 'react-native';

export default function App(props) {

    function NavigateToRandomGame() {

        const navigationProperties = {
            round: 1,
            playStyle: 'competetive'
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
            <SafeAreaView style={styles.friendsList}>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.text}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                </ScrollView>
            </SafeAreaView>
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