import React , { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function block(props) {
    return (
        <View style={styles.container}>
            <View style={styles.questionContainer}>
                <Text style={styles.questionContainer}>{props.text.question}</Text>
            </View>
            <View style={styles.answerContainer}>
                <View style={styles.container2}>                
                    <Text adjustsFontSizeToFit={true} numberOfLines={2} style={styles.answer}>{props.text.answer1}</Text>  
                </View>
 
            
                <View style={styles.container2}>                
                    <Text style={styles.answer}>{props.text.answer2}</Text>  
                </View>
                <View style={styles.container2}>                
                    <Text style={styles.answer}>{props.text.answer3}</Text>  
                </View>
                <View style={styles.container2}>                
                    <Text style={styles.answer}>{props.text.answer4}</Text>  
                </View>
                
            </View>
        </View>

    );

}

const styles = StyleSheet.create({
    answerContainer: {
        backgroundColor: 'white',
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: "white",
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        elevation: 2,
        width: 320,
        flexDirection: 'row', 
        flexWrap: 'wrap',
        overflow: 'visible',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container : {
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionContainer: {

    },
    answer: {
        fontSize: 32,
        backgroundColor: 'blue',
        textAlign: 'center',
    },
    question: {
        textAlign: "center",
        alignSelf: 'center',
    },
    container2: {
        height: 100, 
        width: 160, 
        overflow: 'scroll',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'lightblue',
        borderWidth: 1,
        alignSelf: 'center',
    }
});

const style = {};
