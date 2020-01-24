import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Button, AsyncStorage} from 'react-native';
import BackgroundContainer from '../../components/BackgroundContainer';

class SignInScreen extends React.Component {
    static navigationOptions = {
        title: 'Please sign in'
    };

    render() {
        return (
            <BackgroundContainer>
                <View style={styles.container}>
                    <Button title="Sign in!" onPress={this._signInAsync}/>
                </View>
            </BackgroundContainer>

        );
    }

    _signInAsync = async() => {
        await AsyncStorage.setItem('userToken', 'LoAfTCync6YsRoSWGTSd');
        this
            .props
            .navigation
            .navigate('App');
    };
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
export default SignInScreen;