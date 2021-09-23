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

export class AnimationTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          color: 'tomato',

          image:
            'https://e7.pngegg.com/pngimages/614/838/png-clipart-cute-cat-animal-cat.png',
        },
        {
          color: 'blue',

          image:
            'https://spng.pngfind.com/pngs/s/123-1234419_free-png-download-cute-cat-png-images-background.png',
        },
        {
          color: 'green',

          image:
            'https://purepng.com/public/uploads/large/51502305566rtsfses9licuhzwzwc7hwh72e9boqm9vseph08hvvkhxgljuvmepx0w1xzaphsjwx0aftsgcwjfww6pmfytkr5pb6er0mmwugqnp.png',
        },
        {
          color: 'aqua',

          image:
            'https://png.pngtree.com/png-clipart/20210309/original/pngtree-an-adult-tabby-cat-png-image_5803657.jpg',
        },
        {
          color: 'yellow',

          image:
            'https://files.oyebesmartest.com/uploads/preview/cat-png505wgf.png',
        },
        {
          color: 'blue',

          image:
            'https://spng.pngfind.com/pngs/s/123-1234419_free-png-download-cute-cat-png-images-background.png',
        },
        {
          color: 'green',

          image:
            'https://purepng.com/public/uploads/large/51502305566rtsfses9licuhzwzwc7hwh72e9boqm9vseph08hvvkhxgljuvmepx0w1xzaphsjwx0aftsgcwjfww6pmfytkr5pb6er0mmwugqnp.png',
        },
        {
          color: 'aqua',

          image:
            'https://png.pngtree.com/png-clipart/20210309/original/pngtree-an-adult-tabby-cat-png-image_5803657.jpg',
        },
        {
          color: 'yellow',

          image:
            'https://files.oyebesmartest.com/uploads/preview/cat-png505wgf.png',
        },
        {
          color: 'blue',

          image:
            'https://spng.pngfind.com/pngs/s/123-1234419_free-png-download-cute-cat-png-images-background.png',
        },
        {
          color: 'green',

          image:
            'https://purepng.com/public/uploads/large/51502305566rtsfses9licuhzwzwc7hwh72e9boqm9vseph08hvvkhxgljuvmepx0w1xzaphsjwx0aftsgcwjfww6pmfytkr5pb6er0mmwugqnp.png',
        },
        {
          color: 'aqua',

          image:
            'https://png.pngtree.com/png-clipart/20210309/original/pngtree-an-adult-tabby-cat-png-image_5803657.jpg',
        },
        {
          color: 'yellow',

          image:
            'https://files.oyebesmartest.com/uploads/preview/cat-png505wgf.png',
        },
        {
          color: 'blue',

          image:
            'https://spng.pngfind.com/pngs/s/123-1234419_free-png-download-cute-cat-png-images-background.png',
        },
        {
          color: 'green',

          image:
            'https://purepng.com/public/uploads/large/51502305566rtsfses9licuhzwzwc7hwh72e9boqm9vseph08hvvkhxgljuvmepx0w1xzaphsjwx0aftsgcwjfww6pmfytkr5pb6er0mmwugqnp.png',
        },
      ],
      position: new Animated.ValueXY(),
      size: new Animated.ValueXY(),
      animation: new Animated.Value(0),
      activeImage: null,
      // activeIndex: null,
    };

    this._images = {};
  }

  onImagePress = (index) => {
    this._images[index].measure((x, y, width, height, pageX, pageY) => {
      console.log(
        x,
        y,
        pageX,
        pageY,
        height,
        width,
        'x,y,pageX,pageY,height,width',
      );

      this._x = pageX;
      this._y = pageY;
      this._height = height;
      this._width = width;

      this.state.position.setValue({x: pageX, y: pageY});
      this.state.size.setValue({x: width, y: height});

      this.setState(
        {
          activeImage: this.state.data[index].image,
          activeIndex: index,
        },
        () => {
          this.viewImage.measure((tx, ty, twidth, theight, tpageX, tpageY) => {
            Animated.parallel([
              Animated.spring(this.state.position.x, {
                toValue: tpageX,
                useNativeDriver: false,
              }),
              Animated.spring(this.state.position.y, {
                toValue: tpageY,
                useNativeDriver: false,
              }),
              Animated.spring(this.state.size.x, {
                toValue: twidth,
                useNativeDriver: false,
              }),
              Animated.spring(this.state.size.y, {
                toValue: theight,
                useNativeDriver: false,
              }),
              Animated.spring(this.state.animation, {
                toValue: 1,
                useNativeDriver: false,
              }),
            ]).start();
          });
        },
      );
    });
  };

  closePressed = () => {
    Animated.parallel([
      Animated.timing(this.state.position.x, {
        toValue: this._x,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.position.y, {
        toValue: this._y,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.size.x, {
        toValue: this._width,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.size.y, {
        toValue: this._height,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start(() => {
      this.setState({
        activeImage: null,
        // activeIndex: 0,
      });
    });
  };

  render() {
    console.log(this.state.activeImage, 'this.state.activeImage');
    const translateInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [300, 0],
    });

    const viewStyle = {
      opacity: this.state.animation,
      transform: [{translateY: translateInterpolate}],
    };

    const activeImageStyle = {
      width: this.state.size.x,
      height: this.state.size.y,
      top: this.state.position.y,
      left: this.state.position.x,
    };

    const activeIndexStyle = {
      opacity: this.state.activeImage ? 0 : 1,
    };

    const animatedButtonStyle = {
      opacity: this.state.activeImage ? 1 : 0,
    };
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{
            // flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {this.state.data.map(({image}, index) => {
            const newStyle =
              image === this.state.activeIndex ? activeIndexStyle : {};
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => {
                  this.onImagePress(index);
                }}>
                <Animated.Image
                  key={index}
                  ref={(ref) => (this._images[index] = ref)}
                  style={[styles.image, newStyle]}
                  resizeMode="cover"
                  source={{uri: image}}
                />
              </TouchableWithoutFeedback>
            );
          })}
        </ScrollView>

        <View
          style={StyleSheet.absoluteFill}
          pointerEvents={this.state.activeImage ? 'auto' : 'none'}>
          <View style={{flex: 1}} ref={(view) => (this.viewImage = view)}>
            <Animated.Image
              key={this.state.activeImage}
              style={[styles.largeImage, activeImageStyle]}
              resizeMode="cover"
              source={{uri: this.state.activeImage}}
            />
          </View>
          <Animated.View
            style={[{backgroundColor: 'white', flex: 2}, viewStyle]}>
            <Text style={{fontSize: 16, padding: 5}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </Animated.View>
        </View>
        <TouchableWithoutFeedback onPress={this.closePressed}>
          <Animated.View style={[styles.buttonStyle, animatedButtonStyle]}>
            <Text style={[styles.textStyle]}>X</Text>
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
  },
  image: {
    width: '33%',
    height: 140,
    backgroundColor: 'white',
  },
  largeImage: {
    width: null,
    height: null,
    position: 'absolute',
    left: 0,
    top: 0,
    // backgroundColor: 'red',
  },
  textStyle: {
    fontSize: 30,
    color: 'black',
    padding: 5,
    fontWeight: 'bold',
  },
  buttonStyle: {
    position: 'absolute',
    right: 25,
    top: 25,
  },
});
