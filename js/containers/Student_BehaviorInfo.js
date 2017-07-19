// React 
import React, { Component } from 'react';

// Redux 
import { bindActionCreators } from "redux";

// React-Redux 
import { connect } from "react-redux";

// Action Types 
import { currentErrand } from "../actions/index.js";
import { fetchUserDatabase } from "../actions/index.js";
import { addBehavior } from "../actions/index.js";
import { deleteSelectedBehavior } from "../actions/index.js";

// Firebase 
import * as firebase from "firebase";

// React Router
import {Router, Route, IndexRoute, Link, IndexLink, IndexRedirect, hashHistory} from 'react-router';

// Footer
import Footer from "../components/Footer.js"


export class StudentBehaviorInfo extends Component {
  constructor(props){
    super(props)

    // BINDINGS
    this.handleRulesIssue = this.handleRulesIssue.bind(this);
    this.handleFrequencyRules = this.handleFrequencyRules.bind(this);

    this.handleVerbalIssue = this.handleVerbalIssue.bind(this);
    this.handleFrequencyVerbal = this.handleFrequencyVerbal.bind(this);

    this.handleAggressiveIssue = this.handleAggressiveIssue.bind(this);
    this.handleFrequencyAggressive = this.handleFrequencyAggressive.bind(this); 

    this.handleSeclusiveIssue = this.handleSeclusiveIssue.bind(this);
    this.handleFrequencySeclusive = this.handleFrequencySeclusive.bind(this);       

    this.showBehaviors = this.showBehaviors.bind(this);

    this.state = {
      behaviorInput: "hide",
      behaviorValue: "",

      rulesIssue: false,
      rulesInput: "hide",
      selectedRulesFrequency: "1",

      verbalIssue: false,
      verbalInput: "hide",
      selectedVerbalFrequency: "1",

      aggressiveIssue: false,
      aggressiveInput: "hide",
      selectedAggressiveFrequency: "1",     

      seclusiveIssue: false,
      seclusiveInput: "hide",
      selectedSeclusiveFrequency: "1"         


    }
  }

  componentDidMount(){
      // Get current errand id
      firebase.auth().onAuthStateChanged(user => {
        if(user){
          this.props.fetchUserDatabase(user.uid);

          // Get current errand data
          setTimeout( () => {
            for (var currentErrandID in this.props.userDatabase[0]);
            this.props.currentErrand(user.uid, currentErrandID, user.displayName);
          }, 2000);
          
        }
  
        else{
         hashHistory.push('/')
        }
      })

  }

  logOut(){
    firebase.auth().signOut()
    location.reload();
  }

  showBehavior(){
    let behaviorValue = document.getElementById("selecter");
    this.setState({behaviorValue: behaviorValue.value})
    this.setState({behaviorInput:"show"})
  }


  postBehavior(){

      return (
        <div className="container post_behavior_container">

          <h2>{this.state.behaviorValue}</h2>
    
          <form onSubmit={this.handleFormSubmit.bind(this)}>

                <div className="difficulty_checkbox">
                  <p className="no_padding">Svårt att följa de instruktioner eller regler som finns inom givet sammanhanget och hamnar således i konflikt med andra barn eller skolpersonal på grund av detta.</p>
                  <label className="checkbox">
                    <input type="checkbox" value={this.state.rulesIssue} checked={this.state.rulesIssue} onChange={this.handleRulesIssue} />
                    <span></span>
                  </label>
                </div>
              <div className="row_align" id={this.state.rulesInput}>
                  <input type="range" className="behavior_range" value={this.state.selectedRulesFrequency} min="1" max="10" step="1" onChange={this.handleFrequencyRules} />
                   <p>{this.state.selectedRulesFrequency}</p>
              </div>

                <div className="difficulty_checkbox">
                  <p className="no_padding">Svårt för att verbalt kommunicera med andra, det vill säga att framföra vad en själv tycker och tänker samt tolka vad andra säger.</p>
                  <label className="checkbox">
                    <input type="checkbox" value={this.state.verbalIssue} checked={this.state.verbalIssue} onChange={this.handleVerbalIssue} />
                    <span></span>
                  </label>
                </div>
              <div className="row_align" id={this.state.verbalInput}>
                  <input type="range" className="behavior_range" value={this.state.selectedVerbalFrequency} min="1" max="10" step="1" onChange={this.handleFrequencyVerbal} />
                   <p>{this.state.selectedVerbalFrequency}</p>
              </div>                

                <div className="difficulty_checkbox">
                  <p className="no_padding">Kan agera aggressivt vilket noteras i form av elaka kommentarer, att denne blir fysiskt hårdhänt, bråk eller ilske utbrott.</p>
                  <label className="checkbox">
                    <input type="checkbox" value={this.state.aggressiveIssue} checked={this.state.aggressiveIssue} onChange={this.handleAggressiveIssue} />
                    <span></span>
                  </label>
                </div>
              <div className="row_align" id={this.state.aggressiveInput}>
                  <input type="range" className="behavior_range" value={this.state.selectedAggressiveFrequency} min="1" max="10" step="1" onChange={this.handleFrequencyAggressive} />
                   <p>{this.state.selectedAggressiveFrequency}</p>
              </div>                   

                <div className="difficulty_checkbox">
                  <p className="no_padding">Drar sig undan från andra, är ensam och håller sig ofta för sig självt</p>
                  <label className="checkbox">
                    <input type="checkbox" value={this.state.seclusiveIssue} checked={this.state.seclusiveIssue} onChange={this.handleSeclusiveIssue} />
                    <span></span>
                  </label>
                </div>
              <div className="row_align" id={this.state.seclusiveInput}>
                  <input type="range" className="behavior_range" value={this.state.selectedSeclusiveFrequency} min="1" max="10" step="1" onChange={this.handleFrequencySeclusive} />
                   <p>{this.state.selectedSeclusiveFrequency}</p>
              </div>                                             

              
            {this.state.rulesIssue === false && this.state.verbalIssue === false && this.state.aggressiveIssue === false && this.state.seclusiveIssue === false ? <button type="submit" disabled>Lägg till ett beteende först</button> : <button type="submit">Lägg till</button>}

          </form>
  
  
        </div>
      )

  }

  handleRulesIssue(changeEvent){
    if(this.state.rulesIssue === false){
      this.setState({rulesIssue: true})
      this.setState({rulesInput: "show"})
    }
    else {
      this.setState({rulesIssue: false})
      this.setState({rulesInput: "hide"})
      this.setState({selectedRulesFrequency: "1"})
    }
  }

  handleVerbalIssue(changeEvent){
    if(this.state.verbalIssue === false){
      this.setState({verbalIssue: true})
      this.setState({verbalInput: "show"})
    }
    else {
      this.setState({verbalIssue: false})
      this.setState({verbalInput: "hide"})
      this.setState({selectedVerbalFrequency: "1"})
    }
  }

  handleAggressiveIssue(changeEvent){
    if(this.state.aggressiveIssue === false){
      this.setState({aggressiveIssue: true})
      this.setState({aggressiveInput: "show"})
    }
    else {
      this.setState({aggressiveIssue: false})
      this.setState({aggressiveInput: "hide"})
      this.setState({selectedAggressiveFrequency: "1"})
    }
  }  

  handleSeclusiveIssue(changeEvent){
    if(this.state.seclusiveIssue === false){
      this.setState({seclusiveIssue: true})
      this.setState({seclusiveInput: "show"})
    }
    else {
      this.setState({seclusiveIssue: false})
      this.setState({seclusiveInput: "hide"})
      this.setState({selectedSeclusiveFrequency: "1"})
    }
  }    

  handleFrequencyRules(changeEvent){
    this.setState({selectedRulesFrequency: changeEvent.target.value});
  }

  handleFrequencyVerbal(changeEvent){
    this.setState({selectedVerbalFrequency: changeEvent.target.value});
  }

  handleFrequencyAggressive(changeEvent){
    this.setState({selectedAggressiveFrequency: changeEvent.target.value});
  }

  handleFrequencySeclusive(changeEvent){
    this.setState({selectedSeclusiveFrequency: changeEvent.target.value});
  }    

  handleFormSubmit(formSubmitEvent){
    formSubmitEvent.preventDefault();

    firebase.auth().onAuthStateChanged(user => {
      if(user){
        for (var currentErrandID in this.props.userDatabase[0]);
      }
    
    this.setState({behaviorInput:"hide"})


    // addBehavior action
    addBehavior(user.uid, currentErrandID, user.displayName, this.state.behaviorValue, this.state.rulesIssue, this.state.selectedRulesFrequency, this.state.verbalIssue, this.state.selectedVerbalFrequency, this.state.aggressiveIssue, this.state.selectedAggressiveFrequency, this.state.seclusiveIssue, this.state.selectedSeclusiveFrequency)

    window.scrollTo(0, 0);

    })
  }

  clearForm(){
    this.setState({rulesIssue: false})
    this.setState({verbalIssue: false})
    this.setState({aggressiveIssue: false})
    this.setState({seclusiveIssue: false})

    this.setState({selectedRulesFrequency: "1"})
    this.setState({selectedVerbalFrequency: "1"})
    this.setState({selectedAggressiveFrequency: "1"})
    this.setState({selectedSeclusiveFrequency: "1"})

    this.setState({rulesInput: "hide"})
    this.setState({verbalInput: "hide"})
    this.setState({aggressiveInput: "hide"})
    this.setState({seclusiveInput: "hide"})
  }





  showBehaviors(){
    var behaviorArray = [];

    for(var behaviorID in this.props.currentErrandReducer[0].behavior){

      behaviorArray.push(
        <div key={behaviorID} className="container show_behavior_container">

          <h1>{this.props.currentErrandReducer[0].behavior[behaviorID].behaviorValue}</h1>
          
          {this.props.currentErrandReducer[0].behavior[behaviorID].rulesIssue === true ? <p>Svårt att följa de instruktioner eller regler som finns inom givet sammanhanget och hamnar således i konflikt med andra barn eller skolpersonal på grund av detta: <span className="bold">{this.props.currentErrandReducer[0].behavior[behaviorID].rulesFrequency}</span></p> : <p id="hide"></p>}
          {this.props.currentErrandReducer[0].behavior[behaviorID].verbalIssue === true ? <p>Svårt för att verbalt kommunicera med andra, det vill säga att framföra vad en själv tycker och tänker samt tolka vad andra säger: <span className="bold">{this.props.currentErrandReducer[0].behavior[behaviorID].verbalFrequency}</span></p> : <p id="hide"></p>}
          {this.props.currentErrandReducer[0].behavior[behaviorID].aggressiveIssue === true ? <p>Svårt för att verbalt kommunicera med andra, det vill säga att framföra vad en själv tycker och tänker samt tolka vad andra säger: <span className="bold">{this.props.currentErrandReducer[0].behavior[behaviorID].aggressiveFrequency}</span></p> : <p id="hide"></p>}
          {this.props.currentErrandReducer[0].behavior[behaviorID].seclusiveIssue === true ? <p>Drar sig undan från andra, är ensam och håller sig ofta för sig självt: <span className="bold">{this.props.currentErrandReducer[0].behavior[behaviorID].seclusiveFrequency}</span></p> : <p id="hide"></p>}
          

          <button className="delete" onClick={this.delBehavior.bind(this, behaviorID)}>Radera situation</button>
        </div>
      )

    }

    return(
      <div className="behavior_wrapper">
        {behaviorArray}
      </div>
    )

  }
  




  
  delBehavior(behaviorID){

    firebase.auth().onAuthStateChanged(user => {
      if(user){
        for (var currentErrandID in this.props.userDatabase[0]);
      }

    deleteSelectedBehavior(user.uid, currentErrandID, user.displayName, behaviorID);

    })
  }
  

  
  render() {

    const progressWidth = {
      width: '60%',
    };

    if(this.props.currentErrandReducer[0]) {
      return (
        <div>

        <header>
          <h2 className="header">Steg 4: Social färdighet</h2>
          <Link className="next_step" to="/student-feelings-info">Nästa steg &#x27A4;</Link>
        </header>
        <div className="progress_bar" style={progressWidth}></div>
 
            <div className="left_flex_wrapper">

            <div>
            <div className="container">
              <select id="selecter" onClick={this.clearForm.bind(this)} onChange={this.showBehavior.bind(this)}>
                <option selected disabled>Situationer där hinder uppstår:</option>
                <option value="Matsal">Matsal</option>
                <option value="Rast inne">Rast inne</option>
                <option value="Rast ute">Rast ute</option>
                <option value="Gruppsamlingar">Gruppsamlingar</option>
                <option value="Friluftsdagar / Större planerade aktiviteter">Friluftsdagar / Större planerade aktiviteter</option>
                <option value="Styrd lek">Styrd lek</option>
                <option value="Fri lek">Fri lek</option>
                <option value="Korridor">Korridor</option>
                <option value="Övergångar">Övergångar</option>
              </select>
              </div>
            
  
              <div id={this.state.behaviorInput}>
                <div>{this.postBehavior()}</div>
              </div>

            </div>
  
              <div>
                {this.showBehaviors()}
              </div>

            </div>

            <Footer />
  
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
	return { userDatabase: state.userDatabase, currentErrandReducer: state.currentErrandReducer };
}

function mapDispatchToProps(dispatch){
	return bindActionCreators ({currentErrand, fetchUserDatabase}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentBehaviorInfo);

/*

  for(var prop in this.props.testReducer[0].react.multiple){
    console.log("This is prop", prop + " with value: " + this.props.testReducer[0].react.multiple[prop])
  }

*/

