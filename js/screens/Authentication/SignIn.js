import React, {useState, useEffect} from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Button,
    AsyncStorage,
    Text,
    ActivityIndicator
} from 'react-native';
import BackgroundContainer from '../../components/BackgroundContainer';
import firebase from "../../../config/firebase";
import Loading from "../../components/Loading";

const SignInScreen = function SignInScreen(props) {
    let navigationOptions = {
        title: 'Please sign in'
    };

    const [isLoading,
        setIsLoading] = useState(false);

    const [error,
        setError] = React.useState("");

    const _signInAsync = async(email, password) => {

        setIsLoading(true)

        const auth = firebase.auth();
        const SignInFb = async() => {
            return await auth.signInWithEmailAndPassword(email, password)
        }

        setError("");
        const db = firebase.firestore()
        const GetUserDataFormFs = async(userId) => {
            let campaignsRef = db.collection('users')
            let activeRef = await campaignsRef
                .where('userId', '==', userId)
                .get();
            for (doc of activeRef.docs) { //return false if username exists
                return doc.data();
            }
            return false;
        }

        let userData = "";
        let userRandom = "";
        let username = "";
        try {
            userData = await SignInFb()
            const userDataFs = await GetUserDataFormFs(userData.user.uid)
            username = userDataFs
                .username
                .toString();
            userRandom = userDataFs
                .random
                .toString();
        } catch (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            setError(error.message)
            console.log(error)
            setIsLoading(false);
            return;
        }

        try {
            await AsyncStorage.setItem('userToken', "3HqKXEByGlt7DQ2UNDJc"); //LoAfTCync6YsRoSWGTSd
            // //3HqKXEByGlt7DQ2UNDJc await
            await AsyncStorage.setItem('email', email); //LoAfTCync6YsRoSWGTSd
            await AsyncStorage.setItem('userId', userData.user.uid); //LoAfTCync6YsRoSWGTSd
            await AsyncStorage.setItem('username', username);
            await AsyncStorage.setItem('userRandom', userRandom.toString());
        } catch (error) {
            setError(error.message)
            console.log(error)
            setIsLoading(false);
            return;
        }

        setIsLoading(false)

        props
            .navigation
            .navigate('App');
    };

    const ClearInput = (placeholder) => {
        if (placeholder === "Enter your email") {
            setText("");
        }
    }

    const [text,
        setText] = React.useState('Enter your email');

    const ClearInputPw = (placeholder) => {
        if (placeholder === "Enter your password") {
            setPw("");
        }
    }

    const [pw,
        setPw] = React.useState('Enter your password');

    if (isLoading === true) { //return loading screen, if data is loading
        return (
            <Loading></Loading>
        )
    }

    return (
        <BackgroundContainer>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onFocus={test => ClearInput(text)}
                    onChangeText={text => setText(text)}
                    textContentType="emailAddress"
                    value={text}/>
                <TextInput style={styles.input} onFocus={test => ClearInputPw(pw)} onChangeText={text => setPw(text)} //textContentType="password"
                    secureTextEntry={true} value={pw}/>
                <Text style={styles.errorText}>{error}</Text>
                <Button title="Sign in!" onPress={() => _signInAsync(text, pw)}/>
                <Button title="Sign up" onPress={() => props.navigation.navigate('SignUp')}/>
            </View>
        </BackgroundContainer>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        margin: 15,
        height: 40,
        minWidth: "60%",
        borderColor: '#7a42f4',
        borderWidth: 1,
        backgroundColor: "white",
        padding: 4
    },
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        //height: 40
    },
    submitButtonText: {
        color: 'white'
    },
    errorText: {
        color: "red"
    }
});
export default SignInScreen;