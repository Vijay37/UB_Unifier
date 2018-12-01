import React,{Component} from 'react';
import "./EventContainer.css";
import {Link} from 'react-router-dom';
export default class EventContainer extends Component{
  render(){
    return(
      <div className="eventContainerCSS" style={{background:this.props.bgColor}}>
        <div className="eventTitleCSS"><a target="_blank" href={this.props.eventLink}>{this.props.eventTitle}</a></div>
        <div className="eventOtherInfoCSS">{this.props.eventCategoryCSS}</div>
        <div className="eventOtherInfoCSS">{this.props.eventTime}</div>
        <div className="eventOtherInfoCSS">{this.props.eventDesc}</div>

      </div>
    )
  }
}
