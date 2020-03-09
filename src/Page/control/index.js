import React,{ Component } from 'react';
import axios from '../../axios';
import Graph from '../../Components/Graph';
import { Row,Col,Select } from 'antd';
import { LableTitle,LableContent } from './style';
import Utils from '../../utils/utils';
import './style.less';
export default class Control extends Component{
  constructor(props){
    super(props);
    this.state = {
      da:null,
      surplus:null,
      dataTime:null,
      status:null,
      intensity:null,
      distance:null,
      size:{
        x:160,
        y:80
      },
      interval:null
    }
  }
  selectChange = (value)=>{
    clearInterval(this.state.interval);
    this.request(value);
    var timer = setInterval(()=>{
      this.request(value);
    },1000);
    this.setState({
      interval:timer
    })
  }
  request = (value)=>{
    let number = value;
    axios.axios({
      url:'/getDevicedata',
      data:{
        params:{
          sn:number
        },
      }
    }).then((res)=>{ 
          this.setState({
          surplus: this.judege(res.amplitudes),
          dataTime: Utils.formateDate(res.time_stamp),
          status: ((new Date().getTime() - res.time_stamp)<120*1000 ? '在线':'离线'),
          intensity:res.amplitudes,
          distance:res.distances,
          size:{
            x:2*Math.sqrt(60*this.judege(res.amplitudes)+400),
            y:Math.sqrt(60*this.judege(res.amplitudes)+400)
          }
        })
    })
  }
  judege(value){
    if(value > 15600){
      return 0
    }
    else if(value < 5600){
      return 100
    }
    else{
      return (15600-value)/100
    }
  }
  render(){
    const Option = Select.Option;
    return<div className="home-wrap1">
      <Row className="content1">
            <Col span={12} className="firstCol">
              <Row className="numberRow">
                <Col span={12} >
                  <LableTitle className="number">卷纸器编号:</LableTitle>
                </Col>
                <Col span={12} >
                  <Select className="numberSelect" size="large" placeholder="选择卷纸器编号" onChange={this.selectChange}>
                    <Option value="1">卷纸器1</Option>
                    <Option value="2">卷纸器2</Option>
                    <Option value="3">卷纸器3</Option>
                  </Select>
                </Col>
              </Row>
              <Row className="dataTimeRow">
                <Col span={12} >
                  <LableTitle className="dataTime">时 间 :</LableTitle>
                </Col>
                <Col span={12} >
                  <LableContent className="dataTimeText">{this.state.dataTime}</LableContent>
                </Col>
              </Row>
              <Row className="intensityRow">
                <Col span={12} >
                  <LableTitle className="intensity">信号强度:</LableTitle>
                </Col>
                <Col span={12} >
                  <LableContent className="intensityText">{this.state.intensity}</LableContent>
                </Col>
              </Row>
              <Row className="statusRow">
                <Col span={12} >
                  <LableTitle className="status">机器状态:</LableTitle>
                </Col>
                <Col span={12} >
                  <LableContent className="statusText">{this.state.status}</LableContent>
                </Col>
              </Row>
              <Row className="distanceRow">
                <Col span={12} >
                  <LableTitle className="distance">距 离:</LableTitle>
                </Col>
                <Col span={12} >
                  <LableContent className="distanceText">{this.state.distance}</LableContent>
                </Col>
              </Row>
            </Col>
            <Col span={12} className="secondCol">
              <Row className="surplusRow">
                <Col span={12} >
                  <LableTitle className="surplus">剩 余 量 :</LableTitle>
                </Col>
                <Col span={12} >
                  <LableContent className="surplusText">
                    {this.state.surplus}
                    <span className="percent">%</span>
                  </LableContent>
                </Col>
              </Row>
              <Row>
                <Graph liveSize={ this.state.size } ></Graph>
              </Row>
            </Col>
      </Row>      
    </div>
  }
}