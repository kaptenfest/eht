// Action Types
import * as types from "../constants/ActionTypes";


export default function (state = [], action){
	switch (action.type) {
		case types.FETCH_USERS_ERRANDS:
			state.splice(0, state.length)
			return state.concat(action.payload);
		}
			return state;
}

