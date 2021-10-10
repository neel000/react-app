import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {BrowserRouter as Router,Link} from "react-router-dom";
import { withRouter } from "react-router";
import axios from 'axios';
export class CatVedio extends Component {
static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}

constructor(props){
    super(props);
    this.state = {
        vedio : [],
        cat:this.props.match.params.cat
    }
}

async componentDidMount(){
    
    //this.setState({cat:this.props.match.params.cat})
    console.log('Category---->>>>',this.state.cat)
    await axios.get('https://news.coder-i.com/newsapi/vedio/?category='+this.state.cat).then(resp=>{
        this.setState({vedio:(resp.data)})
        console.log(resp.data)
    })
    
    
    
    

}


render() {
    document.title = 'vedio || '+this.state.cat
    
return (
<div className="content-wrapper">
    <div className="container">
        
        <div className="row" data-aos="fade-up">
            

            <div className="col-lg-12 stretch-card grid-margin">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            
                        {
                            this.state.vedio.map( (i,id) => (

                            
                            <div className="col-sm-3 grid-margin" key={i.id}>
                                <div className="position-relative">
                                    <div className="rotate-img">
                                        <Link to={"/watch/"+i.url}>
                                        <h3>{i.title.slice(0,20)}</h3>
                                        <img src={i.cover_img_url} alt="thumb"
                                            className="img-fluid" />
                                    </Link>
                                            
                                    </div>
                                    <div className="badge-positioned w-90">
                                        <div className="d-flex justify-content-between align-items-center">
                                        <Link to={"/vedio/"+i.category}>
                                            <span className="badge badge-danger font-weight-bold">{i.category}</span>
                                            </Link>
                                            <div className="video-icon">
                                                <i className="mdi mdi-play"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            ))
                            }

                        </div>

                        
                    </div>
                </div>
            </div>

            {/*<div className="col-lg-3 stretch-card grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h2>Category</h2>
                        <ul className="vertical-menu">
                            <li><a href="#">Politics</a></li>
                            <li><a href="#">International</a></li>
                            <li><a href="#">Finance</a></li>
                            <li><a href="#">Health care</a></li>
                            <li><a href="#">Technology</a></li>
                            <li><a href="#">Jobs</a></li>
                            <li><a href="#">Media</a></li>
                            <li><a href="#">Administration</a></li>
                            <li><a href="#">Sports</a></li>
                            <li><a href="#">Game</a></li>
                            <li><a href="#">Art</a></li>
                            <li><a href="#">Kids</a></li>
                        </ul>
                    </div>
                </div>
            </div>*/}
        </div>

       
        
    </div>
</div>
)
}
}

export default withRouter(CatVedio)