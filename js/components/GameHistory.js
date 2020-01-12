import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, View, SafeAreaView} from 'react-native';

import HistoryEntry from "./HistoryEntry"

export default function block(props) {

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            date: '19.01.2020',
            player: 'player1',
            result: '3:1',
            resultAbbr:  'S',

        }, {
    
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            date: '18.01.2020',
            player: 'Laura',
            result: '3:3',
            resultAbbr:  'U',
        }, {
            id: '58694a0f-3da1-471f-bd96-145571e29d73',
            date: '17.01.2020',
            player: 'Max',
            result: '2:2',
            resultAbbr:  'U',
        }, {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            date: '17.01.2020',
            player: 'player1',
            result: '1:2',
            resultAbbr:  'N',
        }
    ];

    function Item({date, player, result,resultAbbr}) { //Each item in the list will be render like this item
        return (
            <HistoryEntry date={date} player={player} result={result} resultAbbr={resultAbbr}></HistoryEntry>
        );
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={DATA}
                    renderItem={({item}) => <Item date={item.date} player={item.player} result={item.result} resultAbbr={item.resultAbbr}/>}
                    keyExtractor={item => item.id}/>
            </SafeAreaView>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20
    },
    text: {
        fontSize: 42,
        borderWidth: 1,
        padding: 5,
        margin: 10
    }
});

const style = {};
