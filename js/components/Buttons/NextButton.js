import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import {material} from 'react-native-typography';

export default function NextButton(props) {

    if (props.visible === false) return null; //Not visible if param visible is false
    const titel = (props.nextButtonTitle === undefined) ? "Next" : props.nextButtonTitle        //Set titel from prop if not undefined, otherwise set default
    return (
        <View style={[styles.nextContainer]}>
            <Button title={titel} onPress={() => props.navigateFunction()} />
        </View>
    );
}

const styles = StyleSheet.create({
    nextContainer: {
        position: "absolute",
        bottom: "5%",
        right: "3%",
      }
});

