import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import {material} from 'react-native-typography';

export default function block(props) {

    const [buttonOpacity1,
        setButtonOpacity1] = useState({opacity: 1});
    const [buttonOpacity2,
        setButtonOpacity2] = useState({opacity: 1});
    const [buttonOpacity3,
        setButtonOpacity3] = useState({opacity: 1});
    const [buttonOpacity4,
        setButtonOpacity4] = useState({opacity: 1});

    const sendData = (buttonId, opacity) => {
        let userAnswer = [];
        let i = 0;
        if (buttonOpacity1.opacity == 0.7) 
            userAnswer.push(2);
        else 
            userAnswer.push(0);
        if (buttonOpacity2.opacity == 0.7) 
            userAnswer.push(3);
        else 
        userAnswer.push(0);
        if (buttonOpacity3.opacity == 0.7) 
            userAnswer.push(4);
        else 
        userAnswer.push(0);
        if (buttonOpacity4.opacity == 0.7) 
            userAnswer.push(5);
        else 
        userAnswer.push(0);
        if (opacity === 0.7) { //correct opacity for the changed button because setbuttonopacity needs time to execute
            userAnswer[buttonId] = (buttonId + 2);
        } 
        else 
        userAnswer[buttonId] = (0);
        
        let slicedCount= 0;
        const length = userAnswer.length
        for (let index = 0; index < length; index++) {
            if (userAnswer[index - slicedCount] === 0) {
                userAnswer.splice(index - slicedCount, 1)   
                slicedCount++;   
            }  
            
        }
         
        props.parentCallback(userAnswer);
    }

    function ToggleButtonOpacity(buttonId) {

        if (buttonOpacity1.opacity == 1 && buttonId == 0) {
            setButtonOpacity1({opacity: 0.7});
            sendData(buttonId, 0.7);
        } else if (buttonOpacity1.opacity !== 1 && buttonId == 0) {
            setButtonOpacity1({opacity: 1});
            sendData(buttonId, 1);
        }

        if (buttonOpacity2.opacity == 1 && buttonId == 1) {
            setButtonOpacity2({opacity: 0.7});
            sendData(buttonId, 0.7);
        } else if (buttonOpacity2.opacity !== 1 && buttonId == 1) {
            setButtonOpacity2({opacity: 1});
            sendData(buttonId, 1);
        }

        if (buttonOpacity3.opacity == 1 && buttonId == 2) {
            setButtonOpacity3({opacity: 0.7});
            sendData(buttonId, 0.7);
        } else if (buttonOpacity3.opacity !== 1 && buttonId == 2) {
            setButtonOpacity3({opacity: 1});
            sendData(buttonId, 1);
        }

        if (buttonOpacity4.opacity == 1 && buttonId == 3) {
            setButtonOpacity4({opacity: 0.7});
            sendData(buttonId, 0.7);
        } else if (buttonOpacity4.opacity !== 1 && buttonId == 3) {
            setButtonOpacity4({opacity: 1});
            sendData(buttonId, 1);
        }
    }

    //const opacity = {opacity: 0.7}; setButtonOpacity(opacity);
    return (
        <View style={styles.container}>
            <View style={styles.questionContainer}>
                <Text style={styles.question}>{props.text.question}</Text>
            </View>
            <View style={styles.answerContainer}>
                <TouchableWithoutFeedback
                    onPress={() => ToggleButtonOpacity(0)}
                    underlayColor="white">
                    <View style={[styles.container2, buttonOpacity1]}>
                        <Text
                            adjustsFontSizeToFit={true}
                            numberOfLines={2}
                            style={[material.buttonWhite, styles.answer]}>{props.text.answer1}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress={() => ToggleButtonOpacity(1)}
                    underlayColor="white">
                    <View style={[styles.container2, buttonOpacity2]}>
                        <Text
                            adjustsFontSizeToFit={true}
                            numberOfLines={2}
                            style={[material.buttonWhite, styles.answer]}>{props.text.answer2}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress={() => ToggleButtonOpacity(2)}
                    underlayColor="white">
                    <View style={[styles.container2, buttonOpacity3]}>
                        <Text
                            adjustsFontSizeToFit={true}
                            numberOfLines={2}
                            style={[material.buttonWhite, styles.answer]}>{props.text.answer3}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress={() => ToggleButtonOpacity(3)}
                    underlayColor="white">
                    <View style={[styles.container2, buttonOpacity4]}>
                        <Text
                            adjustsFontSizeToFit={true}
                            numberOfLines={2}
                            style={[material.buttonWhite, styles.answer]}>{props.text.answer4}</Text>
                    </View>
                </TouchableWithoutFeedback>

            </View>
        </View>

    );

}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        flex: 1
    },
    questionContainer: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#A9E2F3",
        marginBottom: 40,
        margin: 5,
        borderRadius: 5,
        //shadowOpacity: 0.75, shadowRadius: 2,
        shadowColor: 'black',
        /*shadowOffset: {
            width: 0.2,
            height: 0.2,
        },
        elevation: 2,*/
    },
    question: {
        alignItems: 'center'
    },
    answerContainer: {
        flex: 3,
        width: 320,
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflow: 'visible',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    answer: {},
    container2: {
        height: 100,
        width: 150,
        margin: 5,
        //overflow: 'scroll',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2E64FE',
        borderRadius: 5,

        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: 'black',
        shadowOffset: {
            width: 1,
            height: 2
        },
        elevation: 2,
        padding: 2
    }
});

const style = {};
