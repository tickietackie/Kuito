import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function BackgroundContainer(props) {
    return (
        <View style={styles.container}>{props.children}</View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFFBEF',
    }
});