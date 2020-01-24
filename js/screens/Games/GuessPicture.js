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
import ImageQuestionCard from '../../components/Games/ImageQuestionCard';
import Block from '../../components/Games/Block';
import BackgroundContainer from "../../components/BackgroundContainer"
//import component safe data : 2 * 3 * 4 * 5, standing for the 4 fields

export default function App(props) {

    const [data, //contains pressed button numbers of user, all pressed: [2,3,4,5]
        setData] = useState({
        question: "",
        answer_1: "",
        answer_2: "",
        answer_3: "",
        answer_4: "",
        solution: 3,
        explanation: "",
        info: "",
        random: 0
    });

    const [pictureUrl,
        setPictureUrl] = useState('')

    const [isLoading,
        setIsLoading] = useState(true);

    const [gameId,
        setGameId] = useState(0);

    const _fetchData = async() => {

        const db = firebase.firestore()

        var random = Math.floor(Math.random() * 100000) + 1;
        //const ref = db.collection('MultipleChoiceSets')
        console.log(random)

        async function GetGuessPictureSet(db) {
            let campaignsRef = db.collection('GuessPictureSets')
            let activeRef = await campaignsRef
                .where('random', '>=', random)
                .orderBy('random')
                .limit(1)
                .get();
            for (doc of activeRef.docs) {
                setGameId(doc.id)
                return doc.data();
            }
        }

        async function GetUrl(storage, setId) {
            // Create a reference to the file we want to download
            var picRef = storage.ref('Games/GuessThePicture/' + setId + '.jpg');

            // Get the download URL
            const urlRef = await picRef.getDownloadURL()
            //console.log(urlRef)
            return urlRef;
        }

        try {
            data1 = await GetGuessPictureSet(db);
            var storage = firebase.storage();
            const setId = data1.random;
            try {
                const url = await GetUrl(storage, setId);
                setData(data1);
                setPictureUrl(url);
                setIsLoading(false);
            } catch (error) {
                switch (error.code) {
                    case 'storage/object-not-found':
                        // File doesn't exist
                        console.log('File does not exist', error);
                        break;

                    case 'storage/unauthorized':
                        console.log('Missing permission', error);
                        // User doesn't have permission to access the object
                        break;

                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    case 'storage/unknown':
                        console.log('Unknown error occured', error);
                        // Unknown error occurred, inspect the server response
                        break;
                    default:
                        console.log('Error', error);
                }
            }

        } catch (err) {
            console.log('Error getting documents', err)
            setIsLoading(false);
        }
    }

    useEffect(() => { // code to run on component mount

        _fetchData()

    }, [props.navigation]) //pass an empty array to call it just with the first call --> }, [])

    const evaluateAnswer = () => { //evaluate the given answer of the user for correctness

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
            navigationParams.userWins = 1;
            navigationParams.Game[round - 1].UserWins = 1
            navigationParams.Game[round - 1].gameId = gameId
        } else {
            navigationParams.Game[round - 1].UserWins = 0
            navigationParams.Game[round - 1].gameId = gameId
        }

        const pushSolutionScreen = StackActions.push({routeName: 'Solution', params: navigationParams}); //Create stack push actions for screens so the navigation will always be stacked on top of the stack tree

        //setIsLoading(true)

        props
            .navigation
            .dispatch(pushSolutionScreen);
    }

    const userId = props
        .navigation
        .getParam("userId", '1')
    const userId2 = 2;

    const guessPictureId = 1

    const round = props //Get round
        .navigation
        .getParam('round', '')

    let game = props //set the played game (MultipleChoice = 0) in the array with the round
        .navigation
        .getParam("Game", '')

    if (!game[round - 1]) {
        if (round != '' && game != '') {
            game.push({[round]: guessPictureId, UserWins: 0, userId: userId})
        } else {
            game = [
                {
                    1: guessPictureId,
                    UserWins: 0,
                    userId: userId,
                }
            ]; //if round is not, set set it to 0
        }
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
        info: data.info,
        Game: game,
        userId: userId
    }

    const showHomeButton = props
        .navigation
        .getParam('playStyle', 'competitive') === "training"
        ? true
        : false; //Show Home button in traing view
    const homeButtonStyle = "";

    let blockData = data;
    const headerColor = {
        color: 'green'
    }

    const [userAnswer, //contains pressed button numbers of user, all pressed: [2,3,4,5]
        setUserAnswer] = useState({
        message: [0, 0, 0, 0]
    });

    const [showNextButton, //contains pressed button numbers of user, all pressed: [2,3,4,5]
        setShowNextButton] = useState(false);

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
                <ImageQuestionCard picUrl={pictureUrl}></ImageQuestionCard>
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
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center"
    }
});