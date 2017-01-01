
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
  height?: number,
}

export default class Curves extends Component<Props, {}> {
    render() {
      const {width, height=46} = this.props;
      const scaleY = 1.3; // height/45;
      const scaleX = (width/2)/184;
        return (
          <View
            style={{
              width, height,
              borderWidth: 1
            }}>
              <Svg width={width} height={height}>
                  <Symbol id="curve">
                    <Path d="M184,19.5307225 C184,19.5307225 144.989249,70.5307225 90.9946238,19.5307225 C36.9999987,-31.4692775 0,33.5307225 0,33.5307225"
                      stroke="#FF5165"
                      strokeWidth="1"
                      fill="none"
                      scaleY={scaleY}
                      scaleX={scaleX}
                      y={(height-46)/2}
                      />
                  </Symbol>
                  <Use href="#curve" x={0} />
                  <Use href="#curve" x={width/2} />
              </Svg>
          </View>
        );
    }
}
