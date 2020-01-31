import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator, NavigationActions} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {StackActions} from 'react-navigation';
// import { createAnimatedSwitchNavigator } from
// 'react-navigation-animated-switch';

import * as Icon from '@expo/vector-icons';
//import { createStackNavigator } from 'react-navigation-stack';

import AuthLoading from './screens/Authentication/AuthLoading';
import SignInScreen from './screens/Authentication/SignIn';
import SignUp from './screens/Authentication/SignUp';

import Home from './screens/Home';
import Settings from './screens/Settings';

import NewGame from './screens/NewGame';
import Categories from './screens/Categories.js';

import GuessPicture from './screens/Games/GuessPicture';
import LinkingGame from './screens/Games/LinkingGame';
import MultipleChoice from './screens/Games/MultipleChoice';
import Solution from './screens/Games/Solution';
import Result from './screens/Games/Result';

import Leaderboard from './screens/Leaderboard';
import Stats from './screens/Stats';

const HomeStack = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            headerShown: false
        }
    },
    NewGame: {
        screen: NewGame
    },
    Categories: {
        screen: Categories
    },
    Settings: {
        screen: Settings
    }
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: "aliceblue"
        }
    }
})

const StatStack = createStackNavigator({
    Stats: {
        screen: Stats,
        params: {
            showResult: 1
        }
    },
    Result: {
        screen: Result
    }
}, {headerMode: 'none'})

const AppStackModal = createStackNavigator({
    App: {
        screen: HomeStack,
    },
    MultipleChoice: {
        screen: MultipleChoice,
    },
    LinkingGame: {
        screen: LinkingGame,
    },
    GuessPicture: {
        screen: GuessPicture,
    },
    Solution: {
        screen: Solution,
    },
    Result: {
        screen: Result
    }

}, {headerMode: 'none'})

AppStackModal.navigationOptions = ({navigation}) => {
    let tabBarVisible = true;
    for (let i = 0; i < navigation.state.routes.length; i++) {
        if (navigation.state.routes[i].routeName == "Solution") {
            tabBarVisible = false;
        }
        if (navigation.state.routes[i].routeName == "MultipleChoice") {
            tabBarVisible = false;
        }
        if (navigation.state.routes[i].routeName == "LinkingGame") {
            tabBarVisible = false;
        }
        if (navigation.state.routes[i].routeName == "GuessPicture") {
            tabBarVisible = false;
        }
    }

    return {tabBarVisible};
};

const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: AppStackModal,
        navigationOptions: {
            title: 'Home',
            tabBarIcon: ({tintColor}) => (<Icon.Feather name="home" size={24} color={tintColor}/>)
        }
    },
    StatStack: {
        screen: StatStack,
        navigationOptions: {
            title: 'Statistics',
            tabBarIcon: ({tintColor}) => (<Icon.Ionicons name="ios-stats" size={28} color={tintColor}/>)
        }
    },
    Leaderboard: {
        screen: Leaderboard,
        navigationOptions: {
            title: 'Leaderboard',
            tabBarIcon: ({tintColor}) => (<Icon.Foundation name="crown" size={32} color={tintColor}/>)
        },
        params: {
            showResult: 1
        }
    }
}, {
    tabBarOptions: {
        activeTintColor: 'orange',
        style: {
            backgroundColor: 'aliceblue'
        }
    }
})

const AuthStack = createStackNavigator({
    SignIn: SignInScreen,
    SignUp: SignUp
}, {headerMode: 'none'})

const App = createSwitchNavigator({
    AuthLoading: AuthLoading,
    App: TabNavigator,
    Auth: AuthStack
}, {initialRouteName: 'AuthLoading'})

export default createAppContainer(App);
