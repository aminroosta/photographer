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
  radius: number,
  stroke?: string,
  hideInnerCircle?: boolean
}
export default class ImgCircle extends Component<Props, {}> {
    render() {
        const radius = this.props.radius || 50;
        const radius2 = Math.min(radius*0.87, radius - 5);
        const stroke = this.props.stroke || "#FF5D61";
        return (
          <View
          style={{
            width: radius*2,
            height: radius*2,
          }}
          >
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
                marginTop: -2*radius*0.9,
                marginLeft: 2*radius*0.1,
                width: 2*radius*0.8,
                height: 2*radius*0.8,
                borderRadius: radius*0.8,
                overflow: 'visible'
              }}
              source={require('../assets/images/topics/1.jpg')} >

              </Image>
          </View>
        );
    }
}
