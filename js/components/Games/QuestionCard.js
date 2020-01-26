import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {material} from 'react-native-typography';

export default function QuestionCard(props) {

    return (
        <View style={styles.container}>
            <View style={styles.questionContainer}>
                <Text style={styles.question}>{props.text.question}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: "3%",
        flex: 2,
    },
    questionContainer: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#A9E2F3",
        //marginBottom: "5%",
        borderRadius: 5,
        shadowColor: 'black',
        //padding:40,
        minWidth : 300,
    },
    question: {
        alignItems: 'center',
        justifyContent: "center",
        textAlign: "center"
    },
});

