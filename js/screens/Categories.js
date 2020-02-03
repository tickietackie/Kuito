import React, { useState } from 'react';
import {SafeAreaView, View, FlatList, StyleSheet, Text} from 'react-native';
import Constants from 'expo-constants';
import Category from "../components/Category"
import { ceil } from 'react-native-reanimated';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'ES'
    }, {

        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'OS'
    }, {
        id: '58694a0f-3da1-471f-bd96-145571e29d73',
        title: 'Hardware'
    }, {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'PDM'
    }
];


function Item({title, id}) { //Each item in the list will be render like this item
    return (
        <Category titel={title} id={id} playStyle="training"></Category>
    );
}

export default function App() {

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Press any button. Category filter not yet functional!</Text>
            <FlatList
                data={DATA}
                renderItem={({item}) => <Item title={item.title} id={item.id}/>}
                keyExtractor={item => item.id}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EFFBEF',
        flex: 1,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
        alignItems: "center"
    },
    friendsList: {
        flex: 5,
        backgroundColor: '#EFFBEF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
        
    },
    text: {
        fontSize: 15,
        color: "red",
        marginTop: "3%"
    },
    startButton: {
        borderWidth: 1,
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8
    },
    header: {
        fontSize: 32
    },
    title: {
        fontSize: 24
    }
});