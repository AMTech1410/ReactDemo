import React, { Component } from 'react';
import './Login.css';
import  { BrowserRouter as Router } from 'react-router-dom';
import  { Redirect } from 'react-router-dom';
import  { PostData } from '../services/PostData';
import  { Path } from '../services/Path';

export default class Login extends Component
{

  constructor(props) {

      super(props);
      this.state ={
           email: '', password: '' ,errorMessage: '',redirect:false
      };      
      
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

  } 
  


 
  handleEmailChange(e) {
      this.setState({email: e.target.value})
  }
  handlePasswordChange(e){
      this.setState({password: e.target.value})
  }


  onSubmit(e){
      
      PostData('login',this.state).then((result)=>{

          let responseJSON=result;
            if(responseJSON.success == 1){
                sessionStorage.setItem('userId',responseJSON.data.user_id);
                this.setState({redirect:true});
                this.renderRedirect();

            }
            else{
              this.setState({errorMessage:responseJSON.message});
            }
      });
      if(this.state.email == '')
      {
          this.setState({errorMessage:"email fields required"});
      }
      else if(this.state.password == '')
      {
          this.setState({errorMessage:"password fields required"});
      }


  }

  
   renderRedirect = () => {
    if (this.state.redirect) {
       return (<Redirect to={Path.dashboard} />)
    }
  }
  render()
  {
    

    
    if(this.state.redirect || (sessionStorage.getItem('userId'))){

        return (<Redirect to={Path.dashboard} />)
        
    }
         
    return(

        <div>

         
          <section className="content">
            <div className="container-fluid">
              <div className="row">
               
                

                <div className="react-toggle">

                  

                  <h3 align="center">React Demo</h3>

                  <div className="card card-primary">
                    <div className="card-header">
                      <h3 className="card-title">Login</h3>
                      
                      {this.state.errorMessage}
                    </div>
                 
                    <form role="form">
                      <div className="card-body">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Email address</label>
                          <input type="email" name="email" className="form-control" id="exampleInputEmail1" onChange={this.handleEmailChange} placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword1">Password</label>
                          <input type="password" name="password" className="form-control" id="exampleInputPassword1" onChange={this.handlePasswordChange} placeholder="Password" />
                        </div>
                        
                        <div className="form-check">
                          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                        </div>
                      </div>
                     
                      <div className="card-footer">
                        <button type="button" className="btn btn-primary" onClick={this.onSubmit}>Login</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        
       
      )
   
  }
}