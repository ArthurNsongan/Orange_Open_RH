import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";

const AppStore = createStore(rootReducer);

export default AppStore;