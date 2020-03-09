import React,{ Component } from 'react';
import menuConfig from './../../config/menuConfig';
import { Menu, Icon } from 'antd';
import './style.less'
import { NavLink } from 'react-router-dom';

const SubMenu = Menu.SubMenu;

class NavLeft extends Component{
  componentWillMount(){
    const menuTreeNode = this.renderMenu(menuConfig);
    this.setState({
      menuTreeNode
    })
  }
  renderMenu = (data)=>{
    return data.map((item)=>{
      if(item.children){
        return (
          <SubMenu title={item.title} key={ item.key }>
            { this.renderMenu(item.children) }
          </SubMenu>
        )
      }
    return <Menu.Item title={item.title} key={ item.key } ><NavLink replace to={item.key}><Icon type={item.type}></Icon>{item.title}</NavLink></Menu.Item>
    })
  }
  render(){
    return<div>
      <div className="logo">
        <img src="/assets/logo-ant.svg" alt=""/>
        <h1>I O T</h1>
      </div>
      <Menu theme="dark">
        { this.state.menuTreeNode }
      </Menu>  
    </div>
  }
}

export default NavLeft;