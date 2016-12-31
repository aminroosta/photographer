declare module 'react-native-svg' {
  interface SvgProps {
      width?: string | number,
      height?: string | number,
      fill?: string,
      fillOpacity?: number | string,
      stroke?: string,
      strokeOpacity?: number | string,
      strokeWidth?: string,
      strokeDasharray?: [number],
      strokeDashoffset?: number | string,
      x?: number | string,
      y?: number | string,
      rotate?: number | string,
      scale?: number | string,
      originX?: string | number,
      originY?: string | number,
      origin?: string,
      cx?: string | number,
      cy?: string | number,
      r?:string | number,
  }
  export default class Svg extends React.Component<SvgProps, any>  { }
  export class Circle extends React.Component<SvgProps, any>  { }
  export class Ellipse extends React.Component<SvgProps, any>  { }
  export class G extends React.Component<SvgProps, any>  { }
  export class LinearGradient extends React.Component<SvgProps, any>  { }
  export class RadialGradient extends React.Component<SvgProps, any>  { }
  export class Line extends React.Component<SvgProps, any>  { }
  export class Path extends React.Component<SvgProps, any>  { }
  export class Polygon extends React.Component<SvgProps, any>  { }
  export class Polyline extends React.Component<SvgProps, any>  { }
  export class Rect extends React.Component<SvgProps, any>  { }
  export class Symbol extends React.Component<SvgProps, any>  { }
  export class Text extends React.Component<SvgProps, any>  { }
  export class Use extends React.Component<SvgProps, any>  { }
  export class Defs extends React.Component<SvgProps, any>  { }
  export class Stop extends React.Component<SvgProps, any>  { }
}
