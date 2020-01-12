import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { StackActions } from 'react-navigation';
//import { createAnimatedSwitchNavigator } from 'react-navigation-animated-switch';

import * as Icon from '@expo/vector-icons';
//import { createStackNavigator } from 'react-navigation-stack';

import Home from './screens/Home';
import Settings from './screens/Settings';

import NewGame from './screens/NewGame';
import Categories from './screens/Categories.js';

import GuessPicture from './screens/Games/GuessPicture';
import LinkingGame from './screens/Games/LinkingGame';
import MultipleChoice from './screens/Games/MultipleChoice';
import Solution from './screens/Games/Solution';

import Leaderboard from './screens/Leaderboard';
import Stats from './screens/Stats';



/*createStackNavigator({
    // For each screen that you can navigate to, create a new entry like this:
    Profile: {
      // `ProfileScreen` is a React component that will be the main content of the screen.
      screen: ProfileScreen,
      // When `ProfileScreen` is loaded by the StackNavigator, it will be given a `navigation` prop.
  
      // Optional: When deep linking or using react-navigation in a web app, this path is used:
      path: 'people/:name',
      // The action and route params are extracted from the path.
  
      // Optional: Override the `navigationOptions` for the screen
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.name}'s Profile'`,
      }),
    },
  });*/


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
            title: 'Stats',
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

export default createAppContainer(TabNavigator);


