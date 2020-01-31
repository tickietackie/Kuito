import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, Text, Dimensions, ActivityIndicator} from 'react-native';

import Dragable from "../../components/Games/Dragable"
import {StackActions} from 'react-navigation';
import NextButton from '../../components/Buttons/NextButton';
import HeaderText from '../../components/HeaderText';
import BackgroundContainer from "../../components/BackgroundContainer"
import firebase from "../../../config/firebase";

export default function Drag(props) {
    const dropZoneValues = React.useRef(null);

    const [data, //contains pressed button numbers of user, all pressed: [2,3,4,5]
        setData] = useState({Category1: "", Category2: "", Dragables: [], explanation: "", info: ""});

    const [dropZone,
        setDropZone] = useState({})

    const [dropZone2,
        setDropZone2] = useState({})

    const [bgColor,
        setBgColor] = React.useState('slategrey');
    const [bgColorRight,
        setBgColorRight] = React.useState('slategrey');

    const [showNextButton, //contains pressed button numbers of user, all pressed: [2,3,4,5]
        setShowNextButton] = useState(false);

    const [isLoading,
        setIsLoading] = useState(true);

    const setDropZoneValuesLeft = React.useCallback((event) => {
        dropZoneValues.current = event.nativeEvent.layout;
    });

    const setDropZoneValuesRight = React.useCallback((event) => {
        dropZoneValues.current = event.nativeEvent.layout;
    });

    let explanation = ""

    data
        .Dragables
        .forEach(dragable => {
            if (dragable.Category === 1) {
                explanation = explanation + data.Category1 + ": " + dragable.Name + "\n"
            } else if (dragable.Category === 2) {
                explanation = explanation + data.Category2 + ": " + dragable.Name + "\n"
            }
        });

    const CheckShowNext = () => { //Check if all items are in dropzones
        let fetchedItemCount = 0

        data
            .Dragables
            .forEach(dragable => {
                fetchedItemCount++;
            });

        let setItemCount1 = 0
        let values = Object.values(dropZone)
        for (const value of values) {
            if (value.set === 1) 
                setItemCount1++
            }
        
        if (setItemCount1 > 0) {
            setBgColor('#2c3e50')
        }
        else {
            setBgColor('slategrey')
        }

        let setItemCount2 = 0
        values = Object.values(dropZone2)
        for (const value of values) {
            if (value.set === 1) {
                setItemCount2++;
            }
        }
        if (setItemCount2 > 0) {
            setBgColorRight('#2c3e50')
        }
        else {
            setBgColorRight('slategrey')
        }

        let showNextButton = false;
        if ((setItemCount1 + setItemCount2) === fetchedItemCount) {
            setShowNextButton(true);
        } else {
            setShowNextButton(false);
        }

    }

    const headerColor = {
        color: 'green'
    }

    const userId = props
        .navigation
        .getParam("userId", '1')
    const userId2 = props
        .navigation
        .getParam("userId2", '1')

    const [gameId,
        setGameId] = useState(0);

    const round = props //Get round
        .navigation
        .getParam('round', 1)

    const gameType = 2 //gametyp 2 is the linking game

    let game = props //set the played game (MultipleChoice = 0) in the array with the round
        .navigation
        .getParam("Game", '')

    let gameUser2 = props //set the played game (MultipleChoice = 0) in the array with the round
        .navigation
        .getParam("GameUser2", '')

    let username = props
        .navigation
        .getParam('username', 0);
    let username2 = props
        .navigation
        .getParam('username2', 0);

    if (!props.navigation.getParam("playAfterOpponent", 0)) { //set played games for the first player
        if (!game[round - 1]) {
            if (round != '' && game != '') {
                game.push({gameType: gameType, UserWins: 0, userId: userId, username: username})
            } else {
                game = [
                    {
                        gameType: gameType,
                        UserWins: 0,
                        userId: userId,
                        username,
                        username
                    }
                ]; //if round is not, set set it to 0
            }
        }
    } else {
        if (!gameUser2[round - 1]) { //set games for the player, playing second
            if (round != '' && gameUser2 != '') {
                gameUser2.push({gameType: gameType, UserWins: 0, userId2: userId2, username2: username2})
            } else {
                gameUser2 = [
                    {
                        gameType: gameType,
                        UserWins: 0,
                        userId2: userId2,
                        username2: username2
                    }
                ]; //if round is not, set set it to 0
            }
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
        explanation: explanation,
        info: data.info,
        Game: game,
        GameUser2: gameUser2,
        userId: userId,
        userId2: userId2,
        username: username,
        username2: username2,
        playAfterOpponent: props
            .navigation
            .getParam('playAfterOpponent', 0),
        playedGameDocId: props
            .navigation
            .getParam("playedGameDocId", 0)
    }

    const _fetchData = async() => {

        //fetch()
        const db = firebase.firestore()

        const random = Math.floor(Math.random() * 100000) + 1;
        //const ref = db.collection('MultipleChoiceSets')

        async function GetLinkingGameSet(db) {
            let campaignsRef = db.collection('LinkingGameSets')
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
        try {
            const data1 = await GetLinkingGameSet(db);
            setData(data1);
            setIsLoading(false)

        } catch (err) {
            console.log('Error getting documents', err)
            setIsLoading(false)
        }
    }

    console.log(dropZone)
    console.log(dropZone2)

    useEffect(() => { // code to run on component mount

        _fetchData()

    }, [props.navigation]) //pass an empty array to call it just with the first call --> }, [])

    const evaluateAnswer = () => {

        let n = 0
        data
            .Dragables
            .some(dragable => {
                const name = dragable.Name
                if (dragable.Category === 1) {
                    if (dropZone[name].set === 1) {
                        n = 1;
                    } else {
                        n = 0;
                        return 1 === 1
                    }
                } else if (dragable.Category === 2) {
                    if (dropZone2[name].set === 1) {
                        n = 1;
                    } else {
                        n = 0;
                        return 1 === 1
                    }
                }
            });

        if (n === 1) { // if solution given by the user is right
            if (!props.navigation.getParam("playAfterOpponent", 0)) {
                navigationParams.Game[round - 1].UserWins = 1
                navigationParams.Game[round - 1].gameId = gameId
            } else {
                navigationParams.GameUser2[round - 1].UserWins = 1
                navigationParams.GameUser2[round - 1].gameId = gameId
            }
            navigationParams.userWins = 1;

        } else {
            if (!props.navigation.getParam("playAfterOpponent", 0)) {
                navigationParams.Game[round - 1].UserWins = 0
                navigationParams.Game[round - 1].gameId = gameId
            } else {
                navigationParams.GameUser2[round - 1].UserWins = 0
                navigationParams.GameUser2[round - 1].gameId = gameId
            }
        }

        const pushSolutionScreen = StackActions.push({routeName: 'Solution', params: navigationParams}); //Create stack push actions for screens so the navigation will always be stacked on top of the stack tree

        props
            .navigation
            .dispatch(pushSolutionScreen);
    }

    function renderDragables() {
        let window = Dimensions.get('window');
        let itemWidth = 36;
        const width = window.width - (itemWidth * 4 + 3)
        const itemHeight = 36 * 2
        let positions = [];

        for (let index = 0; index < data.Dragables.length; index++) { //items should have a unique index, generate it here
            data.Dragables[index].id = index
        }

        return data
            .Dragables
            .map((item) => {
                let samePos = true

                let posXFactor = 0
                let posYFactor = 0
                let x = 0
                while (samePos) { //get a position which differs from the other items
                    posXFactor = Math.floor(Math.random() * width) + 1;
                    posYFactor = (window.height - window.height / 6.3) - (Math.floor(Math.random() * (window.height / 10 * 6 - window.height / 8))) + 1;

                    if (positions.length === 0) {
                        samePos = false;
                    }

                    let checkPos = true;
                    for (const val of positions) { //check if any item is in same height => try random again until all items are in a differnt height
                        if (posYFactor === val.posYFactor) {
                            checkPos = true
                            break;
                        } else if ((posYFactor > val.posYFactor && posYFactor < (val.posYFactor + itemHeight)) || (posYFactor < val.posYFactor && posYFactor > (val.posYFactor - itemHeight))) {
                            checkPos = true
                            break;
                        } else {
                            checkPos = false
                        }
                    }

                    if (!checkPos) {
                        samePos = false;
                    }

                    x++;
                    if (x > 200) {
                        break;
                    }
                }

                positions.push({posXFactor, posYFactor})
                return (
                    <Dragable
                        key={item.id}
                        id={item.id}
                        text={item.Name}
                        posXFactor={posXFactor}
                        posYFactor={posYFactor}
                        dropZoneValues={dropZoneValues}
                        setDropZone={setDropZone}
                        setDropZone2={setDropZone2}
                        dropZone={dropZone}
                        dropZone2={dropZone2}
                        CheckShowNext={CheckShowNext}></Dragable>
                );
            });
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
            <View style={styles.mainContainer}>
                <View
                    onLayout={setDropZoneValuesLeft}
                    style={[
                    styles.dropZone, {
                        backgroundColor: bgColor,
                        borderRightWidth: 1
                    }
                ]}>

                    <Text style={styles.text}>{data.Category1}</Text>
                </View>
                <View
                    onLayout={setDropZoneValuesRight}
                    style={[
                    styles.dropZone, {
                        backgroundColor: bgColorRight,
                        borderLeftWidth: 1
                    }
                ]}>

                    <Text style={styles.text}>{data.Category2}</Text>
                </View>

                {renderDragables()}
                <NextButton
                    navigateFunction={evaluateAnswer}
                    nextButtonTitle={"Next"}
                    visible={showNextButton}></NextButton>
            </View>
        </BackgroundContainer>
    );
}

let CIRCLE_RADIUS = 36;
let Window = Dimensions.get('window');
let styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: "row"
    },
    dropZone: {
        backgroundColor: '#2c3e50',
        justifyContent: "center",
        flex: 1,
        height: "40%",
        borderColor: "white"
    },
    text: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center"
    }
});