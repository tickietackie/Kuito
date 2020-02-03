import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import OfflineFullScreen from "../components/OfflineFullScreen"

export default function BackgroundContainer(props) {        //Container for backgroundcolor and to provide offline screen to every screen
    //Child props have to be passed because otherwise they won't render
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