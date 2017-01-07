import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
    Animated,
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
    Use,
    Defs,
    Stop
} from 'react-native-svg';

interface Props {
  title: string,
  radius: number,
  source?: any,
  stroke?: string,
  hideInnerCircle?: boolean,
  style?: any
}
export default class ImgCircle extends Component<Props, {}> {
    render() {
        const source = this.props.source;
        const radius = this.props.radius || 50;
        const radius2 = Math.min(radius*0.87, radius - 5);
        const stroke = this.props.stroke || "#FF5D61";
        return (
          <Animated.View
            style={{
              backgroundColor: 'transparent',
              borderRadius: radius,
              ...this.props.style,
            }}>
            <View style={{
              position: 'relative',
              backgroundColor: 'transparent',
              width: radius*2,
              height: radius*2,
              }}>
              <Svg width={radius*2} height={radius*2}>
                    <Circle
                      cx={radius}
                      cy={radius}
                      originX={radius}
                      originY={radius}
                      r={radius-1}
                      rotate={8}
                      stroke={stroke}
                      strokeWidth={2}
                      strokeDasharray={[1,2,7,4]}
                      fill="none"/>
                      { this.props.hideInnerCircle ? null :
                        <Circle
                          cx={radius}
                          cy={radius}
                          originX={radius}
                          originY={radius}
                          r={radius2}
                          strokeOpacity={0.45}
                          stroke={stroke}
                          strokeWidth={2}
                          strokeDasharray={[1,2,7,4]}
                          fill="none"/>
                      }
              </Svg>
              <Image
                style={{
                  position: 'relative',
                  top: -2*radius*0.9,
                  left: 2*radius*0.1,
                  borderRadius: radius*0.8,
                  overflow: 'hidden',
                  width: 2*radius*0.8,
                  height: 2*radius*0.8,
                }}
                source={source} />

            </View>
            <Text
              style={{
                position: 'absolute',
                fontSize: 11,
                color: 'black',
                textAlign: 'center',
                top: radius*2,
                width: 2*radius,
                fontFamily: 'iransans'
              }}
            >{this.props.title}</Text>

          </Animated.View>
        );
    }
}
