import {
  compose,
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
  Action,
} from "redux";
import profileReducer from "./profileReducer.ts";
import dialogsReducer from "./dialogsReduser.ts";
import usersReduser from "./usersReduser.ts";
import authReduser from "./authReduser.ts";
import { thunk, ThunkAction } from "redux-thunk";
import appReduser from "./appReduser.ts";

const thunkMiddleware = thunk;

let rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReduser,
  auth: authReduser,
  app: appReduser,
});

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionsTypes<T extends {[key: string]: (...args:any[]) => any}> = ReturnType<PropertiesTypes<T>>
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType> 

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

// @ts-ignore
window.store = store;

export default store;
