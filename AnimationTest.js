import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  SafeAreaView,
  Easing,
  ScrollView,
  PanResponder,
  Animated,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
// import  from 'react-native-reanimated';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
export class AnimationTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonAnimation: new Animated.Value(0),
    };
    this._open = true;
  }

  buttonPress = () => {
    const toValue = this._open ? 1 : 0;

    Animated.timing(this.state.buttonAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();

    this._open = !this._open;
  };

  render() {
    const interpolate = this.state.buttonAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
    const button1Style = {
      opacity: interpolate,
      transform: [
        {
          translateY: this.state.buttonAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -70],
          }),
        },
      ],
    };

    const button2Style = {
      opacity: interpolate,
      transform: [
        {
          translateY: this.state.buttonAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -140],
          }),
        },
      ],
    };

    const button3Style = {
      opacity: interpolate,
      transform: [
        {
          translateY: this.state.buttonAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -210],
          }),
        },
      ],
    };

    const buttonTextStyle = {
      opacity: interpolate,

      right: this.state.buttonAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 80],
      }),
    };

    return (
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback activeOpacity={0.6} onPress={() => {}}>
          <Animated.View
            style={[styles.buttonStyle, styles.otherButton, button3Style]}>
            <Animated.Text
              style={[
                {fontSize: 18, color: '#000', position: 'absolute', right: 20},
                buttonTextStyle,
              ]}>
              3 text
            </Animated.Text>
            <Text style={[styles.otherTextStyle]}>3</Text>
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback activeOpacity={0.6} onPress={() => {}}>
          <Animated.View
            style={[styles.buttonStyle, styles.otherButton, button2Style]}>
            <Animated.Text
              style={[
                {fontSize: 18, color: '#000', position: 'absolute', right: 20},
                buttonTextStyle,
              ]}>
              2 text
            </Animated.Text>
            <Text style={[styles.otherTextStyle]}>2</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback activeOpacity={0.6} onPress={() => {}}>
          <Animated.View
            style={[styles.buttonStyle, styles.otherButton, button1Style]}>
            <Animated.Text
              style={[
                {fontSize: 18, color: '#000', position: 'absolute', right: 20},
                buttonTextStyle,
              ]}>
              1 text
            </Animated.Text>
            <Text style={[styles.otherTextStyle]}>1</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={this.buttonPress}
          style={[styles.buttonStyle]}>
          <Text style={[styles.textStyle]}>FAB</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default AnimationTest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexGrow: 1,

    backgroundColor: 'white',
  },

  buttonStyle: {
    height: 60,
    width: 60,
    borderRadius: 60,
    backgroundColor: '#007bff',
    position: 'absolute',
    right: 12,
    bottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.2,
    shadowOffset: {height: 2, width: 2},
    shadowRadius: 3,
    shadowColor: '#333',
  },
  otherButton: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 18,
    color: '#fff',
  },
  otherTextStyle: {
    fontSize: 18,
    color: '#000',
  },
});
