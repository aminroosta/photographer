import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

interface Props {
  width: number,
  height: number,
}
export default class ImgCircle extends Component<Props, {}> {
    render() {
        return (
            <View style={{
              width: this.props.width,
              height: this.props.height,
              borderWidth: 1,
              borderColor: 'blue'
            }}>
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
