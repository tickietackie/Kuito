import React , { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { material } from 'react-native-typography'

export default function header(props) {
    return (
        <View style={styles.container}>
            <Text style={[material.display2, styles.text, props.style]}>{props.text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingBottom: 15,
    },
    text: {
        fontSize: 42,
    }
});


                                                       