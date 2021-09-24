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
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
// import  from 'react-native-reanimated';

export class AnimationTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: new Animated.Value(0),
    };
    // this._open = true;
  }

  buttonPress = () => {
    const toValue = this._open ? 0 : 1;

    Animated.timing(this.state.animation, {
      toValue,
      duration: 500,
      useNativeDriver: false,
    }).start();

    this._open = !this._open;
  };

  render() {
    const {width, height} = Dimensions.get('window');
    const widthInterpolate = this.state.animation.interpolate({
      inputRange: [0, 0.5],
      outputRange: [100, width - 40],
      extrapolate: 'clamp',
    });

    const opacityInterpolate = this.state.animation.interpolate({
      inputRange: [0, 0.5],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    const widthStyle = {
      opacity: opacityInterpolate,
      width: widthInterpolate,
    };

    const heightInterpolate = this.state.animation.interpolate({
      inputRange: [0.7, 1],
      outputRange: [0, 150],
      extrapolate: 'clamp',
    });
    const inputContainer = {
      height: heightInterpolate,
    };

    // const writeAnimation = this.state.animation.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [1, 0],
    //   extrapolate: 'clamp',
    // });
    const writeAnimation = {
      opacity: this.state.animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      }),
    };

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.container}>
          <Animated.View style={[styles.editor]}>
            <Animated.View style={[styles.bar]}>
              <Animated.View style={[styles.toolBar, widthStyle]}>
                <Text style={{color: '#fff', padding: 5}}>1</Text>
                <Text style={{color: '#fff', padding: 5}}>2</Text>
                <Text style={{color: '#fff', padding: 5}}>3</Text>
                <Text style={{color: '#fff', padding: 5}}>4</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'flex-end',
                  }}>
                  <Text style={{color: '#fff', padding: 5}}>5</Text>
                  <Text style={{color: '#fff', padding: 5}}>6</Text>
                  <Text style={{color: '#fff', padding: 5}}>7</Text>
                </View>
              </Animated.View>

              <TouchableWithoutFeedback onPress={this.buttonPress}>
                <Animated.View
                  style={[
                    StyleSheet.absoluteFill,
                    styles.writeStyle,
                    writeAnimation,
                  ]}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      padding: 5,
                      color: '#fff',
                    }}>
                    Write
                  </Text>
                </Animated.View>
              </TouchableWithoutFeedback>
            </Animated.View>
            <Animated.View style={[inputContainer]}>
              <TextInput
                style={{flex: 1, fontSize: 20, padding: 10}}
                multiline={true}
                placeholder={'Write something..'}
              />
            </Animated.View>
          </Animated.View>
        </KeyboardAvoidingView>
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
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  editor: {
    shadowColor: '#333',
    shadowOffset: {height: 2, width: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 5,
  },
  bar: {
    backgroundColor: '#007bff',
    height: 50,
  },
  toolBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  writeStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
