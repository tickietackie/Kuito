import React, {useState, useEffect} from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Button,
    Text,
    Alert,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';
import BackgroundContainer from '../../components/BackgroundContainer';
import firebase from "../../../config/firebase";
import Loading from "../../components/Loading";

const SignInScreen = function SignInScreen(props) {
    let navigationOptions = {
        title: 'Please sign in'
    };

    const [error,
        setError] = React.useState("");

    const [isLoading,
        setIsLoading] = useState(false);

    const _signUpAsync = async(email, username, password) => {

        setIsLoading(true)

        setError("");
        const db = firebase.firestore()

        const CheckUserName = async() => {
            let campaignsRef = db.collection('users')
            let activeRef = await campaignsRef
                .where('username', '==', username)
                .get();
            for (doc of activeRef.docs) { //return false if username exists
                return false;
            }
            return true;
        }

        const userRandom = Math.floor(Math.random() * 100000) + 1;

        const SetUsername = async(userData) => {
            const user = {
                userId: userData.user.uid,
                username: username,
                random: userRandom
            }
            let usersRef = db
                .collection('users')
                .doc(userData.user.uid);
            let savedGame = await usersRef.set(user)
        }

        const auth = firebase.auth();
        const SignUpInFb = async() => {
            return await auth.createUserWithEmailAndPassword(email, password)
        }

        let userData = "";
        try {
            const usernameFree = await CheckUserName()
            if (usernameFree) {
                userData = await SignUpInFb()
                await SetUsername(userData)
            } else {
                setError("Username already taken.")
                console.log("username already taken")
                setIsLoading(false);
                return
            }

        } catch (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            setError(error.message)
            console.log(error)
            setIsLoading(false);
            return;
        }

        try {
            // await AsyncStorage.setItem('userToken', username); //LoAfTCync6YsRoSWGTSd
            // //3HqKXEByGlt7DQ2UNDJc await
            await AsyncStorage.setItem('userToken', "LoAfTCync6YsRoSWGTSd"); //LoAfTCync6YsRoSWGTSd
            await AsyncStorage.setItem('email', email); //LoAfTCync6YsRoSWGTSd
            await AsyncStorage.setItem('userId', userData.user.uid); //LoAfTCync6YsRoSWGTSd
            await AsyncStorage.setItem('username', username);
            await AsyncStorage.setItem('userRandom', userRandom.toString());
        } catch (error) {
            setError(error.message)
            console.log(error)
            return;
        }

        setIsLoading(false);

        await Alert.alert('Sign up succesfull', 'Welcome ' + username + ". You're now getting signed in.", [
            {
                text: 'ok',
                onPress: () => props
                    .navigation
                    .navigate("App")
            }
        ], {cancelable: false})

    };

    const [text,
        setText] = React.useState("");
    const [username,
        setUsername] = React.useState("");
    const [pw,
        setPw] = React.useState("");

    if (isLoading === true) { //return loading screen, if data is loading
        return (
            <Loading></Loading>
        )
    }

    return (
        <BackgroundContainer>
            <View style={styles.container}>
                <Text>Email</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setText(text)}
                    placeholder="max.mustermann@gmail.com"
                    textContentType="emailAddress"
                    value={text}/>
                <Text>Username</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(username) => setUsername(username)}
                    textContentType="emailAddress"
                    placeholder="Player123"
                    value={username}/>
                <Text>Password</Text>
                <TextInput style={styles.input} onChangeText={(pw) => setPw(pw)} //textContentType="password"
                    placeholder="SuperSecureƒœ«π€∑®•√@µåø∫¨Ω" secureTextEntry={true} value={pw}/>
                <Text style={styles.errorText}>{error}</Text>
                <Button title="Sign up!" onPress={() => _signUpAsync(text, username, pw)}/>
                <Button title="Back" onPress={() => props.navigation.navigate('SignIn')}/>
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
        minWidth: "70%",
        width: "70%",
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