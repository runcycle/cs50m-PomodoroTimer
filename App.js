import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Constants } from 'expo';
import { Vibrate } from './utils/vibrate';

function RoundButton({ title, background, color }) {
  return (
    <View style={[ styles.button, { backgroundColor: background }]}>
      <Text style={[ styles.buttonText, { color }]}>{title}</Text>
    </View>
  )
}

function ButtonsRow({ children }) {
  return (
    <View style={ styles.buttonsRow }>{children}</View>
  );
}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Counter />
        <ButtonsRow>
          <RoundButton style={styles.buttonText} title="Start" color="#00ca09" background="#28542a" />
          <RoundButton style={styles.buttonText} title="Stop" color="#ff4848" background="#760000" />
          <RoundButton style={styles.buttonText} title="Clear" color="#91c4ff" background="#445e7c" />
        </ButtonsRow>
      </View>
    );
  }
}

class Counter extends React.Component{
  constructor() {
    super();
    this.state = {
      workMinutes: 25,
      workSeconds: 0,
      breakMinutes: 5,
      breakSeconds: 0
    }
  }

  render() {
    return(
      <View>
        <Text style={styles.workLabel}>Get to Work</Text>
        <Text style={styles.timer}>
        {this.state.workMinutes}:{this.state.workSeconds} 
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    paddingTop: 175,
    paddingHorizontal: 20,
  },
  timer: {
    fontSize: 100,
    color: "white",
    textAlign: 'center',
    paddingBottom: 20
  },
  workLabel: {
    fontSize: 30,
    color: "#b5d7ff",
    textAlign: 'center',
    paddingBottom: 10,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
  },
  buttonsRow: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-evenly",
    marginTop: 10,
  }
});
