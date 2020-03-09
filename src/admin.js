import React,{ Component } from 'react';
import { Row,Col } from 'antd';
import Header from './Components/Header';
import Footer from './Components/Footer';
import NavLeft from './Components/NavLeft';
import './style/common.less';

class admin extends Component{
  render(){
    return<div>
      <Row className="container">
        <Col span={3} className="left">
          <NavLeft/>
        </Col>
        <Col span={21} className="main">
          <Header/>
          <Row className="content">
            {this.props.children}
          </Row>
          <Footer/>
        </Col>
      </Row>
    </div>
  }
}

export default admin;