import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {material} from 'react-native-typography';

export default function App(props) {
    if (props.visible === false) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={[material.display1, styles.eloText]}>Points: {props.pointsGained}</Text>
            <Text style={[material.display1, styles.eloText]}>New rtgØ: {props.newElo}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1
    },
    eloText: {
        marginTop: "3%",
        color: '#006666',
        textAlign: "center"
    }
});