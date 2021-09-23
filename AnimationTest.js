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
      viewAnimation: new Animated.Value(0),
      buttonAnimation: new Animated.Value(0),
      showView: true,
      showButton: true,
      color: '#333',
    };
  }

  toggleView = () => {
    const toValue = this.state.showView ? 1 : 0;
    Animated.spring(this.state.viewAnimation, {
      toValue,
      useNativeDriver: true,
    }).start();

    this.setState({
      showView: !this.state.showView,
    });
  };

  toggleButton = () => {
    const toValue = this.state.showButton ? 1 : 0;
    Animated.timing(this.state.buttonAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();

    this.setState({
      showButton: !this.state.showButton,
    });
  };

  colorChange = (text) => {
    this.setState({
      color: text,
    });
  };

  closeButton = () => {
    Animated.sequence([
      Animated.timing(this.state.buttonAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(10),
      Animated.spring(this.state.viewAnimation, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start(() => {
      this.setState({
        showView: false,
        showButton: false,
      });
    });
  };
  render() {
    const viewInterpolate = this.state.viewAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -100],
    });

    const viewScaleInterpolate = this.state.viewAnimation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1],
    });

    const animatedViewStyle = {
      opacity: this.state.viewAnimation,
      transform: [
        {
          translateY: viewInterpolate,
        },
        {scaleX: viewScaleInterpolate},
      ],
    };

    const moveInterpolate = this.state.buttonAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [-50, 0],
    });

    const viewInterpolateOpacity = this.state.buttonAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    const textInterpolateOpacity = this.state.buttonAnimation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 1, 0],
    });

    const animatedTextStyle = {
      opacity: textInterpolateOpacity,
      transform: [{scale: textInterpolateOpacity}],
    };

    const animatedTopView = {
      transform: [
        {translateX: moveInterpolate},
        {scaleY: this.state.buttonAnimation},
      ],
      opacity: viewInterpolateOpacity,
    };

    return (
      <SafeAreaView style={styles.container}>
        <Animated.View style={[styles.viewStyle, animatedViewStyle]}>
          <TouchableOpacity onPress={this.toggleButton}>
            <View
              style={{
                height: 20,
                width: 20,
                backgroundColor: this.state.color,
                borderRadius: 20,
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',

              flex: 1,
            }}>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 3,
              }}>
              <Animated.Text style={[{fontSize: 20}, animatedTextStyle]}>
                A
              </Animated.Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 3,
              }}>
              <Animated.Text style={[{fontSize: 20}, animatedTextStyle]}>
                B
              </Animated.Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 3,
              }}>
              <Animated.Text style={[{fontSize: 20}, animatedTextStyle]}>
                C
              </Animated.Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 3,
              }}>
              <Animated.Text style={[{fontSize: 20}, animatedTextStyle]}>
                D
              </Animated.Text>
            </TouchableOpacity>
          </View>

          <Animated.View
            pointerEvents={this.state.showButton ? 'none' : 'auto'}
            style={[
              StyleSheet.absoluteFill,
              {
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 30,
              },
              animatedTopView,
            ]}>
            <AnimatedTextInput
              ref={(input) => (this._input = input)}
              style={{flex: 1}}
              value={this.state.color}
              onChangeText={this.colorChange}
            />
            <TouchableOpacity onPress={this.closeButton}>
              <Animated.View style={[styles.buttonStyle]}>
                <Text style={{color: '#fff', padding: 5}}>OK</Text>
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={this.toggleView}
          style={{
            borderRadius: 10,
            borderWidth: 0.8,
            borderColor: '#333',
            paddingVertical: 5,
            paddingHorizontal: 8,
          }}>
          <Text style={[styles.textStyle, {color: this.state.color}]}>
            Toggle View
          </Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 18,
    padding: 5,
  },
  viewStyle: {
    backgroundColor: '#fff',
    shadowColor: '#333',
    shadowOffset: {height: 2, width: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 10,
    minWidth: '50%',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonStyle: {
    height: 30,
    width: 40,
    borderRadius: 40,
    backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
