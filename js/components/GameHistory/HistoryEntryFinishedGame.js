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

const CategoryComponent = function Category(props) {

    let pointsUser1 = 0;
    let pointsUser2 = 0;
    for (let index = 0; index < props.games_played.length; index++) {
        if (props.games_played[index].UserWins === 1) {
            pointsUser1++;
        }
        if (props.games_playedUser2) {
            if (props.games_playedUser2[index].UserWins === 1) {
                pointsUser2++;
            }
        }
    }

    //as the other player finished the game i am user 1 here
    let resultBGColor = "";
    let resultAbbr = ""
    if (pointsUser1 < pointsUser2) {
        resultBGColor = {
            backgroundColor: "red"
        }
        resultAbbr = "L";
    } else if (pointsUser1 > pointsUser2) {
        resultBGColor = {
            backgroundColor: "limegreen"
        }
        resultAbbr = "W";
    } else if (pointsUser1 == pointsUser2) {
        resultBGColor = {
            backgroundColor: "gold"
        }
        resultAbbr = "D";
    } else {
        resultBGColor = {
            backgroundColor: "blue"
        }
        resultAbbr = "-";
    }

    const NavigateToResult = () => {

        const navBack = () => {
            props
                .navigation
                .navigate("Stats")
        }

        const navigationParams = { //Get round and playstyle from last screen
            Game: props.games_played,
            GameUser2: props.games_playedUser2,
            userId: userId,
            userId2: props.userId2,
            username: props.username,
            username2: props.username2,
            EloGainUser1: props.eloGainUser1,
            nav: navBack
        };

        const resultScreen = StackActions.push({routeName: 'Result', params: navigationParams});
        props
            .navigation
            .dispatch(resultScreen); //navigate to result screen
    }

    const PlayAgain = async() => {

        const playstyle = "competetive"

        const navigationProperties = { //Get round and playstyle from last screen
            round: 1,
            playStyle: 'competetive',
            userId: props.userId,
            userId2: props.userId2,
            username: props.username,
            username2: props.username2,
            eloUser2: props.eloUser2,
            eloUser: props.eloUser
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
        await Alert.alert('Play again', 'Do you want to challenge ' + props.username + " again?", [
            {
                text: 'Go!',
                onPress: () => props
                    .navigation
                    .navigate(RandomScreen, navigationProperties)
            }, {
                text: "I'm afraid",
                style: 'cancel'
            }
        ])
    }
    const [userId,
        setUserId] = useState(0);
    const _GetUserId = async() => {
        const userId = await AsyncStorage.getItem('userId');
        setUserId(userId);
    }
    useEffect(() => { // code to run on component mount

        _GetUserId()

    }, [props.navigation]) //pass an empty array to call it just with the first call --> }, [])

    const screenToNavigate = props.showResult
        ? NavigateToResult
        : PlayAgain

    return (
        <View style={styles.container}>
            <TouchableHighlight onPress={() => screenToNavigate()} underlayColor="white">
                <View style={styles.button}>
                    <View style={styles.userId}>
                        <Text style={[material.button, styles.buttonText]}>{props.username}</Text>
                    </View>
                    <View style={styles.Date}>
                        <Text style={[material.button, styles.buttonText]}>{props.finished}</Text>
                    </View>
                    <View style={styles.result}>
                        <Text style={[material.button, styles.buttonText]}>{pointsUser1}
                            : {pointsUser2}</Text>
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
        borderRadius: 2
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