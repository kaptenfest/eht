// Action Types =================================
import * as types from "../constants/ActionTypes";

// import {firebaseTestAction} from "../actions/index";


export default function (state = [], action){
	switch (action.type) {
		case types.FETCH_CURRENT_ERRAND:
			state.splice(0, state.length)
			return state.concat(action.payload);
		}
			return state;
}

