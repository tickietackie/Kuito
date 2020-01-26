import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {material} from 'react-native-typography';

export default function QuestionCard(props) {
    var pic = props.picUrl != ''
        ? {uri: props.picUrl}
        : require('../../../images/placeholder.png');

    return (
        <View style={styles.container}>
            <View style={styles.questionContainer}>
                <Image style={styles.question} source={pic}></Image>
            </View ></View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: "3%",
        flex: 3,
    },
    questionContainer: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
        //marginBottom: "5%",
        borderRadius: 5,
        shadowColor: 'black',
        //padding:40,
        minWidth : 300,
    },
    question: {
        flex: 1,
        resizeMode: 'contain',
        width: 320, height: 400
    }
});
