// React 
import React, { Component } from 'react';

// React Router
import {Router, Route, IndexRoute, Link, IndexLink, IndexRedirect, hashHistory} from 'react-router';

// Firebase 
import * as firebase from "firebase";


export default class Login extends Component {
  constructor(props){
    super(props)

    this.setDisplayName = this.setDisplayName.bind(this)

    this.state = {
      error: "hide"
    }
  }

  componentDidMount(){

    // Get Elements
    const txtEmail = document.getElementById("txtEmail");
    const txtPassword = document.getElementById("txtPassword");
    const btnLogin = document.getElementById("btnLogin");
    const errorMessage = document.getElementById("error");

    // Add login event
    btnLogin.addEventListener("click", e => {


    // Get email and password
    const email = txtEmail.value;
    const password = txtPassword.value;
    const auth = firebase.auth();

    // Sign in / With error handling
    const promise = auth.createUserWithEmailAndPassword(email, password);
      promise.catch(function(e){
        console.log(e)
        /* if(e.code === "auth/wrong-password"){
          errorMessage.innerHTML = "Fel Lösenord";
          txtPassword.value = "";
          this.setState({error: "show"});
        }
        if(e.code === "auth/invalid-email"){
          errorMessage.innerHTML = "Skriv in en korrekt e-mail address";
          txtPassword.value = "";
          this.setState({error: "show"});
        }
        if(e.code === "auth/user-not-found"){
          errorMessage.innerHTML = "Användaren finns ej";
          txtPassword.value = "";
          this.setState({error: "show"});
        } */
      }.bind(this))

    });

    // If login is a success, send to Errand Options
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        console.log("Now logged in as: ", user);
        console.log("Next Step is to choose a Displayname")
        this.setState({error: "show"});       
      }
    })

  }
    
    // Hide Error message
    closeError(){
      this.setState({error:"hide"})
    }

    setDisplayName(){
      const displayName = document.getElementById("displayName");
      const display_name = displayName.value;

          firebase.auth().onAuthStateChanged(user => {
      if(user){
        user.updateProfile({
          displayName: display_name
        }).then(function() {
          console.log("displayName saved as: ", display_name)
        }, function(error) {
          console.log(error)
        });
   
      }
    })


    }

      logOut(){
    firebase.auth().signOut()
    location.reload();
  }

  render() {
    return (
      <div className="wrapper">
        <div className="container login_createUser_container">
          <p className="input">E-mail</p>
            <input id="txtEmail" type="email" placeholder="&#9993;" />
          <p className="input">Password</p>
            <input id="txtPassword" type="password" placeholder="&#9679; &#9679; &#9679;" />
          <button id="btnLogin" className="login_button">Skapa användare</button>
          <p className="input">Set Displayname</p>
            <input id="displayName" placeholder="Display name" />
          <button id="btnSave" onClick={this.setDisplayName} className="login_button">Spara Display name</button>
          <Link to="admin" onClick={this.logOut} className="log_out">Logga ut</Link>
        </div>

      </div>
    );
  }

}