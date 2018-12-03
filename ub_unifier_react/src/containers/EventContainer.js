import React,{Component} from 'react';
import "./EventContainer.css";
import {FacebookIcon,TwitterIcon} from 'react-share';
import { FacebookProvider, ShareButton } from 'react-facebook';
import ShareLink from 'react-twitter-share-link'
export default class EventContainer extends Component{
  render(){
    return(
      <div className="eventContainerCSS" style={{background:this.props.bgColor}}>
        <div className="titleDivCSS">
        <div className="eventTitleCSS"><a target="_blank" href={this.props.eventLink}>{this.props.eventTitle}</a></div>
      <div className="socialMediaDivCSS">
      <FacebookProvider appId="741554599544104">
          <ShareButton className="shareButtonCSS" href={this.props.eventLink}>
            <FacebookIcon size={32} round={true}/>
          </ShareButton>
        </FacebookProvider>
      <ShareLink link={this.props.eventLink} hashtags="UbEvent">
   {link => (
      <a href={link} target='_blank'><TwitterIcon size={32} round={true}/></a>
   )}
</ShareLink>
      </div>
        </div>
        <div className="eventOtherInfoCSS">{this.props.eventCategoryCSS}</div>
        <div className="eventOtherInfoCSS">{this.props.eventTime}</div>
        <div className="eventOtherInfoCSS">{this.props.eventDesc}</div>

      </div>
    )
  }
}
