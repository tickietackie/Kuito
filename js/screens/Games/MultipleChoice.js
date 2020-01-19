import React, {useState, useRef, useEffect} from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
    ScrollView,
    SafeAreaView,
    ActivityIndicator
} from 'react-native';

import firebase from "../../../config/firebase";

import {StackActions} from 'react-navigation';
import HomeButton from '../../components/HomeButton';
import NextButton from '../../components/NextButton';
import HeaderText from '../../components/HeaderText';
import Block from '../../components/Games/Block';
import QuestionCard from '../../components/Games/QuestionCard';
import BackgroundContainer from "../../components/BackgroundContainer"
//import component safe data : 2 * 3 * 4 * 5, standing for the 4 fields

export default function App(props) {

    const [data, //contains pressed button numbers of user, all pressed: [2,3,4,5]
        setData] = useState({
        question: "",
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        solution: 3,
        explanation: "",
        info: ""
    });

    const [isLoading,
        setIsLoading] = useState(true);

    const _fetchData = async() => {

        //fetch()
        const db = await firebase.firestore()

        /*db
            .collection("MultipleChoiceSets")
            .where('random', '<=', 1)
            .orderBy('random')
            .limit(1)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(`${doc.id} => ${doc.data()}`);
                });
            });*/

        var random = Math.floor(Math.random() * 100000) + 1;
        //const ref = db.collection('MultipleChoiceSets')
        console.log(random)

        async function process_tasks(db) {
            let campaignsRef = db.collection('MultipleChoiceSets')
            let activeRef = await campaignsRef
                .where('random', '>=', random)
                .orderBy('random')
                .limit(1)
                .get();
            for (doc of activeRef.docs) {
                return doc.data();
            }
        }
        try {
            data1 = await process_tasks(db);
            setData(data1);
            setIsLoading(false);

        } catch (err) {
            console.log('Error getting documents', err)
            setIsLoading(false);
        }
        

    }

    useEffect(() => { // code to run on component mount

        _fetchData()

    }, [props.navigation]) //pass an empty array to call it just with the first call --> }, [])

    const evaluateAnswer = () => {
        const pushSolutionScreen = StackActions.push({routeName: 'Solution', params: navigationParams}); //Create stack push actions for screens so the navigation will always be stacked on top of the stack tree

        let n = data.solution;
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

        setIsLoading(true)
    }

    const navigationParams = { //init navigation params for the next screen
        round: props
            .navigation
            .getParam('round', ''),
        playStyle: props
            .navigation
            .getParam('playStyle', 'competitive'),
        userWins: 0,
        explanation: data.explanation,
        info: data.info
    }

    const headerColor = {
        color: 'green'
    }

    const [userAnswer, //contains pressed button numbers of user, all pressed: [2,3,4,5]
        setUserAnswer] = useState({
        message: [0, 0, 0, 0]
    });

    const showHomeButton = props //Show home button only in training mode
        .navigation
        .getParam('playStyle', 'competitive') === "training"
        ? true
        : false; //Show Home button in traing view
    const homeButtonStyle = "";

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

    if (isLoading === true) {       //return loading screen, if data is loading 
        return (
            <BackgroundContainer>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="darkorange"></ActivityIndicator>
                </View>
            </BackgroundContainer>
        )
    }

    return (
        <BackgroundContainer >
            <View style={styles.container}>
                <HeaderText style={headerColor} text="Multiple Choice"></HeaderText>
                <QuestionCard text={data}></QuestionCard>
                <Block parentCallback={callbackFunction} text={data}></Block>
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
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center"
    }
});