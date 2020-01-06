import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';  //navigation won't be provided to childs automatically, therefore wrap it into with navigation before exporting it
import {StackActions, NavigationActions} from 'react-navigation';

const HomeButtonComponent = function HomeButton(props) {

    function NavigateToMenu() {

        let RandomScreen = "";
        RandomScreen = StackActions.replace({
            index: 0,
            routeName: "App",
            actions: [NavigationActions.navigate({routeName: 'NewGame'})]
        });

        props
            .navigation
            .dispatch(RandomScreen); //navigate to random screen

    }

    const {visible, style} = props;
    
    if (visible === false) return null; //Not visible if param visible is false
    return (
        <View style={[styles.nextContainer, style]}>
            <Button title={"Home"} onPress={() => props.navigation.navigate("NewGame")} />
        </View>

    );

}

const styles = StyleSheet.create({
    nextContainer: {
        position: "absolute",
        bottom: 10,
        left: 10,
        justifyContent: "center",
      }
});

export default withNavigation(HomeButtonComponent);