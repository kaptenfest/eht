// React 
import React, { Component } from 'react';

// React Router
import {Router, Route, IndexRoute, Link, IndexLink, IndexRedirect, hashHistory} from 'react-router';

// Firebase 
import * as firebase from "firebase";


export default class Footer extends Component {
  constructor(props){
    super(props)

    this.state = {
      name: ""
    }


  }	

logOut(){
	firebase.auth().signOut()
  location.reload();
}

setDisplay(){
		firebase.auth().onAuthStateChanged(user => {
	  if(user){
			if(this.state.name === ""){
				this.setState({name: user.displayName})
			}
	  }
	})
}


render(){
	
	return(

				<footer className="footer">
					{this.setDisplay()}
					<h2><span className="left_padding">{this.state.name}</span></h2> 
					<h2><Link to="/" onClick={this.logOut} className="log_out_footer">Logga ut</Link></h2>
				</footer>
	)
}

}