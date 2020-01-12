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

    const evaluateAnswer = () => {
        const pushSolutionScreen = StackActions.push({routeName: 'Solution', params: navigationParams}); //Create stack push actions for screens so the navigation will always be stacked on top of the stack tree

        let n = data[0].solution;
        let i = userAnswer.message.length;
        while (i > 0) { //determine if the solution given by the user is right
            i = i - 1;
            if (n % userAnswer.message[0] == 0) {
                n = n / userAnswer.message[0];
                userAnswer.message[0] = 121; // set to sth n is not dividable
                continue;
            }
            if (n % userAnswer.message[1] == 0) {
                n = n / userAnswer.message[1];
                userAnswer.message[1] = 121; // set to sth n is not dividable
                continue;
            }

            if (n % userAnswer.message[2] == 0) {
                n = n / userAnswer.message[2];
                userAnswer.message[2] = 121; // set to sth n is not dividable
                continue;
            }

            if (n % userAnswer.message[3] == 0) {
                n = n / userAnswer.message[3];
                userAnswer.message[3] = 121; // set to sth n is not dividable
                continue;
            }
            n = 121; //if not dividable by any number, wrong answer
            break;
        }

        if (n === 1) { // if solution given by the user is right
            pushSolutionScreen.params.userWins = 1;
        }

        props
            .navigation
            .dispatch(pushSolutionScreen);
    }

    const text = "One question for answers!";
    const navigationParams = {
        round: props
            .navigation
            .getParam('round', ''),
        playStyle: props
            .navigation
            .getParam('playStyle', 'competitive'),
        userWins: 0,
        explanation: data[0].explanation,
        info: data[0].info
    }

    const showHomeButton = props
        .navigation
        .getParam('playStyle', 'competitive') === "training"
        ? true
        : false; //Show Home button in traing view
    const homeButtonStyle = "";

    let Data = data[0];
    const headerColor = {
        color: 'green'
    }

    const [userAnswer, //contains pressed button numbers of user, all pressed: [2,3,4,5]
        setUserAnswer] = useState({
        message: [0, 0, 0, 0]
    });

    const [showNextButton, //contains pressed button numbers of user, all pressed: [2,3,4,5]
        setShowNextButton] = useState(false);

    const inputRef = useRef([0, 0, 0, 0]);
    const callbackFunction = (childData) => {
        setUserAnswer({message: childData})
        //if array not empty show next button (user has pressed at leasat one button)
        setShowNextButton(childData.length >= 1
            ? true
            : false);
    }

    return (
        <BackgroundContainer >
            <View style={styles.container}>
                <HeaderText style={headerColor} text="Multiple Choice"></HeaderText>
                <QuestionCard text={Data} ></QuestionCard>
                <Block parentCallback={callbackFunction} text={Data}></Block>
                <HomeButton visible={showHomeButton} style={homeButtonStyle}></HomeButton>
                <NextButton
                    navigateFunction={evaluateAnswer}
                    nextButtonTitle={"Next"}
                    visible={showNextButton}></NextButton>
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