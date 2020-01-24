import React, {useState} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {withNavigation} from 'react-navigation'; //navigation won't be provided to childs automatically, therefore wrap it into with navigation before exporting it
import {material} from 'react-native-typography';

const CategoryComponent = function Category(props) {

    //const {player, dsf} = {props}

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
            <TouchableHighlight
                onPress={() => alert("Play against player " + props.player + " ?")}
                underlayColor="white">
                <View style={styles.button}>
                <View style={styles.userId}>
                        <Text style={[material.button, styles.buttonText]}>{props.player}</Text>
                    </View>
                    <View style={styles.Date}>
                        <Text
                            style={[
                            material.button,
                            styles.buttonText
                        ]}>{props.date}</Text>
                    </View>
                    <View style={styles.result}>
                        <Text style={[material.button, styles.buttonText]}>{props.result}</Text>
                    </View>
                    <View style={[styles.resultAbbr, resultBGColor]}>
                        <Text style={[material.button, styles.buttonText]}>{props.resultAbbr}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        </View>
    );
}

export default withNavigation(CategoryComponent);

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        alignItems: 'center',
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: "white",
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 2
        },
        elevation: 2
    },
    button: {
        //marginBottom: 30, 
        alignItems: 'center',
        backgroundColor: 'navy',
        flexDirection: 'row',
        minWidth: 320,
        justifyContent: "center"
    },
    buttonText: {
        textAlign: "center",
        //borderWidth: 2,
        paddingRight: 5,
        paddingLeft: 5,
        paddingTop: 10,
        paddingBottom:10,
        color: 'white'
    },
    date: {
        flex: 2
    },
    userId: {
        flex: 4,
    },
    result: {
        flex: 2,
    },
    resultAbbr: {
        flex: 1,
        margin: 5,
        //borderWidth: 10
    }
});
