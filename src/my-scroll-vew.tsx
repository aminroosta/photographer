
import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, PanResponder, Easing, ScrollView} from 'react-native';
import ImgCircle from "./img-circle";

const sources = [
    { source: null, title: null },
    { source: null, title: null },
    { source: require('../assets/images/topics/1.jpg'), title: 'title 1' },
    { source: require('../assets/images/topics/2.jpg'), title: 'title 2'},
    { source: require('../assets/images/topics/3.jpg'), title: 'long title 3' },
    { source: require('../assets/images/topics/4.jpg'), title: 'good tiles 4' },
    { source: require('../assets/images/topics/5.jpg'), title: 'very long verbose title 5'},
    { source: require('../assets/images/topics/6.jpg'), title: 'yet another title 6' },
    { source: require('../assets/images/topics/7.jpg'), title: 'last title 7'},
    { source: require('../assets/images/topics/8.jpg'), title: 'last title 8'},
    { source: require('../assets/images/topics/9.jpg'), title: 'last title 9'},
]

const topics = sources.map((s,i) => {
    return {...s, scale: new Animated.Value(1)}
});

interface Props {
    height: number,
    width: number
}

export default class Topics extends Component<Props, {}> {
    
    componentWillMount() {
        this.updateScales(0);
    }
    render() {
        const {height : h, width: w} = this.props;
        const r = (h-1)/2 | 0;
        return (
            <View style={{height: h, width: w}}>
                <ScrollView
                horizontal={true}
                onScroll={e => this.onScroll(e)}
                automaticallyAdjustContentInsets={false}
                style={{
                    flex: 1,
                    borderWidth: 1,
                    backgroundColor: 'lightblue'
                }}>
                {this.renderCircles()}
                </ScrollView>
            </View>
        );
    }
    
    onScroll(e: React.NativeSyntheticEvent<React.NativeScrollEvent>) {
        const x = e.nativeEvent.contentOffset.x;
        this.updateScales(x);
    }

    updateScales(x: number) {
        const r = (this.props.height-1)/2 | 0;
        const W = this.props.width;
        const center = W/2 + x;

        topics.forEach((t,i) => {
            const p = i*r*2 + r;
            const dist = Math.abs(p - center);
            if(dist > W/2)
                t.scale.setValue(.4);
            else  {
                const scale = 1 - (dist/(W/2))*.6;
                t.scale.setValue(scale);
            }
        });
    }
    
    renderCircles() {
        const r = (this.props.height-1)/2 | 0;
        return topics.map((t,inx) => <ImgCircle
            style={{ 
                transform: [{scale: t.scale}],
            }}
            key={inx}
            source={t.source}
            radius={r} />);
    }
}