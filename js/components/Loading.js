import React from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import BackgroundContainer from '../components/BackgroundContainer';

const Loading = function Loading(props) {
    return (
        <BackgroundContainer>
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="darkorange"></ActivityIndicator>
            </View>
        </BackgroundContainer>
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center"
    }
});

export default (Loading);