import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { withRouter } from 'react-router'
import {BrowserRouter as Router,Link} from "react-router-dom";

export class Header extends Component {
static propTypes = {
    history: PropTypes.object.isRequired
}

constructor(props){
    
super(props);
this.state={
    sub:[],
       
}
};

async componentDidMount(){

    if (localStorage.getItem('token')!==null){
        this.setState({loggedIn:true, username:localStorage.getItem('username')})
    }

    
    await axios.get('https://news.coder-i.com/newsapi/category/')
            .then(response => {
                let sub=response.data;
                this.setState({sub:sub})
            })
            .catch(resp=>{
                console.log(resp)
            })
    
    
    

};

async componentDidUpdate(){
    if (this.state.loggedIn==true){
        if (localStorage.getItem('token')==null){
            this.setState({loggedIn:false, username:''})
        }

    }
    
    
}

    
render() {
    let loggedIn = '';
    let username = '';
    if (localStorage.getItem('token')===null){
        loggedIn = false
        username = ''
    }
    else{
        loggedIn=true
        username=localStorage.getItem('username')
        
    }

return (
    <header id="header">
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="navbar-top">
                <div className="d-flex justify-content-between align-items-center">

                  <ul className="navbar-top-left-menu">
                    {/*<li className="nav-item">
                        <a href="pages/index-inner.html" className="nav-link">Advertise</a>
                      </li>
                      <li className="nav-item">
                        <a href="pages/aboutus.html" className="nav-link">About</a>
                      </li>
                      <li className="nav-item">
                        <a href="#" className="nav-link">Events</a>
                      </li>
                      <li className="nav-item">
                        <a href="#" className="nav-link">Write for Us</a>
                      </li>
                      <li className="nav-item">
                        <a href="#" className="nav-link">In the Press</a>
                      </li>*/}
                  </ul>
                  {loggedIn ?
                     <ul className="navbar-top-right-menu">
                     <li className="nav-item">
                      <a href="#" className="nav-link"><i className="mdi mdi-magnify"></i></a>
                    </li>
                    <li className="nav-item">
                         <Link to='/profile' className="nav-link">Welcome {localStorage.getItem('username')}
                         </Link>
                    </li>
 
                       <li className="nav-item">
                         <Link to='/logout' className="nav-link">Logout</Link>
                       </li>
                   </ul>:
                     
                     <ul className="navbar-top-right-menu">
                    <li className="nav-item">
                      <a href="#" className="nav-link"><i className="mdi mdi-magnify"></i></a>
                    </li>

                    

                    <li className="nav-item">
                      <Link to="/login" className="nav-link">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="#" className="nav-link">Sign in</Link>
                  </li>
                  </ul>
                    }
                  
                  
                </div>

                </div>
                <div className="navbar-bottom">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <a className="navbar-brand" href="#">
                                <img src="/static/layout/assets/images/logo.svg"
                                    alt="" />
                                    
                                    </a>
                        </div>
                        <div>
                            <button className="navbar-toggler" type="button" data-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent" aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="navbar-collapse justify-content-center collapse"
                                id="navbarSupportedContent">
                                <ul className="navbar-nav d-lg-flex justify-content-between align-items-center">
                                    <li>
                                        <button className="navbar-close">
                                            <i className="mdi mdi-close"></i>
                                        </button>
                                    </li>
                                    
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/">Home</Link>
                                    </li>
                                    
                                    
                                    {
                                        this.state.sub.map( (sub,id) => (
                                            
                                            <li className="nav-item">
                                            <Link className="nav-link" key={sub.id} to={'/category/'+sub.name+'/all'}>{sub.name}</Link>
                                            </li>
                                          ))
                                    }
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/vedio">Videos</Link>
                                    </li>
                                


                                </ul>
                            </div>
                        </div>
                        <ul className="social-media">
                            <li>
                                <a href="#">
                                    <i className="mdi mdi-facebook"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="mdi mdi-youtube"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="mdi mdi-twitter"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </header>
    
)
}
}

export default withRouter(Header)