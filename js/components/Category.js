import React, { useState } from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import { withNavigation } from 'react-navigation';  //navigation won't be provided to childs automatically, therefore wrap it into with navigation before exporting it

const CategoryComponent = function Category(props) {

    function NavigateToRandomGame() {

        const navigationProperties = {
            round: 1,
            playStyle: !props.playStyle ? "training" : props.playStyle
        };

        var RandomNumber = Math.floor(Math.random() * 3) + 1;
        setRand(RandomNumber); //change random state for next render
        props
            .navigation
            .navigate(RandomScreen, navigationProperties); //navigate to random game
    }

    // actually here a random not played game has to be loaded from the given
    // category
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
            <TouchableHighlight onPress={NavigateToRandomGame} underlayColor="white">
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{props.titel}</Text>
                </View>
            </TouchableHighlight>
        </View>
    );

}


export default withNavigation(CategoryComponent);

const styles = StyleSheet.create({
    container: {
        paddingTop: "10%",
        alignItems: 'center',
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: "white",
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 2
        },
        elevation: 3
    },
    button: {
        //marginBottom: 30,
        width: 260,
        alignItems: 'center',
        backgroundColor: '#2196F3'
    },
    buttonText: {
        textAlign: 'center',
        padding: 20,
        color: 'white'
    }
});
