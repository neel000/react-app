//import logo from './logo.svg';
import './App.css';
import axios from 'axios';
//import { withRouter } from "react-router";
import React, { Component } from 'react'
import {
BrowserRouter as Router,
Switch,
Route,
//Link
} from "react-router-dom";
import Home from './components/Home';
import Post from './components/Post';
import Category from './components/Category';
import Header from './components/Header';
import Login from './components/Login';
import Logout from './components/Logout';
import Dashboard from './components/Dashboard';
import PropTypes from 'prop-types'
import Vedio from './components/Vedio';
import CatVedio from './components/CatVedio';
import VedioWatch from './components/VedioWatch';

export class App extends Component {
static propTypes = {
  match: PropTypes.object.isRequired,
}
constructor(props){
  super(props);
  this.state = {
  };
};

async componentDidMount(){
  let token = localStorage.getItem('token')
    if (token!==null){
        //console.log('Token---->>>>',token) 
        
        await axios.get('https://news.coder-i.com/newsapi/checkuser/', { headers: {"Authorization" : `Bearer ${token}`} } )
        .then(resp=>{
          localStorage.setItem('username', resp.data.username)
          
        })
        .catch(error=>{
            
            let refresh_token = localStorage.getItem('refresh')
            if (refresh_token!==null){
                let data1 = {
                    "refresh":refresh_token,
                }
                axios.post('https://news.coder-i.com/api/token/refresh/', data1)
                .then(response=>{
                    localStorage.removeItem('token')
                    localStorage.setItem('token', response.data.access)
                   
                   
                  
                })
                .catch(error=>{
                    localStorage.removeItem('token')
                    localStorage.removeItem('refresh')
                   
                })

            }
            else{
              localStorage.removeItem('token')
              
            }
            
        })
    }

}



render() {
return (
<div className="container-scroller">
  <div className="main-panel">
  

    <Header/>
    
   
    <Switch>
          <Route exact path="/post/:name">
            <Post />
          </Route>
          <Route exact path="/category/:name/:subname">
            <Category />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          
          <Route exact path="/login">
            <Login/>
          </Route>

          <Route exact path="/logout">
            <Logout/>
          </Route>

          <Route exact path="/profile">
            <Dashboard/>
          </Route>

          <Route exact path="/vedio">
            <Vedio/>
          </Route>
          <Route exact path="/vedio/:cat">
            <CatVedio/>
          </Route>
          <Route exact path="/watch/:url">
            <VedioWatch/>
          </Route>

    </Switch>

    <footer>
      
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="d-sm-flex justify-content-between align-items-center">
                <div className="fs-14 font-weight-600">
                  © 2020 @ <a href="https://indranil.coder-i.com/" target="_blank" className="text-white">
                    Indranil's</a> Production
                </div>
                <div className="fs-14 font-weight-600">
                  React Frontend Work <a href="https://www.bootstrapdash.com/" target="_blank"
                    className="text-white">Template By BootstrapDash</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </footer>


    
  </div>
</div>
)
}
}

export default App