import React, { Component } from "react";
import { Button, Icon, Modal } from "antd";
import screenfull from "screenfull";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./index.less";
import { injectIntl,FormattedMessage } from "react-intl";
import { removeItem } from "../../../utils/storage";
import { removeUser, changeLanguage } from "../../../../src/redux/actions";
// import {removeItem} from '$utils/storage'
import menus from "../../../config/menus.js";

const { confirm } = Modal;
@injectIntl
@connect(
  state => ({
    username: state.user.user && state.user.user.username,
    language: state.language
  }),
  {
    removeUser,
    changeLanguage
  }
)
@withRouter
class HeaderMain extends Component {
  state = {
    isScreenfull: false
  };

  componentDidMount() {
    screenfull.on("change", this.headleScreenFullChange);
  }

  headleScreenFullChange = () => {
    this.setState({
      isScreenfull: !this.state.isScreenfull
    });
  };

  componentWillUnmount() {
    screenfull.off("change", this.headleScreenFullChange);
  }

  screenFull = () => {
    // this.setState({

    //   isScreenfull:!this.state.isScreenfull
    // })
    screenfull.toggle();
  };

  logout = () => {
    const { intl } = this.props;
    confirm({
      title: intl.formatMessage({ id: "logout" }),
      // content: 'Some descriptions',
      onOk: () => {
        //清空用户数据
        removeItem("user");
        //redux
        this.props.removeUser();
        //跳转到login页面
        this.props.history.replace("/login");
      },
      onCancel: () => {}
    });
  };

  changeLanguage = () => {
    const language = this.props.language === "en" ? "zh-CN" : "en";
    this.props.changeLanguage(language);
  };

  findTitle = (menus, pathname) => {
    for (let index = 0; index < menus.length; index++) {
      const menu = menus[index];

      if (menu.children) {
        for (let index = 0; index < menu.length; index++){
          const cMenu = menu.children[index];
          if(cMenu.path === pathname){
            return cMenu.title;
          }
        }
      } else {
        if (menu.path === pathname) {
          return menu.title;
        }
      }
    }
  };

  render() {
    const { isScreenfull } = this.state;
    const {
      username,
      language,
      location: { pathname }
    } = this.props;
    // console.log(this.props);

    const title  = this.findTitle(menus,pathname)
    return (
      <div className="header-main">
        <div className="header-main-top">
          <Button size="small" onClick={this.screenFull}>
            <Icon type={isScreenfull ? "fullscreen-exit" : "fullscreen"} />
          </Button>
          <Button
            size="small"
            className="header-main-lang"
            onClick={this.changeLanguage}
          >
            {language === "en" ? "中文" : "English"}
          </Button>
          <span>hello,{`${username}#`} </span>
          <Button type="link " size="small" onClick={this.logout}>
            {" "}
            退出{" "}
          </Button>
        </div>
        <div className="header-main-bottom">
          <span className="header-main-left">
            <FormattedMessage id ={title}/>
          </span>
          <span className="header-main-right">2020/01/14 15:58:00</span>
        </div>
      </div>
    );
  }
}
export default HeaderMain;
