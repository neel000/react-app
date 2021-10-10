import React, { Component } from 'react'
//import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Link
  } from "react-router-dom";
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';


export class Home extends Component {
constructor(){
super();
this.state = {
top:[],
recent:[],
allCat:[],
allContent:[],
test:'ok'
}
};

async componentDidMount(){
document.title='Home';
  
  await axios.get('https://news.coder-i.com/newsapi/news/?tag=top1')
  .then(response => {
  let top=response.data;
  this.setState({top:top})
  })
  //https://news.coder-i.com/newsapi/news/?tag=top2
  await axios.get('https://news.coder-i.com/newsapi/news/?tag=top2')
  .then(response => {
  this.setState({recent:response.data})
  })


  await axios.get('https://news.coder-i.com/newsapi/category/?sub_title=all')
  .then(response => {
  this.setState({allCat:response.data})
  })
  //https://news.coder-i.com/newsapi/news/?tag=top3

  await axios.get('https://news.coder-i.com/newsapi/news/?tag=top3')
  .then(response => {
  this.setState({allContent:response.data})
  })



};

render() {
return (
<div className="content-wrapper">
  <div className="container">
    
    
    <div className="row" data-aos="fade-up">

      <div className="col-xl-8 stretch-card grid-margin">

        {
        this.state.top.map( (top,id) => (

        <div className="position-relative" key={top.id}>
          <img src={'https://news.coder-i.com'+top.cover_img} alt="banner" className="img-fluid"/>
          <div className="banner-content">
            <Link to={'/post/'+top.url}>
            <h1 className="mb-0">{top.title}</h1>
            </Link>
          </div>
        </div>


        ))
        }



      </div>

      <div className="col-xl-4 stretch-card grid-margin">
        <div className="card bg-dark text-white">
          <div className="card-body">
            <h2>Latest news</h2>

            {
              this.state.recent.map( (i,id) => (

            <div className="d-flex border-bottom-blue pt-3 pb-4 align-items-center justify-content-between" key={i.id}>
              <div className="pr-3">
              <Link to={'/post/'+i.url}>
                <h5>{i.title}</h5>
                </Link>
                <div className="fs-12">
                  <span className="mr-2">Date Time </span>{i.time_stamp}
                </div>
              </div>
              <div className="rotate-img">

                <img src={'https://news.coder-i.com'+i.cover_img} alt="thumb" className="img-fluid img-lg" />
              </div>
            </div>

            ))
        }

          </div>
        </div>
      </div>

    </div>

    <div className="row" data-aos="fade-up">
      <div className="col-lg-3 stretch-card grid-margin">
        <div className="card">
          <div className="card-body">
            <h2>Category</h2>
            <ul className="vertical-menu">
            {
              this.state.allCat.map( (i,id) => (
              <li key={i.id}>
                <Link to={'/category/'+i.under_by+'/'+i.name}>{i.name}</Link>
                </li>
              ))
            }
            </ul>
          </div>
        </div>
      </div>
      <div className="col-lg-9 stretch-card grid-margin">
        <div className="card">
          <div className="card-body">

            {
              this.state.allContent.map( (i,id) => (

            <div className="row" key={i.id}>
              <div className="col-sm-4 grid-margin">
                <div className="position-relative">
                  <div className="rotate-img">
                    <img src={'https://news.coder-i.com'+i.cover_img} alt="thumb" className="img-fluid" />
                  </div>
                  <div className="badge-positioned">
                    <span className="badge badge-danger font-weight-bold">Flash news</span>
                  </div>
                </div>
              </div>
              <div className="col-sm-8  grid-margin">
                <h2 className="mb-2 font-weight-600">
                  <Link to={'/post/'+i.url}>
                 {i.title}
                </Link>
                </h2>
                <div className="fs-13 mb-2">
                  <span className="mr-2">Time Stamp </span>{i.time_stamp}
                </div>
                <p className="mb-0">
                  {ReactHtmlParser(i.content.slice(0,150))}
                </p>
              </div>
            </div>

            ))
          }

          </div>
        </div>
      </div>
    </div>

    {/*<div className="row" data-aos="fade-up">
      <div className="col-sm-12 grid-margin">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-8">
                <div className="card-title">
                  Videos
                </div>

                <div className="row">
                  <div className="col-sm-6 grid-margin">
                    <div className="position-relative">
                      <div className="rotate-img">
                        <img src="/static/layout/assets/images/dashboard/home_7.jpg" alt="thumb" className="img-fluid" />
                      </div>
                      <div className="badge-positioned w-90">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="badge badge-danger font-weight-bold">Lifestyle</span>
                          <div className="video-icon">
                            <i className="mdi mdi-play"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6 grid-margin">
                    <div className="position-relative">
                      <div className="rotate-img">
                        <img src="/static/layout/assets/images/dashboard/home_7.jpg" alt="thumb" className="img-fluid" />
                      </div>
                      <div className="badge-positioned w-90">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="badge badge-danger font-weight-bold">Lifestyle</span>
                          <div className="video-icon">
                            <i className="mdi mdi-play"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6 grid-margin">
                    <div className="position-relative">
                      <div className="rotate-img">
                        <img src="/static/layout/assets/images/dashboard/home_7.jpg" alt="thumb" className="img-fluid" />
                      </div>
                      <div className="badge-positioned w-90">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="badge badge-danger font-weight-bold">Lifestyle</span>
                          <div className="video-icon">
                            <i className="mdi mdi-play"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6 grid-margin">
                    <div className="position-relative">
                      <div className="rotate-img">
                        <img src="/static/layout/assets/images/dashboard/home_7.jpg" alt="thumb" className="img-fluid" />
                      </div>
                      <div className="badge-positioned w-90">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="badge badge-danger font-weight-bold">Lifestyle</span>
                          <div className="video-icon">
                            <i className="mdi mdi-play"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6 grid-margin">
                    <div className="position-relative">
                      <div className="rotate-img">
                        <img src="/static/layout/assets/images/dashboard/home_7.jpg" alt="thumb" className="img-fluid" />
                      </div>
                      <div className="badge-positioned w-90">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="badge badge-danger font-weight-bold">Lifestyle</span>
                          <div className="video-icon">
                            <i className="mdi mdi-play"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6 grid-margin">
                    <div className="position-relative">
                      <div className="rotate-img">
                        <img src="/static/layout/assets/images/dashboard/home_7.jpg" alt="thumb" className="img-fluid" />
                      </div>
                      <div className="badge-positioned w-90">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="badge badge-danger font-weight-bold">Lifestyle</span>
                          <div className="video-icon">
                            <i className="mdi mdi-play"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6 grid-margin">
                    <div className="position-relative">
                      <div className="rotate-img">
                        <img src="/static/layout/assets/images/dashboard/home_7.jpg" alt="thumb" className="img-fluid" />
                      </div>
                      <div className="badge-positioned w-90">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="badge badge-danger font-weight-bold">Lifestyle</span>
                          <div className="video-icon">
                            <i className="mdi mdi-play"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6 grid-margin">
                    <div className="position-relative">
                      <div className="rotate-img">
                        <img src="/static/layout/assets/images/dashboard/home_7.jpg" alt="thumb" className="img-fluid" />
                      </div>
                      <div className="badge-positioned w-90">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="badge badge-danger font-weight-bold">Lifestyle</span>
                          <div className="video-icon">
                            <i className="mdi mdi-play"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  
                </div>
                
                
              </div>
              <div className="col-lg-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="card-title">
                    Latest Video
                  </div>
                  <p className="mb-3">See all</p>
                </div>
                <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
                  <div className="div-w-80 mr-3">
                    <div className="rotate-img">
                      <img src="/static/layout/assets/images/dashboard/home_11.jpg" alt="thumb" className="img-fluid" />
                    </div>
                  </div>
                  <h3 className="font-weight-600 mb-0">
                    Apple Introduces Apple Watch
                  </h3>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>*/}

    

  </div>
</div>
)
}
}

export default Home