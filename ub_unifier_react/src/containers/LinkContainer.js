import React,{Component} from 'react';
import './LinkContainer.css';
export default class LinkContainer extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className='containerCSS'>
        <div >
          {this.props.heading}
        </div>
      </div>
    )
  }
}
