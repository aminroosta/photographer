import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import ImgCircle from "./img-circle";
import Curves from "./curves";
import {observable, action} from "mobx";
import {observer} from "mobx-react/native";
import { StyleSheet, Text, View, Animated, PanResponder, Easing} from 'react-native';

var {height: deviceHeight, width} = Dimensions.get('window')

class TopicsState {
  @observable index = 0;
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
    { source: require('../assets/images/topics/8.jpg'), title: 'last title 8'},
    { source: require('../assets/images/topics/9.jpg'), title: 'last title 9'},
    { source: require('../assets/images/topics/10.jpg'), title: 'last title 9'},
    { source: require('../assets/images/topics/11.jpg'), title: 'last title 9'},
    { source: require('../assets/images/topics/12.jpg'), title: 'last title 9'},
    { source: require('../assets/images/topics/13.jpg'), title: 'last title 9'},
    { source: require('../assets/images/topics/14.jpg'), title: 'good tiles 4' },
    { source: require('../assets/images/topics/15.jpg'), title: 'very long verbose title 5'},
    { source: require('../assets/images/topics/16.jpg'), title: 'yet another title 6' },
    { source: require('../assets/images/topics/17.jpg'), title: 'last title 7'},
    { source: require('../assets/images/topics/18.jpg'), title: 'last title 8'},
    { source: require('../assets/images/topics/19.jpg'), title: 'last title 9'},
    { source: require('../assets/images/topics/20.jpg'), title: 'last title 9'},
    { source: require('../assets/images/topics/21.jpg'), title: 'last title 9'},
    { source: require('../assets/images/topics/22.jpg'), title: 'last title 9'},
    { source: require('../assets/images/topics/23.jpg'), title: 'last title 9'},
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
        tops: Animated.Value[],
        lefts: Animated.Value[],
        scales: Animated.Value[]
       } = null;
   dxa : Animated.Value; // horizontal swipe
   dxv : number; // horizontal swipe value

    componentWillMount() {
      const r1 = this.radius,
            r2 = r1*3/5,
            r3 = r1*2/5;

      let dxv = this.dxv = 0;
      const dxa = this.dxa = new Animated.Value(0);
      dxa.addListener(({value}) => { dxv = this.dxv = value; });

      const h = this.height;
      let lefts: number[] = [];
      let scales: number[] = [];
      [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach(i =>  {
        lefts.push(...[ 0, width/5, width/2, width*4/5].map(e => e+i*width))
        scales.push(...[.4,.6,1,.6]);
      });
      const tops = [
        [0,   .65, .5, .35, 1  ],
        [0,   1,   .5, .35, .65],
        [0,   .5,  .5,  0,  1  ],
        [.5,  .35, 1,   0,  .65],
        [.35, .5,  .65, 0,  1  ],
        [0,   .35, .5, .35, 1  ],

        [.65, .65, 1, 0, .35],
        [1, 0, .65, .5, .35],
        [0, .5, .5, 0, 1 ],
        [.5, .35, 1, 0, .65],
        [.35, .5, .65, 0, 1],
        [0, .5, .5, .35, 1],
      ].map(arr => arr.map(e => e*h));
      this.dims = {
          tops : tops[0].map(t => new Animated.Value(t)),
          lefts : lefts.map(v => new Animated.Value(v)),
          scales: scales.map(v => new Animated.Value(v))
      };

      this.panResponder = PanResponder.create({
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderGrant: (e,gs) => {
          dxa.setOffset(dxv);
          dxa.setValue(0);
        },
        onPanResponderMove:(e,{dx}) => Animated.event([
          null,
          {dx: dxa}
        ])(e, {dx: dx/2}),
        onPanResponderRelease: () => {
            let inx = closestIndex(width/2, lefts.map(v => v+dxv));
            dxa.flattenOffset();
            if(this.state.index === 0 && inx < 2) { inx = 2; }

            const offset = width/2 - lefts[inx];
            //.start( () => {
                // 67, 182,270, 411, 523, 586
                
            const left_animations = this.dims.lefts
            .map((lft,i) =>
              Animated.spring(lft, { toValue: lefts[i - inx + 2] - offset})
            ).filter((lft,i) => (i -inx + 2) >= 0);
            
            const scale_animations = this.dims.scales.map(
              (scl,i) => Animated.spring(scl,{ toValue: scales[i+2-inx]})
            ).filter((lft,i) => (i -inx + 2) >= 0);
            
            const top_animations = this.dims.tops.map(
              (top,i) => Animated.spring(top, { toValue: tops[inx-2][i]})
            );

            Animated.parallel([
              Animated.spring(dxa, { toValue: offset, }),
              ...left_animations,
              ...scale_animations,
              ...top_animations
            ]).start(
              () => {
                const offset = (inx - 2);
                const new_index = offset + this.state.index;
                if(false && new_index >= 0 &&  new_index < this.state.topics.length - 2) {
                  this.state.index = new_index;
                  this.dims.scales.forEach((s,i) => s.setValue(scales[i]));
                  this.dims.lefts.forEach((l,i) => l.setValue(lefts[i]));
                  dxa.setValue(0);
                }
              }
            );
        }
      });
    }
    render() {
        const {state: model, dims} = this;

        const images = model.topics
          .filter((e,inx) => model.index <= inx)
          .map((topic, inx) => <Animated.View
                                    key={model.index + inx}
                                    style={{
                                      position: 'absolute',
                                      transform: [
                                        {translateX: -this.radius},
                                        {translateY: -this.radius},
                                        {scale: this.dims.scales[inx]},
                                      ],
                                      left: dims.lefts[inx],
                                      top: dims.tops[inx%5]}}>
              
                                  <ImgCircle
                                      radius={this.radius}
                                      source={model.topics[model.index+inx].source}
                                      /* TODO: pass title to ImgCircle*//>
                                </Animated.View>);

        return (
            <View {...this.panResponder.panHandlers} style={{height: 2*this.radius}}>
              <Animated.View style={{
                  top: (2*this.radius-this.height)/2,
                  width:width*2,
                  left: this.dxa,
                }}>
                <Curves width={width} height={this.height} count={3} marginLeft={-1/2} countRight={8} countLeft={1} />
                  {images}
              </Animated.View>
            </View>
        );
    }
}
