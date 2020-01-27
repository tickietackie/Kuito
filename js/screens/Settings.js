import React, {useState, useEffect} from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
    ScrollView,
    SafeAreaView,
    AsyncStorage
} from 'react-native';
import {SettingsScreen} from "react-native-settings-screen"
//import component

export default function App(props) {
    const text = "These are my settings";
    if (props.visible === false) {
        //return null;
    }

    const _signOutAsync = async() => {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            console.log(error)
        }

        props
            .navigation
            .navigate('Auth');
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.friendsList}>
                <ScrollView>
                    <Text>{text}</Text>
                    <View style={styles.startButton}>
                        <Button title="Sign Out" onPress={() => _signOutAsync()}/>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        alignItems: 'center',
        justifyContent: 'center'
    },
    backContainer: {
        position: "absolute",
        bottom: 10,
        alignItems: 'center'
    },
    nextContainer: {
        position: "absolute",
        bottom: 10,
        right: 3
    }
});