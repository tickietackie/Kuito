import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View,ScrollView, SafeAreaView} from 'react-native';
import { SettingsScreen } from "react-native-settings-screen"
//import component



export default function App(props) {
    const text = "These are my settings";
    if (props.visible === false) {
        //return null;
    }
    
    return (
        <View style={styles.container}>
          <SafeAreaView style={styles.friendsList}>
              <ScrollView>
                  <Text>{text}</Text>
                  
              </ScrollView>
          </SafeAreaView>
        </View>        
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F2F2F2',
      alignItems: 'center',
      justifyContent: 'center',
    },
    backContainer: {
      position: "absolute",
      bottom: 10,
      alignItems: 'center',
    },
    nextContainer: {
      position: "absolute",
      bottom: 10,
      right: 3,
    }
  });