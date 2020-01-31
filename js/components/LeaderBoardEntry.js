import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {withNavigation} from 'react-navigation'; //navigation won't be provided to childs automatically, therefore wrap it into with navigation before exporting it
import {material} from 'react-native-typography';
import {white} from 'ansi-colors';

const ResultEntryComponent = function Category(props) {

    return (

        <View style={styles.container}>
            <View style={styles.fakeContainer}></View>
            <View style={styles.rankContainer}>
                <Text style={[material.button, styles.roundText]}>{props.rank}</Text>
            </View>
            <View style={styles.roundContainer}>
                <Text style={[material.button, styles.roundText]}>{props.username}</Text>
            </View>
            <View style={styles.resultContainer}>
                <View style={[styles.resultBorder]}>
                    <Text style={[material.button, styles.resultText]}>{props.elo}</Text>
                </View>
            </View>
            <View style={styles.KDAContainer}>
                <View style={[styles.resultBorder, styles.winsColor]}>
                    <Text style={[material.button, styles.resultText, styles.winsColor]}>{props.KDA.wins}</Text>
                </View>
                <View style={[styles.resultBorder, styles.drawsColor]}>
                    <Text style={[material.button, styles.resultText, styles.drawsColor]}>{props.KDA.draws}</Text>
                </View>
                <View style={[styles.resultBorder, styles.lossesColor]}>
                    <Text style={[material.button, styles.resultText, styles.lossesColor]}>{props.KDA.losses}</Text>
                </View>
            </View>
        </View>

    );
}

export default withNavigation(ResultEntryComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: "white",
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 2
        },
        elevation: 2,
        flexDirection: 'row',

        borderRadius: 5,
        borderWidth: 2,
        borderColor: "dodgerblue",
        minWidth: "100%",
        flex: 1,
        marginBottom: 20
    },
    rankContainer: {
        //marginBottom: 30,
        alignItems: 'center',
        backgroundColor: 'dodgerblue',
        //  flexDirection: 'row',
        flex: 1,
        justifyContent: "center",
        borderRightWidth:2,
        borderColor: "white"
    },
    roundContainer: {
        //marginBottom: 30,
        alignItems: 'center',
        backgroundColor: 'dodgerblue',
        //  flexDirection: 'row',
        flex: 5,
        justifyContent: "center",
        //borderRightWidth:1,
        borderColor: "white"
    },
    KDAContainer: {
        //marginBottom: 30,
        alignItems: 'center',
        backgroundColor: 'dodgerblue',
        flexDirection: 'row',
        flex: 3,
        justifyContent: "center",
        //borderRightWidth:1,
        borderColor: "white",

    },
    fakeContainer: {    //Didn#t find other solution for % padding, because padding in the containers itself would hinder justify content center 
        paddingBottom: "7%",
        paddingTop: "7%"
    },
    resultContainer: {
        //marginBottom: 30,
        alignItems: 'center',
        backgroundColor: 'dodgerblue',
        flexDirection: 'row',
        //minWidth: 40,
        justifyContent: "center",
        borderLeftWidth: 2,
        borderColor: "white",
        flex: 2,
        padding: "0%",
        borderRightWidth:2,

    },
    roundText: {

        color: 'white',

        textAlign: "center"
    },
    resultBorder: {
        //borderRadius: 5,
        //minWidth: "1%"
        paddingVertical:"8%",
    },
    resultText: {
        //borderRadius: 5,
        minWidth: "26%",
        margin: "2%",
        color: 'white',
        textAlign: "center"
    },
    winsColor: {
        backgroundColor: "darkgreen"
    },
    drawsColor: {
        backgroundColor: "gold"
    },
    lossesColor: {
        backgroundColor: "red"
    }
});
