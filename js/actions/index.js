// Action Types 
import * as types from "../constants/ActionTypes";

// Firebase 
import * as firebase from "firebase";

// Firebase config (try to import this instead!)
var config = {
	apiKey: "AIzaSyCgafWj7MAmmlRnN43wvqTbgR8nHoGR_vw",
  authDomain: "exarbete-eht.firebaseapp.com",
  databaseURL: "https://exarbete-eht.firebaseio.com",
  storageBucket: "exarbete-eht.appspot.com",
  messagingSenderId: "353055445802"
};
firebase.initializeApp(config);

// Hämta hela databasen som Admin
export function fetchDatabaseAdmin(){
const rootRef = firebase.database().ref();
const secure = rootRef.child("users");


	return dispatch => {
		secure.on("value", snap => {
			dispatch({
				type: types.FETCH_USER_DATABASE_ADMIN,
				payload: snap.val()
			})
		})
	};

}

// Hämtar ärenden som Admin
export function fetchErrandsDatabaseAdmin(user_id, displayName){
const rootRef = firebase.database().ref();
const users = rootRef.child("users");
const userID = users.child(user_id)
const school = userID.child(displayName); // Hämta från Browse_Users i framtiden!

	return dispatch => {
		school.on("value", snap => {
			dispatch({
				type: types.FETCH_USERS_ERRANDS,
				payload: snap.val()
			})
		})
	};

}

// Hämtar ärende detaljer som Admin
export function fetchErrandDetailsDatabaseAdmin(user_id, errandDetails, displayName){
const rootRef = firebase.database().ref();
const users = rootRef.child("users");
const userID = users.child(user_id)
const school = userID.child(displayName); // Hämta från Browse_Users i framtiden!
const details = school.child(errandDetails)

	return dispatch => {
		details.on("value", snap => {
			dispatch({
				type: types.FETCH_USERS_ERRAND_DETAILS,
				payload: snap.val()
			})
		})
	}; 

}


// Hämtar hela databasen med userID
export function fetchUserDatabase(userID){

// Const for Firebase...
const rootRef = firebase.database().ref().child("users");
const secure = rootRef.child(userID);


	return dispatch => {
		secure.on("child_added", snap => {
			dispatch({
				type: types.FETCH_USER_DATABASE,
				payload: snap.val()
			})
		})
	};

}

// Hämtar senaster ärendet
export function currentErrand(userID, currentErrandID, displayName){

// Const for Firebase...
const rootRef = firebase.database().ref().child("users");
const secure = rootRef.child(userID);
const school = secure.child(displayName); // Plocka namn från user.info
const errand = school.child(currentErrandID)
	
	return dispatch => {
		errand.on("value", snap => {
			dispatch({
				type: types.FETCH_CURRENT_ERRAND,
				payload: snap.val()
			})
		})
	};

}

// Lägger till Basinfo
export function addBasicInfo(userID, displayName, teacherName, teacherClass, teacherSubject, studentName, studentAge, studentClass, studentMentor, studentTime){
	
const rootRef = firebase.database().ref().child("users");
const secure = rootRef.child(userID);
const school = secure.child(displayName); // Plocka namn från user.info
	
	var basicInfoKey = school.push({
		basicInfo: {
			teacher: {
				name: teacherName,
				class: teacherClass,
				subject: teacherSubject
			},
			student: {
				name: studentName,
				age: studentAge,
				class: studentClass,
				mentor: studentMentor,
				mentepontum: studentTime
			},
		},
	});

}

// Lägger till Inlärnings info
export function addLearning(userID, currentErrandID, displayName, subject, difficulty, frequency, onsetIssue, staminaIssue, closingIssue, slowWorkFlowIssue, groupInstructionIssue, individualInstructionIssue, loseTrackIssue, readWriteIssue, followInstructionsIssue, amountsIssue, strategiesIssue, numbersIssue){

const rootRef = firebase.database().ref().child("users");
const secure = rootRef.child(userID);
const school = secure.child(displayName);
const pushID = school.child(currentErrandID)
const postsRef = pushID.child("learning");
	
	postsRef.push({
		subject: subject,
		difficulty: difficulty,
		frequency: frequency,
		onsetIssue: onsetIssue,
		staminaIssue: staminaIssue,
		closingIssue: closingIssue,
		slowWorkFlowIssue: slowWorkFlowIssue,
		groupInstructionIssue: groupInstructionIssue,
		individualInstructionIssue: individualInstructionIssue,
		loseTrackIssue: loseTrackIssue,
		readWriteIssue: readWriteIssue,
		followInstructionsIssue: followInstructionsIssue,
		amountsIssue: amountsIssue,
		strategiesIssue: strategiesIssue,
		numbersIssue: numbersIssue
	});

}

// Tar bort ett tillagt ämne
export function deleteSelectedSubject(userID, currentErrandID, displayName, learningID){

const rootRef = firebase.database().ref().child("users");
const secure = rootRef.child(userID);
const school = secure.child(displayName);
const pushID = school.child(currentErrandID)
const postsRef = pushID.child("learning");

	postsRef.child(learningID).remove();

}

// Lägg till beteende info
export function addBehavior(userID, currentErrandID, displayName, behaviorValue, rulesIssue, rulesFrequency, verbalIssue, verbalFrequency, aggressiveIssue, aggressiveFrequency, seclusiveIssue, seclusiveFrequency){
const rootRef = firebase.database().ref().child("users");
const secure = rootRef.child(userID);
const school = secure.child(displayName);
const pushID = school.child(currentErrandID)
const postsRef = pushID.child("behavior");

	postsRef.push({
		behaviorValue: behaviorValue,
		rulesIssue: rulesIssue,
		rulesFrequency: rulesFrequency,
		verbalIssue: verbalIssue,
		verbalFrequency: verbalFrequency,
		aggressiveIssue: aggressiveIssue,
		aggressiveFrequency: aggressiveFrequency,
		seclusiveIssue: seclusiveIssue,
		seclusiveFrequency: seclusiveFrequency
	});

}

// Tar bort ett tillagt beteende
export function deleteSelectedBehavior(userID, currentErrandID, displayName, behaviorID){

const rootRef = firebase.database().ref().child("users");
const secure = rootRef.child(userID);
const school = secure.child(displayName);
const pushID = school.child(currentErrandID)
const postsRef = pushID.child("behavior");

postsRef.child(behaviorID).remove();

}

export function addFeelings(userID, currentErrandID, displayName, rage, concern, sad, nervous, scared, trust, fail, reports, tests, wrong, difficulties, issueFrequency, suffer, peers, schoolwork, load){
const rootRef = firebase.database().ref().child("users");
const secure = rootRef.child(userID);
const school = secure.child(displayName);
const pushID = school.child(currentErrandID)
const postsRef = pushID.child("feelings");

	postsRef.push({
		rage: rage,
		concern: concern,
		sad: sad,
		nervous: nervous,
		scared: scared,
		trust: trust,
		fail: fail,
		reports: reports,
		tests: tests,
		wrong: wrong,
		difficulties: difficulties,
		issueFrequency: issueFrequency,
		suffer: suffer,
		peers: peers,
		schoolwork: schoolwork,
		load: load
	});

}
