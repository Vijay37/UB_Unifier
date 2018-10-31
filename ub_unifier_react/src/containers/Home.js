import React,{Component} from 'react';
import '../App.css';
import Header from "./Header";
class Home extends Component{
  constructor(props){
    super(props);
    this.onloadfunction=this.onloadfunction.bind(this);
    this.state={
      isLoading:true,
      userData:{},
    }
  }
  componentDidMount() {
    this.onloadfunction();
  }
  onloadfunction(){
    if(sessionStorage.getItem('loggedin')!=='true'){
      this.props.history.push("/Login");
    }
  
  }
  render(){
    return(
      <div className="">
        <Header/>
    </div>
    )
  }
}
export default Home;
