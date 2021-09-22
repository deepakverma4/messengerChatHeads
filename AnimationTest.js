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
} from 'react-native';
// import  from 'react-native-reanimated';
import clamp from 'clamp';
const SWIPE_THRESHOLD = 120;

export class AnimationTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: new Animated.Value(0),
      opacity: new Animated.Value(1),
    };
  }

  startAnimation = () => {
    this.state.animation.setValue(0);
    this.state.opacity.setValue(1);
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: false,
      }).start();
    });
  };

  render() {
    const widthInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
      // extrapolate: 'clamp',
    });

    const colorInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['#22bb33', '#22bb33'],
      // extrapolate: 'clamp',
    });

    const animatedStyle = {
      backgroundColor: colorInterpolate,
      width: widthInterpolate,
      opacity: this.state.opacity,
    };

    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={this.startAnimation}
          style={{
            height: 50,
            width: '60%',
            backgroundColor: 'tomato',
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              // {backgroundColor: 'red'},
              animatedStyle,
            ]}
          />
          <Text style={[{fontSize: 18, color: '#fff'}]}>Press me</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default AnimationTest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  box: {
    height: 100,
    width: 100,
    backgroundColor: 'white',
    borderRadius: 5,
  },
});
