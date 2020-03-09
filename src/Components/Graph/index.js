import React,{ Component } from 'react';
import { Stage, Layer, Rect, Ellipse } from 'react-konva';
import './style.less';

class Graph extends Component{
  render(){
    return<div className="graph-wrap">
      <Stage width = { 400 } height = { 400 } >
        <Layer>
          <Ellipse
             x={200}
             y={316}
             radius={
              this.props.liveSize
             }
            fill="#FFFFFF"
           />
          <Rect
            x={200-this.props.liveSize.x}
            y={84}
            width={2*this.props.liveSize.x}
            height={232}
            fill="#FFFFFF"
          />
          <Ellipse
             x={200}
             y={84}
            radius={
              this.props.liveSize
            }
            fill="#CBC8C3"
            strokeWidth = {1}
          />
          <Ellipse
             x={200}
             y={84}
            radius={
              {
                x:40,
                y:20
              }
            }
            fill="#7F7E83"
           
          /> 
        </Layer>
      </Stage>
    </div>
  }
}
export default Graph;