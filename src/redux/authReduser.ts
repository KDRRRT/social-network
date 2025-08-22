import { authAPI } from "../api/auth-api.ts";
import {ResultCodesEnum} from "../api/api.ts";
import {securityAPI } from "../api/security-api.ts"
import { BaseThunkType, InferActionsTypes } from "./reduxStore.ts";




let initialState = {
  userId: null as number |null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  isFetching: false,
  captchaUrl: null as string | null,
  messageError: null 
};

export type InitialStateType = typeof initialState
type ThunkType = BaseThunkType<ActionsTypes>

function authReduser(state = initialState, action:ActionsTypes):InitialStateType {
  switch (action.type) {
    case 'SET_AUTH_USER_DATA':
      return {
        ...state,
        ...action.data,
      };
    case 'GET_CAPTCHA_URL_SUCCESS':
      return {
        ...state,
        //@ts-ignore
        ...action.payload,
      };
    default:
      return state;
  }
}


type ActionsTypes =  InferActionsTypes<typeof actions>
export const actions = {
  setAuthUserData: (userId:number | null, email:string | null, login:string | null, isAuth:boolean) => {
    return { type: 'SET_AUTH_USER_DATA', data: { userId, email, login, isAuth } as const
  }},
  getCaptchaUrlSuccess: (captchaUrl:string | null)  => {
    return { type: 'GET_CAPTCHA_URL_SUCCESS', payload: { captchaUrl } } as const
  }
}


export const getAuthUserData = ():ThunkType => {
  return async (dispatch) => {
    const authMeData = await authAPI.authMe();
    if (authMeData.resultCode === ResultCodesEnum.Success) {
      let { id, email, login } = authMeData.data;
      dispatch(actions.setAuthUserData(id, email, login, true));
    }
  };
};
export const loginn =
  (email:string, password:string, rememberMe:boolean, captcha:null):ThunkType => async (dispatch) => {
    const loginData = await authAPI.login(email, password, rememberMe, captcha);
    if (loginData.resultCode === ResultCodesEnum.Success) {
      dispatch(getAuthUserData());
    } else {
      if (loginData.resultCode === ResultCodesEnum.CaptchaIsRequired) {
        dispatch(getCaptchaUrl());
      }
    }
  };

export const logout = ():ThunkType => async (dispatch) => {
  const response = await authAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};

export const getCaptchaUrl = ():ThunkType => async (dispatch) => {
  const data = await securityAPI.getCaptchaUrl();
  const captchaUrl = data.url;
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
};

export default authReduser;
