import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
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

// Button Template
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

// Row Template
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
      customWorkMinutes: 25,
      customWorkSeconds: 0,
      customBreakMinutes: 5,
      customBreakSeconds: 0,
    }
  }

//Timer Logic
  toggleTimerType = () => {
    this.setState(previousState => ({
      isWorkTimer: !previousState.isWorkTimer,
    }));
    clearInterval(this.secondInterval);

    this.startTimer();
  }

  countdownSeconds = () => {
    if (this.state.isWorkTimer) {
      if (this.state.workSeconds === 0) {
        this.setState({ workSeconds: 60 }),
        this.countdownWorkMinutes();
      }

      this.setState(previousState => ({
        workSeconds: previousState.workSeconds - 1
      }))

      if (this.state.workMinutes === 0 && this.state.workSeconds === 0) {
        this.toggleTimerType();
        vibrate();
      }
    } else {
      if (!this.state.isWorkTimer) {
        if (this.state.breakSeconds === 0) {
          this.setState({ breakSeconds: 60 }),
          this.countdownBreakMinutes();
        }
  
        this.setState(previousState => ({
          breakSeconds: previousState.breakSeconds - 1
        }))

        if (this.state.breakMinutes === 0 && this.state.breakSeconds === 0) {
          vibrate();
          clearInterval(this.secondInterval);
        }
      }
    }
  }

  countdownWorkMinutes = () => {
    this.setState(previousState => ({
      workMinutes: previousState.workMinutes - 1
    }));
  }

  countdownBreakMinutes = () => {
    this.setState(previousState => ({
      breakMinutes: previousState.breakMinutes - 1
    }));
  }

  //Timer Controls
  startTimer() {
    this.secondInterval = setInterval(this.countdownSeconds, 1000);
  }

  pauseTimer() {
    clearInterval(this.secondInterval);
  }

  togglePauseStart = () => {
    this.setState(previousState => ({
      togglePauseStart: !previousState.togglePauseStart,
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
    this.setState({ isWorkTimer: true, togglePauseStart: true })
  }

  editWorkMinutes(mins) {
    this.setState({
      workMinutes: mins,
      workSeconds: 0,
      customWorkMinutes: mins,
      customWorkSeconds: 0,
    });
  }

  editBreakMinutes(mins) {
    this.setState({
      breakMinutes: mins,
      breakSeconds: 0,
      customBreakMinutes: mins,
      customBreakSeconds: 0
    });
  }

  render() {
    const pad = (n) => n < 10 ? "0" + n : n
    if (this.state.isWorkTimer) {
      return(
        <View>
          <Text style={styles.workLabel}>Get to Work</Text>
          <Text style={styles.clock}>
          {pad(this.state.workMinutes)}:
          {pad(this.state.workSeconds)} 
          </Text>
          <ButtonsRow>
            <RoundButton style={styles.buttonText} title="Start" color="#00ca09" background="#28542a" onPress={this.togglePauseStart} />
            <RoundButton style={styles.buttonText} title="Stop" color="#ff4848" background="#760000" onPress={this.togglePauseStart} />
            <RoundButton style={styles.buttonText} title="Reset" color="#91c4ff" background="#445e7c" onPress={this.resetTimer} />
          </ButtonsRow>
          <Text style={styles.textLabel}>Edit Work Minutes:</Text>
          <View style={styles.editWorkMinutes}>
            <TextInput style={styles.textInput} 
                returnKeyType="done"
                keyboardType="number-pad"
                placeholder={`${this.state.customWorkMinutes}`}
                onChangeText={(mins) => this.editWorkMinutes(mins)} 
              />
          </View>
          <Text style={styles.textLabel}>Edit Break Minutes:</Text>
          <View style={styles.editWorkMinutes}>
            <TextInput style={styles.textInput} 
                returnKeyType="done"
                keyboardType="number-pad"
                placeholder={`${this.state.customBreakMinutes}`}
                onChangeText={(mins) => this.editBreakMinutes(mins)} 
              />
          </View>
        </View>
      );
    } else {
      return(
        <View>
          <Text style={styles.workLabel}>Take a Break</Text>
          <Text style={styles.clock}>
          {pad(this.state.breakMinutes)}:
          {pad(this.state.breakSeconds)}
          </Text>
          <ButtonsRow>
            <RoundButton style={styles.buttonText} title="Start" color="#00ca09" background="#28542a" onPress={this.togglePauseStart} />
            <RoundButton style={styles.buttonText} title="Stop" color="#ff4848" background="#760000" onPress={this.togglePauseStart} />
            <RoundButton style={styles.buttonText} title="Reset" color="#91c4ff" background="#445e7c" onPress={this.resetTimer} />
          </ButtonsRow>
          <Text style={styles.textLabel}>Edit Work Minutes:</Text>
          <View style={styles.editWorkMinutes}>
            <TextInput style={styles.textInput} 
                returnKeyType="done"
                keyboardType="number-pad"
                placeholder={`${this.state.customWorkMinutes}`}
                onChangeText={(mins) => this.editWorkMinutes(mins)} 
              />
          </View>
          <Text style={styles.textLabel}>Edit Break Minutes:</Text>
          <View style={styles.editWorkMinutes}>
            <TextInput style={styles.textInput} 
                returnKeyType="done"
                keyboardType="number-pad"
                placeholder={`${this.state.customBreakMinutes}`}
                onChangeText={(mins) => this.editBreakMinutes(mins)} 
              />
          </View>
        </View>
      );
    }
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: '#000000',
    alignItems: 'center',
    paddingTop: 75,
    paddingHorizontal: 10,
  },
  clock: {
    fontSize: 120,
    color: "white",
    textAlign: 'center',
    paddingBottom: 10
  },
  workLabel: {
    fontSize: 30,
    color: "#b5d7ff",
    textAlign: 'center',
    paddingBottom: 0,
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
    justifyContent: "space-between",
    marginTop: 5,
    paddingHorizontal: 20
  },
  buttonBorder: {
    height: 76,
    width: 76,
    borderRadius: 38,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  textLabel: {
    fontSize: 20,
    color: "white",
    paddingTop: 30,
    textAlign: "center"
  },
  textInput: {
    width: 100,
    fontSize: 20,
    color: "white",
    textAlign: "center",
    padding: 0,
    borderColor: "white",
    borderWidth: 2,
  },
  editWorkMinutes: {
    alignItems: "center",
    paddingTop: 10,
  }
});
