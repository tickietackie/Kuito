import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator, NavigationActions} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { StackActions } from 'react-navigation';
//import { createAnimatedSwitchNavigator } from 'react-navigation-animated-switch';

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


const HomeStack = createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                headerShown: false,
            },
        },
        NewGame: {
            screen: NewGame,
        },
        Categories: {
            screen: Categories,
        },
        Settings: {
            screen: Settings,
        }, 
    }, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: "aliceblue"
        }
    }
})

const AppStackModal = createStackNavigator(
    {
        App: HomeStack,
        //GameStack: GameStack,
        MultipleChoice: MultipleChoice,
        LinkingGame: {
            screen: LinkingGame,
        },
        GuessPicture: GuessPicture,    
        Solution: {
            screen: Solution,
        },   
        Result: {
            screen: Result,
        },   
    },
    {
        headerMode: 'none',
    }
)

const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: AppStackModal,
        navigationOptions: {
            title: 'Home',
            tabBarIcon: ({ tintColor }) => (
                <Icon.Feather name="home" size={24} color={tintColor} />
            )
        }
    },
    Stats: {
        screen: Stats,
        navigationOptions: {
            title: 'Statistics',
            tabBarIcon: ({ tintColor }) => (
                <Icon.Ionicons name="ios-stats" size={28} color={tintColor} />
            )
        }
    },
    Leaderboard: {
        screen: Leaderboard,
        navigationOptions: {
            title: 'Leaderboard',
            tabBarIcon: ({ tintColor }) => (
                <Icon.Foundation name="crown" size={32} color={tintColor} />
            )
        },
        params: {
            showResult: 1
        }
    },
}, {
    tabBarOptions: {
        activeTintColor: 'orange',
        style: {
            backgroundColor: 'aliceblue'
        }
    }
})


const AuthStack = createStackNavigator(
    {
        SignIn: SignInScreen,
        SignUp: SignUp,
    },
    {
        headerMode: 'none',
    }
)

const App = createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      App: TabNavigator,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
  

export default createAppContainer(App);


