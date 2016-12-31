import React, { Component } from 'react';
import {observable, action} from "mobx";
import {observer} from "mobx-react/native";
import ImgCircle from "./img-circle";
import {
    StyleSheet,
    Text,
    Button,
    View
} from 'react-native';

class AppState {
  @observable radius = 80;
  smaller = () => {
    this.radius = this.radius - 5;
  }
}
@observer
export default class App extends Component<{}, AppState> {
    state = new AppState();
    render() {
        const model = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    Welcome to React Native!
                </Text>
                <ImgCircle radius={model.radius} />
                <Button title='smaller' onPress={model.smaller} />
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
