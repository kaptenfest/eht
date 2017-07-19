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

  
  render() {

  const progressWidth = {
    width: '20%',
  };

      return (
        <div id="basic_page_wrapper">
        
          <header>
            <h2 className="header">Steg 2: Fyll i basinfo</h2>
            <Link to="/student-learning-info" className="next_step" onClick={this.postBasicInfo}>Nästa steg &#x27A4;</Link>
          </header>
          <div className="progress_bar" style={progressWidth}></div>
          
          <div className="basic_info_wrapper">
            <div className="container teacher_container">
                <h1>Lärarens info:</h1>
                <input type="text" id="teacher_name" placeholder="För och Efternamn"></input>
                <input type="text" id="teacher_class" placeholder="Klass"></input>
                <input type="text" id="teacher_subject" placeholder="Ämne"></input>
            </div>
  
            <div className="container student_container">
                <h1>Elevens info:</h1>
                <input type="text" id="student_name" placeholder="För och Efternamn"></input>
                <input type="text" id="student_age" placeholder="Ålder"></input>
                <input type="text" id="student_class" placeholder="Klass"></input>
                <input type="text" id="student_mentor" placeholder="Mentor"></input>
                <input type="text" id="student_time" placeholder="Tid på Mentepontom"></input>
            </div>
          </div>

          
        <Footer />
          

        </div>
      );
  
  
  }

}

// <Link to="/" onClick={this.logOut} className="log_out">Logga ut</Link>