import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";
import menus from "$conf/menus";
import { FormattedMessage } from 'react-intl'

const { SubMenu, Item } = Menu;

@withRouter
class LeftNav extends Component {
  createMenus = menus => {
    return menus.map(menu => {
      if (menu.children) {
        return (
          <SubMenu
            key={menu.path}
            title={
              <span>
                <Icon type={menu.icon} />
                <FormattedMessage id ={menu.title}/>
                
              </span>
            }
          >
            {menu.children.map(cMenu => {
              return this.createMenuItem(cMenu);
            })}
          </SubMenu>
        );
      } else {
        return this.createMenuItem(menu);
      }
    });
  };

  createMenuItem = menu => {
    return (
      <Item key={menu.path}>
        <Link to={menu.path}>
          <Icon type={menu.icon} />
          <FormattedMessage id ={menu.title}/>
        </Link>
      </Item>
    );
  };

  findOpenKeys = (pathname, menus) => {
    const menu = menus.find(menu => {
      if (menu.children) {
        return menu.children.find(cMenu => cMenu.path === pathname);
      }
    });
    if (menu) {
      return menu.path;
    }
  };

  render() {
    const { pathname } = this.props.location;
    const openKey = this.findOpenKeys(pathname, menus);
    // console.log(pathname);
    // let open = '';

    // if(pathname === '/charts/pie' || '/charts/line'|| '/charts/bar'){
    //   open = '/products'
    // }
    // if(pathname === '/category' || '/product'){
    //   open = '/charts'
    // }  open 只会第一次选中生效

    return (
      <Menu
        theme="dark"
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={[openKey]}
        mode="inline"
      >
        {this.createMenus(menus)}
      </Menu>
    );
  }
}
export default LeftNav;
