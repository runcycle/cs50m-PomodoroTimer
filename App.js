import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import { vibrate } from './utils';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Counter />
      </View>
    );
  }
}

function RoundButton({ title, background, color, onPress }) {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[ styles.button, { backgroundColor: background }]}
      activeOpacity={0.7}
      >
      <View style={styles.buttonBorder}>
        <Text style={[ styles.buttonText, { color }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

function ButtonsRow({ children }) {
  return (
    <View style={ styles.buttonsRow }>{children}</View>
  );
}

class Counter extends React.Component{
  constructor() {
    super();
    this.state = {
      workMinutes: 25,
      workSeconds: 0,
      breakMinutes: 5,
      breakSeconds: 0,
      togglePauseStart: true,
      isWorkTimer: true,
    }
  }

  startTimer() {
    this.secondInterval = setInterval(this.countdownSeconds, 1000);
  }

  pauseTimer() {
    clearInterval(this.secondInterval);
  }

  countdownSeconds = () => {
    if (this.state.isWorkTimer) {
      if (this.state.workSeconds === 0) {
        this.setState({ workSeconds: 60 })
      }

      this.setState(previousState => ({
        workSeconds: previousState.workSeconds - 1,
      }))

      if (this.state.workMinutes === 0 && this.state.workSeconds === 0) {
        vibrate()
      }
    }
  }

  togglePauseStart = () => {
    this.setState(prevState => ({
      togglePauseStart: !prevState.togglePauseStart,
    }));
    if (this.state.togglePauseStart) {
      this.startTimer();
    } else {
      this.pauseTimer();
    }
  };

  resetTimer = () => {
    clearInterval(this.secondInterval);
    this.setState({ workMinutes: 25 });
    this.setState({ workSeconds: 0 });
    this.setState({ breakMinutes: 5 });
    this.setState({ breakSeconds: 0 });
  }

  render() {
    if (this.state.isWorkTimer) {
      return(
        <View>
          <Text style={styles.workLabel}>Get to Work</Text>
          <Text style={styles.clock}>
          {this.state.workMinutes}:{this.state.workSeconds} 
          </Text>
          <ButtonsRow>
            <RoundButton style={styles.buttonText} title="Start" color="#00ca09" background="#28542a" onPress={this.togglePauseStart} />
            <RoundButton style={styles.buttonText} title="Stop" color="#ff4848" background="#760000" onPress={this.togglePauseStart} />
            <RoundButton style={styles.buttonText} title="Reset" color="#91c4ff" background="#445e7c" onPress={this.resetTimer} />
          </ButtonsRow>
        </View>
      );
    } else {
      return(
        <View>
          <Text style={styles.workLabel}>Take a Break</Text>
          <Text style={styles.clock}>
          {this.state.breakMinutes}:{this.state.breakSeconds} 
          </Text>
          <ButtonsRow>
            <RoundButton style={styles.buttonText} title="Start" color="#00ca09" background="#28542a" onPress={this.togglePauseStart} />
            <RoundButton style={styles.buttonText} title="Stop" color="#ff4848" background="#760000" onPress={this.togglePauseStart} />
            <RoundButton style={styles.buttonText} title="Reset" color="#91c4ff" background="#445e7c" onPress={this.resetTimer}/>
          </ButtonsRow>
        </View>
      );
    }
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
  clock: {
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
    justifyContent: "space-around",
    marginTop: 10,
  },
  buttonBorder: {
    height: 76,
    width: 76,
    borderRadius: 38,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  }
});
