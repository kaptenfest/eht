// React 
import React, { Component } from 'react';

// Redux 
import { bindActionCreators } from "redux";

// React-Redux 
import { connect } from "react-redux";

// Action Types 
import { fetchErrandDetailsDatabaseAdmin } from "../actions/index.js";

// Firebase 
import * as firebase from "firebase";

// React Router
import {Router, Route, IndexRoute, Link, IndexLink, IndexRedirect, hashHistory} from 'react-router';


export class AdminErrandDetails extends Component {

  componentDidMount(){
      // Get current errand id
      firebase.auth().onAuthStateChanged(user => {
        if(user){
          console.log("DISPLAY!!!!!!: ", this.props.params.displayName)
          this.props.fetchErrandDetailsDatabaseAdmin(this.props.params.id, this.props.params.errand_id, this.props.params.displayName);
        }
  
        else{
         hashHistory.push('admin')
        }
      })

  }

  logOut(){
    firebase.auth().signOut()
    location.reload();
  }

  showSubjects(){
    var subjectArray = [];
   
    for(var learningID in this.props.userErrandDetailsDatabaseAdmin[0].learning){

    var width = {
      width: this.props.userErrandDetailsDatabaseAdmin[0].learning[learningID].difficulty * 10 + "%",
    };


      subjectArray.push (
        <div key={learningID}>
          <h1>{this.props.userErrandDetailsDatabaseAdmin[0].learning[learningID].subject}</h1>
          <p><span className="bold_grey">Måluppfyllnad:</span></p>
          <div className="bar" style={width}><p className="bar">{this.props.userErrandDetailsDatabaseAdmin[0].learning[learningID].difficulty}</p></div>

          <p><span className="bold_grey">Inlärningssvårigheter:</span></p>
          {this.props.userErrandDetailsDatabaseAdmin[0].learning[learningID].onsetIssue === true ? <p>Ingångsättning</p> : <p id="hide"></p>}
          {this.props.userErrandDetailsDatabaseAdmin[0].learning[learningID].staminaIssue === true ? <p>Uthållighet</p> : <p id="hide"></p>}
          {this.props.userErrandDetailsDatabaseAdmin[0].learning[learningID].closingIssue === true ? <p>Avslut</p> : <p id="hide"></p>}
          {this.props.userErrandDetailsDatabaseAdmin[0].learning[learningID].slowWorkFlowIssue === true ? <p>Långsam arbetsgång</p> : <p id="hide"></p>}
          {this.props.userErrandDetailsDatabaseAdmin[0].learning[learningID].groupInstructionIssue === true ? <p>Svårt att förstå gruppinstruktioner</p> : <p id="hide"></p>}
          {this.props.userErrandDetailsDatabaseAdmin[0].learning[learningID].individualInstructionIssue === true ? <p>Svårt att förstå individuella instruktioner</p> : <p id="hide"></p>}
          {this.props.userErrandDetailsDatabaseAdmin[0].learning[learningID].loseTrackIssue === true ? <p>Kommer av sig under arbetet</p> : <p id="hide"></p>}
          {this.props.userErrandDetailsDatabaseAdmin[0].learning[learningID].readWriteIssue === true ? <p>Läs och skriv svårigheter</p> : <p id="hide"></p>}
          {this.props.userErrandDetailsDatabaseAdmin[0].learning[learningID].followInstructionsIssue === true ? <p>Svårt att följa instruktioner</p> : <p id="hide"></p>}
          {this.props.userErrandDetailsDatabaseAdmin[0].learning[learningID].amountsIssue === true ? <p>Svårt med mängder</p> : <p id="hide"></p>}
          {this.props.userErrandDetailsDatabaseAdmin[0].learning[learningID].strategiesIssue === true ? <p>Använda sig av strategier</p> : <p id="hide"></p>}
          {this.props.userErrandDetailsDatabaseAdmin[0].learning[learningID].numbersIssue === true ? <p>Svårt med taluppfattning (10 systemet, addition, subtraktion)</p> : <p id="hide"></p>}

          {this.props.userErrandDetailsDatabaseAdmin[0].learning[learningID].onsetIssue === false &&
          this.props.userErrandDetailsDatabaseAdmin[0].learning[learningID].staminaIssue === false &&
          this.props.userErrandDetailsDatabaseAdmin[0].learning[learningID].closingIssue === false &&
          this.props.userErrandDetailsDatabaseAdmin[0].learning[learningID].slowWorkFlowIssue === false &&
          this.props.userErrandDetailsDatabaseAdmin[0].learning[learningID].groupInstructionIssue === false &&
          this.props.userErrandDetailsDatabaseAdmin[0].learning[learningID].individualInstructionIssue === false &&
          this.props.userErrandDetailsDatabaseAdmin[0].learning[learningID].loseTrackIssue === false &&
          this.props.userErrandDetailsDatabaseAdmin[0].learning[learningID].readWriteIssue === false &&
          this.props.userErrandDetailsDatabaseAdmin[0].learning[learningID].followInstructionsIssue === false &&
          this.props.userErrandDetailsDatabaseAdmin[0].learning[learningID].amountsIssue === false &&
          this.props.userErrandDetailsDatabaseAdmin[0].learning[learningID].strategiesIssue === false &&
          this.props.userErrandDetailsDatabaseAdmin[0].learning[learningID].numbersIssue === false ? <p>Inga områden valda</p> : <p id="hide"></p>}
          <hr/>        
        </div>
      )

    }

    return(
      <div className="subject_wrapper">
        {subjectArray}
      </div>
    )

  }

  showBehaviors(){
    var behaviorArray = [];

    for(var behaviorID in this.props.userErrandDetailsDatabaseAdmin[0].behavior){

      behaviorArray.push(
        <div key={behaviorID}>
          <h1>{this.props.userErrandDetailsDatabaseAdmin[0].behavior[behaviorID].behaviorValue}</h1>
          {this.props.userErrandDetailsDatabaseAdmin[0].behavior[behaviorID].rulesIssue === true ? <p>Svårt att följa de instruktioner eller regler som finns inom givet sammanhanget och hamnar således i konflikt med andra barn eller skolpersonal på grund av detta: <span className="bold">{this.props.userErrandDetailsDatabaseAdmin[0].behavior[behaviorID].rulesFrequency}</span></p> : <p id="hide"></p>}
          {this.props.userErrandDetailsDatabaseAdmin[0].behavior[behaviorID].verbalIssue === true ? <p>Svårt för att verbalt kommunicera med andra, det vill säga att framföra vad en själv tycker och tänker samt tolka vad andra säger: <span className="bold">{this.props.userErrandDetailsDatabaseAdmin[0].behavior[behaviorID].verbalFrequency}</span></p> : <p id="hide"></p>}
          {this.props.userErrandDetailsDatabaseAdmin[0].behavior[behaviorID].aggressiveIssue === true ? <p>Kan agera aggressivt vilket noteras i form av elaka kommentarer, att denne blir fysiskt hårdhänt, bråk eller ilske utbrott: <span className="bold">{this.props.userErrandDetailsDatabaseAdmin[0].behavior[behaviorID].aggressiveFrequency}</span></p> : <p id="hide"></p>}
          {this.props.userErrandDetailsDatabaseAdmin[0].behavior[behaviorID].seclusiveIssue === true ? <p>Drar sig undan från andra, är ensam och håller sig ofta för sig självt: <span className="bold">{this.props.userErrandDetailsDatabaseAdmin[0].behavior[behaviorID].seclusiveFrequency}</span></p> : <p id="hide"></p>}
          <hr/>
        </div>
      )

    }

    return(
      <div className="behavior_wrapper">
        {behaviorArray}
      </div>
    )

  }  

  showFeelings(){
    var feelingsArray = [];
    var feelingsScore = 0;
    var impactScore = 0;

    for(var feelingsID in this.props.userErrandDetailsDatabaseAdmin[0].feelings){

      feelingsScore = +this.props.userErrandDetailsDatabaseAdmin[0].feelings[feelingsID].rage + +this.props.userErrandDetailsDatabaseAdmin[0].feelings[feelingsID].concern + +this.props.userErrandDetailsDatabaseAdmin[0].feelings[feelingsID].sad + +this.props.userErrandDetailsDatabaseAdmin[0].feelings[feelingsID].nervous + +this.props.userErrandDetailsDatabaseAdmin[0].feelings[feelingsID].scared + +this.props.userErrandDetailsDatabaseAdmin[0].feelings[feelingsID].trust + +this.props.userErrandDetailsDatabaseAdmin[0].feelings[feelingsID].fail + +this.props.userErrandDetailsDatabaseAdmin[0].feelings[feelingsID].reports + +this.props.userErrandDetailsDatabaseAdmin[0].feelings[feelingsID].tests + +this.props.userErrandDetailsDatabaseAdmin[0].feelings[feelingsID].wrong;
      impactScore = +this.props.userErrandDetailsDatabaseAdmin[0].feelings[feelingsID].difficulties + +this.props.userErrandDetailsDatabaseAdmin[0].feelings[feelingsID].issueFrequency + +this.props.userErrandDetailsDatabaseAdmin[0].feelings[feelingsID].suffer + +this.props.userErrandDetailsDatabaseAdmin[0].feelings[feelingsID].peers + +this.props.userErrandDetailsDatabaseAdmin[0].feelings[feelingsID].schoolwork + +this.props.userErrandDetailsDatabaseAdmin[0].feelings[feelingsID].load;

    var feeling = {
      width: feelingsScore * 5 + "%",
    };

    var impact = {
      width: impactScore * 5 + "%",
    };

      feelingsArray.push(
        <div key={feelingsID}>
        <p><span className="bold_grey">Emotionella problem:</span></p>
        <div className="bar" style={feeling}><p className="bar">{feelingsScore}</p></div>
        <p><span className="bold_grey">Inverkan på skolarbetet:</span></p>
        <div className="bar" style={impact}><p className="bar">{impactScore}</p></div>
        </div>
      )
    }

    return(
      <div>
        {feelingsArray}
      </div>
    )
  }

  render() {

    const progressWidth = {
      width: '100%',
    };    


    if(this.props.userErrandDetailsDatabaseAdmin[0]) {
      return (
      <div>
        <header>
          <h2 className="header">Steg 3: Sammanfattning</h2>
          <Link to="admin" onClick={this.logOut} className="log_out">Logga ut</Link>
        </header>
        <div className="progress_bar" style={progressWidth}></div>

      <div id="behavior_wrapper">
        <div className="left_flex_wrapper">

          <div className="container show_summary_container">
            <h1>Ämnen</h1>
            <hr/>
            {this.showSubjects()}
          </div>

          <div className="container show_summary_container">
            <h1>Social färdighet</h1>
            <hr/>
            {this.showBehaviors()}
          </div>          

          <div className="container show_summary_container">
                <h1>Styrkor och svagheter</h1>
                <hr/>
                {this.showFeelings()}
            </div>


          
  
        </div>
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
	return { userErrandDetailsDatabaseAdmin: state.userErrandDetailsDatabaseAdmin};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators ({fetchErrandDetailsDatabaseAdmin}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminErrandDetails);

// {this.showUsers()}
//{this.showErrands()}

// <Link to="admin" onClick={this.logOut} className="log_out">Logga ut</Link>