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
} from 'react-native';
// import  from 'react-native-reanimated';
import clamp from 'clamp';
const SWIPE_THRESHOLD = 120;

export class AnimationTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: new Animated.ValueXY(),
      opacity: new Animated.Value(1),
      next: new Animated.Value(0.9),
      data: [
        {
          color: 'tomato',
          animation: new Animated.ValueXY(),
          image:
            'https://e7.pngegg.com/pngimages/614/838/png-clipart-cute-cat-animal-cat.png',
        },
        {
          color: 'blue',
          animation: new Animated.ValueXY(),
          image:
            'https://spng.pngfind.com/pngs/s/123-1234419_free-png-download-cute-cat-png-images-background.png',
        },
        {
          color: 'green',
          animation: new Animated.ValueXY(),
          image:
            'https://purepng.com/public/uploads/large/51502305566rtsfses9licuhzwzwc7hwh72e9boqm9vseph08hvvkhxgljuvmepx0w1xzaphsjwx0aftsgcwjfww6pmfytkr5pb6er0mmwugqnp.png',
        },
        {
          color: 'aqua',
          animation: new Animated.ValueXY(),
          image:
            'https://png.pngtree.com/png-clipart/20210309/original/pngtree-an-adult-tabby-cat-png-image_5803657.jpg',
        },
        {
          color: 'yellow',
          animation: new Animated.ValueXY(),
          image:
            'https://files.oyebesmartest.com/uploads/preview/cat-png505wgf.png',
        },
      ],
    };
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, {dx, dy}) => {
        this.state.animation.setValue({
          x: dx,
          y: dy,
          useNativeDriver: true,
        });
      },
      onPanResponderGrant: () => {
        this.state.animation.extractOffset();
      },
      onPanResponderRelease: (e, {dx, vx, vy}) => {
        let velocity;

        if (vx >= 0) {
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          velocity = clamp(Math.abs(vx), 3, 5) * -1;
        }

        if (Math.abs(dx) > SWIPE_THRESHOLD) {
          Animated.decay(this.state.animation, {
            velocity: {x: velocity, y: vy},
            deceleration: 0.98,
            useNativeDriver: true,
          }).start(() => {
            this.goToNext();
          });
        } else {
          Animated.spring(this.state.animation, {
            toValue: {x: 0, y: 0},
            friction: 20,
            useNativeDriver: true,
          }).start();
        }
      },
    });
  }

  goToNext = () => {
    Animated.parallel([
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 30,
        useNativeDriver: true,
      }),
      Animated.spring(this.state.next, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start(() => {
      this.setState(
        (state) => {
          return {
            data: state.data.slice(1),
          };
        },
        () => {
          this.state.animation.setValue({x: 0, y: 0});
          this.state.opacity.setValue(1);
          this.state.next.setValue(0.9);
        },
      );
    });
  };

  componentDidMount() {}

  render() {
    const topInterpolate = this.state.animation.x.interpolate({
      inputRange: [-250, 0, 250],
      outputRange: ['-30deg', '0deg', '30deg'],
      extrapolate: 'clamp',
    });

    // const scaleInterpolate = this.state.animation.x.interpolate({
    //   inputRange: [-250, 0, 250],
    //   outputRange: [0.8, 1, 0.5],
    //   extrapolate: 'clamp'
    // });
    const opacity = this.state.animation.x.interpolate({
      inputRange: [-250, 0, 250],
      outputRange: [0.5, 1, 0.5],
      extrapolate: 'clamp',
    });

    const newStyle = {
      transform: [
        {rotate: topInterpolate},

        ...this.state.animation.getTranslateTransform(),
      ],
      opacity: this.state.opacity,
    };
    return (
      <SafeAreaView style={styles.container}>
        {this.state.data
          .slice(0)
          .reverse()
          .map(({animation, color, image}, index) => {
            const isSecondLast = index === this.state.data.length - 2;
            const isLast = index === this.state.data.length - 1;
            const panHandlers = isLast ? this._panResponder.panHandlers : {};
            const animatedStyle = isLast ? newStyle : {};
            const nextStyle = isSecondLast
              ? {transform: [{scale: this.state.next}]}
              : {};
            return (
              <Animated.View
                key={index}
                style={[
                  {
                    height: 300,
                    width: 300,
                    shadowColor: '#000',
                    shadowOffset: {height: 0, width: 0},
                    shadowOpacity: 0.3,
                    shadowRadius: 5,
                    elevation: 2,
                    position: 'absolute',
                    backgroundColor: 'white',
                    borderRadius: 5,
                  },
                  animatedStyle,
                ]}
                {...panHandlers}>
                <Animated.Image
                  style={[
                    {
                      height: null,
                      width: null,
                      flex: 3,
                      borderRadius: 5,

                      backgroundColor: 'white',
                    },
                    nextStyle,
                  ]}
                  source={{uri: image}}
                />
                <View
                  style={{
                    flex: 1,
                    borderRadius: 5,
                    backgroundColor: 'white',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                  }}>
                  <Text
                    style={{fontSize: 18, padding: 5}}>{`Hello ${index}`}</Text>
                </View>
              </Animated.View>
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
