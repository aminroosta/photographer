import React, { Component } from 'react';
import {
    PanResponder,
    StyleSheet,
    Animated,
    Image,
    View,
    TouchableWithoutFeedback,
    Easing,
    Text
} from 'react-native';

export default class TestPanResponder extends Component<{}, {}> {
    _animatedValue = new Animated.ValueXY();
    _value = {x: 0, y: 0};
    _listeners:string[] = [];
    _panResponder:React.PanResponderInstance = null;
    _scaleValue = new Animated.Value(1);
    
    _onPressIn = () => {
      Animated.timing(this._scaleValue, {
        toValue: 1.3,
        duration: 500,
        easing: Easing.linear
      }).start();
    }
    _onPressOut = () => {
        Animated.timing(this._scaleValue, {
          toValue: 1,
          duration: 500
        }).start();
    }
    componentWillMount() {
      const id = this._animatedValue.addListener(value => this._value = value);
      this._listeners.push(id);
      this._panResponder = PanResponder.create({
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderGrant: (g, gestureState) => {
          this._animatedValue.setOffset({x: this._value.x, y: this._value.y});
          this._animatedValue.setValue({x: 0, y: 0});
        },
        onPanResponderMove: Animated.event([
          null,
          { dx: this._animatedValue.x, dy: this._animatedValue.y }
        ]),
        onPanResponderRelease: () => {
          this._animatedValue.flattenOffset();
        }

      });
    }
    componentWillUnmount() {
      this._listeners.forEach(id => this._animatedValue.removeListener(id));
    }
    render() {
        return (
            <Animated.View
              style={{
                //transform: [this._animatedValue.getTranslateTransform()]
                transform: [...this._animatedValue.getTranslateTransform(), {scale: this._scaleValue}]
              }}
              
              {...this._panResponder.panHandlers}
            >
              <TouchableWithoutFeedback
                 onPressIn={this._onPressIn}
                 onPressOut={this._onPressOut}
              >
                <Text> Hello pan responder</Text>
              </TouchableWithoutFeedback>
            </Animated.View>
        );
    }
}
