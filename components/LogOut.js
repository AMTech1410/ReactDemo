import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom';
import  { Path } from '../services/Path';
class LogOut extends Component {

       constructor(props){

            super(props);
            this.state={
                redirect:false
            }
            this.logout=this.logout.bind(this);
            
       }

        componentDidMount(){
        this.logout();
        }

      logout(){

        sessionStorage.setItem('userId','');
        sessionStorage.setItem('userType','');
        sessionStorage.clear();
        this.setState({redirect:true});

      }

         render() {

            if(this.state.redirect){

                return (<Redirect to={Path.HOME}/>)
            }

            return (
              <div className="pagemaindiv loginbg">
             
                
                 </div>
            )

        }



    
}

export default LogOut;