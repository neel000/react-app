import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {BrowserRouter as Router,Link} from "react-router-dom";
import { withRouter } from "react-router";
import axios from 'axios';

export class VedioWatch extends Component {
static propTypes = {
match: PropTypes.object.isRequired,
location: PropTypes.object.isRequired,
history: PropTypes.object.isRequired
}
constructor(props){
super(props);
this.state={
url:this.props.match.params.url,
vdo:[],
rltd:[],
}
}

async componentDidMount(){
  //this.setState({url:this.props.match.url})
  await axios.get('https://news.coder-i.com/newsapi/vedio/?url='+this.state.url).then(resp=>{
    console.log('SingleVedio----->>>>',resp.data.vedio)
    this.setState({vdo:resp.data.vedio, rltd:resp.data.related})
  })
  


}

async componentDidUpdate(){
  if (this.state.url!==this.props.match.params.url){
    this.setState({url:this.props.match.params.url})
    await axios.get('https://news.coder-i.com/newsapi/vedio/?url='+this.props.match.params.url).then(resp=>{
    console.log('SingleVedio----->>>>',resp.data.vedio)
    this.setState({vdo:resp.data.vedio, rltd:resp.data.related})
  })
  }

}


render() {
document.title = 'vedio || '+this.state.url
return (
<div className="content-wrapper">
  <div className="container">

  {
        this.state.vdo.map( (i,id) => (
    <h1 class="mb-2" key={i.id}>
     {i.title}
    </h1>
   ))
  }
    <div class="row" data-aos="fade-up">
      <div class="col-xl-8 stretch-card grid-margin">

      {
        this.state.vdo.map( (i,id) => (

        <div class="position-relative" key={i.id}>

          <iframe class="img-fluid watch-vedio"
            src={'https://news.coder-i.com'+i.vedio_file}
            frameborder="0" allow="accelerometer; autoplay;
                 clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                 title={i.vdo_id}
                 
                 allowfullscreen>
          </iframe>
          
        </div>
        ))
      }

      </div>

      <div class="col-xl-4 stretch-card grid-margin">
        <div class="card bg-dark text-white">
          <div class="card-body">
            <h2>More Videos</h2>
            
            {
              this.state.rltd.map( (i,id) => (
            <div class="d-flex border-bottom-blue pt-3
             pb-4 align-items-center justify-content-between">
              <div class="pr-3">
                <Link to={"/watch/"+i.url}>
                <h5>{i.title.slice(0,50)}</h5>
                </Link>
                <div class="fs-12">
                  <span class="mr-2">Photo </span>10 Minutes ago
                </div>
              </div>
              <div class="rotate-img">
                <img src={i.cover_img_url} alt="thumb" class="img-fluid img-lg" />
              </div>
            </div>
              ))}
            

            

           
          </div>
        </div>
      </div>
    </div>

  </div>
</div>
)
}
}

export default withRouter(VedioWatch)