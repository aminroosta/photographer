import React, { Component } from 'react';
import {
    StyleSheet,
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
  stroke?: string
}
export default class ImgCircle extends Component<Props, {}> {
    render() {
        const radius = this.props.radius || 50;
        const stroke = this.props.stroke || "#FF5D61";
        return (
          <View style={ { width:radius*2, height:radius*2 } } >
            <Svg width={radius*2} height={radius*2}>
                  <Circle
                    cx={radius}
                    cy={radius}
                    originX={radius}
                    originY={radius}
                    r={radius-1}
                    rotate={5}
                    stroke={stroke}
                    strokeDasharray={[1,2,7,4]}
                    strokeWidth="2"
                    fill="none"/>
            </Svg>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    } as React.ViewStyle,

    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    } as React.TextStyle,
});
