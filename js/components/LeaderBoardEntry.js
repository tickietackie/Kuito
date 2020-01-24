import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {withNavigation} from 'react-navigation'; //navigation won't be provided to childs automatically, therefore wrap it into with navigation before exporting it
import {material} from 'react-native-typography';
import { white } from 'ansi-colors';

const ResultEntryComponent = function Category(props) {

    //const (player, dsf) = {props}
    const result = props.result
        ? props.result
        : ""

    let resultBGColor = "";
    if (result == "win") {
        resultBGColor = {
            backgroundColor: "limegreen"
        }
    } else if (result == "lose") {
        resultBGColor = {
            backgroundColor: "red"
        }
    } else if (result == "remi") {
        resultBGColor = {
            backgroundColor: "gold"
        }
    } else {
        resultBGColor = {
            backgroundColor: "blue"
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.roundContainer}>
                <Text style={[material.display1, styles.roundText]}>Round: {props.round}</Text>
            </View>
            <View style={styles.resultContainer}>
                <View style={[styles.resultBorder, resultBGColor]} >
                    <Text style={[material.display1, styles.roundText, resultBGColor]}>{result}</Text>
                </View>
            </View>
        </View>
    );
}

export default withNavigation(ResultEntryComponent);

const styles = StyleSheet.create({
    container: {
        //flex: 1, paddingTop: 30, alignItems: 'center',
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
        margin: 20,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "navy"

    },
    roundContainer: {
        //marginBottom: 30,
        alignItems: 'center',
        backgroundColor: 'navy',
        flexDirection: 'row',
        minWidth: 170,
        justifyContent: "center",
        borderRightWidth:1,
        borderColor: "white",
    },
    resultContainer: {
        //marginBottom: 30,
        alignItems: 'center',
        backgroundColor: 'navy',
        flexDirection: 'row',
        minWidth: 150,
        justifyContent: "center",
        borderLeftWidth:1,
        borderColor: "white",
    },
    roundText: {

        color: 'white',

        textAlign: "center",

    },
    resultBorder: {
        borderRadius: 5,
        minWidth: 100,
        margin: 15,
        padding: 5,
    }
});
