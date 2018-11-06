import React,{Component} from 'react';
import './LinkContainer.css';
import {Link} from 'react-router-dom';
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
    }
    return(
      <div className='containerCSS'>
        <div className="containerHdngCSS">
          {this.props.heading}
        </div>
        <div className="list-cntnrCSS" id="list_container">
          {rows}
        </div>
      </div>
    )
  }
}
