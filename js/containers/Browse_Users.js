// React 
import React, { Component } from 'react';

// Redux 
import { bindActionCreators } from "redux";

// React-Redux 
import { connect } from "react-redux";

// Action Types 
import { fetchDatabaseAdmin } from "../actions/index.js";

// Firebase 
import * as firebase from "firebase";

// React Router
import {Router, Route, IndexRoute, Link, IndexLink, IndexRedirect, hashHistory} from 'react-router';


export class Admin extends Component {

  componentDidMount(){
      // Get current errand id
      firebase.auth().onAuthStateChanged(user => {
        if(user){
          console.log(user)
          this.props.fetchDatabaseAdmin();
        }
  
        else{
         hashHistory.push('admin-login')
        }
      })

  }

  logOut(){
    firebase.auth().signOut()
    location.reload();
  }

  showUsers(){
    var userArray = [];

    for(var userID in this.props.userDatabaseAdmin[0]){

      userArray.push(
        <Link className="next_step" to={`/browse-errands/${userID}/${Object.keys(this.props.userDatabaseAdmin[0][userID])}`}>
          <div key={userID} className="container admin">
            <h1><center>{Object.keys(this.props.userDatabaseAdmin[0][userID])}</center></h1>
          </div>
        </Link>
      )

    }

    return(
      <div id="admin_wrapper">
        {userArray}
      </div>
    )

  }

 
  render() {

    const progressWidth = {
      width: '33%',
    };

    if(this.props.userDatabaseAdmin[0]) {
      return (
      <div>
        <header>
          <h2 className="header">Steg 1: Välj skola</h2>
          <Link to="admin" onClick={this.logOut} className="log_out">Logga ut</Link>
        </header>
        <div className="progress_bar" style={progressWidth}></div>

        <div id="admin_wrapper">
          {this.showUsers()}
        </div>
      </div>
      );
    }
  
    else {
      return (
        <div className="spinner_wrapper">
          <div className="spinner"></div>
        </div>
      )
    }
  
  }

}



function mapStateToProps(state){
	return { userDatabaseAdmin: state.userDatabaseAdmin};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators ({fetchDatabaseAdmin}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);

// 