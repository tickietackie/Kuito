import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import * as NetInfo from "@react-native-community/netinfo";


const OfflineNotice = () => {

    const [connected, setConnected] = useState(true);

    useEffect(() => { 
        
        // Subscribe
        const unsubscribe = NetInfo.addEventListener(state => {
            if (state.isConnected) {
                setConnected(true)
            }
            else {
                setConnected(false)
            }
        });

    }, []) 

    if (!connected) {   //if not connected return an fulll sized overlay
        return (
            <View style={styles.offlineContainer}>
                <ActivityIndicator size="large" color="darkorange"></ActivityIndicator>
                <Text style={styles.offlineText}>No Internet Connection</Text>
                <Text style={styles.offlineText}>Trying to reconnect ...</Text>
            </View>
        );
    }
    return null;

}

const styles = StyleSheet.create({
    offlineContainer: {
        alignItems: "center",
        justifyContent: "center",
        position: 'absolute',
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0.85,
        backgroundColor: 'black',
        width: "100%",
        height:"100%",
        zIndex: 100,
    },
    offlineText: {
        color: '#fff',
        marginTop: '3%'
    },
});

export default OfflineNotice;