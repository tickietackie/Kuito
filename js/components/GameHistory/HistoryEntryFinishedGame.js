import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    AsyncStorage,
    Alert
} from 'react-native';
import {withNavigation} from 'react-navigation'; //navigation won't be provided to childs automatically, therefore wrap it into with navigation before exporting it
import {material} from 'react-native-typography';
import {StackActions} from 'react-navigation';
import {Ionicons} from '@expo/vector-icons';

const CategoryComponent = function Category(props) {

    //const (player, dsf) = {props}
    const result = props.result
        ? props.result
        : ""
    
    let pointsUser1 = 0;
    let pointsUser2 = 0;
    for (let index = 0; index < props.games_played.length; index++) {
        if (props.games_played[index].UserWins === 1) {
            pointsUser1++;
        }
        if (props.games_playedUser2[index].UserWins === 1) {
            pointsUser2++;
        }
    }

    let resultBGColor = "";
    let resultAbbr = ""
    if (pointsUser1 > pointsUser2) {
        resultBGColor = {
            backgroundColor: "limegreen"
        }
        resultAbbr = "W";
    } else if (pointsUser1 <  pointsUser2) {
        resultBGColor = {
            backgroundColor: "red"
        }
        resultAbbr = "L";
    } else if (pointsUser1 == pointsUser2) {
        resultBGColor = {
            backgroundColor: "gold"
        }
        resultAbbr = "R";
    } else {
        resultBGColor = {
            backgroundColor: "blue"
        }
        resultAbbr = "-";
    }

    const PlayAgain = async() => {

        const navigationProperties = { //Get round and playstyle from last screen
            Game: props.games_played,
            userId: props.userId,
            userId2: props.userId2,
            round: 1
        };

        var RandomNumber = Math.floor(Math.random() * 3) + 1;

        let RandomScreen = "";
        if (RandomNumber === 1) {
            RandomScreen = "GuessPicture";
        } else if (RandomNumber === 2) {
            RandomScreen = "LinkingGame"
        } else {
            RandomScreen = "MultipleChoice"
        }

        // Works on both Android and iOS
        await Alert.alert('Play again', 'Do you want to challenge ' + props.userId2 + " again?", [
            {
                text: 'Go!',
                onPress: () => 
                props
                    .navigation
                    .navigate(RandomScreen, navigationProperties)}, //naviaget to random game},
                {
                    text : "I'm afraid",
                    //onPress : () => console.log('Cancel Pressed'),
                    style : 'cancel'
                }
            ], {
                cancelable: true
            },)}

        const [userId,
            setUserId] = useState(0);

        const _GetUserId = async() => {

            const userId = await AsyncStorage.getItem('userId');
            setUserId(userId);
        }

        useEffect(() => { // code to run on component mount

            _GetUserId()

        }, [props.navigation]) //pass an empty array to call it just with the first call --> }, [])

        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={() => PlayAgain()} underlayColor="white">
                    <View style={styles.button}>
                        <View style={styles.userId}>
                            <Text style={[material.button, styles.buttonText]}>{props.userId2}</Text>
                        </View>
                        <View style={styles.Date}>
                            <Text style={[material.button, styles.buttonText]}>{props.started}</Text>
                        </View>
                        <View style={styles.result}>
                            <Text style={[material.button, styles.buttonText]}>{pointsUser1} : {pointsUser2}</Text>
                        </View>
                        <View style={[styles.resultAbbr, resultBGColor]}>
                            <Text style={[material.body2, styles.buttonText]}>{resultAbbr}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        );

    }

    export default withNavigation(CategoryComponent);

    const styles = StyleSheet.create({
        container: {
            margin: 10,
            alignItems: 'center',
            shadowOpacity: 0.75,
            shadowRadius: 3,
            shadowColor: "white",
            shadowColor: '#000',
            shadowOffset: {
                width: 1,
                height: 2
            },
            elevation: 2,
            borderRadius: 5,
            borderWidth: 3,
            borderColor: "#0B0B61"
        },
        button: {
            //marginBottom: 30,
            alignItems: 'center',
            backgroundColor: '#0B0B61',
            flexDirection: 'row',
            minWidth: "100%",
            justifyContent: "center"
        },
        buttonText: {
            textAlign: "center",
            //borderWidth: 2,
            paddingRight: 5,
            paddingLeft: 5,
            paddingTop: 5,
            paddingBottom: 5,
            color: 'white',
            borderRadius : 2,
        },
        date: {
            flex: 1
        },
        userId: {
            flex: 6
        },
        result: {
            flex: 2
        },
        resultAbbr: {
            flex: 1,
            margin: 5,
            //borderWidth: 10
        },
        waiting: {
            flex: 4
        }
    });
