import React from "react";
import { StatusBar } from "react-native";

import BottomTabNavigation from "./src/Navigation/TabNavigtion";

const App = () => {
	return (
		<>
			<StatusBar barStyle="dark-content" />
			<BottomTabNavigation />
		</>
	);
};

export default App;
