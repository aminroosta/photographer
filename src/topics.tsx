import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import ImgCircle from "./img-circle";
import Curves from "./curves";
import { StyleSheet, Text, View } from 'react-native';

var {height, width} = Dimensions.get('window')

export default class Topics extends Component<{}, {}> {
    render() {
        const model = this.state;
        const radius = 50;
        const radius2 = 30;
        const radius3 = 20;
        return (
            <View>
                <Curves width={width} height={2*radius} />
                <ImgCircle
                  radius={radius3}
                  source={require('../assets/images/topics/3.jpg')}
                  style={{
                    position: 'absolute',
                    left: -radius3,
                    top: radius
                  }} />
                <ImgCircle
                  radius={radius2}
                  source={require('../assets/images/topics/2.jpg')}
                  style={{
                    position: 'absolute',
                    left: width/5 - radius2,
                    top: radius/5
                  }} />
                <ImgCircle
                  radius={radius}
                  source={require('../assets/images/topics/1.jpg')}
                  style={{
                    position: 'absolute',
                    left: width/2 - radius
                  }} />
            </View>
        );
    }
}
