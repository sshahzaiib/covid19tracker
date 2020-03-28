import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import {
	View,
	FlatList,
	TouchableOpacity,
	Text,
	Alert,
	ScrollView
} from "react-native";
import { List } from "react-native-paper";

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { useNavigationParam, useNavigation } from "react-navigation-hooks";
import Axios from "axios";
// import Pagination, { Icon, Dot } from "react-native-pagination";
import StatTile from "../../../Components/StatTile";

export default () => {
	const country = useNavigationParam("country");
	const [timeline, setTimeline] = useState([]);
	const [countryDetail, setCountryDetail] = useState(Object);

	const navigation = useNavigation();

	useLayoutEffect(() => {
		Axios.get(
			`https://thevirustracker.com/free-api?countryTimeline=${country}`,
			// `https://thevirustracker.com/free-api?countryTimeline=pk`,
			{
				headers: {
					"content-type": "application/x-www-form-urlencoded"
				},
				timeout: 10000,
				timeoutErrorMessage: "Request timeout"
			}
		)
			.then(res => {
				if (res.data.length) {
					Alert.alert(
						"Oops!",
						`Something went wrong. Please select again.`,
						[{ text: "OK", onPress: () => navigation.goBack() }],
						{ cancelable: false }
					);
				} else if (res.data.countrytimelinedata) {
					let dataArray = res.data.timelineitems[0];
					delete dataArray.stat;
					let keys = Object.keys(dataArray);
					dataArray = Object.values(dataArray);
					setCountryDetail(res.data.countrytimelinedata[0]);
					dataArray.map((item, i) => (item.date = keys[i]));
					return dataArray;
				} else {
					Alert.alert(
						"Oops!",
						`No data availalbe. Please select another country.`,
						[{ text: "OK", onPress: () => navigation.goBack() }],
						{ cancelable: false }
					);
				}
			})
			.then(data => {
				data.reverse();
				setTimeline(data);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	const renderItem = ({
		item: {
			total_cases,
			new_daily_cases,
			total_deaths,
			new_daily_deaths,
			total_recoveries,
			date
		}
	}) => {
		return (
			<StatTile
				total={total_cases}
				onDate={new_daily_cases}
				totalDeaths={total_deaths}
				deathsOnDate={new_daily_deaths}
				recovered={total_recoveries}
				date={date}
			/>
		);
	};
	return (
		<List.Section>
			<FlatList
				data={timeline}
				renderItem={renderItem}
				keyExtractor={item => item.date.toString()}
			/>
		</List.Section>
	);
};
