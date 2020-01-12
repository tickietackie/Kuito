import React, { useState } from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import { withNavigation } from 'react-navigation';  //navigation won't be provided to childs automatically, therefore wrap it into with navigation before exporting it
import { material } from 'react-native-typography';

const CategoryComponent = function Category(props) {

    //const (player, dsf) = {props}

    return (
        <View style={styles.container}>
            <TouchableHighlight onPress={() => alert("Play against player " + props.player + " ?")} underlayColor="white">
                <View style={styles.button}>
                    <Text style={[material.display0, styles.buttonText]}>{props.date}</Text>
                    <Text style={[material.display0, styles.buttonText]}>{props.player}</Text>
                    <Text style={[material.display0, styles.buttonText]}>{props.result}</Text>
                    <Text style={[material.display0, styles.buttonText]}>{props.resultAbbr}</Text>
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
        elevation: 2,
    },
    button: {
        //marginBottom: 30,
        alignItems: 'center',
        backgroundColor: '#2E64FE',
        flexDirection: 'row',
        minWidth: 300,
        justifyContent: "center"
    },
    buttonText: {

        padding: 15,
        color: 'white'
    }
});
