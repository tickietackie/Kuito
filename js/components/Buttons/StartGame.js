import React from 'react';
import {withNavigation} from 'react-navigation'; //navigation won't be provided to childs automatically, therefore wrap it into with navigation before exporting it
import {FontAwesome} from '@expo/vector-icons';

const StartButton = function StartButton(props) {

    const {visible} = props;

    const navigationParams = { //Get round and playstyle from last screen
        finished: 1
    };

    const style = {
        //marginRight: 0,
        marginRight: 50,
        marginLeft: 50,
        marginTop: 0,
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: "white",
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 2
        },
        elevation: 3,
        flexDirection: 'row',
    }

    if (visible === false) 
        return null; //Not visible if param visible is false
    return (
        <FontAwesome.Button
            size={100}
            iconStyle={style}
            onPress={() => props.navigation.navigate('NewGame', {showResult: 0})}
            name="gamepad"
            backgroundColor="dodgerblue"></FontAwesome.Button>
    );
}

export default withNavigation(StartButton);