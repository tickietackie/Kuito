import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    SafeAreaView,
    FlatList
} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import NextButton from '../../components/NextButton';
import HomeButton from '../../components/HomeButton';
import BackgroundContainer from "../../components/BackgroundContainer"
import {material} from 'react-native-typography';
import HeaderText from '../../components/HeaderText';
import ResultEntry from '../../components/ResultEntry';

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
        alignItems: "center",
        felx: 1
    }

    function Item({round, result}) { //Each item in the list will be render like this item
        return (
            <ResultEntry result={result} round={round}></ResultEntry>
        );
    }

    const DATA = props
        .navigation
        .getParam("Game", '');

    var results = []
    var i = 1;
    //obj = {...obj, ...pair};  add object key : value pair
    DATA.forEach(element => {
        let gameResult = DATA[i-1].UserWins === 0 ? "lose" : "win"
        results.push({round: `${i}`, result: gameResult});     //spread operator 
        i++;
    });

    return (
        <BackgroundContainer>
            <View style={styles.container1}>
                <View style={styles.container}>
                    <HeaderText text="Result"></HeaderText>
                </View>
                <View style={styles.resultsContainer}>
                    <SafeAreaView >
                        <FlatList
                            data={results}
                            renderItem={({item}) => <Item result={item.result} round={item.round}/>}
                            keyExtractor={item => item.round}/>
                    </SafeAreaView>
                </View>
                <HomeButton visible={showHomeButton} style={homeButtonStyle}></HomeButton>
            </View>
        </BackgroundContainer>
    );
}

const styles = StyleSheet.create({
    container1: {
        alignItems: 'center',
        paddingTop: 45,
        flex: 1
    },
    container: {
        //flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
        //paddingBottom: 40
    },
    resultsContainer: {
        paddingTop: 10,
        alignItems: 'center'
    },
    backContainer: {
        position: "absolute",
        bottom: 10,
        left: 3
    }
});