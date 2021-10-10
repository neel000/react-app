import React, { Component } from 'react'
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import {
BrowserRouter as Router,

Link
} from "react-router-dom";
import axios from 'axios';
export class Category extends Component {
static propTypes = {
match: PropTypes.object.isRequired,
location: PropTypes.object.isRequired,
history: PropTypes.object.isRequired
};

constructor(props){
super(props);

this.state={
name:this.props.match.params.name,
subname:this.props.match.params.subname,
subtitle:[],
content:[],


}
};

async componentDidMount () {
document.title=this.state.name;

await axios.get('https://news.coder-i.com/newsapi/category/?sub_title='+this.state.name)
.then(response => {this.setState({subtitle:response.data})})

if(this.state.subname==='all'){

    await axios.get('https://news.coder-i.com/newsapi/content/?sub_title='+this.state.name)
    .then(response=>{
    this.setState({content:response.data});
    console.log('Hit1')
    })

}
else{
    await
    axios.get('https://news.coder-i.com/newsapi/content/?sub_title='+this.state.name+'&content_title='+this.state.subname)
    .then(response=>{
    this.setState({content:response.data});
    console.log('hit2')
    })

}
};

async componentDidUpdate(){
    
    if (this.state.name!==this.props.match.params.name){
        
        await axios.get('https://news.coder-i.com/newsapi/category/?sub_title='+this.props.match.params.name)
        .then(response => {this.setState({subtitle:response.data})})
        console.log('name change')
        this.setState({name:this.props.match.params.name})
        document.title = this.props.match.params.name
        if (this.props.match.params.subname=='all'){
            
            this.setState({subname:this.props.match.params.subname})
            await axios.get('https://news.coder-i.com/newsapi/content/?sub_title='+this.props.match.params.name)
                .then(response=>{
                this.setState({content:response.data});
            })
            
        }
        else if(this.props.match.params.subname!==this.state.subname){
            console.log('subname update')
            this.setState({subname:this.props.match.params.subname})
            await
                axios.get('https://news.coder-i.com/newsapi/content/?sub_title='+this.props.match.params.name+'&content_title='+this.props.match.params.subname)
                .then(response=>{
                this.setState({content:response.data});
                
                })

        }
        
        
    }
    else{
      
        if(this.props.match.params.subname!==this.state.subname){
            
            this.setState({subname:this.props.match.params.subname})
            if(this.props.match.params.subname=='all'){
                
                await axios.get('https://news.coder-i.com/newsapi/content/?sub_title='+this.props.match.params.name)
                .then(response=>{
                this.setState({content:response.data});
                
                })
            }
            else{
               
                await
                axios.get('https://news.coder-i.com/newsapi/content/?sub_title='+this.props.match.params.name+'&content_title='+this.props.match.params.subname)
                .then(response=>{
                this.setState({content:response.data});
                
                })
            }

        }
        

    }
    
}


render() {


return (
<div className="content-wrapper">
    <div className="container">
        <div className="row" data-aos="fade-up">

            <div className="col-lg-3 stretch-card grid-margin">

                <div className="card">
                    <div className="card-body">
                        <h2>{this.state.name}</h2>
                        <ul className="vertical-menu">

                            {
                            this.state.subtitle.map( (subtitle,id) => (

                            <li>
                                <Link key={subtitle.id} to={'/category/'+subtitle.under_by+'/'+subtitle.name}>
                                {subtitle.name}</Link>
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
                        this.state.content.map((i, id)=>(
                        <div className="row" key={i.id}>
                            <div className="col-sm-4 grid-margin">
                                <div className="position-relative">
                                    <div className="rotate-img">
                                        <img src={'https://news.coder-i.com'+i.cover_img} alt="thumb"
                                            className="img-fluid" />
                                    </div>
                                    <div className="badge-positioned">
                                        <span className="badge badge-danger font-weight-bold">Flash news</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-8  grid-margin">
                                <h2 className="mb-2 font-weight-600">
                                   <Link to={'/post/'+i.url}> {i.title.slice(0,50)}......</Link>
                                </h2>
                                <div className="fs-13 mb-2">
                                    <span className="mr-2">Photo </span>10 Minutes ago
                                </div>
                                <p className="mb-0">
                                    {ReactHtmlParser(i.content.slice(0,155))}
                                </p>
                            </div>
                        </div>

                        )

                        )
                        }




                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
)
}
}

export default withRouter(Category)