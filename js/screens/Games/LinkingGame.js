import React, {useState, useRef} from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
    ScrollView,
    SafeAreaView
} from 'react-native';

import {StackActions} from 'react-navigation';
import HomeButton from '../../components/HomeButton';
import NextButton from '../../components/NextButton';
import HeaderText from '../../components/HeaderText';
import Block from '../../components/Games/Block';
import QuestionCard from '../../components/Games/QuestionCard';
import BackgroundContainer from "../../components/BackgroundContainer"
//import component safe data : 2 * 3 * 4 * 5, standing for the 4 fields

const data = [
    {
        question: "How high is mount everest in meters?",
        answer1: "8448m",
        answer2: "8848m",
        answer3: "8884m",
        answer4: "8488m",
        solution: 3,
        explanation: "There are at least 109 mountains on Earth with elevations greater than 7,200 met" +
                "res (23,622 ft) above sea level. The vast majority of these mountains are locate" +
                "d on the edge of the Indian and Eurasian continental plates. Only those summits " +
                "are included that, by an objective measure, may be considered individual mountai" +
                "ns as opposed to subsidiary peaks.",
        info: "Mount Everest (Nepali: Sagarmatha सगरमाथा; Tibetan: Chomolungma ཇོ་མོ་གླང་མ; Chi" +
                "nese: Zhumulangma 珠穆朗玛) is Earth's highest mountain above sea level, located in " +
                "the Mahalangur Himal sub-range of the Himalayas. The international border betwee" +
                "n Nepal (Province No. 1) and China (Tibet Autonomous Region) runs across its sum" +
                "mit point.The current official elevation of 8,848 m (29,029 ft), recognised by C" +
                "hina and Nepal, was established by a 1955 Indian survey and subsequently confirm" +
                "ed by a Chinese survey in 1975."
    }, {
        question: "How high is the ...",
        answer1: "550",
        answer2: "100",
        answer3: "100",
        answer4: "100"
    }, {
        question: "How high is the ...",
        answer1: "400",
        answer2: "100",
        answer3: "100",
        answer4: "100"
    }, {
        question: "How high is the ...",
        answer1: "200",
        answer2: "100",
        answer3: "100",
        answer4: "100"
    }
];

export default function App(props) {

    const headerColor = {
        color: 'green'
    }

    return (
        <BackgroundContainer >
            <View style={styles.container}>
                <HeaderText style={headerColor} text="Linking Game"></HeaderText>
            </View>
        </BackgroundContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: 45,
        flex: 1
    },
    backContainer: {
        position: "absolute",
        bottom: 10,
        left: 3
    },
    nextContainer: {
        position: "absolute",
        bottom: 10,
        right: 3
    }
});