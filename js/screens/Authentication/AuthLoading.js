import React, {useEffect}  from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

const AuthLoadingScreen = function AuthLoadingScreen(props) {
 
      // Fetch the token from storage then navigate to our appropriate place
  const _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userId');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  useEffect(() => { // code to run on component mount

    _bootstrapAsync();

}, []) //pass an empty array to call it just with the first call --> }, [])

    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
}

export default AuthLoadingScreen;