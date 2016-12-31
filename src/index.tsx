import React, { Component } from 'react';
import {observable} from "mobx";
import {observer} from "mobx-react/native";
import {
    StyleSheet,
    Text,
    Button,
    View
} from 'react-native';

interface Props { }

interface State { }

export default class App extends Component<Props, State> {
    state = {
      message: 'Hello'
    };
    add = () => {
      this.state.message += '!';
      this.setState(this.state);
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    {this.state.message} Welcome to React Native!
                </Text>
                <Button title="me" onPress={this.add}></Button>
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
