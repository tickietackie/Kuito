import React , { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function block(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.text.answer1}</Text>
            <Text style={styles.text}>{props.text.answer2}</Text>
            <Text style={styles.text}>{props.text.answer3}</Text>
            <Text style={styles.text}>{props.text.answer4}</Text>
            <Button title="Start Game" onPress={() => alert('Es geht!')} />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: "white",
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        elevation: 2,
        borderRadius: 5,
    },
    text: {
        fontSize: 42,
        borderWidth: 1,
        padding: 5,
        margin: 10,
    }
});

const style = {};
