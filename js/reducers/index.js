// Redux =================================
import { combineReducers } from "redux";

// Reducers =================================
import userDatabase from "./reducer_userDatabase";
import currentErrandReducer from "./reducer_currentErrand";
import userDatabaseAdmin from "./reducer_userDatabaseAdmin";
import userErrandsDatabaseAdmin from "./reducer_userErrandsDatabaseAdmin";
import userErrandDetailsDatabaseAdmin from "./reducer_userErrandDetailsDatabaseAdmin";



const rootReducer = combineReducers({
	userDatabase: userDatabase,
	currentErrandReducer: currentErrandReducer,
	userDatabaseAdmin: userDatabaseAdmin,
	userErrandsDatabaseAdmin: userErrandsDatabaseAdmin,
	userErrandDetailsDatabaseAdmin: userErrandDetailsDatabaseAdmin
});

export default rootReducer;