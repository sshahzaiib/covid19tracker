import Axios from "axios";
import { SET_NEWS, SET_LOADING, UNSET_LOADING } from "../consts";

export const setNews = () => dispatch => {
    dispatch({ type: SET_LOADING })
    let fetchURL = "http://newsapi.org/v2/top-headlines?pageSize=25&language=en&q=corona&apiKey=da85d727b8bf46f38fb3fc38b9fb31a4"
	Axios.get(fetchURL)
		.then(res => {
            dispatch({ type: SET_NEWS, payload: res.data.articles });
            dispatch({ type: UNSET_LOADING })
		})
		.catch(err => console.log(err));
};
