import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from "react-router";
import axios from 'axios';
import {BrowserRouter as Router,Link} from "react-router-dom";


export class Dashboard extends Component {
static propTypes = {
history: PropTypes.object.isRequired
}

constructor(){
  super();
  this.state = {
    cat:[],
    link:[],
    category:[],
  }
}

ytSubmit = (event) => {
  event.preventDefault();
  let data = {
    "link":this.state.link,
    "category":this.state.category
  }
  axios.post('https://news.coder-i.com/newsapi/controlvedio/',data=data, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
  .then(resp=>{
    if (resp.data.res == undefined){
      alert(resp.data.resp)
    }
    else{
      alert(resp.data.message)
    }

  })
  .catch(err=>{
    alert(err);
  })
  
}



myChangeHandler = (event) => {
  let nam = event.target.name;
  let val = event.target.value;
  this.setState({[nam]: val});
  console.log(this.state)
}

async componentDidMount(){
  let token = localStorage.getItem('token')
  if (token===null){
  this.props.history.push('/login')
  }
  document.title='Dashboard'

  await axios.get('https://news.coder-i.com/newsapi/controlvedio/?tag=category', { headers: {"Authorization" : `Bearer ${token}`} }).then(resp=>{
    this.setState({cat:resp.data})
  })




}

render() {
return (
<div className="content-wrapper">
  <div className="container">
    <div className="row" data-aos="fade-up">

      <div className="col-lg-3 stretch-card grid-margin">
        <div className="card">
          <div className="card-body">
            <h2>Category</h2>
            <ul className="vertical-menu">
              <li><Link to="/profile">Upload Vedio</Link></li>
              <li><Link to="/vedio">All Vedio</Link></li>
              
            </ul>
          </div>
        </div>
      </div>

      <div className="col-lg-9 stretch-card grid-margin">
        <div className="card">
          <div className="card-body">
            
            <form onSubmit={this.ytSubmit}>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Youtube Link</label>
                <input type="url" class="form-control"
                name='link'
                onChange={this.myChangeHandler}
                
                id="exampleInputEmail1"
                 aria-describedby="emailHelp"/>
                
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Category</label>
                <select type="text" class="form-control"
                name='category'
                onChange={this.myChangeHandler}
                required>
                  <option value=""> Select Category</option>
                {this.state.cat.map( (i,id) => (
                  <option value={i.name} key={i.id}>{i.name}</option>
                  
                  ))
  }
                  </select>
              </div>
              
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>

            
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
)
}
}

export default withRouter(Dashboard)