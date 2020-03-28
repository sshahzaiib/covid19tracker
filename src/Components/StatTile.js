import React from "react";
import { Text, View, StyleSheet } from "react-native";
import {
	// heightPercentageToDP as hp,
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from "react-native-responsive-screen";
import moment from "moment";

const StatTile = ({
	date,
	total,
	BGColor,
	totalDeaths,
	onDate,
	deathsOnDate,
	recovered
}) => {
	const styles = StyleSheet.create({
		Tile: {
			width: wp(100),
			backgroundColor: BGColor,
			// flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			margin: hp(1),
			padding: hp(1),
			borderRadius: 10,
			paddingBottom: hp(2),
			paddingTop: hp(2)
		}
	});

	return (
		<View style={styles.Tile}>
			<Text style={{ fontSize: wp(5), color: "#18aaff" }}>
				{" "}
				{moment(date).format("DD MMM, YYYY")}{" "}
			</Text>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-evenly"
				}}>
				<View style={{ alignItems: "center", padding: hp(2) }}>
					<Text style={{ fontSize: wp(4) }}>
						{" "}
						Total Cases:{" "}
						<Text style={{ fontSize: wp(4), color: "#18aaff" }}>
							{" "}
							{total}{" "}
						</Text>
					</Text>
				</View>
				<View style={{ alignItems: "center", padding: hp(2) }}>
					<Text style={{ fontSize: wp(4) }}>
						Cases on Date:{" "}
						<Text style={{ fontSize: wp(4), color: "#18aaff" }}>
							{onDate}
						</Text>
					</Text>
				</View>
			</View>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-evenly"
				}}>
				<View style={{ alignItems: "center", padding: hp(2) }}>
					<Text style={{ fontSize: wp(4) }}>
						Total Deaths:{" "}
						<Text style={{ fontSize: wp(4), color: "red" }}>
							{" "}
							{totalDeaths}{" "}
						</Text>
					</Text>
				</View>
				<View style={{ alignItems: "center", padding: hp(2) }}>
					<Text style={{ fontSize: wp(4) }}>
						Deaths on Date:{" "}
						<Text style={{ fontSize: wp(4), color: "red" }}>
							{" "}
							{deathsOnDate}{" "}
						</Text>
					</Text>
				</View>
			</View>
			<Text style={{ fontSize: wp(5) }}>
				Recovered:{" "}
				<Text style={{ fontSize: wp(5), color: "green" }}>
					{recovered}
				</Text>
			</Text>
		</View>
	);
};

export default StatTile;

StatTile.defaultProps = {
	date: "03/22/2020",
	total: 0,
	onDate: 0,
	totalDeaths: 0,
	deathsOnDate: 0,
	recovered: 0,
	BGColor: "white"
};
