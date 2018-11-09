import React,{Component} from 'react';
import '../App.css';
import Header from "./Header";
import './Home.css';
import LinkContainer from './LinkContainer';
import * as constants from './Constants';
class Home extends Component{
  constructor(props){
    super(props);
    this.onloadfunction=this.onloadfunction.bind(this);
    this.handleOnClick=this.handleOnClick.bind(this);
    this.get_links=this.get_links.bind(this);
    this.post_data=this.post_data.bind(this);
    this.state={
      isLoading:true,
      userData:{},
      userLinks:{},
      email:"",
    }
  }
  get_links(){
    var formData = new FormData();
    formData.append('KEY',"GETUSERLINK");
    formData.append('EMAIL',sessionStorage.getItem('user'));
    this.post_data(formData,"link");
  };
  post_data(formData,caller){
    const that = this;
    return fetch(constants.API,{
      method:"POST",
      mode: "cors",
      cache:"no-cache",
      headers:{
      },
      body:formData,
    }
  ).then(response=>response.json())
  .then(function(data){
    if(caller==="link"){
      if(data.message==="SUCCESS"){
      that.setState({
        userLinks:data.result,
      });
    }
    }
  })
  .catch(function(error){
    console.log("Request failed",error);
  })
  }
  componentDidMount() {
    this.onloadfunction();
    this.get_links();
  }
  handleOnClick(){
    sessionStorage.setItem('loggedin',"false");
    sessionStorage.setItem('user', '');
    this.props.history.push("/Login");
  }
  onloadfunction(){
    if(sessionStorage.getItem('loggedin')!=='true'){
      this.props.history.push("/Login");
    }
    this.setState({
      email:sessionStorage.getItem('user'),
    })


  }
  render(){
    return(
      <div className="">
      <Header enableLogout={true} handleOnClick={this.handleOnClick}/>
      <div className="homeMainCSS">
      <div className="row">
      <div className="col-md-3">
          <LinkContainer heading={"Upcoming Events"}/>
      </div>
      <div className="col-md-6">
          <iframe src="https://calendar.google.com/calendar/embed?src=buffalo.edu_aeqqrlekluf3aa8rhn5c2mecqo%40group.calendar.google.com&ctz=America%2FNew_York" class="calendarCSS"></iframe>
      </div>
      <div className="col-md-3">
           <LinkContainer isLinkContainer={true} links={this.state.userLinks} heading={"Favorite Links"}/>
      </div>
    </div>
  </div>
  </div>
    )
  }
}
export default Home;
