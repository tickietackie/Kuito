import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import NextButton from '../../components/NextButton';
import HomeButton from '../../components/HomeButton';
import BackgroundContainer from "../../components/BackgroundContainer"
import {material} from 'react-native-typography';
import HeaderText from '../../components/HeaderText';

import firebase from "../../../config/firebase";

export default function App(props) {
    if (props.visible === false) {
        //return null;
    }

    const round = props
        .navigation
        .getParam('round', '');
    const roundLength = 3; //Rounds after the game ends

    const showHomeButton = true;
    const homeButtonStyle = {
        justifyContent: "center",
        alignItems: "center"
    }

    return (
        <BackgroundContainer>
            <View style={styles.container}>
                <HeaderText text="Result"></HeaderText>
            </View>
            <View style={homeButtonStyle}>
                <HomeButton visible={showHomeButton} ></HomeButton>
            </View>
        </BackgroundContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
        paddingTop: 45,
        paddingBottom: 40
    },
    backContainer: {
        position: "absolute",
        bottom: 10,
        left: 3
    }
});