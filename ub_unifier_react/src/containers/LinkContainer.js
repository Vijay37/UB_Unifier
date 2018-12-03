import React,{Component} from 'react';
import './LinkContainer.css';
import {FormControl,} from "react-bootstrap";
var CLIENT_ID="385955327267-gmfo7607vl49ib6m4kd0phfas2hdi27h.apps.googleusercontent.com";
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
var API_KEY="AIzaSyD6CoOkQg6_riz5wr8r7bOaEk4oCJawO7c";
/* global gapi */
export default class LinkContainer extends Component{
  constructor(props){
    super(props);

    this.state={
      fav_links:{MyUB:"https://myub.buffalo.edu/myub/pw/template/myub.html",BusSchedule:"https://www.buffalo.edu/parking/getting-around-UB/bus/bus-schedules.html"},
      showAuthButton: false,
      showSignOutButton: false,
      upcoming_events:{},
    }
    this.initClient = this.initClient.bind(this);
    this.updateSigninStatus = this.updateSigninStatus.bind(this);
    this.getEvents=this.getEvents.bind(this);
  }
  handleAuthClick(){
    gapi.auth2.getAuthInstance().signIn();
  }
  handleSignoutClick(){
    gapi.auth2.getAuthInstance().signOut();
  }
  handleClientLoad() {
    gapi.load('client:auth2', this.initClient);
  }
  initClient() {
    let that = this;
    gapi.client.init({
      apiKey:API_KEY,
      discoveryDocs: DISCOVERY_DOCS,
      clientId: CLIENT_ID,
      scope: SCOPES
    }).then(function () {
      console.log(window.gapi);
      window.gapi.auth2.getAuthInstance().isSignedIn.listen(that.updateSigninStatus);

      // Handle the initial sign-in state.
      that.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  }
  getEvents() {
     let that = this;
      gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
      }).then(function(response) {
        var events = response.result.items;
        console.log('Upcoming events:');
        that.setState({
          upcoming_events:events,
        })
      });
  }
  updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      this.setState({
        showAuthButton: false,
        showSignOutButton: false,
      })
      this.getEvents();
    } else {
      this.setState({
        showAuthButton: true,
        showSignOutButton: false
      })

    }
  }
  loadClientWhenGapiReady = (script) => {
      console.log('Trying To Load Client!');
      console.log(script)
      if(script.getAttribute('gapi_processed')){
        console.log('Client is ready! Now you can access gapi. :)');
        this.getCalendarEvents();
      }
      else{
        console.log('Client wasn\'t ready, trying again in 100ms');
        setTimeout(() => {this.loadClientWhenGapiReady(script)}, 100);
      }
  }
  initGapi = () => {
      console.log('Initializing GAPI...');
      console.log('Creating the google script tag...');

      const script = document.createElement("script");
      script.onload = () => {
        console.log('Loaded script, now loading our api...')
        // Gapi isn't available immediately so we have to wait until it is to use gapi.
        this.handleClientLoad();
      };
      script.src = "https://apis.google.com/js/client.js";

      document.body.appendChild(script);
    }
  componentDidMount(){
    if(!this.props.isLinkContainer)
    this.initGapi();
  }
  render(){
    let authButton = <button id="authorize-button" onClick={this.handleAuthClick.bind(this)}>Authorize</button>
    let signOutButton = <button id="signout-button" onClick={this.handleSignoutClick.bind(this)}>Sign Out</button>
    var rows=[];
    if(this.props.isLinkContainer){

      var links = this.state.fav_links;
      var link;
      for (var name in links)
      {
         link = links[name];
         rows.push(<a key={name} target="_blank" href={link}>{name}</a>);
      }
      if(this.props.links!== null && this.props.links!==undefined){
      for (const key of Object.keys(this.props.links)) {
        var linkName = this.props.links[key]["linkName"];
        link = this.props.links[key]["link"];
        rows.push(<a key={linkName} target="_blank" href={link}>{linkName}</a>);
      }
      }
      var addLink_div=[];
      addLink_div.push(<FormControl key={1}  bsClass="addLinkCSS" placeholder="Link" type='input' id="link_link" value={this.props.link_l} onChange={(event)=>this.props.handleChange(event)}/>);
      addLink_div.push(<FormControl  key={2} bsClass="addLinkCSS" placeholder="Link Name" type='input' id="link_name" value={this.props.link_name} onChange={(event)=>this.props.handleChange(event)}/>);
      addLink_div.push(<div key={3}><button key={3} className="addLinkBtnCSS" onClick={this.props.addLinkClick}> ADD </button></div>);
    }
    else{
      rows=[];
      if(this.state.upcoming_events.length >0){
        for (let i = 0; i < this.state.upcoming_events.length && i<6; i++) {
          var event = this.state.upcoming_events[i];
          var when = event.start.dateTime;
          if (!when) {
            when = event.start.date;
          }
          rows.push(<div className="upCEventsCSS" key={event.summary}><div >{event.summary} </div><div>({when})</div></div>);
        }
      }
      else{
        rows.push(<div className="upCEventsCSS" key={0}><div >No Upcoming Events </div></div>);
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
          {this.isLinkContainer?null:
            <div className="container">
              {this.state.showAuthButton ? authButton : null}
              {this.state.showSignOutButton ? signOutButton : null}
            </div>
          }




        </div>
      </div>
    )
  }
}
