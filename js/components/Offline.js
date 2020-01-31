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

    }, []) //pass an empty array to call it just with the first call --> }, [])



    /*componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = isConnected => {
        this.setState({ isConnected });
    };*/

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
        backgroundColor: '#b52424',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width,
        position: 'absolute',
        top: 30
    },
    offlineText: {
        color: '#fff'
    }
});

export default OfflineNotice;