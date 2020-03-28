import React, { useEffect, useState } from "react";
import {
	ScrollView,
	View,
	Text,
} from "react-native";
import {Button} from "react-native-paper"
import { useDispatch, useSelector } from "react-redux";
import { setStats } from "../../Redux/Actions/statsActions";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Pie from "react-native-pie";


import { Divider } from "react-native-paper";
import TimeAgo from "react-native-timeago";
import { useNavigation } from "react-navigation-hooks";

export default () => {
	const { navigate } = useNavigation()
	const dispatch = useDispatch();
	const stats = useSelector(state => state.stats.data.latest);
	const [percentage, setPercentage] = useState({
		deaths: 33,
		recovered: 33,
		total: 33
	});
	const countryStats = useSelector(state => state.stats.country)

	useEffect(() => {
		dispatch(setStats());
	}, []);

	useEffect(() => {
		if(stats.confirmed > 0) {
			setPercentage({
				deaths: Math.round((stats.deaths / stats.confirmed) * 100),
				recovered: Math.round((stats.recovered / stats.confirmed) * 100),
				total: 100 -((Math.round((stats.deaths / stats.confirmed) * 100) + Math.round((stats.recovered / stats.confirmed) * 100)))
			});
		}
	}, [stats]);

	return (
		<ScrollView style={{ height: hp(100), backgroundColor: "#161b1d" }}>
			<View
				style={{
					backgroundColor: "#1b232f",
					margin: wp(7),
					borderRadius: 20
				}}>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<View style={{ width: wp(50) }}>
						<View style={{ margin: wp(5), position: "relative" }}>
							<Pie
								backgroundColor="#1b232f"
								radius={90}
								innerRadius={70}
								sections={[
									{
										percentage: percentage.total,
										color: "#f1bb47"
									},
									{
										percentage: percentage.deaths,
										color: "#f76353"
									},
									{
										percentage: percentage.recovered,
										color: "#30cc98"
									}
								]}
								dividerSize={1}
								strokeCap={"round"}
							/>
							<View
								style={{
									position: "absolute",
									top: 63,
									left: 35
								}}>
								<View style={{ alignItems: "center" }}>
									<Text
										style={{
											color: "#fff",
											fontSize: wp(5)
										}}>
										{stats.confirmed}
									</Text>
									<Text
										style={{
											color: "#f1bb47",
											fontSize: wp(3.6)
										}}>
										Cases Reported
									</Text>
								</View>
							</View>
						</View>
					</View>
					<View style={{ width: wp(35) }}>
						<View
							style={{
								alignItems: "center",
								marginBottom: wp(7)
							}}>
							<Text style={{ color: "#fff", fontSize: wp(5) }}>
								{stats.recovered}
							</Text>
							<Text
								style={{ color: "#30cc98", fontSize: wp(3.6) }}>
								Recovered
							</Text>
						</View>
						<View style={{ alignItems: "center" }}>
							<Text style={{ color: "#fff", fontSize: wp(5) }}>
								{stats.deaths}
							</Text>
							<Text
								style={{ color: "#f76353", fontSize: wp(3.6) }}>
								Deaths
							</Text>
						</View>
					</View>
				</View>
				<View style={{ alignItems: "center" }}>
					<Divider
						style={{
							borderWidth: 0.2,
							borderColor: "gray",
							width: wp(80)
						}}
					/>
				</View>
				{/* <Text
					style={{
						color: "#929292",
						margin: wp(4),
						marginBottom: 0
					}}>
					Tap this card for more information.
				</Text> */}
				<Text style={{ color: "#929292", margin: wp(4) }}>
					Stats by :
					'https://covid19.mathdro.id'
				</Text>
			</View>
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
						paddingBottom: 0,
						paddingTop: wp(5)
					}}>
					Pakistan
				</Text>
				<Text style={{ color: "gray", fontSize: wp(3) }}>
					Last update: <TimeAgo time={countryStats.lastUpdate} interval={50000} />
				</Text>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						paddingBottom: wp(6)
					}}>
					<View
						style={{
							flex: 1,
							justifyContent: "center",
							alignItems: "center", 
							padding: wp(6)
						}}>
						<Text style={{ color: "#f1bb47", fontSize: wp(4.5), fontWeight: 'bold' }}>
							{countryStats.latest.confirmed}
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
							{countryStats.latest.deaths}
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
							padding: wp(6),
							paddingTop: wp(9)
						}}>
						<Text style={{ color: "#30cc98", fontSize: wp(4.5), fontWeight: 'bold' }}>
							{countryStats.latest.recovered}
						</Text>
						<Text style={{ color: "#30cc98", fontSize: wp(3.2) }}>
							Recovered
						</Text>
					</View>
				</View>
			</View>
				<View style={{flex: 1, alignItems: "flex-end", marginRight: wp(7)}}>
						<Button mode="text" labelStyle={{color: '#5a84f6'}} onPress={() => navigate('Timeline')} >SHOW MORE</Button>
				</View>
			
		</ScrollView>
	);
};



