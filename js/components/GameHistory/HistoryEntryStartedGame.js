import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableHighlight, View, AsyncStorage} from 'react-native';
import {withNavigation} from 'react-navigation'; //navigation won't be provided to childs automatically, therefore wrap it into with navigation before exporting it
import {material} from 'react-native-typography';
import {StackActions} from 'react-navigation';
import {Ionicons} from '@expo/vector-icons';

const CategoryComponent = function Category(props) {

    //const {player, dsf} = {props}

    const result = props.result
        ? props.result
        : ""

    const NavigateToResult = () => {

        const navigationParams = { //Get round and playstyle from last screen
            Game: props.games_played,
            userId: userId,
            userId2: props.userId2,
            username: props.username1,
            username2: props.username
        };

        const resultScreen = StackActions.push({routeName: 'Result', params: navigationParams});
        props
            .navigation
            .dispatch(resultScreen); //navigate to result screen
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


    //else if (!props.finished && userId !== props.userId2) {     //if I played first and have to wait for opponent
        return (
            <View style={[styles.container, {borderColor: "darkblue"}]}>
                <TouchableHighlight onPress={() => NavigateToResult()} underlayColor="white">
                    <View style={[styles.button, {backgroundColor: "darkblue"}]}>
                        <View style={styles.waiting}>
                            <Text style={[material.button, styles.buttonText]}>Waiting for</Text>
                        </View>
                        <View style={styles.userId}>
                            <Text style={[material.button, styles.buttonText]}>{props.username}</Text>
                        </View>
                        <View style={styles.date}>
                            <Ionicons name="ios-arrow-dropright" size={25} color="gold"/>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        )
    //}

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
        borderColor: "navy"
    },
    button: {
        //marginBottom: 30,
        alignItems: 'center',
        backgroundColor: 'navy',
        flexDirection: 'row',
        minWidth: "100%",
        justifyContent: "center"
    },
    buttonText: {
        textAlign: "center",
        //borderWidth: 2,
        paddingRight: 5,
        paddingLeft: 5,
        paddingTop: 10,
        paddingBottom: 10,
        color: 'white'
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
