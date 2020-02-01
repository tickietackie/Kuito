import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';  //navigation won't be provided to childs automatically, therefore wrap it into with navigation before exporting it
import { FontAwesome } from '@expo/vector-icons';


const SettingsButton = function SettingsButton(props) {

    const {visible, style} = props;

    const navigationParams = { //Get round and playstyle from last screen
        finished: 1
    };
    
    if (visible === false) return null; //Not visible if param visible is false
    return (
        <FontAwesome.Button onPress={() => props.navigation.navigate('Settings')} name="sign-in-alt" backgroundColor="rgb(80,80,80)">
        Sign In!
      </FontAwesome.Button>
    );
}

const styles = StyleSheet.create({
    nextContainer: {
        position: "absolute",
        bottom: "2%",
        //left: 10,
        justifyContent: "center",
        alignItems:"center",
        //marginBottom: "10"
      }
});

export default withNavigation(SettingsButton);