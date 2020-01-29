import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';  //navigation won't be provided to childs automatically, therefore wrap it into with navigation before exporting it
import {StackActions, NavigationActions} from 'react-navigation';
import {material} from 'react-native-typography';

const HomeButtonComponent = function HomeButton(props) {

    const {visible, style} = props;

    const navigationParams = { //Get round and playstyle from last screen
        finished: 1
    };

    const titel = props.titel ? props.titel : "Home";

    const navToNewGame = () => {
        props.navigation.navigate("NewGame", navigationParams)
    }

    const navigateToScreen = props.navigation.getParam("nav",0) ? props.navigation.getParam("nav",0) : navToNewGame
    
    if (visible === false) return null; //Not visible if param visible is false
    return (
        <View style={[styles.nextContainer, style]}>
            <Button title={titel} onPress={() => navigateToScreen()} />
        </View>
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

export default withNavigation(HomeButtonComponent);