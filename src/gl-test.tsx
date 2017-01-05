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
            gl_FragColor = texture2D(t, uv);
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