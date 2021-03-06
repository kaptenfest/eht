// React 
import React, { Component } from 'react';

// Redux 
import { bindActionCreators } from "redux";

// React-Redux 
import { connect } from "react-redux";

// Action Types 
import { currentErrand } from "../actions/index.js";
import { fetchUserDatabase } from "../actions/index.js";
import { addLearning } from "../actions/index.js";
import { deleteSelectedSubject } from "../actions/index.js";

// Firebase 
import * as firebase from "firebase";

// React Router
import {Router, Route, IndexRoute, Link, IndexLink, IndexRedirect, hashHistory} from 'react-router';

// Footer
import Footer from "../components/Footer.js"


export class StudentLearningInfo extends Component {
	constructor(props){
		super(props)

		// BINDINGS
		this.handleDifficultyChange = this.handleDifficultyChange.bind(this);
		this.handleFrequencyChange = this.handleFrequencyChange.bind(this);

		this.handleOnsetIssue = this.handleOnsetIssue.bind(this);
		this.handleStaminaIssue = this.handleStaminaIssue.bind(this);
		this.handleClosingIssue = this.handleClosingIssue.bind(this);
		this.handleSlowWorkFlowIssue = this.handleSlowWorkFlowIssue.bind(this);
		this.handleGroupInstructionIssue = this.handleGroupInstructionIssue.bind(this);
		this.handleIndividualInstructionIssue = this.handleIndividualInstructionIssue.bind(this);
		this.handleLoseTrackIssueIssue = this.handleLoseTrackIssueIssue.bind(this);
		this.handleReadWriteIssue = this.handleReadWriteIssue.bind(this);
		this.handleFollowInstructionsIssue = this.handleFollowInstructionsIssue.bind(this);
		this.handleAmountsIssue = this.handleAmountsIssue.bind(this);
		this.handleStrategiesIssue = this.handleStrategiesIssue.bind(this);
		this.handleNumbersIssue = this.handleNumbersIssue.bind(this);

		this.state = {
			learningInput: "hide",
			subjectValue: "",
			selectedDifficulty: "1",
			selectedFrequency: "1",

			onsetIssue: false,
			staminaIssue: false,
			closingIssue: false,
			slowWorkFlowIssue: false,
			groupInstructionIssue: false,
			individualInstructionIssue: false,
			loseTrackIssue: false,
			readWriteIssue: false,
			followInstructionsIssue: false,
			amountsIssue: false,
			strategiesIssue: false,
			numbersIssue: false,

			bild: false,
			biologi: false,
			engelska: false,
			fysik: false,
			geografi: false,
			hemkunskap: false,
			historia: false,
			idrott: false,
			kemi: false,
			matematik: false,
			modernaSprak: false,
			musik: false,
			no: false,
			religionskunskap: false,
			so: false,
			samhallskunskap: false,
			slojd: false,
			svenska: false,
			teknik: false,
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
				}, 3000);

			}

			else {
				hashHistory.push('/')
			}
		})

	}

	logOut(){
		firebase.auth().signOut()
		location.reload();
  	}

  	showLearning(){
		let subjectValue = document.getElementById("selecter");
		this.setState({subjectValue: subjectValue.value})
		this.setState({learningInput:"show"})
  	}


	postLearning(){

		return (
			<div className="container">

				<h1>{this.state.subjectValue}</h1>

				<form onSubmit={this.handleFormSubmit.bind(this)}>
					<h2>Hur är barnets måluppfyllnad i ämnet?</h2>
					<p className="info"><span className="bold">1:</span> Ligger tydligt och klart efter, är långt ifrån målen</p>
					<p className="info"><span className="bold">2:</span> Ligger efter behöver extra stöd, är dock nära att nå målen </p>
					<p className="info"><span className="bold">3:</span> Ligger något efter men når antagligen målen</p>
					<p className="info"><span className="bold">4:</span> Är i nivå med snittet i klassen</p>
					<p className="info"><span className="bold">5:</span> Högpresterande</p>

					<div className="difficulty_radiobuttons">
						<label className="difficulty_1">
							<input type="radio"
								   value={"1"}
								   checked={this.state.selectedDifficulty === "1"}
								   onChange={this.handleDifficultyChange}
							/>
							<span></span>
						</label>
						<label className="difficulty_2">
							<input type="radio"
								   value={"2"}
								   checked={this.state.selectedDifficulty === "2"}
								   onChange={this.handleDifficultyChange} />
							<span></span>
						</label>
						<label className="difficulty_3">
							<input type="radio"
								   value={"3"}
								   checked={this.state.selectedDifficulty === "3"}
								   onChange={this.handleDifficultyChange} />
							<span></span>
						</label>
						<label className="difficulty_4">
							<input type="radio"
								   value={"4"}
								   checked={this.state.selectedDifficulty === "4"}
								   onChange={this.handleDifficultyChange} />
							<span></span>
						</label>
						<label className="difficulty_5">
							<input type="radio"
								   value={"5"}
								   checked={this.state.selectedDifficulty === "5"}
								   onChange={this.handleDifficultyChange} />
							<span></span>
						</label>
					</div>

					<div className="issue_container">
						<h2>Inlärningssvårigheter:</h2>

						<div className="issue_divider">

							<div className="left">

								<div className="difficulty_checkbox">
									<p>Ingångsättning</p>
									<label className="checkbox">
										<input
											type="checkbox"
											value={this.state.onsetIssue}
											checked={this.state.onsetIssue}
											onChange={this.handleOnsetIssue}
										/>
										<span></span>
									</label>
								</div>

								<div className="difficulty_checkbox">
									<p>Uthållighet</p>
									<label className="checkbox">
										<input
											type="checkbox"
											value={this.state.staminaIssue}
											checked={this.state.staminaIssue}
											onChange={this.handleStaminaIssue}
										/>
										<span></span>
									</label>
								</div>

								<div className="difficulty_checkbox">
									<p>Avslut</p>
									<label className="checkbox">
										<input
											type="checkbox"
											value={this.state.closingIssue}
											checked={this.state.closingIssue}
											onChange={this.handleClosingIssue}
										/>
										<span></span>
									</label>
								</div>

								<div className="difficulty_checkbox">
									<p>Långsam arbetsgång</p>
									<label className="checkbox">
										<input
											type="checkbox"
											value={this.state.slowWorkFlowIssue}
											checked={this.state.slowWorkFlowIssue}
											onChange={this.handleSlowWorkFlowIssue}
										/>
										<span></span>
									</label>
								</div>

								<div className="difficulty_checkbox">
									<p>Svårt att förstå gruppinstruktioner</p>
									<label className="checkbox">
										<input
											type="checkbox"
											value={this.state.groupInstructionIssue}
											checked={this.state.groupInstructionIssue}
											onChange={this.handleGroupInstructionIssue}
										/>
										<span></span>
									</label>
								</div>

								<div className="difficulty_checkbox">
									<p>Svårt att förstå individuella instruktioner</p>
									<label className="checkbox">
										<input
											type="checkbox"
											value={this.state.individualInstructionIssue}
											checked={this.state.individualInstructionIssue}
											onChange={this.handleIndividualInstructionIssue}
										/>
										<span></span>
									</label>
								</div>

							</div>


							<div className="right">

								<div className="difficulty_checkbox">
									<p>Kommer av sig under arbetet</p>
									<label className="checkbox">
										<input
											type="checkbox"
											value={this.state.loseTrackIssue}
											checked={this.state.loseTrackIssue}
											onChange={this.handleLoseTrackIssueIssue} />
										<span></span>
									</label>
								</div>

								<div className="difficulty_checkbox">
									<p>Läs och skriv svårigheter</p>
									<label className="checkbox">
										<input
											type="checkbox"
											value={this.state.readWriteIssue}
											checked={this.state.readWriteIssue}
											onChange={this.handleReadWriteIssue}
										/>
										<span></span>
									</label>
								</div>

								<div className="difficulty_checkbox">
									<p>Svårt att följa instruktioner</p>
									<label className="checkbox">
										<input
											type="checkbox"
											value={this.state.followInstructionsIssue}
											checked={this.state.followInstructionsIssue}
											onChange={this.handleFollowInstructionsIssue}
										/>
										<span></span>
									</label>
								</div>

								<div className="difficulty_checkbox">
									<p>Svårt med mängder</p>
									<label className="checkbox">
										<input
											type="checkbox"
											value={this.state.amountsIssue}
											checked={this.state.amountsIssue}
											onChange={this.handleAmountsIssue}
										/>
										<span></span>
									</label>
								</div>

								<div className="difficulty_checkbox">
									<p>Svårt att använda sig av strategier</p>
									<label className="checkbox">
										<input
											type="checkbox"
											value={this.state.strategiesIssue}
											checked={this.state.strategiesIssue}
											onChange={this.handleStrategiesIssue}
										/>
										<span></span>
									</label>
								</div>

								<div className="difficulty_checkbox">
									<p>Svårt med taluppfattning (10 systemet, addition, subtraktion)</p>
									<label className="checkbox">
										<input
											type="checkbox"
											value={this.state.numbersIssue}
											checked={this.state.numbersIssue}
											onChange={this.handleNumbersIssue}
										/>
										<span></span>
									</label>
								</div>

							</div>

						</div>

					</div>

					<div>

						<h2>Hur ofta sker inlärningssvårigheterna?</h2>
						<p className="info"><span className="bold">1:</span> 1 gång i veckan eller färre</p>
						<p className="info"><span className="bold">2:</span> 2-3 gånger i veckan</p>
						<p className="info"><span className="bold">3:</span> 3-5 gånger i veckan</p>
						<p className="info"><span className="bold">4:</span> 5-10 gånger i veckan</p>
						<p className="info"><span className="bold">5:</span> 10 gånger och uppåt i veckan</p>

						<div className="difficulty_wrapper">
							<input
								type="range"
								className="range"
								value={this.state.selectedFrequency}
								min="1"
								max="5"
								step="1"
								onChange={this.handleFrequencyChange}
							/>
							<p><span className="bold">{this.state.selectedFrequency}</span></p>
						</div>

					</div>

				<button type="submit">Lägg till</button>
				</form>

			</div>
	  	)

  	}

  	handleDifficultyChange(changeEvent){
		this.setState({selectedDifficulty: changeEvent.target.value});
  	}

  	handleFrequencyChange(changeEvent){
		this.setState({selectedFrequency: changeEvent.target.value});
  	}

  	handleOnsetIssue(changeEvent){

		if(this.state.onsetIssue === false){
	  		this.setState({onsetIssue: true})
		}

		else {
	  		this.setState({onsetIssue: false})
		}

  	}

  	handleStaminaIssue(changeEvent){

		if(this.state.staminaIssue === false){
	 		this.setState({staminaIssue: true})
		}

		else {
	  		this.setState({staminaIssue: false})
		}

  	}

  	handleClosingIssue(changeEvent){

		if(this.state.closingIssue === false){
	  		this.setState({closingIssue: true})
		}

		else {
	  		this.setState({closingIssue: false})
		}

  	}

  	handleSlowWorkFlowIssue(changeEvent){

		if(this.state.slowWorkFlowIssue === false){
	  		this.setState({slowWorkFlowIssue: true})
		}

		else {
	  		this.setState({slowWorkFlowIssue: false})
		}

  	}

  	handleGroupInstructionIssue(changeEvent){

		if(this.state.groupInstructionIssue === false){
	  		this.setState({groupInstructionIssue: true})
		}

		else {
			this.setState({groupInstructionIssue: false})
		}

  	}

  	handleIndividualInstructionIssue(changeEvent){

		if(this.state.individualInstructionIssue === false){
	  		this.setState({individualInstructionIssue: true})
		}

		else {
	  		this.setState({individualInstructionIssue: false})
		}

  	}

  	handleLoseTrackIssueIssue(changeEvent){

		if(this.state.loseTrackIssue === false){
	  		this.setState({loseTrackIssue: true})
		}

		else {
	  		this.setState({loseTrackIssue: false})
		}

  	}

  	handleReadWriteIssue(changeEvent){

		if(this.state.readWriteIssue === false){
	  		this.setState({readWriteIssue: true})
		}

		else {
	  		this.setState({readWriteIssue: false})
		}

  	}

  	handleFollowInstructionsIssue(changeEvent){

		if(this.state.followInstructionsIssue === false){
	  		this.setState({followInstructionsIssue: true})
		}

		else {
	  		this.setState({followInstructionsIssue: false})
		}

  	}

  	handleAmountsIssue(changeEvent){

		if(this.state.amountsIssue === false){
	  		this.setState({amountsIssue: true})
		}

		else {
	  		this.setState({amountsIssue: false})
		}

  	}

  	handleStrategiesIssue(changeEvent){

		if(this.state.strategiesIssue === false){
	 		this.setState({strategiesIssue: true})
		}


		else {
	  		this.setState({strategiesIssue: false})
		}

  	}

  	handleNumbersIssue(changeEvent){

		if(this.state.numbersIssue === false){
	  		this.setState({numbersIssue: true})
		}

		else {
	  		this.setState({numbersIssue: false})
		}

  	}

  	handleFormSubmit(formSubmitEvent){
		formSubmitEvent.preventDefault();

		switch (this.state.subjectValue) {
			case 'Bild':
				this.setState({bild: true});
				break;
			case 'Biologi':
				this.setState({biologi: true});
				break;
			case 'Engelska':
				this.setState({engelska: true});
				break;
			case 'Fysik':
				this.setState({fysik: true});
				break;
			case 'Geografi':
				this.setState({geografi: true});
				break;
			case 'Hemkunskap':
				this.setState({hemkunskap: true});
				break;
			case 'Historia':
				this.setState({historia: true});
				break;
			case 'Idrott':
				this.setState({idrott: true});
				break;
			case 'Kemi':
				this.setState({kemi: true});
				break;
			case 'Matematik':
				this.setState({matematik: true});
				break;
			case 'Moderna språk':
				this.setState({modernaSprak: true});
				break;
			case 'Musik':
				this.setState({musik: true});
				break;
			case 'NO':
				this.setState({no: true});
				break;
			case 'Religionskunskap':
				this.setState({religionskunskap: true});
				break;
			case 'SO':
				this.setState({so: true});
				break;
			case 'Samhällskunskap':
				this.setState({samhallskunskap: true});
				break;
			case 'Slöjd':
				this.setState({slojd: true});
				break;
			case 'Svenska':
				this.setState({svenska: true});
				break;
			case 'Teknik':
				this.setState({teknik: true});
				break;
			default:
				console.log('No subject selected');
		}

		firebase.auth().onAuthStateChanged(user => {

			if(user){
				for (var currentErrandID in this.props.userDatabase[0]);
			}

		this.setState({learningInput:"hide"})

		// addLearning action
		addLearning(
			user.uid,
			currentErrandID,
			user.displayName,
			this.state.subjectValue,
			this.state.selectedDifficulty,
			this.state.selectedFrequency,
			this.state.onsetIssue,
			this.state.staminaIssue,
			this.state.closingIssue,
			this.state.slowWorkFlowIssue,
			this.state.groupInstructionIssue,
			this.state.individualInstructionIssue,
			this.state.loseTrackIssue,
			this.state.readWriteIssue,
			this.state.followInstructionsIssue,
			this.state.amountsIssue,
			this.state.strategiesIssue,
			this.state.numbersIssue
		);

		window.scrollTo(0, 0);

		})

  	}

  	clearForm(){
		this.setState({selectedDifficulty: "1"});
		this.setState({selectedFrequency: "1"});
		this.setState({onsetIssue: false});
		this.setState({staminaIssue: false});
		this.setState({closingIssue: false});
		this.setState({slowWorkFlowIssue: false});
		this.setState({groupInstructionIssue: false});
		this.setState({individualInstructionIssue: false});
		this.setState({loseTrackIssue: false});
		this.setState({readWriteIssue: false});
		this.setState({followInstructionsIssue: false});
		this.setState({amountsIssue: false});
		this.setState({strategiesIssue: false});
		this.setState({numbersIssue: false});
  	}


	showSubjects(){
		var subjectArray = [];
		
		let currentLearningErrand = this.props.currentErrandReducer[0].learning;

		for(var learningID in currentLearningErrand){

			var width = {
				width: currentLearningErrand[learningID].difficulty * 10 + "%",
			};

			var width_frequency = {
				width: currentLearningErrand[learningID].frequency * 10 + "%",
			}

			var color = {
				backgroundColor: "green"
			}

			var color_frequency = {
				backgroundColor: "green"
			}

			if(currentLearningErrand[learningID].difficulty === "1"){
				color = {
					backgroundColor: "#CD3C1F"
				}
			}

			if(currentLearningErrand[learningID].difficulty === "2"){
				color = {
					backgroundColor: "#CD5C1F"
				}
			}

			if(currentLearningErrand[learningID].difficulty === "3"){
				color = {
					backgroundColor: "#CD7D1F"
				}
			}

			if(currentLearningErrand[learningID].difficulty === "4"){
				color = {
					backgroundColor: "#C7CD1F"
				}
			}

			if(currentLearningErrand[learningID].difficulty === "5"){
				color = {
					backgroundColor: "#1FCD31"
				}
			}

			if(currentLearningErrand[learningID].frequency === "5"){
				color_frequency = {
					backgroundColor: "#CD3C1F"
				}
			}

			if(currentLearningErrand[learningID].frequency === "4"){
				color_frequency = {
					backgroundColor: "#CD5C1F"
				}
			}

			if(currentLearningErrand[learningID].frequency === "3"){
				color_frequency = {
					backgroundColor: "#CD7D1F"
				}
			}

			if(currentLearningErrand[learningID].frequency === "2"){
				color_frequency = {
					backgroundColor: "#C7CD1F"
				}
			}

			if(currentLearningErrand[learningID].frequency === "1"){
				color_frequency = {
					backgroundColor: "#1FCD31"
				}
			}

			subjectArray.push(
				<div key={learningID} className="container">

					<h1>{currentLearningErrand[learningID].subject}</h1>

					<p><span className="bold_grey">Måluppfyllnad: </span></p>

					<div className="learning_bar" style={Object.assign(width, color)}>
						<p className="learning_bar">{currentLearningErrand[learningID].difficulty}</p>
					</div>

					<p><span className="bold_grey">Inlärningssvårigheter:</span></p>
					{currentLearningErrand[learningID].onsetIssue === true ? <p>Ingångsättning</p> : <p id="hide"></p>}
					{currentLearningErrand[learningID].staminaIssue === true ? <p>Uthållighet</p> : <p id="hide"></p>}
					{currentLearningErrand[learningID].closingIssue === true ? <p>Avslut</p> : <p id="hide"></p>}
					{currentLearningErrand[learningID].slowWorkFlowIssue === true ? <p>Långsam arbetsgång</p> : <p id="hide"></p>}
					{currentLearningErrand[learningID].groupInstructionIssue === true ? <p>Svårt att förstå gruppinstruktioner</p> : <p id="hide"></p>}
					{currentLearningErrand[learningID].individualInstructionIssue === true ? <p>Svårt att förstå individuella instruktioner</p> : <p id="hide"></p>}
					{currentLearningErrand[learningID].loseTrackIssue === true ? <p>Kommer av sig under arbetet</p> : <p id="hide"></p>}
					{currentLearningErrand[learningID].readWriteIssue === true ? <p>Läs och skriv svårigheter</p> : <p id="hide"></p>}
					{currentLearningErrand[learningID].followInstructionsIssue === true ? <p>Svårt att följa instruktioner</p> : <p id="hide"></p>}
					{currentLearningErrand[learningID].amountsIssue === true ? <p>Svårt med mängder</p> : <p id="hide"></p>}
					{currentLearningErrand[learningID].strategiesIssue === true ? <p>Använda sig av strategier</p> : <p id="hide"></p>}
					{currentLearningErrand[learningID].numbersIssue === true ? <p>Svårt med taluppfattning (10 systemet, addition, subtraktion)</p> : <p id="hide"></p>}

					{currentLearningErrand[learningID].onsetIssue === false &&
					currentLearningErrand[learningID].staminaIssue === false &&
					currentLearningErrand[learningID].closingIssue === false &&
					currentLearningErrand[learningID].slowWorkFlowIssue === false &&
					currentLearningErrand[learningID].groupInstructionIssue === false &&
					currentLearningErrand[learningID].individualInstructionIssue === false &&
					currentLearningErrand[learningID].loseTrackIssue === false &&
					currentLearningErrand[learningID].readWriteIssue === false &&
					currentLearningErrand[learningID].followInstructionsIssue === false &&
					currentLearningErrand[learningID].amountsIssue === false &&
					currentLearningErrand[learningID].strategiesIssue === false &&
					currentLearningErrand[learningID].numbersIssue === false ? <p>Inga områden valda</p> : <p id="hide"></p>}

					<p><span className="bold_grey">Hur ofta sker inlärningssvårigheterna:</span></p>

					<div className="learning_bar" style={Object.assign(width_frequency, color_frequency)}>
						<p className="learning_bar">{currentLearningErrand[learningID].frequency}</p>
					</div>

					<button className="delete" onClick={this.delSubject.bind(this, learningID, currentLearningErrand[learningID].subject)}>Radera ämne</button>

				</div>
			)

		}

		return(
			<div className="subject_wrapper">
				{subjectArray}
			</div>
		)

	}


  	delSubject(learningID, subject){

		firebase.auth().onAuthStateChanged(user => {

			if(user){
				for (var currentErrandID in this.props.userDatabase[0]);
			}

			switch (subject) {
				case 'Bild':
					this.setState({bild: false});
					break;
				case 'Biologi':
					this.setState({biologi: false});
					break;
				case 'Engelska':
					this.setState({engelska: false});
					break;
				case 'Fysik':
					this.setState({fysik: false});
					break;
				case 'Geografi':
					this.setState({geografi: false});
					break;
				case 'Hemkunskap':
					this.setState({hemkunskap: false});
					break;
				case 'Historia':
					this.setState({historia: false});
					break;
				case 'Idrott':
					this.setState({idrott: false});
					break;
				case 'Kemi':
					this.setState({kemi: false});
					break;
				case 'Matematik':
					this.setState({matematik: false});
					break;
				case 'Moderna språk':
					this.setState({modernaSprak: false});
					break;
				case 'Musik':
					this.setState({musik: false});
					break;
				case 'NO':
					this.setState({no: false});
					break;
				case 'Religionskunskap':
					this.setState({religionskunskap: false});
					break;
				case 'SO':
					this.setState({so: false});
					break;
				case 'Samhällskunskap':
					this.setState({samhallskunskap: false});
					break;
				case 'Slöjd':
					this.setState({slojd: false});
					break;
				case 'Svenska':
					this.setState({svenska: false});
					break;
				case 'Teknik':
					this.setState({teknik: false});
					break;
				default:
				console.log('No subject selected');
			}

			deleteSelectedSubject(user.uid, currentErrandID, user.displayName, learningID);

		})
	}

  	render() {
		const progressWidth = {
	  		width: '40%',
		};

		if(this.props.currentErrandReducer[0]) {

			return (
				<div>

					<header>
						<h2 className="header">Steg 3: Inlärning</h2>
						<Link to="/student-behavior-info" className="next_step">Nästa steg &#x27A4;</Link>
					</header>

					<div className="progress_bar" style={progressWidth}></div>

					<div className="left_flex_wrapper">

						<div>

							<div className="container">
								<select id="selecter" onClick={this.clearForm.bind(this)} onChange={this.showLearning.bind(this)}>
									<option selected disabled>Välj ett ämne att lägga till:</option>
									<option disabled={this.state.bild} value="Bild">Bild</option>
									<option disabled={this.state.biologi} value="Biologi">Biologi</option>
									<option disabled={this.state.engelska} value="Engelska">Engelska</option>
									<option disabled={this.state.fysik} value="Fysik">Fysik</option>
									<option disabled={this.state.geografi} value="Geografi">Geografi</option>
									<option disabled={this.state.hemkunskap} value="Hemkunskap">Hemkunskap</option>
									<option disabled={this.state.historia} value="Historia">Historia</option>
									<option disabled={this.state.idrott} value="Idrott">Idrott</option>
									<option disabled={this.state.kemi} value="Kemi">Kemi</option>
									<option disabled={this.state.matematik} value="Matematik">Matematik</option>
									<option disabled={this.state.modernaSprak} value="Moderna språk">Moderna språk</option>
									<option disabled={this.state.musik} value="Musik">Musik</option>
									<option disabled={this.state.no} value="NO">NO</option>
									<option disabled={this.state.religionskunskap} value="Religionskunskap">Religionskunskap</option>
									<option disabled={this.state.so} value="SO">SO</option>
									<option disabled={this.state.samhallskunskap} value="Samhällskunskap">Samhällskunskap</option>
									<option disabled={this.state.slojd} value="Slöjd">Slöjd</option>
									<option disabled={this.state.svenska} value="Svenska">Svenska</option>
									<option disabled={this.state.teknik} value="Teknik">Teknik</option>
								</select>
							</div>

							<div id={this.state.learningInput}>
								{this.postLearning()}
							</div>

						</div>

						<div className="added_subjects_wrapper">
							{this.showSubjects()}
						</div>

					</div>

		  			<Footer />
  
				</div>
			)
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

export default connect(mapStateToProps, mapDispatchToProps)(StudentLearningInfo);

