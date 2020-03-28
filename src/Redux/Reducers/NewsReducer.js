import { SET_NEWS } from "../consts";

const initialState = {
	loading: false,
	news: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_NEWS:
			return Object.assign({}, state, {
				news: action.payload
			});
		default:
			return state;
	}
};
