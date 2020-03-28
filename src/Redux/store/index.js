// Imports: Dependencies
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-community/async-storage';


// Imports: reducer
import rootReducer from "../Reducers";

const persistConfig = {
  // persist key name
  key: "root",
  // Storage Method (React Native)
  storage: AsyncStorage,
  // State reconciler
  // stateReconciler: autoMergeLevel2,
  // Whitelist (Save Specific Reducers)
  // whitelist: ["driver", "data"],
  // Blacklist (Don't Save Specific Reducers)
  // blacklist: ["UI"]
};


// Redux: Store

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// Exports

let persistor = persistStore(store);

export {store, persistor}
