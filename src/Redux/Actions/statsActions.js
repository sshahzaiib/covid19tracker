import Axios from "axios"
import { SET_STATS, COUNTRY_STATS } from "../consts"
import { ToastAndroid } from "react-native"
// var data = require('jhucsse.covid');

export const setStats = () => dispatch => {
    dispatch(countryStats())
    Axios.get("/api", {
        timeout: 10000
    })
    .then(res => {
        // console.log(res.data)
        const data = {
            latest: {
                confirmed: res.data.confirmed.value,
                deaths: res.data.deaths.value,
                recovered: res.data.recovered.value,
                lastUpdate: res.data.lastUpdate
            }
        }
        dispatch({type: SET_STATS, payload: data })
        ToastAndroid.show('Stats Updated!', ToastAndroid.SHORT);
        dispatch(allCountriesStats())
    })
    .catch(err => {
        ToastAndroid.show('Request Timeout!', ToastAndroid.SHORT);
        console.log(err)
    })
}

export const countryStats = () => dispatch => {
    Axios.get('/api/countries/PK')
    .then(res => {
        const data = {
            latest: {
                confirmed: res.data.confirmed.value,
                deaths: res.data.deaths.value,
                recovered: res.data.recovered.value
            },
            lastUpdate: res.data.lastUpdate
        }
        dispatch({
            type: COUNTRY_STATS,
            payload: data
        })
    })
    .catch(err => {
        console.log(err)
    })
}

export const allCountriesStats = () => dispatch => {
    Axios.get('/api/confirmed')
    .then(res => {
        dispatch({type: SET_STATS, payload: res.data})
    })
    .catch(err => {
        console.log(err)
    })
}