declare module 'react-native-svg' {
  interface SvgProps {
      width?: string | number,
      height?: string | number,
      fill?: string,
      fillOpacity?: number | string,
      stroke?: string,
      strokeOpacity?: number | string,
      strokeWidth?: string | number,
      strokeDasharray?: [number],
      strokeDashoffset?: number | string,
      x?: number | string,
      y?: number | string,
      rotate?: number | string,
      scale?: number | string,
      scaleX?: number | string,
      scaleY?: number | string,
      originX?: string | number,
      originY?: string | number,
      origin?: string,
      cx?: string | number,
      cy?: string | number,
      r?:string | number,
      id?: string,
      d?: string,
      x1?: string | number,
      x2?: string | number,
      y1?: string | number,
      y2?: string | number,
      href?: string,
      style?: React.ViewStyle
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

  export class Stop extends React.Component<{
    offset?: string | number,
    stopColor: string,
    stopOpacity?: string | number
  }, any>  { }

}

declare module 'Dimensions' {
    export default class Dimensions {
      width: number;
      height: number;
      static get: (key:string) => Dimensions;
    }
}
