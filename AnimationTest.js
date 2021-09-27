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

const Heart = ({isLiked, ...props}) => {
  const unfilledHeart = (
    <View style={(StyleSheet.absoluteFill, {transform: [{scale: 0.9}]})}>
      <View
        style={[
          styles.heartButton,
          styles.leftHeart,
          {
            backgroundColor: '#f4f4f4',
          },
        ]}
      />
      <View
        style={[
          styles.heartButton,
          styles.rightHeart,
          {
            backgroundColor: '#f4f4f4',
          },
        ]}
      />
    </View>
  );
  return (
    <Animated.View style={styles.heart} {...props}>
      <View
        style={[
          styles.heartButton,
          styles.leftHeart,
          {backgroundColor: isLiked ? 'red' : 'transparent'},
        ]}
      />
      <View
        style={[
          styles.heartButton,
          styles.rightHeart,
          {backgroundColor: isLiked ? 'red' : 'transparent'},
        ]}
      />
      {!isLiked && unfilledHeart}
    </Animated.View>
  );
};

export class AnimationTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: new Animated.Value(0),
      isLiked: false,
    };
    // this._open = true;
  }

  buttonPress = () => {
    this.setState(
      {
        isLiked: !this.state.isLiked,
      },
      () => {
        if (this.state.isLiked) {
          Animated.spring(this.state.animation, {
            toValue: 2,
            friction: 5,
            useNativeDriver: true,
          }).start(() => {
            this.state.animation.setValue(0);
          });
        }
      },
    );
  };

  render() {
    const {width, height} = Dimensions.get('window');

    const scaleInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [1, 0.8, 1],
    });
    return (
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={this.buttonPress}>
          <Animated.View
            style={{
              transform: [{scale: scaleInterpolate}],
            }}>
            <Heart isLiked={this.state.isLiked} {...this.props} />
          </Animated.View>
        </TouchableWithoutFeedback>
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
  heart: {
    position: 'absolute',
    height: 50,
    width: 50,
  },
  heartButton: {
    width: 30,
    height: 45,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,

    position: 'absolute',
    top: 0,
  },
  leftHeart: {
    transform: [
      {
        rotate: '-45deg',
      },
    ],
    left: 5,
  },
  rightHeart: {
    transform: [
      {
        rotate: '45deg',
      },
    ],
    right: 5,
  },
  fillColor: {
    backgroundColor: 'red',
  },
});
