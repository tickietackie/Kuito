import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import OfflineFullScreen from "../components/OfflineFullScreen"

export default function BackgroundContainer(props) {
    return (
        <View style={styles.container}>{props.children}
            <OfflineFullScreen></OfflineFullScreen>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFFBEF'
    }
});