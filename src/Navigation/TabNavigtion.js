import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import {
	heightPercentageToDP as hp
} from "react-native-responsive-screen";

import News from "../Screens/News";
import Home from "../Screens/Home";
import Timeline from "../Screens/Timeline";
import TimelineDetail from "../Screens/Timeline/TimelineDetail";
import { createAppContainer } from "react-navigation";


// Tab Screen Imports

const HomeStack = createStackNavigator(
	{
		Stats: {
			screen: Home,
			navigationOptions: {
				headerShown: false
			}
		}
	}
);

const TimelineStack = createStackNavigator(
	{
		Timeline: {
			screen: Timeline,
			navigationOptions: {
				headerShown: false
			}
		},
		Detail: {
			screen: TimelineDetail
		}
	}
	// , {
	// 	initialRouteName: 'Detail'
	// }
);

const BottomTabNavigation = createBottomTabNavigator(
	{
		Stats: HomeStack,
		News: News,
		Timeline: TimelineStack
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, horizontal, tintColor }) => {
				const { routeName } = navigation.state;
				let iconName;
				if (routeName === "Stats") {
					iconName = "ios-stats";
					return (
						<Ionicons
							name={iconName}
							size={focused ? 25 : 23}
							color={tintColor}
						/>
					);
				} else if (routeName === "News") {
					return (
						<MaterialIcon
							name="newspaper"
							size={focused ? 25 : 23}
							color={tintColor}
						/>
					);
				} else if (routeName === "Timeline") {
					return (
						<MaterialIcon
							name="timeline"
							size={focused ? 25 : 23}
							color={tintColor}
						/>
					);
				}
				// You can return any component that you like here!
				// return <Ionicons name={iconName} size={25} color={tintColor} />;
			}
		}),
		tabBarOptions: {
			activeTintColor: "white",
			inactiveTintColor: "#96b6d8",
			style: {
				backgroundColor: "#5a84f6",
				height: hp(8),
				paddingBottom: 5,
				paddingTop: 5
			}
		},
		backBehavior: "history",
		// initialRouteName: "Timeline"
	}
);

export default createAppContainer(BottomTabNavigation);
