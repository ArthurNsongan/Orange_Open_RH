import { combineReducers } from "redux";
import { logInReducer, logOutReducer, signUpReducer } from "./Auth/userReducer"

const rootReducer = combineReducers({
    logInReducer,
    logOutReducer,
    signUpReducer
})

export default rootReducer;