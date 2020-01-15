import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import logo from '../../assets/logo.png'
import './index.less'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class BisicLayout extends Component{
 
    state = {
      collapsed: false,
      isDisplay:true
    };
  
    onCollapse = collapsed => {
      
      const { isDisplay } = this.state;
      this.setState({ 
      collapsed,
      isDisplay:!isDisplay
      
    });
    };

  render() {
    const { isDisplay,collapsed } =this.state
    const  { children } = this.props;

    return (
      
      
      <Layout style={{ minHeight: '100vh' }}>
        
        <Sider collapsible
         collapsed={collapsed}
         onCollapse={this.onCollapse}>

          <div className="layout-logo" >
            <img src={logo} alt="logo"/>
            <h1 style = {{display:isDisplay?'block':'none'}}>硅谷后台</h1>
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="home" />
              <span>首页</span>
            </Menu.Item>
          
            <SubMenu
              key="2"
              title={
                <span>
                  <Icon type="appstore" />
                  <span>商品</span>
                </span>
              }>
               <Menu.Item key="3">
                <Icon type="bars" />
                <span>分类管理</span>
               </Menu.Item>
               <Menu.Item key="4">
                <Icon type="tool" />
                <span>商品管理</span>
               </Menu.Item>
            </SubMenu>
            <Menu.Item key="5">
              <Icon type="user" />
              <span>用户管理</span>
            </Menu.Item>
            <Menu.Item key="6">
              <Icon type="safety-certificate" />
              <span>用户管理</span>
            </Menu.Item>

            <SubMenu
              key="7"
              title={
                <span>
                  <Icon type="area-chart" />
                  <span>图形图表</span>
                </span>
              }>
               <Menu.Item key="8">
                <Icon type="bar-chart" />
                <span>柱状图形</span>
               </Menu.Item>
               <Menu.Item key="9">
                <Icon type="line-chart" />
                <span>线状图形</span>
               </Menu.Item>
               <Menu.Item key="10">
                <Icon type="pie-chart" />
                <span>饼状图形</span>
               </Menu.Item>
            </SubMenu>
            
            
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
  <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{children}</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}