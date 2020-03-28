import React, { useState, Component, PureComponent } from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";
import { Searchbar } from "react-native-paper";

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from "react-native-responsive-screen";

import { countries } from "../../../countries.json";
// import Axios from "axios";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import TimeAgo from "react-native-timeago";

export default () => {
	const [data, setData] = useState(Array);
	const [query, setQuery] = useState("");
	let arrayholder = countries;
	
	const allCountries = useSelector(state => state.stats.allCountries)
	const [countryStats, setCountryStats] = useState(allCountries[0])
	const [region, setRegion] = useState({
		latitude: parseFloat(allCountries[0].lat),
		longitude: parseFloat(allCountries[0].long),
	});

	const [index, setIndex] = useState(null)

	const searchFilterFunction = text => {
		if (!text) {
			setData([]);
			setQuery(text);
			return;
		}
		const newData = arrayholder.filter(item => {
			const itemData = item.name;

			const textData = text;

			return itemData.indexOf(textData) > -1;
		});

		setData(newData);
		setQuery(text);
	};

	const handleSelectItem = country => {
		let stats = allCountries.filter(con => con.iso2 === country.toUpperCase())[0]
		if(!stats) return 
		setRegion({
			latitude: parseFloat(stats.lat),
			longitude: parseFloat(stats.long)
		})
		setCountryStats(stats)
		let index = allCountries.findIndex(con => con.iso2 === country.toUpperCase())
		// console.log(index)
		setIndex(index)

		// console.log(allCountries[index])
	};


	const handleMarkerPress = (loc) => {
		setRegion({
			latitude: parseFloat(loc.lat),
			longitude: parseFloat(loc.long)
		})
		setCountryStats(loc)
	}

	return (
		<ScrollView
			style={{
				height: hp(100),
				backgroundColor: "#161b1d",
			}}>
			<View>
				<MapView
					style={{ height: hp(55), width: wp(100) }}
					customMapStyle={mapStyle}
					region={{
						...region,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421
					}}
					maxZoomLevel={7}
					cacheEnabled={true}>

					{index ? allCountries.slice(index-10, index+10).map(loc => (
						<MapMarker key={Math.random()} loc={loc} handleMarkerPress={handleMarkerPress}/>
					)): null}
					{countryStats && (
						<MapMarker key={Math.random()} loc={countryStats} />
					)}
				</MapView>
			</View>
			<View style={{position: 'relative'}}>
			<Searchbar
				style={{ margin: hp(4), marginBottom: wp(2), borderRadius: 20,color: '#fff', backgroundColor: '#1b232f' }}
				placeholder="Search"
				inputStyle={{ color: '#fff'}}
				placeholderTextColor="gray"
				iconColor="gray"
				onChangeText={text => searchFilterFunction(text)}
				value={query}
			/>
			{data.length > 0 && (
				<View
					style={{
						position: "absolute",
						backgroundColor: "#fff",
						height: hp(14),
						width: wp(85.5),
						top: -80,
						left: 33,
						borderRadius: 20,
						padding: hp(1)
					}}>
					{data.slice(0, 3).map(item => (
						<TouchableOpacity
							key={item.name}
							onPress={() => handleSelectItem(item.cca2)}>
							<Text style={{ fontSize: wp(4.2) }}>
								{" "}
								{item.name}{" "}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			)}
			</View>
			{countryStats && <StatTile countryStats={countryStats} />}
		</ScrollView>
	);
};


class MapMarker extends PureComponent {
	render() {
		const {loc} = this.props;
		return (
			<Marker
				opacity={0.6}
				tracksViewChanges={false}
				// onPress={() => handleMarkerPress(loc)}
				coordinate={{
					latitude: parseFloat(loc.lat),
					longitude: parseFloat(loc.long)
				}}
				title={loc.countryRegion || loc.provinceState}
				description={`Cases: ${loc.confirmed}`}>
				<View
					style={{
						backgroundColor: "red",
						padding: 8,
						borderRadius: 100
					}}
				/>
			</Marker>
		);
	}
}

class StatTile extends Component {
	render() {
		const countryStats = this.props.countryStats
		return (
			<View
				style={{
					alignItems: "center",
					backgroundColor: "#1b232f",
					margin: wp(7),
					marginTop: 0,
					borderRadius: 20
				}}>
				<Text
					style={{
						color: "#fff",
						fontSize: wp(5),
						padding: wp(3),
						paddingBottom: 0
					}}>
					{countryStats.countryRegion}
				</Text>
				<Text style={{ color: "gray", fontSize: wp(3) }}>
					Last update: <TimeAgo time={countryStats.lastUpdate} />
				</Text>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center"
					}}>
					<View
						style={{
							flex: 1,
							justifyContent: "center",
							alignItems: "center", 
							padding: wp(6)
						}}>
						<Text style={{ color: "#f1bb47", fontSize: wp(4.5), fontWeight: 'bold' }}>
							{ countryStats.confirmed}
						</Text>
						<Text style={{ color: "#f1bb47", fontSize: wp(3.2) }}>
							Confirmed
						</Text>
					</View>
					<View
						style={{
							flex: 1,
							justifyContent: "center",
							alignItems: "center", 
							padding: wp(6)
						}}>
						<Text style={{ color: "#f76353", fontSize: wp(4.5), fontWeight: 'bold' }}>
							{countryStats.deaths}
						</Text>
						<Text style={{ color: "#f76353", fontSize: wp(3.2) }}>
							Deaths
						</Text>
					</View>
					<View
						style={{
							flex: 1,
							justifyContent: "center",
							alignItems: "center", 
							padding: wp(6)
						}}>
						<Text style={{ color: "#30cc98", fontSize: wp(4.5), fontWeight: 'bold' }}>
							{countryStats.recovered}
						</Text>
						<Text style={{ color: "#30cc98", fontSize: wp(3.2) }}>
							Recovered
						</Text>
					</View>
				</View>
			</View>
		
		)
	}
}

const mapStyle = [
	{
		elementType: "geometry",
		stylers: [
			{
				color: "#242f3e"
			}
		]
	},
	{
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#746855"
			}
		]
	},
	{
		elementType: "labels.text.stroke",
		stylers: [
			{
				color: "#242f3e"
			}
		]
	},
	{
		featureType: "administrative.locality",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#d59563"
			}
		]
	},
	{
		featureType: "poi",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#d59563"
			}
		]
	},
	{
		featureType: "poi.park",
		elementType: "geometry",
		stylers: [
			{
				color: "#263c3f"
			}
		]
	},
	{
		featureType: "poi.park",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#6b9a76"
			}
		]
	},
	{
		featureType: "road",
		elementType: "geometry",
		stylers: [
			{
				color: "#38414e"
			}
		]
	},
	{
		featureType: "road",
		elementType: "geometry.stroke",
		stylers: [
			{
				color: "#212a37"
			}
		]
	},
	{
		featureType: "road",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#9ca5b3"
			}
		]
	},
	{
		featureType: "road.highway",
		elementType: "geometry",
		stylers: [
			{
				color: "#746855"
			}
		]
	},
	{
		featureType: "road.highway",
		elementType: "geometry.stroke",
		stylers: [
			{
				color: "#1f2835"
			}
		]
	},
	{
		featureType: "road.highway",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#f3d19c"
			}
		]
	},
	{
		featureType: "transit",
		elementType: "geometry",
		stylers: [
			{
				color: "#2f3948"
			}
		]
	},
	{
		featureType: "transit.station",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#d59563"
			}
		]
	},
	{
		featureType: "water",
		elementType: "geometry",
		stylers: [
			{
				color: "#17263c"
			}
		]
	},
	{
		featureType: "water",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#515c6d"
			}
		]
	},
	{
		featureType: "water",
		elementType: "labels.text.stroke",
		stylers: [
			{
				color: "#17263c"
			}
		]
	}
];
