import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
//import Settings from './Settings'

export default function App(props) {

    const [showSettingsScreen, setShowSettingsScreen] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.startButton}>
                <Button title="Start Game" onPress={() => props.navigation.navigate('NewGame')} />
            </View>
            {/*<Settings visible={showSettingsScreen}></Settings>*/}
            <View style={styles.settingsButton}>
                <Button title="Settings" onPress={() => props.navigation.navigate('Settings')} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#CEF6CE',
        flex: 1,
    },
    settingsButton: {
        flex: 1,
        backgroundColor: 'white',
        //borderWidth: 1,
        //borderRadius: 30,
        fontSize: 42,
        //borderWidth: 1,
        padding: 5,
        margin: 10,
        position: 'absolute',
        top: 30,
        right: 3,
    },
    startButton: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    }

});