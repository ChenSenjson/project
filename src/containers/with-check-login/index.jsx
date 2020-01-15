import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect }from 'react-router-dom'


export default function withCheckLogin(WrappedComponent){
  @connect( 
    (state) =>({user:state.user}),
    null
   )
   class CheckLoin extends Component{
    static displayName =`chekLogin(${WrappedComponent.displayName || WrappedComponent.name ||'Component'})`
    render(){
      
      const  { user:{token},
        location:{pathname} } = this.props;
        
        
        if (token) {
          if(pathname === '/login'){
            return <Redirect to ="./"/>
          }
        }else {
          if (pathname === '/'){
            console.log(pathname);
             return <Redirect to ="/login" />
          }
        }
     return <WrappedComponent{...this.props}/>
    }
  } 
  return CheckLoin;
}