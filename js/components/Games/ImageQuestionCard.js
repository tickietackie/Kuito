import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {material} from 'react-native-typography';

export default function QuestionCard(props) {

    return (
        <View style={styles.container}>
            <View style={styles.questionContainer}>
                <Image
                    style={styles.question} 
                    source={require('../../../images/Everest_North_Face.jpg')}>{}</Image>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        flex: 2,
        paddingTop: 5,
    },
    questionContainer: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 40,
        borderRadius: 5,
        shadowColor: 'black',
        width :300,
        height : 50,
    },
    question: {
        flex:1, resizeMode: 'contain'
    }
});
