// React 
import React, { Component } from 'react';

// Redux 
import { bindActionCreators } from "redux";

// React-Redux 
import { connect } from "react-redux";

// Action Types 
import { fetchErrandsDatabaseAdmin } from "../actions/index.js";

// Firebase 
import * as firebase from "firebase";

// React Router
import {Router, Route, IndexRoute, Link, IndexLink, IndexRedirect, hashHistory} from 'react-router';


export class AdminErrands extends Component {

  componentDidMount(){
      // Get current errand id
      firebase.auth().onAuthStateChanged(user => {
        if(user){
          this.props.fetchErrandsDatabaseAdmin(this.props.params.id, this.props.params.displayName);
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

  showErrands(){
    var errandsArray = [];

    for(var errandID in this.props.userErrandsDatabaseAdmin[0]){
      console.log(errandID)
      errandsArray.push(
        <Link className="next_step" to={`/browse-errand-details/${this.props.params.id}/${errandID}/${this.props.params.displayName}`}>
        <div key={errandID} className="container">
          <h1>Elev: <span className="regular">{this.props.userErrandsDatabaseAdmin[0][errandID].basicInfo.student.name}</span></h1>
          <h1>Lärare: <span className="regular">{this.props.userErrandsDatabaseAdmin[0][errandID].basicInfo.teacher.name}</span></h1>
        </div>
        </Link>
      )

    }

    return(
      <div id="admin_wrapper">
        {errandsArray}
      </div>
    )

  }

 
  render() {

    const progressWidth = {
      width: '66%',
    };

    if(this.props.userErrandsDatabaseAdmin[0]) {
      return (
      <div>
        <header>
          <h2 className="header">Steg 2: Välj ärende</h2>
          <Link to="admin" onClick={this.logOut} className="log_out">Logga ut</Link>
        </header>
        <div className="progress_bar" style={progressWidth}></div>

        <div id="admin_wrapper">
          {this.showErrands()}
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
	return { userErrandsDatabaseAdmin: state.userErrandsDatabaseAdmin};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators ({fetchErrandsDatabaseAdmin}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminErrands);

// {this.showUsers()}
// <Link to="admin" onClick={this.logOut} className="log_out">Logga ut</Link>