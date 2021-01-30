import React from 'react';
import Route from './components/Route';
import {Alert} from 'react-native';
import NetInfo from '@react-native-community/netinfo'


export default class App extends React.Component {
	constructor(props){
    super(props)
    this.state = {
      isConnected:true
    }
  }

	componentDidMount() {
    //To get the network state once
    NetInfo.fetch().then(state => {
      console.log(
         'Connection type: ' + 
          state.type + 
         ', Is connected?: ' + 
          state.isConnected);
      this.setState({isConnected:state.isConnected})
    });
    
    //Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log(
         'Connection type: ' + 
          state.type + 
         ', Is connected?: ' + 
          state.isConnected);
    });

    //To Unsubscribe the network state update
    unsubscribe();
    }
  
	render() {
		if(this.state.isConnected === true){
	      return (
	       <Route/>
	    );
	    }
	    else {
	    	Alert.alert("Check Your Internet Connection")
	    }
	  }
}