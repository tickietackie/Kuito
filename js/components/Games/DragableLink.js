import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    PanResponder,
    Animated
} from 'react-native';
import {withNavigation} from 'react-navigation'; //navigation won't be provided to childs automatically, therefore wrap it into with navigation before exporting it
import {material} from 'react-native-typography';

const CategoryComponent = function Category(props) {

    const {text} = props;

    return (
        <View style={styles.container}>
            <View style={styles.button}>
                <Text style={[material.display0, styles.buttonText]}>{text}</Text>
            </View>
        </View>
    );
}

export default withNavigation(CategoryComponent);

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        alignItems: 'center',
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: "white",
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 1
        },
        elevation: 2
    },
    button: {
        //marginBottom: 30,
        alignItems: 'center',
        backgroundColor: '#2E64FE',
        width: 100,
        justifyContent: "center",
        borderRadius: 25
    },
    buttonText: {

        padding: 10,
        color: 'white'
    }
});
