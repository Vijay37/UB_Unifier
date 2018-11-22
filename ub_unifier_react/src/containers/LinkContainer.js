import React,{Component} from 'react';
import './LinkContainer.css';
import {Link} from 'react-router-dom';
import {Button, FormGroup,FormControl,} from "react-bootstrap";
import * as constants from './Constants';
export default class LinkContainer extends Component{
  constructor(props){
    super(props);

    this.state={
      fav_links:{MyUB:"https://test",BusSchedule:"https://www.buffalo.edu/parking/getting-around-UB/bus/bus-schedules.html"},

    }
  }
  render(){
    if(this.props.isLinkContainer){
      var rows=[];
      var links = this.state.fav_links;
      var link;
      for (var name in links)
      {
         link = links[name];
         rows.push(<a key={name} href={link}>{name}</a>);
      }

      for (const key of Object.keys(this.props.links)) {
        var linkName = this.props.links[key]["linkName"];
        var link = this.props.links[key]["link"];
        rows.push(<a key={linkName} href={link}>{linkName}</a>);
      }
      var addLink_div=[];
      addLink_div.push(<FormControl key={1}  bsClass="addLinkCSS" placeholder="Link" type='input' id="link_link" value={this.props.link_l} onChange={(event)=>this.props.handleChange(event)}/>);
      addLink_div.push(<FormControl  key={2} bsClass="addLinkCSS" placeholder="Link Name" type='input' id="link_name" value={this.props.link_name} onChange={(event)=>this.props.handleChange(event)}/>);
      addLink_div.push(<Button key={3} className="addLinkBtnCSS" onClick={this.props.addLinkClick}> ADD </Button>);
    }
    else{
      var rows=[];

      for (const key of Object.keys(this.props.user_events)) {
        var eventName = this.props.user_events[key]["event_name"];
        var s_time = this.props.user_events[key]["time"];
        var e_time = this.props.user_events[key]["endTime"];
        var date = this.props.user_events[key]["date"];
        e_time = e_time === null ? "" :e_time;
        rows.push(<div className="upCEventsCSS" key={eventName}><div >{eventName} </div><div>{date} ({s_time} {e_time})</div></div>);
      }
    }
    return(
      <div className='containerCSS'>
        <div className="containerHdngCSS">
          {this.props.heading}

        </div>
        <div className="list-cntnrCSS" id="list_container">
          {rows}
          {addLink_div}



        </div>
      </div>
    )
  }
}
