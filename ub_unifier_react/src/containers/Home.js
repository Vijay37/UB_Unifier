import React,{Component} from 'react';
import '../App.css';
import Header from "./Header";
import './Home.css';
import LinkContainer from './LinkContainer';
class Home extends Component{
  constructor(props){
    super(props);
    this.onloadfunction=this.onloadfunction.bind(this);
    this.handleOnClick=this.handleOnClick.bind(this);
    this.state={
      isLoading:true,
      userData:{},
    }
  }
  componentDidMount() {
    this.onloadfunction();
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
          Calendar Goes here
      </div>
      <div className="col-md-3">
           <LinkContainer heading={"Favorite Links"}/>
      </div>
    </div>
  </div>
  </div>
    )
  }
}
export default Home;
