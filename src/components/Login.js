import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from "react-router";
import axios from 'axios'
//import {BrowserRouter as Router,Link} from "react-router-dom";
export class Login extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }
  constructor(props){
    super(props);
    this.state={
      
      username:'',
      password:'',
      
      
    }
    
  }

  loginSubmit = (event) => {
    event.preventDefault();
    //alert("You are submitting " + this.state.username + this.state.password);
    let data1 = {
      "username":this.state.username,
      "password":this.state.password
    }

    axios.post('https://news.coder-i.com/newsapi/login/', data1)
    .then(response=>{
      console.log(response.data)
      
      if (response.data.RESPONSE==='SUCCESS'){
        localStorage.setItem('token', response.data.access)
        localStorage.setItem('refresh', response.data.refresh)
        localStorage.setItem('username', response.data.username)
        this.props.history.push('/profile')
      }
      else{
        alert("Login Failed!!!")
      }
      
    })
    .catch(err=>{
      alert(err)
    })

  }
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  async componentDidMount(){
    document.title='Login Page'
    
    if (localStorage.getItem('token')!==null){
      this.props.history.push('/profile')
    }
    
  }

  render() {
    
    return (
      <div className="content-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="card" data-aos="fade-up">
              <div className="card-body">
                <div className="aboutus-wrapper">

                  <h1 className="mt-5 text-center mb-5">
                    Login Page
                  </h1>
                  
                  <div className="row">
                    <div className="col-lg-12 mb-5 mb-sm-2">
                      <form onSubmit={this.loginSubmit}>
                        <div class="mb-3">
                          <label for="exampleInputEmail1" class="form-label">Username</label>
                          <input type="text" class="form-control"

                           id="myid"
                           name='username'
                           onChange={this.myChangeHandler}
                            aria-describedby="emailHelp"/>
                          <div id="emailHelp" class="form-text">We'll never share your username with anyone else.</div>
                        </div>
                        <div class="mb-3">
                          <label for="exampleInputPassword1" class="form-label">Password</label>
                          <input type="password" class="form-control"
                          onChange={this.myChangeHandler}
                          name='password'
                           id="exampleInputPassword1"/>
                        </div>
                        
                        <button type="submit" class="btn btn-primary">Submit</button>
                      </form>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default withRouter(Login)
