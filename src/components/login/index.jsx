import React, { Component } from 'react'
// import axios from 'axios'

import { reqLogin } from '../../api'
import logo from './logo.png'
import { Form, Icon, Input, Button, message } from 'antd';
import './index.less'

@Form.create()
class Login extends Component {
  //自定义表单校验规则
  validator = (rule,value,callback) =>{
    const reg = /^\w+$/ 

    if(!value) {
       callback('密码不能为空');
    }else if(value.length > 15){
      callback('密码长度不得长于15位')
    }else if(value.length < 4){
      callback('密码长度不得少于4位')
    }else if(!reg.test(value)){
      callback('密码只能包含字母、数字、下划线')
    }  
    
    
    callback ();
  }
  login = e =>{
    e. preventDefault();
    this.props.form.validateFields((err,values) =>{
      if(!err){
        const { username,password } = values
        /*axios.post('/api/login',{username,password})
        .then ((response) =>{
          console.log(response);
          //判断登录成功
          if(response.data.status === 0) {

            this.props.history.replace('/')
          }else {
            message.error(response.data.msg)
            //清空
            this.props.form.resetFields(['password'])
          }
          
        }) 
        .catch(err => {
          console.log(err);
          message.error('网络异常')
          this.props.form.resetFields(['password'])
        })*/

        reqLogin(username,password)
        .then((response) => {
          console.log(response);
          

          this.props.history.replace ('/')

        })
        .catch(msg => {
          message.error (msg);
          this.props.form.resetFields(['password'])
        })
      }
    })
  }
  render() {

    const { getFieldDecorator } = this.props.form;
    return (   
      <div className = 'login'>
        <header className = 'login-head'>
          <img src={logo} alt="logo"/> 
          <h1>React项目： 后台管理系统</h1>
        </header>
        <section className ='login-section'>
          <h3>用户登录</h3>
          <Form className = 'login-form' onSubmit = {this.login}>
            <Form.Item>
                {getFieldDecorator('username', {
                rules: [{ required: true, message: '用户名不能为空' 
                },{
                  min:3,
                  message:'长度不得少于3位'
                },{
                  max:15,
                  message:'长度不得多于15位'
                },
                {
                  pattern:/^\w+$/,
                  message:'只能包含字母、数字、下划线'

                }
              ],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                  />,
               )}
            </Form.Item>
            <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                  {
                    validator:this.validator
                  }
              ],
                })(
                  <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
              />,
               )}
             
                
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" htmlType = 'submit'>
                Log in
             </Button>
            </Form.Item>
            
          </Form>

          
        </section>
      </div>
    )
  }
}


// export default Form.create()(Login)
export default Login;