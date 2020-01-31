import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import * as NetInfo from "@react-native-community/netinfo";

const {width} = Dimensions.get('window');
const OfflineNotice = () => {

    const [connected, setConnected] = useState(true);

    useEffect(() => { // code to run on component mount
        
        // Subscribe
        const unsubscribe = NetInfo.addEventListener(state => {
            if (state.isConnected) {
                setConnected(true)
                console.log("connected")
            }
            else {
                setConnected(false)
            }
        });

    }, []) 

    if (!connected) {
        return (
            <View style={styles.offlineContainer}>
                <Text style={styles.offlineText}>No Internet Connection</Text>
            </View>
        );
    }
    return null;

}

const styles = StyleSheet.create({
    offlineContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    offlineText: {
        color: '#fff'
    }
});

export default OfflineNotice;