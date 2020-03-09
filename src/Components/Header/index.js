import React,{ Component } from 'react';
import moment from 'moment';
import { Row,Col } from 'antd';
import { withRouter } from 'react-router-dom';
import './style.less';



class Header extends Component{
  state = {
    pathName:'首页'
  }
  componentWillMount(){
    this.setState({
        username:"admin"
    })
    setInterval(()=>{
      let time = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
      this.setState({
        time
      })
    },1000)
  }
  componentWillReceiveProps(nextProps){
    this.getPathName(nextProps.location.pathname);
  }
  getPathName(value){
    let s = ''
    switch(value){
      case '/home': s= '首页' ; break;
      case '/control': s= '管理' ; break;
      case '/chart': s= '波形图' ; break;
      default: s = '历史记录'
    }
    this.setState({
      pathName:s
    })
  }

  render(){
    return<div className="header">
      <Row className="header-top">
        <Col>
          <span>欢迎{ this.state.username }</span>
          <a href="#">退出</a>
        </Col>
      </Row>
      <Row className="breadcrumb">
        <Col span={4} className="breadcrumb-title">
          { this.state.pathName }
        </Col>
        <Col span={20} className="weather">
          <span className="date">{ this.state.time }</span>
          <span className="weather-address">{ this.state.weatherAddress }</span>
          <span className="weather-img">
            <img src={this.state.weatherPic} alt=""/>
          </span>
          <span className="weather-deatail">{ this.state.weather }</span>
        </Col>
      </Row>
    </div>
  }
}

export default withRouter(Header);