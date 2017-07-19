// React 
import React, { Component } from 'react';

// React Router
import {Router, Route, IndexRoute, Link, IndexLink, IndexRedirect, hashHistory} from 'react-router';

// Firebase 
import * as firebase from "firebase";


export default class ErrandOptions extends Component {

createUser(){
	firebase.auth().onAuthStateChanged(user => {
	  if(user){
			hashHistory.push('/create-user');
	  }
	})
}

browseUsers(){
	firebase.auth().onAuthStateChanged(user => {
	  if(user){
			hashHistory.push('/browse-users');
	  }
	})
}

logOut(){
	firebase.auth().signOut()
  location.reload();
}



render(){
	
	return(
		<div>
			
			<div className="center_wrapper">
				
				<div className="options_wrapper">
					
					<div className="options_container" onClick={this.createUser}>
						<img className="option" src="./img/user_create.svg"/>
						<p>Skapa användare</p>
					</div>
						
					<div className="options_container" onClick={this.browseUsers}>
						<img className="option" src="./img/user_browse.svg"/>
						<p>Visa användare</p>
					</div>

					<Link to="/" onClick={this.logOut} className="log_out">Logga ut</Link>

	
				</div>
	
				

			</div>
		</div>
	)
}

}