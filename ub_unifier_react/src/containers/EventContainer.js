import React,{Component} from 'react';
import "./EventContainer.css";
export default class EventContainer extends Component{
  render(){
    return(
      <div className="eventContainerCSS" style={{background:this.props.bgColor}}>
        <div className="eventTitleCSS">{this.props.eventTitle} ({this.props.eventLocation})</div>
        <div className="eventOtherInfoCSS">{this.props.eventCategoryCSS}</div>
        <div className="eventOtherInfoCSS">{this.props.eventTime}</div>
        <div className="eventOtherInfoCSS">{this.props.eventDesc}</div>

      </div>
    )
  }
}
