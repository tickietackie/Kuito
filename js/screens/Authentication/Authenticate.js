import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import BackgroundContainer from '../../components/BackgroundContainer';

const Example = ({navigation}) => {
    return (
        <BackgroundContainer>
            <TouchableOpacity
                onPress={() => navigation.navigate(route)}
                key={route}
                style={{
                backgroundColor: 'blue',
                padding: 10,
                margin: 10
            }}>
                <Text>{"App"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate(route)}
                key={route}
                style={{
                backgroundColor: 'red',
                padding: 10,
                margin: 10
            }}>
                <Text>{"App"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate(route)}
                key={route}
                style={{
                backgroundColor: 'Green',
                padding: 10,
                margin: 10
            }}>
                <Text>{"App"}</Text>
            </TouchableOpacity>
        </BackgroundContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
        paddingTop: 45,
        paddingBottom: 40
    },
    backContainer: {
        position: "absolute",
        bottom: 10,
        left: 3
    }
});

export default Authenticate;