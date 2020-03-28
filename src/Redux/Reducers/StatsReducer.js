import { SET_STATS, COUNTRY_STATS } from "../consts";

const initialState = {
	loading: false,
	data: {
		latest: {
			confirmed: 0,
			deaths: 0,
			recovered: 0
		},
		locations: []
	},
	allCountries: [],
	country: {
		latest: {
			confirmed: 0,
			deaths: 0,
			recovered: 0
		}
	}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_STATS:
			return Object.assign({}, state, {
				data: {
					...state.data,
					...action.payload
				},
				allCountries: action.payload
			});
		case COUNTRY_STATS:
			return Object.assign({}, state, {
				country: action.payload
			});
		default:
			return state;
	}
};
