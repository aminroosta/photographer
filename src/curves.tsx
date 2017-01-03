
import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View
} from 'react-native';
import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Text,
    Use,
    Defs,
    Stop
} from 'react-native-svg';

interface Props {
  width: number,
  height: number,
  count: number,
  countLeft?: number,
  countRight?: number,
  marginLeft?: number
}

const d = (w: number, h: number, n: number, ext : number = 0) => {
  const step = w/(2*n);
  let ret = `M${0},${0} Q${step},${-h+1} ${2*step},0`;
  for(let i = 1; i < n+ext; ++i)
    ret += `T${2*(i+1)*step},0 `;
  return ret; 
}

export default class Curves extends Component<Props, {}> {
    render() {
      const { width: w, height: h, count: c,
              countLeft: cl = 0,
              countRight: cr = 0,
              marginLeft: ml = 0
            } = this.props;
        return (
          <View
            style={{
              left: -w*cl/c
            }}>
              <Svg width={w*(c+cr+cl)/c} height={h}>
                  <Symbol id="curve">
                    <Path d={d(w, h, c, cl+cr)}
                      stroke="#FF5165"
                      strokeWidth="1"
                      fill="none"
                      y={h/2}
                      />
                  </Symbol>
                  <Use href="#curve" x={-w*ml/3} />
              </Svg>
          </View>
        );
    }
}
