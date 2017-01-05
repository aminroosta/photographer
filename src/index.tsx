import React, { Component } from 'react';
import {observable, action} from "mobx";
import {observer} from "mobx-react/native";
import ImgCircle from "./img-circle";
import Curves from "./curves";
import Dimensions from 'Dimensions';
import Topics from "./topics";
import TestPanResponder from './test-pan-responder';
import MyScrollView from './my-scroll-vew';
import GlTest from './gl-test';
import {
    StyleSheet,
    Text,
    Button,
    View,
} from 'react-native';

class AppState { }

@observer
export default class App extends Component<{}, AppState> {
    state = new AppState();
    render() {
        const model = this.state;
        const {height: deviceHeight, width: deviceWidth} = Dimensions.get('window');
        return (
            <View style={styles.container}>
                <View style={{flex: 1}} />
                <MyScrollView height={deviceHeight/6} width={deviceWidth}/>
                <Text style={styles.text}>
                    Welcome to React Native!
                </Text>
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
        flex: 1,
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    } as React.TextStyle,
});
