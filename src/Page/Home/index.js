import React,{ Component } from 'react';
import { Popover } from 'antd';
import { Link } from 'react-router-dom';
import axios from '../../axios';
import './style.less';
export default class Home extends Component{
  state = {
    surplus:''    
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
            surplus:this.judege(res.amplitudes)
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
    return<div className="bg">
      <img src="/assets/newmap.jpg" alt="" className="maPic"/>
      <Popover
        content={<div>
          <div>
            剩余量:{this.state.surplus} %
          </div>
          <Link to={'/control'}>详情搜索</Link>
        </div>}
        placement="rightTop"
        title="卷纸器1"
        trigger="click"
      >
        <div className="deviceOne" onClick={()=>{this.request(1)}}>
          <img src="/assets/juanzhi.png" alt=""/>
        </div>
      </Popover>
      <Popover
        content={<div>
          <div>
            剩余量:{this.state.surplus} %
          </div>
          <Link to={'/control'}>详情搜索</Link>
        </div>}
        placement="rightTop"
        title="卷纸器2"
        trigger="click"
      >
        <div className="deviceTwo" onClick={()=>{this.request(2)}}>
          <img src="/assets/juanzhi.png" alt=""/>
        </div>
      </Popover>
      <Popover
        content={<div>
          <div>
            剩余量:{this.state.surplus} %
          </div>
          <Link to={'/control'}>详情搜索</Link>
        </div>}
        placement="rightTop"
        title="卷纸器3"
        trigger="click"
      >
        <div className="deviceThree" onClick={()=>{this.request(3)}}>
          <img src="/assets/juanzhi.png" alt=""/>
        </div>
      </Popover>

    </div>
  }
}
