import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    FlatList,
    ActivityIndicator,
    Button
} from 'react-native';

import BackgroundContainer from "../components/BackgroundContainer"
import {material} from 'react-native-typography';
import LeaderBoardEntry from '../components/LeaderBoardEntry';
import firebase from "../../config/firebase";
import OfflineFullScreen from "../components/OfflineFullScreen"

export default function App(props) {
    if (props.visible === false) {
        //return null;
    }

    const [isLoading,
        setIsLoading] = useState(true);

    const [userId,
        setUserId] = useState(0);

    const [userData,
        setUserData] = useState([]);

    useEffect(() => { // code to run on component mount

        //_fetchData()
        const db = firebase.firestore();
        const ref = db
            .collection('users')
            .orderBy("elo", "desc")
            .limit(50)

        return ref.onSnapshot(querySnapshot => {
            let fetchedUserData = [];
            let i = 0;
            querySnapshot.forEach(doc => {      //Set up listener to query new data evrytime it is changed in the backend
                const data = doc.data()
                data.rank = i
                let wins = data.wins;
                let losses = data.losses;
                let draws = data.draws;
                let sum = wins + losses + draws;
                if (sum === 0) { //do not divide by zeo
                    sum = 1
                }
                const KDA = {
                    wins: Math.ceil(wins / sum),
                    draws: Math.ceil(draws / sum),
                    losses: Math.ceil(losses / sum)
                }
                data.KDA = KDA
                fetchedUserData.push(data);
                i++;
            });
            setUserData(fetchedUserData)

            if (isLoading) {
                setIsLoading(false)
            }
        });

    }, []) //pass an empty array to call it just with the first call --> }, [])

    const round = props
        .navigation
        .getParam('round', '');
    const roundLength = 3; //Rounds after the game ends

    const showHomeButton = true;
    const homeButtonStyle = {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    }

    const KDA = {
        wins: 0,
        losses: 0,
        remis: 1
    }

    function Item({username, elo, KDA, rank}) { //Each item in the list will be render like this item
        return (
            <LeaderBoardEntry username={username} elo={elo} KDA={KDA} rank={rank}></LeaderBoardEntry>
        );
    }

    if (isLoading === true) { //return loading screen, if data is loading
        return (
            <BackgroundContainer>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="darkorange"></ActivityIndicator>
                </View>
            </BackgroundContainer>
        )
    }

    return (

        <BackgroundContainer>
            <SafeAreaView style={styles.container}>
                <View style={styles.lbContainer}>
                    <View style={styles.HeadingContainer}>
                        <View style={styles.rankHeadingContainer}>
                            <Text style={[styles.roundText, material.title]}>R</Text>
                        </View>
                        <View style={styles.usernameHeadingContainer}>
                            <Text style={[styles.roundText, material.title]}>Username</Text>
                        </View>
                        <View style={styles.eloHeadingContainer}>
                            <Text style={[styles.resultText, material.title]}>Elo</Text>
                        </View>
                        <View style={styles.KDAHeadingContainer}>
                            <Text style={[styles.resultText, material.title]}>WDL</Text>
                        </View>
                    </View>

                    <View style={styles.hr}/>
                    <SafeAreaView style={styles.lbItemsContainer}>
                        <FlatList
                            data={userData}
                            renderItem={({item}) => <Item username={item.username} elo={item.elo} KDA={item.KDA} rank={item.rank}/>}
                            keyExtractor={item => item.username}/>
                    </SafeAreaView>
                </View>

            </SafeAreaView>
        </BackgroundContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxHeight: "100%",
        alignItems: 'center',
    },
    lbContainer: {
        //paddingTop: 10,
        alignItems: 'center'
    },
    hr: {
        borderBottomColor: 'black',
        //shadowOffset: 1,
        borderBottomWidth: StyleSheet.hairlineWidth,
        alignSelf: 'stretch'
    },
    HeadingContainer: {
        minWidth: "90%",
        minHeight: "5%",
        flexDirection: "row"
    },
    rankHeadingContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: "center",
        borderColor: "white",
        overflow: "scroll"
    },
    usernameHeadingContainer: {
        //marginBottom: 30,
        alignItems: 'center',
        //  flexDirection: 'row',
        flex: 5,
        justifyContent: "center",
        //borderRightWidth:1,
        borderColor: "white",
        overflow: "scroll"
    },
    eloHeadingContainer: {
        alignItems: 'center',
        //minWidth: 40,
        justifyContent: "center",
        flex: 2,
        overflow: "scroll"
    },
    KDAHeadingContainer: {
        alignItems: 'center',
        //minWidth: 40,
        justifyContent: "center",
        flex: 3,
        overflow: "scroll"
    },
    lbItemsContainer: {
        marginTop: "1.5%",
        width: "92%",
        alignItems: "center",
        flex: 1
    },
    roundText: {
        color: 'black',
        textAlign: "center"
    },
    eloText: {
        marginTop: "3%",
        color: 'black',
        textAlign: "center"
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        minWidth: "85%"
    }
});