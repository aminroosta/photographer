import React, { Component } from "react";
import { Text, View } from "react-native";
import { Shaders, Node, GLSL } from "gl-react";
import { Surface, resolveAssetSource } from "gl-react-native";

const shaders = Shaders.create({
  DiamondCrop: {
    frag: `
        precision highp float;
        varying vec2 uv;
        uniform sampler2D t;
        void main() {
            float dist = (uv.x - .5)*(uv.x - .5) + (uv.y - .5)*(uv.y - .5);
            gl_FragColor = dist < .25 ? texture2D(t, uv) : vec4(0);
        }`
    },
});

const img = require('../assets/images/topics/1.png')

export default class Example extends Component<{},{}> {
  render() {
    const rimg = resolveAssetSource(img);
    return (
      <Surface width={300} height={300}>
        <Node uniforms={{ t: rimg }} shader={shaders.DiamondCrop} />
      </Surface>
    );
  }
}