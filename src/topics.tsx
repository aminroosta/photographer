import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import ImgCircle from "./img-circle";
import Curves from "./curves";
import {observable, action} from "mobx";
import {observer} from "mobx-react/native";
import { StyleSheet, Text, View, Animated, PanResponder, Easing} from 'react-native';

var {height: deviceHeight, width} = Dimensions.get('window')

class TopicsState {
  @observable index = 1;
  topics = [
    { source: null, title: null },
    { source: null, title: null },
    { source: require('../assets/images/topics/1.jpg'), title: 'title 1' },
    { source: require('../assets/images/topics/2.jpg'), title: 'title 2'},
    { source: require('../assets/images/topics/3.jpg'), title: 'long title 3' },
    { source: require('../assets/images/topics/4.jpg'), title: 'good tiles 4' },
    { source: require('../assets/images/topics/5.jpg'), title: 'very long verbose title 5'},
    { source: require('../assets/images/topics/6.jpg'), title: 'yet another title 6' },
    { source: require('../assets/images/topics/7.jpg'), title: 'last title 7'},
    { source: null, title: null },
    { source: null, title: null },
  ];
}

function closestIndex(n: number, array: number[]) {
  let cur = 0;
  array.forEach((v,inx) => {
    if(Math.abs(n - v) < Math.abs(n - array[cur]))
      cur = inx;
  });
  return cur;
}

@observer
export default class Topics extends Component<{}, {}> {
    radius = 60;
    height = 60;
    state = new TopicsState();
    panResponder: React.PanResponderInstance = null;
    dims : {
        rs :number[],
        tops: Animated.AnimatedInterpolation[],
        lefts: Animated.AnimatedInterpolation[],
        scales: Animated.Value[]
       } = null;
   left : Animated.Value | Animated.AnimatedInterpolation | number;

    componentWillMount() {
      const r1 = this.radius,
            r2 = r1*3/5,
            r3 = r1*2/5;

      const left = this.left = new Animated.Value(0);
      let left_value = 0;
      left.addListener(({value}) => left_value = value);

      const lefts = [ 0, width/5, width/2, width*4/5, width];
      const h = this.height;
      this.dims = {
          rs : [r3, r2, r1, r2, r3],
          tops : [0, h*.65, h*.5, h*0.35, h],
          lefts : [ 0, width/5, width/2, width*4/5, width].map(v => new Animated.Value(v)),
          scales: [.4,.6,1,.6,.4].map(v => new Animated.Value(v))
      };

      this.panResponder = PanResponder.create({
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderGrant: (e,gs) => {
          left.setOffset(left_value);
          left.setValue(0);
        },
        onPanResponderMove:(e,{dx}) => Animated.event([
          null,
          {dx: left}
        ])(e, {dx: dx/2}),
        onPanResponderRelease: () => {
          if(left_value > 0) {
            Animated.timing(left, {
              toValue: 0,
              duration: (left_value/width)*700,
              easing: Easing.linear
            }).start();
          }
          else {
            const inx = closestIndex(left_value*-1, lefts);
            left.flattenOffset();
            Animated.timing(left, {
              toValue: -lefts[inx],
              duration: 300,
              easing: Easing.linear
            }).start();
            for(let i = inx; i < this.dims.scales.length; ++i)
              Animated.timing(this.dims.scales[i], {
                toValue: this.dims.rs[i-inx]/this.dims.rs[i],
                duration: 300
              }).start();
          }
        }
      });
    }
    render() {
        const {state: model, dims} = this;

        const images = model.topics
          .filter((e,inx) => model.index <= inx && inx < model.index+5)
          .map((topic, inx) => <Animated.View
                                    key={model.index + inx}
                                    style={{
                                      position: 'absolute',
                                      transform: [
                                        {translateX: -dims.rs[inx]},
                                        {translateY: -dims.rs[inx]},
                                        //{scale: this.dims.scales[inx]},
                                      ],
                                      left: dims.lefts[inx],
                                      top: dims.tops[inx]}}>
              
                                  <ImgCircle
                                      radius={dims.rs[inx]}
                                      source={model.topics[model.index+inx].source}
                                      /* TODO: pass title to ImgCircle*//>
                                </Animated.View>);

        return (
            <View {...this.panResponder.panHandlers} style={{height: 2*this.radius}}>
              <Animated.View style={{
                  top: (2*this.radius-this.height)/2,
                  width:width*2,
                  left: this.left,
                }}>
                  <Curves width={width} height={this.height} count={3} marginLeft={-1/2} countRight={2} countLeft={1} />
                  {images}
              </Animated.View>
            </View>
        );
    }
}
