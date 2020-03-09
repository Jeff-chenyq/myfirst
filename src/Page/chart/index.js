import React,{ Component } from 'react';
import { Card } from 'antd';
import echarts from 'echarts/lib/echarts';
import echartTheme from './echartTheme';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';
export default class Chart extends Component{
  state = {
    xlist:[],
    ylist:[],
    x1list:[],
    y1list:[],
    count:0
  }
  componentDidMount(){
    setInterval(()=>{
      this.requestData()
    },2000)
  }
  requestData = ()=>{
    
  }
  componentWillMount(){
    echarts.registerTheme('juanzhi',echartTheme);
  }
  getOption = ()=>{
    let option = {
      title:{
        left: 'right',
        text:'卷纸剩余量'
      },
      legend:{
        data:['卷纸器1','卷纸器2']
      },
      tooltip:{
        trigger:'axis'
      },
      xAxis:{
        type: 'category',
        boundaryGap: false,
        data:['1','2','3','4']
      },
      yAxis:{
        type:'value'
      },
      series:[
        {
          name:'卷纸器1',
          type:'line',
          data:[1,2,3,4],
          smooth: true
        },
        {
          name:'卷纸器2',
          type:'line',
          data:[2,1,4,5],
          smooth: true
        }
      ]
    }
    return option;
  }
  render(){
    return<div >
     <Card title="剩余量显示" >
        <ReactEcharts option={this.getOption()} theme="juanzhi" style={{height:500}}/>
     </Card>
    </div>
  }
}