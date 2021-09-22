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
} from 'react-native';
// import  from 'react-native-reanimated';

export class AnimationTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: new Animated.ValueXY(),
      data: [
        {color: 'tomato', animation: new Animated.ValueXY()},
        {color: 'blue', animation: new Animated.ValueXY()},
        {color: 'green', animation: new Animated.ValueXY()},
        {color: 'aqua', animation: new Animated.ValueXY()},
        {color: 'yellow', animation: new Animated.ValueXY()},
      ],
    };
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, {dx, dy}) => {
        this.state.data[0].animation.setValue({
          x: dx,
          y: dy,
          //   useNativeDriver: true,
        });

        this.state.data.slice(1).map(({animation}, index) => {
          Animated.sequence([
            Animated.delay(index * 15),
            Animated.spring(animation, {
              toValue: {x: dx, y: dy},
              friction: 20,
              useNativeDriver: false,
            }),
          ]).start();
        });
      },
      onPanResponderGrant: () => {
        this.state.data.map(({animation}, index) => {
          animation.extractOffset();
        });
      },
      onPanResponderRelease: () => {
        this.state.data.map(({animation}, index) => {
          Animated.spring(animation, {
            toValue: {x: 0, y: 0},
            useNativeDriver: true,
          });
        });
      },
    });
  }

  componentDidMount() {}

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.state.data
          .slice(0)
          .reverse()
          .map(({animation, color}, index) => {
            const panHandlers =
              index === this.state.data.length - 1
                ? this._panResponder.panHandlers
                : {};
            return (
              <Animated.View
                key={index}
                style={[
                  {
                    height: 50,
                    width: 50,
                    borderRadius: 50,
                    backgroundColor: color,
                    position: 'absolute',
                  },
                  {transform: animation.getTranslateTransform()},
                ]}
                {...panHandlers}
              />
            );
          })}
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
