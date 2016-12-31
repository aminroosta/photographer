import React, { Component } from 'react';
import {observable} from "mobx";
import {observer} from "mobx-react/native";
import ImgCircle from "./img-circle";
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

interface Props { }
interface State { }
export default class App extends Component<Props, State> {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    Welcome to React Native!
                </Text>
                <ImgCircle width={160} height={160} />
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
