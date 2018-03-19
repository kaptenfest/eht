// React =================================
import React, { Component } from 'react';

// Action Types =================================
import { addBasicInfo } from "../actions/index.js";

// Firebase =====================================
import * as firebase from "firebase";

// React Router
import {Router, Route, IndexRoute, Link, IndexLink, IndexRedirect, hashHistory} from 'react-router';

// Footer
import Footer from "../components/Footer.js"


export default class StudentBasicInfo extends Component {

	constructor(props){
		super(props)

		this.state = {
			disclaimerRead: false,
		}

		this.handleDisclaimer = this.handleDisclaimer.bind(this);
  	}

  postBasicInfo(){
	// Läraren Basinfo
	var teacherName = document.getElementById("teacher_name").value;
	var teacherClass = document.getElementById("teacher_class").value;
	var teacherSubject = document.getElementById("teacher_subject").value;

	// Eleven Basinfo
	var studentName = document.getElementById("student_name").value;
	var studentAge = document.getElementById("student_age").value;
	var studentClass = document.getElementById("student_class").value;
	var studentMentor = document.getElementById("student_mentor").value;
	var studentTime = document.getElementById("student_time").value;


	firebase.auth().onAuthStateChanged(user => {
	  if(user){
		addBasicInfo(user.uid, user.displayName, teacherName, teacherClass, teacherSubject, studentName, studentAge, studentClass, studentMentor, studentTime);
	  }
	})

  }

  logOut(){
	firebase.auth().signOut()
	location.reload();
  }

  	handleDisclaimer(){
    	if(this.state.disclaimerRead === false){
    	  this.setState({disclaimerRead: true})
    	}
    	else {
    	  this.setState({disclaimerRead: false})
    	}
	}


  
  render() {

  const progressWidth = {
	width: '20%',
  };

	  return (
		<div id="basic_page_wrapper">
		
		  <header>
			<h2 className="header">Steg 2: Fyll i basinfo</h2>
		  </header>

		  <div className="progress_bar" style={progressWidth}></div>
		  
		  <div className="basic_info_wrapper">
			<div className="container teacher_container">
				<h1>Uppgifter om anmälaren:</h1>
				<input type="text" id="teacher_name" placeholder="För och Efternamn"></input>
				<input type="text" id="teacher_class" placeholder="Klass"></input>
				<input type="text" id="teacher_subject" placeholder="Ämne"></input>
			</div>
  
			<div className="container student_container">
				<h1>Uppgifter om eleven:</h1>
				<input type="text" id="student_name" placeholder="För och Efternamn"></input>
				<input type="text" id="student_age" placeholder="Ålder"></input>
				<input type="text" id="student_class" placeholder="Klass"></input>
				<input type="text" id="student_mentor" placeholder="Mentor"></input>
				<input type="text" id="student_time" placeholder="Tid på Mentepontom"></input>
			</div>
		  </div>

		<div>
			<div className="basic_info_subWrapper">
				<label className="checkbox">
				  <input type="checkbox" value={this.state.disclaimerRead} checked={this.state.disclaimerRead} onChange={this.handleDisclaimer} />
				  <span></span>
				</label>			
				<div className="button_container left-margin"> Föräldrarna har blivit kontaktade</div>
			</div>
		</div>

		<div className="basic_info_subWrapper">
		{
			this.state.disclaimerRead === true ? 
			<div className="button_container">
				<Link to="/student-learning-info" className="next_step_basic" onClick={this.postBasicInfo}>Nästa steg &#x27A4;</Link>
			</div> : <p id="hide"></p>
		}

		</div>
		  
		<Footer />

		</div>
	  );
  
  
  }

}

// <Link to="/" onClick={this.logOut} className="log_out">Logga ut</Link>