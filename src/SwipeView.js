import React from 'react';
import { Platform, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native';

import Icon, { ThemeProvider } from 'react-native-elements'

const config = require('../config');

export default class SwipeView extends React.Component {

  updateSize()
  {
    this.setState({windowSize: Dimensions.get('window')});
  }

  constructor(props) {
    super(props)

    this.position = new Animated.ValueXY()
    this.state = {
      currentIndex: 0,
      windowSize: Dimensions.get('window'),
    }
    this.updateSize = this.updateSize.bind(this)

    this.rotate = this.position.x.interpolate({
      inputRange: [-Dimensions.get('window').width /2 ,0, Dimensions.get('window').width /2],
      outputRange: ['-30deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    })

    this.rotateAndTranslate = {
      transform: [{
        rotate: this.rotate
      },
      ...this.position.getTranslateTransform()
      ]
    }

    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-Dimensions.get('window').width / 2, 0, Dimensions.get('window').width / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    })
    this.dislikeOpacity = this.position.x.interpolate({
      inputRange: [-Dimensions.get('window').width / 2, 0, Dimensions.get('window').width / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    })

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-Dimensions.get('window').width / 2, 0, Dimensions.get('window').width / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    })
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-Dimensions.get('window').width / 2, 0, Dimensions.get('window').width / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp'
    })

    this.PanResponder = PanResponder.create({

      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {

        this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {

        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: Dimensions.get('window').width + 100, y: gestureState.dy },
            restDisplacementThreshold: 0.1,
            overshootClamping: true
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
            this.props.onLike(this);
          })
        }
        else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -Dimensions.get('window').width - 100, y: gestureState.dy },
            restDisplacementThreshold: 0.1,
            overshootClamping: true
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
            this.props.onDislike(this);
          })
        }
        else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4,
          }).start()
        }
      }
    })

  }

  renderElements = () => {
    if(!(Platform.OS === 'android' || Platform.OS === 'ios')){
      window.addEventListener('resize', this.updateSize);
    }
    if(this.props.Elements.length <= 0) return null;

    return this.props.Elements.map((item, i) => {


      if (i < this.state.currentIndex) {
        return null
      }
      else if (i == this.state.currentIndex) {

        return (
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={item.id} style={[this.rotateAndTranslate, { height: Dimensions.get('window').height - 120, width: Dimensions.get('window').width, padding: 10, position: 'absolute' }]}>
            <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>

            </Animated.View>

            <Animated.View style={{ opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>

            </Animated.View>

            <Image
              style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
              source={{uri: config.googleImageUrl + item.pictureUrl}} />

          </Animated.View>
        )
      }
      else {
        return (
          <Animated.View

            key={item.id} style={[{
              opacity: this.nextCardOpacity,
              transform: [{ scale: this.nextCardScale }],
              height: Dimensions.get('window').height - 120, width: Dimensions.get('window').width, padding: 10, position: 'absolute'
            }]}>
            <Animated.View style={{ opacity: 0, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>

            </Animated.View>

            <Animated.View style={{ opacity: 0, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>

            </Animated.View>

            <Image
              style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
              source={{uri: config.googleImageUrl + item.pictureUrl}} />

          </Animated.View>
        )
      }
    }).reverse()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, margin: 100,
            alignItems: 'center', justifyContent: 'center'}}>
          {this.renderElements()}
        </View>
      </View>

    );
  }
}