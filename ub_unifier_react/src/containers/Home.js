import React,{Component} from 'react';
import '../App.css';
import Header from "./Header";
import './Home.css';
import LinkContainer from './LinkContainer';
import * as constants from './Constants';
import EventContainer from './EventContainer';
class Home extends Component{
  constructor(props){
    super(props);
    this.onloadfunction=this.onloadfunction.bind(this);
    this.handleOnClick=this.handleOnClick.bind(this);
    this.get_links=this.get_links.bind(this);
    this.post_data=this.post_data.bind(this);
    this.get_events=this.get_events.bind(this);
    this.addLinktoDb=this.addLinktoDb.bind(this);
    this.get_user_events=this.get_user_events.bind(this);
    this.state={
      isLoading:true,
      userData:{},
      userLinks:{},
      events:{},
      userEvents:{},
      email:"",
      link_link:"",
      link_name:"",
    }
  }
  addLinktoDb(){
    if(this.state.link_link.trim()!="" && this.state.link_name.trim()!=""){
      var formData = new FormData();
      formData.append("KEY","ADDLINK");
      formData.append("EMAIL",sessionStorage.getItem("user"));
      formData.append("LINK",this.state.link_link);
      formData.append("LINKNAME",this.state.link_name);
      this.post_data(formData,"ADDLINK");
    }
  }
  get_links(){
    var formData = new FormData();
    formData.append('KEY',"GETUSERLINK");
    formData.append('EMAIL',sessionStorage.getItem('user'));
    this.post_data(formData,"link");
  };
  get_user_events(){
    var formData = new FormData();
    formData.append('KEY',"GETUSEREVENT");
    formData.append('EMAIL',sessionStorage.getItem('user'));
    this.post_data(formData,"user_event");
  }
  get_events(){
    var formData = new FormData();
    formData.append('KEY',"GETEVENT");
    this.post_data(formData,"event");
  }

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
    console.log("Data:",data);
    if(caller==="link"){
      if(data.message==="SUCCESS"){
      that.setState({
        userLinks:data.result,
        link_name:"",
        link_link:"",
      });
    }
    }
    else if(caller==="ADDLINK"){
      if(data.STATUS==="SUCCESS"){
        var formData = new FormData();
        formData.append('KEY',"GETUSERLINK");
        formData.append('EMAIL',sessionStorage.getItem('user'));
        that.post_data(formData,"link");
      }
    }
    else if(caller==="event"){
      if(data.message==="SUCCESS"){
        that.setState({
          events:data.RESULT,
        })
      }
    }
    else if(caller==="user_event"){
        that.setState({
          userEvents:data,
        })
    }
  })
  .catch(function(error){
    console.log("Request failed",error);
  })
  }
  componentDidMount() {
    this.onloadfunction();
    this.get_links();
    this.get_events();
    this.get_user_events();
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
  handleLinkContainerClick=event=>{
    this.setState({
      [event.target.id]:event.target.value,
    })
  }
  render(){

    var rows=[];
    var events = this.state.events;

    for (const key of Object.keys(events)) {
      var color="#f2f2f2";
      if(key%2==1){
        color="white";
      }
      var eventTitle = events[key]["event_name"];
      var event_desc= events[key]["description"];
      var event_time= events[key]["time"];
      var event_eTime= events[key]["endTime"];
      var event_loc = events[key]["location"];
      var event_date = events[key]["date"];
      var event_category = events[key]["category"];
      if(event_eTime==null)
        event_eTime="";

      event_category=event_category===null?"":event_category;
      event_desc=event_desc===null?"":event_desc;
      event_loc=event_loc===null?"":event_loc;
      var event_fTime=event_date+" "+event_time+" "+event_eTime;
      rows.push(<EventContainer key={key} eventTitle={eventTitle} bgColor={color} eventCategory={event_category} eventTime={event_fTime} eventLocation={event_loc} eventDesc={event_desc}/>);
    }
    return(
      <div className="">
      <Header enableLogout={true} handleOnClick={this.handleOnClick}/>
      <div className="homeMainCSS">
      <div className="row">
      <div className="col-md-3">
          <LinkContainer user_events={this.state.userEvents} heading={"Upcoming Events"}/>
      </div>
      <div className="col-md-6">
          <iframe src="https://calendar.google.com/calendar/embed?src=buffalo.edu_aeqqrlekluf3aa8rhn5c2mecqo%40group.calendar.google.com&ctz=America%2FNew_York" className="calendarCSS"></iframe>
      </div>
      <div className="col-md-3">
           <LinkContainer addLinkClick={this.addLinktoDb} isLinkContainer={true} link_l={this.state.link_link} link_name={this.state.link_name} links={this.state.userLinks} handleChange={(event)=>this.handleLinkContainerClick(event)} heading={"Favorite Links"}/>
      </div>
      </div>
      <div className="row">
      <div className="col-md-3">

      </div>
      <div className="col-md-6">
          <div className="EventHeaderCSS">Upcoming Events</div>
        {rows}
      </div>
      <div className="col-md-3">

      </div>
      </div>
  </div>
  </div>
    )
  }
}
export default Home;
