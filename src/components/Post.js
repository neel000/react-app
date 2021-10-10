import React, { Component } from 'react'
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
export class Post extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
    
  };

  constructor(props){
    super(props);
    this.state={
      path:this.props.match.params.name,
      post:[],
    }
  };

  async componentDidMount () {
    document.title=this.props.match.params.name
    let url = 'https://news.coder-i.com/newsapi/post/?tag='+this.props.match.params.name
    await axios.get(url).then(resp=>{
      this.setState({post:resp.data})
    })
    
  };

  render() {
    

    
    
    return (
      <div className="content-wrapper">
          <div className="container">
            <div className="col-sm-12">
              <div className="card" data-aos="fade-up">
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-8">

                      {
                        this.state.post.map( (i,id) => (


                      <div key={i.id}>
                        <h1 className="font-weight-600 mb-1">
                          {i.title}
                        </h1>
                        <p className="fs-13 text-muted mb-0">
                          <span className="mr-2">Photo </span>10 Minutes ago
                        </p>
                        <div className="rotate-img">
                          <img
                            src={'https://news.coder-i.com'+i.cover_img}
                            alt="banner"
                            className="img-fluid mt-4 mb-4"
                          />
                        </div>
                        <p className="mb-4 fs-15">
                          { ReactHtmlParser(i.content) }
                        </p>
                      </div>

                        ))}

                      <div className="d-lg-flex">
                        <span className="fs-16 font-weight-600 mr-2 mb-1"
                          >Tags</span
                        >
                        <span className="badge badge-outline-dark mr-2 mb-1"
                          >Trending</span
                        >
                        <span className="badge badge-outline-dark mr-2 mb-1"
                          >Trending</span
                        ><span className="badge badge-outline-dark mr-2 mb-1"
                          >Trending</span
                        ><span className="badge badge-outline-dark mr-2 mb-1"
                          >Trending</span
                        ><span className="badge badge-outline-dark mb-1"
                          >Trending</span
                        >
                      </div>
                      {/*<div className="post-comment-section">
                        <h3 className="font-weight-600">Related Posts</h3>
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="post-author">
                              <div className="rotate-img">
                                <img
                                  src="../assets/images/inner/inner_5.jpg"
                                  alt="banner"
                                  className="img-fluid"
                                />
                              </div>
                              <div className="post-author-content">
                                <h5 className="mb-1">
                                  Virus Kills Member Of Council Advising Iran’s
                                  Supreme Leader
                                </h5>
                                <p className="fs-13 text-muted mb-0">
                                  <span className="mr-2">Photo </span>10 Minutes ago
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="post-author">
                              <div className="rotate-img">
                                <img
                                  src="../assets/images/inner/inner_6.jpg"
                                  alt="banner"
                                  className="img-fluid"
                                />
                              </div>
                              <div className="post-author-content">
                                <h5 className="mb-1">
                                  Virus Kills Member Of Council Advising Iran’s
                                  Supreme Leader
                                </h5>
                                <p className="fs-13 text-muted mb-0">
                                  <span className="mr-2">Photo </span>10 Minutes ago
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="testimonial">
                          <div
                            className="d-lg-flex justify-content-between align-items-center"
                          >
                            <div className="d-flex align-items-center mb-3">
                              <div className="rotate-img">
                                <img
                                  src="../assets/images/faces/face1.jpg"
                                  alt="banner"
                                  className="img-fluid img-rounded mr-3"
                                />
                              </div>
                              <div>
                                <p className="fs-12 mb-1 line-height-xs">
                                  Of the Author
                                </p>
                                <p
                                  className="fs-16 font-weight-600 mb-0 line-height-xs"
                                >
                                  Nout Golstein
                                </p>
                              </div>
                            </div>
                            <ul className="social-media mb-3">
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
                          <p className="fs-12">
                            Praesent facilisis vulputate venenatis. In facilisis
                            placerat arcu, in tempor neque aliquet quis. Integer
                            lacinia in ligula eu sodales. Proin non lorem
                            iaculis, dictum lorem quis, bibendum leo.
                          </p>
                        </div>
                        
                      </div>*/}
                    </div>

                    {/*<div className="col-lg-4">
                      <h2 className="mb-4 text-primary font-weight-600">
                        Latest news
                      </h2>
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="border-bottom pb-4 pt-4">
                            <div className="row">
                              <div className="col-sm-8">
                                <h5 className="font-weight-600 mb-1">
                                  Ways to stay social online while in self..
                                </h5>
                                <p className="fs-13 text-muted mb-0">
                                  <span className="mr-2">Photo </span>10 Minutes ago
                                </p>
                              </div>
                              <div className="col-sm-4">
                                <div className="rotate-img">
                                  <img
                                    src="../assets/images/inner/inner_7.jpg"
                                    alt="banner"
                                    className="img-fluid"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="border-bottom pb-4 pt-4">
                            <div className="row">
                              <div className="col-sm-8">
                                <h5 className="font-weight-600 mb-1">
                                  Premier League players join charity..
                                </h5>
                                <p className="fs-13 text-muted mb-0">
                                  <span className="mr-2">Photo </span>10 Minutes ago
                                </p>
                              </div>
                              <div className="col-sm-4">
                                <div className="rotate-img">
                                  <img
                                    src="../assets/images/inner/inner_8.jpg"
                                    alt="banner"
                                    className="img-fluid"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="pt-4">
                            <div className="row">
                              <div className="col-sm-8">
                                <h5 className="font-weight-600 mb-1">
                                  UK Athletics board changed stance on..
                                </h5>
                                <p className="fs-13 text-muted mb-0">
                                  <span className="mr-2">Photo </span>10 Minutes ago
                                </p>
                              </div>
                              <div className="col-sm-4">
                                <div className="rotate-img">
                                  <img
                                    src="../assets/images/inner/inner_9.jpg"
                                    alt="banner"
                                    className="img-fluid"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="trending">
                        <h2 className="mb-4 text-primary font-weight-600">
                          Trending
                        </h2>
                        <div className="mb-4">
                          <div className="rotate-img">
                            <img
                              src="../assets/images/inner/inner_10.jpg"
                              alt="banner"
                              className="img-fluid"
                            />
                          </div>
                          <h3 className="mt-3 font-weight-600">
                            Virus Kills Member Of Advising Iran’s Supreme
                          </h3>
                          <p className="fs-13 text-muted mb-0">
                            <span className="mr-2">Photo </span>10 Minutes ago
                          </p>
                        </div>
                        <div className="mb-4">
                          <div className="rotate-img">
                            <img
                              src="../assets/images/inner/inner_11.jpg"
                              alt="banner"
                              className="img-fluid"
                            />
                          </div>
                          <h3 className="mt-3 font-weight-600">
                            Virus Kills Member Of Advising Iran’s Supreme
                          </h3>
                          <p className="fs-13 text-muted mb-0">
                            <span className="mr-2">Photo </span>10 Minutes ago
                          </p>
                        </div>
                        <div className="mb-4">
                          <div className="rotate-img">
                            <img
                              src="../assets/images/inner/inner_12.jpg"
                              alt="banner"
                              className="img-fluid"
                            />
                          </div>
                          <h3 className="mt-3 font-weight-600">
                            Virus Kills Member Of Advising Iran’s Supreme
                          </h3>
                          <p className="fs-13 text-muted mb-0">
                            <span className="mr-2">Photo </span>10 Minutes ago
                          </p>
                        </div>
                      </div>
                    </div>*/}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default withRouter(Post)
