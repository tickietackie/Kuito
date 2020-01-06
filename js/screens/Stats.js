import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
//import component
import Block from '../components/multipleChoice/Block'

const data = [
  {
    question: "How high is the ...",
    answer1: "100, 200, 400 dfg",
    answer2: "200",
    answer3: "300",
    answer4: "400",
  },
  {
    question: "How high is the ...",
    answer1: "550",
    answer2: "100",
    answer3: "100",
    answer4: "100",
  },
  {
    question: "How high is the ...",
    answer1: "400",
    answer2: "100",
    answer3: "100",
    answer4: "100",
  },
  {
    question: "How high is the ...",
    answer1: "200",
    answer2: "100",
    answer3: "100",
    answer4: "100",
  }
];

export default function App() {

  const [count, setCount] = useState(0);
  const [index, setIndex] = useState(0);
  let text = data[index];
  let nextIndex = index + 1;
  let previousIndex = index - 1;
  if (nextIndex === data.length) nextIndex = 0;
  if (previousIndex === -1) previousIndex = data.length - 1;

  return (
    <View style={styles.container}>
      <Text>{text.answer1}</Text>
      <Button title="Start Game" onPress={() => alert('Es geht!')} />
      <Button title="Next&mdash;" onPress={() => setIndex(nextIndex)}></Button>
      <Button title="Previous" onPress={() => setIndex(previousIndex)}></Button>

      <Block text={text} ></Block>

      <Button title="Clixk me" onPress={() => setCount(count + 1)}></Button>
      <Button title="Delete" onPress={() => setCount(0)}></Button>
      <Text>You clicked {count} times</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'grey',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
  });