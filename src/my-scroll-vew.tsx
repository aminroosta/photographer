
import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, PanResponder, Easing, ScrollView} from 'react-native';
import ImgCircle from "./img-circle";
import Curves from "./curves";

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
    { source: null, title: null },
    { source: null, title: null },
]

interface Topic {
    scale: Animated.Value;
    dx_center: Animated.Value;
    left: Animated.AnimatedInterpolation;
    top: Animated.AnimatedInterpolation;
    source: any;
    title: string;
}

const constructTopics = (height: number, width: number) : Topic[] => {
    const r = (height-1)/2 | 0;
    const topics = sources.map((s,i) => {
        const scale = new Animated.Value(0);
        const dx_center = new Animated.Value(0);
        const left = dx_center.interpolate({
            inputRange: [-1, -.7, -.2, 0, .2, .7,  1],
            outputRange: [0, 0, -r/4, 0, +r/4, 0, 0],
            easing: Easing.linear
        });
        const top = dx_center.interpolate({
            inputRange: [-1, -.85, -.65, -.3, .3, .65, .85, 1],
            outputRange: [-r/2, -r/3, r/5, r/3, -r/3, -r/5, r/3, r/2],
            easing: Easing.linear
        });
        return {...s, scale, dx_center, left, top};
    });
    return topics;
}

interface Props {
    height: number,
    width: number
}

export default class Topics extends Component<Props, {}> {
    topics: Topic[] = null;
    
    componentWillMount() {
        this.topics = constructTopics(this.props.height, this.props.width);
        this.updateScales(0);
    }
    render() {
        const {height : h, width: w} = this.props;
        const r = (h-1)/2 | 0;
        return (
            <View style={{height: h, width: w}}>
                <Curves style={{
                        position: 'absolute',
                        top: h/4
                    }}
                    width={w} height={h/2}
                    count={3} marginLeft={1/2}
                    countRight={1} countLeft={0}/>
                <ScrollView
                    horizontal={true}
                    onScroll={e => this.onScroll(e)}
                    automaticallyAdjustContentInsets={false}
                    showsHorizontalScrollIndicator={false}
                    style={{
                        position: 'absolute',
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
        let r =  (this.props.height-1)/2 | 0;
        r -= 10;
        const W = this.props.width;
        const center = W/2 + x;


        this.topics.forEach((t,i) => {
            const p = i*r*2 + r;
            const dist = p - center;
            if(Math.abs(dist) > W/3)
                t.scale.setValue(.4);
            else  {
                const scale = 1 - (Math.abs(dist)/(W/3))*.6;
                t.scale.setValue(scale);
            }
            const dx_center = dist < -W/2 ? -1 : dist > W/2 ? +1 : dist/(W/2);
            t.dx_center.setValue(dx_center);
        });
    }
    
    renderCircles() {
        const r = (this.props.height-1)/2 | 0;
        return this.topics.map((t,inx) => <ImgCircle
            style={{ 
                transform: [{scale: t.scale}],
                marginHorizontal: -10,
                position: 'relative',
                left: t.left,
                top: t.top
            }}
            key={inx}
            source={t.source}
            radius={r} />);
    }
}