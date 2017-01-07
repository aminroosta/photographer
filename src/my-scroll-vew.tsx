
import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, PanResponder, Easing, ScrollView} from 'react-native';
import ImgCircle from "./img-circle";
import Curves from "./curves";

const sources = [
    { source: null, title: null },
    { source: null, title: null },
    { source: require('../assets/images/topics/1.jpg'), title: 'عکاسی چیست' },
    { source: require('../assets/images/topics/2.jpg'), title: 'نکات ابتدایی عکاسی دیجیتال'},
    { source: require('../assets/images/topics/3.jpg'), title: 'شناخت انواع دوربین ها' },
    { source: require('../assets/images/topics/4.jpg'), title: 'شناخت انواع لنز ها' },
    { source: require('../assets/images/topics/5.jpg'), title: 'شناخت انواع تجهیزات'},
    { source: require('../assets/images/topics/6.jpg'), title: 'کار با دوربین' },
    { source: require('../assets/images/topics/7.jpg'), title: 'کنترل نوردهی'},
    { source: require('../assets/images/topics/8.jpg'), title: 'کنترل عمق میدان'},
    { source: require('../assets/images/topics/9.jpg'), title: 'ترکیب بندی'},
    { source: require('../assets/images/topics/10.jpg'), title: 'last item'},
    { source: null, title: null },
    { source: null, title: null },
]

interface Topic {
    scale: Animated.Value;
    dx_center: Animated.Value;
    left: Animated.AnimatedInterpolation;
    top: Animated.AnimatedInterpolation;
    elevation: Animated.AnimatedInterpolation;
    source: any;
    title: string;
}

const constructTopics = (height: number, width: number, r: number) : Topic[] => {
    const topics = sources.map((s,i) => {
        const scale = new Animated.Value(0);
        const dx_center = new Animated.Value(0);
        const left = dx_center.interpolate({
            inputRange: [-1, -.7, -.4, 0, .4, .7,  1],
            outputRange: [0, 0, -r/3, 0, +r/3, 0, 0],
            easing: Easing.linear
        });
        const top_input = [-1, -.9, -.8, -.7, -.6, -.5, -.4, -.3, -.2, -.1, 0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1];
        const top = dx_center.interpolate({
            inputRange:  top_input,
            outputRange: top_input.map(i => -r*.7*Math.cos(1.6*(i-.3)*Math.PI) -r*.1),
            easing: Easing.linear
        });
        const elevation = scale.interpolate({
            inputRange: [.4, 1],
            outputRange: [0, 15],
            easing: Easing.linear
        });
        return {...s, scale, dx_center, left, top, elevation};
    });
    return topics;
}

interface Props {
    height: number,
    width: number
}

export default class Topics extends Component<Props, {}> {
    topics: Topic[] = null;
    
    get r() {
        return (this.props.height-1)*.25 | 0;
    }
    
    componentWillMount() {
        this.topics = constructTopics(this.props.height, this.props.width, this.r);
        this.updateScales(0);
    }
    render() {
        const {height : h, width: w} = this.props;
        return (
            <View style={{height: h, width: w}}>
                <Curves style={{
                        position: 'absolute',
                        top: h*.25,
                    }}
                    width={w} height={h*.4}
                    count={3} marginLeft={1/2}
                    countRight={1} countLeft={0}/>
                <ScrollView
                    horizontal={true}
                    onScroll={e => this.onScroll(e)}
                    automaticallyAdjustContentInsets={false}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={15}
                    style={{
                        position: 'absolute',
                        height: h,
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
        let r =  this.r;
        r -= this.r/5;
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
        return this.topics.map((t,inx) => <ImgCircle
            style={{ 
                transform: [{scale: t.scale}],
                marginHorizontal: -this.r/5,
                position: 'relative',
                left: t.left,
                top: t.top,
                shadowColor: "#000000",
                shadowOpacity: t.source ? t.scale.interpolate({
                    inputRange: [.4, 1],
                    outputRange: [0, .35]
                }) : 0,
                shadowRadius: this.r/4,
                shadowOffset: { height: this.r/4, width: 0 },
                marginTop: this.r/2
            }}
            key={inx}
            title={t.title}
            source={t.source}
            radius={this.r} />);
    }
}