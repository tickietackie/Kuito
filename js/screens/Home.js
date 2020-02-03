import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, Text, View, AsyncStorage} from 'react-native';
import BackgroundContainer from "../components/BackgroundContainer";
import {StackActions, NavigationActions} from 'react-navigation';
import SettingsButton from "../components/Buttons/SettingsButton"
import StartGame from "../components/Buttons/StartGame"
//import Settings from './Settings'

export default function App(props) {

    const _signOutAsync = async () => {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            console.log(error)
        }

        props.navigation.navigate('Auth');
      };

    return (
        <BackgroundContainer >
            <View style={styles.container}>
                <View style={styles.startButton}>
                    <StartGame/>
                </View>                
                <View style={styles.settingsButton}>
                    <SettingsButton></SettingsButton>
                </View>
            </View>
        </BackgroundContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    settingsButton: {
        flex: 1,
        //backgroundColor: 'white', borderWidth: 1, borderRadius: 30,
        fontSize: 42,
        //borderWidth: 1,
        padding: 5,
        margin: 10,
        position: 'absolute',
        top: 30,
        right: 3
    },
    startButton: {
        flex: 1,
        //backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }

});