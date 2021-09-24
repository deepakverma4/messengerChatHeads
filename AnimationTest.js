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
} from 'react-native';
// import  from 'react-native-reanimated';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
export class AnimationTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: new Animated.Value(0),
    };
    this._open = true;
  }

  buttonPress = () => {
    const toValue = this._open ? 1 : 0;

    Animated.timing(this.state.animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();

    this._open = !this._open;
  };

  render() {
    const {width, height} = Dimensions.get('window');

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.container}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: this.state.animation,
                },
              },
            },
          ])}
          scrollEventThrottle={16}
          horizontal={true}
          pagingEnabled={true}>
          <View style={{width, height, backgroundColor: '#007bff'}}>
            <View style={{flex: 1}}></View>
            <View style={{flex: 1}}>
              <Text>screen 1</Text>
            </View>
          </View>
          <View style={{width, height, backgroundColor: '#007bff'}}>
            <View style={{flex: 1}}></View>
            <View style={{flex: 1}}>
              <Text>screen 1</Text>
            </View>
          </View>
          <View style={{width, height, backgroundColor: '#007bff'}}>
            <View style={{flex: 1}}></View>
            <View style={{flex: 1}}>
              <Text>screen 1</Text>
            </View>
          </View>
        </ScrollView>
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
});
