import * as React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import App from "./App";
import "react-native-gesture-handler";
// Store
import { store, persistor } from "./src/Redux/store";
// Redux Provider for React
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

import { name as appName } from "./app.json";
import { AppRegistry } from "react-native";
import Axios from "axios";

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: "tomato",
		accent: "yellow"
	}
};

class Main extends React.Component {
	componentDidMount() {
		Axios.defaults.baseURL =
			"https://covid19.mathdro.id";
	}
	render() {
		return (
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<PaperProvider theme={theme}>
						<App />
					</PaperProvider>
				</PersistGate>
			</Provider>
		);
	}
}
AppRegistry.registerComponent(appName, () => Main);
