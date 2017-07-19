// React 
import React, { Component } from 'react';

// React Router
import {Router, Route, IndexRoute, Link, IndexLink, IndexRedirect, hashHistory} from 'react-router';

// Firebase 
import * as firebase from "firebase";

// Footer
import Footer from "../components/Footer.js"


export default class ErrandOptions extends Component {
  constructor(props){
    super(props)

    this.state = {
      name: ""
    }


  }	

studentErrand(){
	firebase.auth().onAuthStateChanged(user => {
	  if(user){
			hashHistory.push('/student-basic-info');
	  }
	})
}

groupErrand(){
	firebase.auth().onAuthStateChanged(user => {
	  if(user){
			hashHistory.push('/group-errend');
	  }
	})
}

logOut(){
	firebase.auth().signOut()
  location.reload();
}


render(){
	
	const progressWidth = {
  	width: '10%',
	};


	return(
		<div>
			
			<header>
				<h2 className="header">Steg 1: Välj Ärende</h2>
			</header>
			<div className="progress_bar" style={progressWidth}></div>
			
			<div className="center_wrapper">
				<div className="options_wrapper">
					
					<div className="options_container" onClick={this.studentErrand}>
						<img className="option" src="./img/choose_student.svg"/>
						<p>Enskild elev</p>
					</div>
						
					<div className="options_container" onClick={this.groupErrand}>
						<img className="option" src="./img/choose_group.svg"/>
						<p>Grupp</p>
					</div>

				</div>



			</div>

		<Footer />
			
		</div>
	)
}

}

// <Link to="/" onClick={this.logOut} className="log_out">Logga ut</Link>