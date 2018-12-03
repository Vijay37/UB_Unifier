import React from 'react';
import { render } from 'react-dom';
/* global gapi */
var CLIENT_ID="385955327267-gmfo7607vl49ib6m4kd0phfas2hdi27h.apps.googleusercontent.com";
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
var API_KEY="AIzaSyD6CoOkQg6_riz5wr8r7bOaEk4oCJawO7c";
export default class calendar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      showAuthButton: false,
      showSignOutButton: false
    };
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
     console.log("Get events called");
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

        if (events.length > 0) {
          for (let i = 0; i < events.length; i++) {
            var event = events[i];
            var when = event.start.dateTime;
            if (!when) {
              when = event.start.date;
            }
            console.log(event.summary + ' (' + when + ')')
          }
        } else {
          console.log('No upcoming events found.');
        }
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
    this.initGapi();
  }
  render(){
    let authButton = <button id="authorize-button" onClick={this.handleAuthClick.bind(this)}>Authorize</button>
    let signOutButton = <button id="signout-button" onClick={this.handleSignoutClick.bind(this)}>Sign Out</button>
    return(
      <div className="container">
        {this.state.showAuthButton ? authButton : null}
        {this.state.showSignOutButton ? signOutButton : null}
      </div>
    )
  }
}
// export default class calendar extends React.Component {
//   constructor(props){
//     super(props);
//
//     this.getCalendarEvents=this.getCalendarEvents.bind(this);
//     this.initClient = this.initClient.bind(this);
//     this.updateSigninStatus = this.updateSigninStatus.bind(this);
//     this.state = {
//       showAuthButton: false,
//       showSignOutButton: false
//     };
//   }
//   componentDidMount(){
//     this.initGapi();
//   }
//   loadClientWhenGapiReady = (script) => {
//     console.log('Trying To Load Client!');
//     console.log(script)
//     if(script.getAttribute('gapi_processed')){
//       console.log('Client is ready! Now you can access gapi. :)');
//       this.getCalendarEvents();
//     }
//     else{
//       console.log('Client wasn\'t ready, trying again in 100ms');
//       setTimeout(() => {this.loadClientWhenGapiReady(script)}, 100);
//     }
//   }
//   initGapi = () => {
//     console.log('Initializing GAPI...');
//     console.log('Creating the google script tag...');
//
//     const script = document.createElement("script");
//     script.onload = () => {
//       console.log('Loaded script, now loading our api...')
//       // Gapi isn't available immediately so we have to wait until it is to use gapi.
//       this.loadClientWhenGapiReady(script);
//     };
//     script.src = "https://apis.google.com/js/client.js";
//
//     document.body.appendChild(script);
//   }
// handleAuthClick(event) {
//   gapi.auth2.getAuthInstance().signIn();
// }
//
//       /**
//        *  Sign out the user upon button click.
//        */
// handleSignoutClick(event) {
//   gapi.auth2.getAuthInstance().signOut();
// }
// listUpcomingEvents() {
//   gapi.client.calendar.events.list({
//     'calendarId': 'primary',
//     'timeMin': (new Date()).toISOString(),
//     'showDeleted': false,
//     'singleEvents': true,
//     'maxResults': 10,
//     'orderBy': 'startTime'
//   }).then(function(response) {
//     var events = response.result.items;
//     console.log('Upcoming events:');
//
//     if (events.length > 0) {
//       for (let i = 0; i < events.length; i++) {
//         var event = events[i];
//         var when = event.start.dateTime;
//         if (!when) {
//           when = event.start.date;
//         }
//         console.log(event.summary + ' (' + when + ')')
//       }
//     } else {
//       appendPre('No upcoming events found.');
//     }
//   });
// }
//   getCalendarEvents(){
//     let that = this;
//     var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
//     var SCOPES = "https://www.googleapis.com/auth/calenda.readonly";
//     // function start() {
//     //  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
//     //  var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
//     //   gapi.client.init({
//     //     apiKey: "AIzaSyD6CoOkQg6_riz5wr8r7bOaEk4oCJawO7c",
//     //     clientId:"385955327267-gmfo7607vl49ib6m4kd0phfas2hdi27h.apps.googleusercontent.com",
//     //     discoveryDocs:DISCOVERY_DOCS,
//     //     scope:SCOPES
//     //
//     //   }).then(function() {
//     //     return gapi.client.request({
//     //       'path': `https://www.googleapis.com/calendar/v3/calendar/feeds/reachpallaharsha@gmail.com`,
//     //     })
//     //   }).then( (response) => {
//     //     let events = response.result.items
//     //     that.setState({
//     //       events
//     //     }, ()=>{
//     //       console.log(that.state.events);
//     //     })
//     //   }, function(reason) {
//     //     console.log(reason);
//     //   });
//     // }
//     function initClient(){
//       gapi.client.init({
//       apiKey: "AIzaSyD6CoOkQg6_riz5wr8r7bOaEk4oCJawO7c",
//       clientId: "385955327267-gmfo7607vl49ib6m4kd0phfas2hdi27h.apps.googleusercontent.com",
//       discoveryDocs: DISCOVERY_DOCS,
//       scope: SCOPES
//     }).then(function () {
//       // Listen for sign-in state changes.
//       gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
//
//       // Handle the initial sign-in state.
//       updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
//       authorizeButton.onclick = handleAuthClick;
//       signoutButton.onclick = handleSignoutClick;
//     }, function(error) {
//       console.log("error :",error);
//     });
//     }
//     gapi.load('client', initClient)
//   }
//   render(){
//    let authButton = <button id="authorize-button" onClick={this.handleAuthClick.bind(this)}>Authorize</button>
//    let signOutButton = <button id="signout-button" onClick={this.handleSignoutClick.bind(this)}>Sign Out</button>
//    return(
//      <div className="container">
//        {this.state.showAuthButton ? authButton : null}
//        {this.state.showSignOutButton ? signOutButton : null}
//      </div>
//    )
//  }
// }
//}
