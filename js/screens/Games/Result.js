import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    SafeAreaView,
    FlatList,
    AsyncStorage
} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import HomeButton from '../../components/Buttons/HomeButton';
import BackgroundContainer from "../../components/BackgroundContainer"
import {material} from 'react-native-typography';
import HeaderText from '../../components/HeaderText';
import ResultEntry from '../../components/ResultEntry';
import ResultElo from '../../components/ResultElo';

export default function App(props) {
    if (props.visible === false) {
        //return null;
    }

    const [userId,
        setUserId] = useState(0);

    const _fetchData = async() => {
        const GetUserId = async() => {
            //return await AsyncStorage.getItem('username');
            return await AsyncStorage.getItem('userId');
        };
        const asncUserId = await GetUserId()
        setUserId(asncUserId);
    }

    useEffect(() => { // code to run on component mount

        _fetchData()

    }, [props.navigation]) //pass an empty array to call it just with the first call --> }, [])

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

    function Item({round, result, result2}) { //Each item in the list will be render like this item
        return (
            <ResultEntry result={result} result2={result2} round={round}></ResultEntry>
        );
    }

    const username = props
        .navigation
        .getParam("username", 'Player 1')
        ? props
            .navigation
            .getParam("username", 'Player 1')
        : "Player 1"
    const username2 = props
        .navigation
        .getParam("username2", 'Player 2')
        ? props
            .navigation
            .getParam("username2", 'Player 2')
        : "Player 2"

    const DATA = props
        .navigation
        .getParam("Game", '');

    const DATA2 = props
        .navigation
        .getParam("GameUser2", '');

    var results = []
    var i = 1;
    //obj = {...obj, ...pair};  add object key : value pair
    DATA.forEach(element => {
        let gameResult = DATA[i - 1].UserWins === 0
            ? "lose"
            : "win"
        let gameResult2 = ""
        if (DATA2) {
            gameResult2 = DATA2[i - 1].UserWins === 0
                ? "lose"
                : "win"
        }

        results.push({round: `${i}`, result: gameResult, result2: gameResult2}); //spread operator

        i++;
    });

    let pointsGained = "-";
    let newElo = "-";
    if (props.navigation.getParam(userId,0) === userId) {
        pointsGained = props.navigation.getParam("EloGainUser1","-")
        newElo = props.navigation.getParam("NewEloUser1","-")
    }
    else if (props.navigation.getParam("userId2", 0) === userId) {
        pointsGained = props.navigation.getParam("EloGainUser2","-")
        newElo = props.navigation.getParam("NewEloUser2","-")
    }
    const showElo = props.navigation.getParam("showELo",1)

    return (

        <BackgroundContainer>

            <SafeAreaView style={styles.container1}>
                <View style={styles.container}>
                    <HeaderText text="Result"></HeaderText>
                </View>

                <View style={styles.resultsContainer}>
                    <View style={styles.HeadingContainer}>
                        <View style={styles.roundHeadingContainer}>
                            <Text style={[styles.roundText, material.body2]}>Round</Text>
                        </View>
                        <View style={styles.resultHeadingContainer}>
                            <Text style={[styles.resultText, material.body2]}>{username}</Text>
                        </View>
                        <View style={styles.resultHeadingContainer}>
                            <Text style={[styles.resultText, material.body2]}>{username2}</Text>
                        </View>
                    </View>

                    <View style={styles.hr}/>
                    <SafeAreaView style={styles.resultItemsContainer}>
                        <FlatList
                            data={results}
                            renderItem={({item}) => <Item result={item.result} result2={item.result2} round={item.round}/>}
                            keyExtractor={item => item.round}/>
                    </SafeAreaView>

                </View>
                <ResultElo pointsGained={pointsGained} newElo={newElo} visible={showElo} ></ResultElo>
                <HomeButton visible={showHomeButton} style={homeButtonStyle}></HomeButton>
            </SafeAreaView>

        </BackgroundContainer>
    );
}

const styles = StyleSheet.create({
    container1: {
        alignItems: 'center',
        flex: 1
    },
    container: {
        //flex: 1,
        alignItems: 'center',
        //justifyContent: 'center', paddingBottom: 40
    },
    resultsContainer: {
        //paddingTop: 10,
        alignItems: 'center',
        maxHeight: "55%"
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
    roundHeadingContainer: {
        //marginBottom: 30,
        alignItems: 'center',
        //  flexDirection: 'row',
        flex: 1,
        justifyContent: "center",
        //borderRightWidth:1,
        borderColor: "white",
        overflow: "scroll"
    },
    resultHeadingContainer: {
        alignItems: 'center',
        //minWidth: 40,
        justifyContent: "center",
        flex: 2,
        overflow: "scroll"
    },
    resultItemsContainer: {
        marginTop: "1.5%",
        width: "90%",
        alignItems: "center"
    },
    roundText: {
        color: 'black',
        textAlign: "center"
    },
    eloText: {
        marginTop: "3%",
        color: '#006666',
        textAlign: "center"
    }
});