import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, Image, ActivityIndicator} from 'react-native';

import firebase from "../../../config/firebase";
import {StackActions} from 'react-navigation';
import HomeButton from '../../components/HomeButton';
import NextButton from '../../components/NextButton';
import HeaderText from '../../components/HeaderText';
import ImageQuestionCard from '../../components/Games/ImageQuestionCard';
import Block from '../../components/Games/Block';
import BackgroundContainer from "../../components/BackgroundContainer"
//import component safe data : 2 * 3 * 4 * 5, standing for the 4 fields

const data = [
    {
        question: "How high is mount everest in meters?",
        answer_1: "K2",
        answer_2: "Cho Oyu",
        answer_3: "Mount Everest",
        answer_4: "Kangchendzönga",
        solution: 4,
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
    }
];

export default function App(props) {

    const [isLoading,
        setIsLoading] = useState(true);

    const _fetchData = async() => {

        var storage = firebase.storage();

        // Create a reference to the file we want to download
        var starsRef = storageRef.child('Games/GuessThePicture/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg');

        // Get the download URL
        starsRef
            .getDownloadURL()
            .then(function (url) {
                // Insert url into an <img> tag to "download"
                var imageUrl = url;
            })
            .catch(function (error) {

                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/object-not-found':
                        // File doesn't exist
                        break;

                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;

                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    case 'storage/unknown':
                        // Unknown error occurred, inspect the server response
                        break;
                }
            });

        //fetch()
        const db = await firebase.firestore()

        var random = Math.floor(Math.random() * 100000) + 1;
        //const ref = db.collection('MultipleChoiceSets')
        console.log(random)

        const GetData = async(qData) => {
            qData
                .get()
                .then(async function (querySnapshot) {
                    await querySnapshot
                        .forEach(function (doc) {
                            console.log(doc.id, ' => ', doc.data());
                            data = doc.data()
                        });

                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                    setIsLoading(false);
                });
        }

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
            //setData(data1);
            setIsLoading(false);

        } catch (err) {
            console.log('Error getting documents', err)
            setIsLoading(false);
        }
        //}

    }

    useEffect(() => { // code to run on component mount

        _fetchData()

    }, [props.navigation]) //pass an empty array to call it just with the first call --> }, [])

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

        setIsLoading(true)

        props
            .navigation
            .dispatch(pushSolutionScreen);
    }

    const navigationParams = { //init navigation params for the next screen
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

    let blockData = data[0];
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

    if (isLoading === true) { //return loading screen, if data is loading
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
                <HeaderText style={headerColor} text="Guess the picture"></HeaderText>
                <ImageQuestionCard></ImageQuestionCard>
                <Block parentCallback={callbackFunction} text={blockData}></Block>
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