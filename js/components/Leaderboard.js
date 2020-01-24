import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, View, SafeAreaView, Text, AsyncStorage} from 'react-native';
import {human} from 'react-native-typography'
import HistoryEntry from "./HistoryEntry"
import firebase from "../../config/firebase";

export default function block(props) {

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            date: '19.01.20',
            player: 'player1',
            result: '3:1',
            resultAbbr: 'S'
        }, {

            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            date: '18.01.20',
            player: 'Laura',
            result: '3:3',
            resultAbbr: 'U'
        }, {
            id: '58694a0f-3da1-471f-bd96-145571e29d73',
            date: '17.01.20',
            player: 'Max',
            result: '2:2',
            resultAbbr: 'U'
        }, {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            date: '17.01.20',
            player: 'player1',
            result: '1:2',
            resultAbbr: 'N'
        }
    ];

    const _fetchData = async() => {

        //fetch()
        const db = firebase.firestore()

        var random = Math.floor(Math.random() * 100000) + 1;
        //const ref = db.collection('MultipleChoiceSets')
        console.log(random)

        GetUserId = async() => {
            return await AsyncStorage.getItem('userToken');
        };

        const userId = await GetUserId()

        async function GetStartedGames(db) {
            let campaignsRef = db.collection('PlayedGames')
            let activeRef = await campaignsRef
                .where('userId', '==', userId)
                .orderBy('created')
                .get();
            for (doc of activeRef.docs) {
                setGameId(doc.id)
                return doc.data();
            }
        }

        async function GetFinishedGames(db) {
            let campaignsRef = db.collection('PlayedGames')
            let activeRef = await campaignsRef
                .where('userId2', '==', userId)
                .orderBy('finished')
                .limit(20)
                .get();
            for (doc of activeRef.docs) {
                setGameId(doc.id)
                return doc.data();
            }
        }

        try {
            const startedGames = await GetStartedGames(db);
            const finishedGames = await GetFinishedGames(db);
            //setData(data1);
            //setIsLoading(false);

        } catch (err) {
            console.log('Error getting documents', err)
            //setIsLoading(false);
        }
    }

    useEffect(() => { // code to run on component mount

        _fetchData()

    }, [props.navigation]) //pass an empty array to call it just with the first call --> }, [])

    function Item({date, player, result, resultAbbr}) { //Each item in the list will be render like this item
        return (
            <HistoryEntry
                date={date}
                player={player}
                result={result}
                resultAbbr={resultAbbr}></HistoryEntry>
        );
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <Text style={[human.title1, styles.titel]}>Game History</Text>
                <FlatList
                    data={DATA}
                    renderItem={({item}) => <Item
                    date={item.date}
                    player={item.player}
                    result={item.result}
                    resultAbbr={item.resultAbbr}/>}
                    keyExtractor={item => item.id}/>
            </SafeAreaView>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20,
        margin: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        //borderWidth: 1
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        //marginTop: 10
    },
    titel: {
        marginTop: 10,
        marginBottom: 0,
        textAlign: "center"
    },
    text: {
        fontSize: 42,
        //borderWidth: 1,
        padding: 5,
        margin: 10,
        textAlign: "center"
    }
});

const style = {};
