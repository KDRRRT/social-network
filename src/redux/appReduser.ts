import { getAuthUserData } from "./authReduser.ts";
import { BaseThunkType, InferActionsTypes } from "./reduxStore.ts";





let initialState = {
  initialized: false,
};
type InitialStateType = typeof initialState

function appReduser(state = initialState, action: ActionsTypes):InitialStateType {
  switch (action.type) {
    case 'INITIALIZED_SUCCESS':
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
  initializedSuccess: () => {
    return { type: 'INITIALIZED_SUCCESS' } as const
  }
}



type ThunkType = BaseThunkType<ActionsTypes>

export const initializeApp = ():ThunkType => async(dispatch) => { //это thunk creator он выполняет асинхронный запрос, чтобы получить данные о юзере (логин и пароль) 
           // и потом идет запуск thunk, который как раз уже диспачит экшн, который указан выше
    let promise = dispatch(getAuthUserData());
    Promise.all([promise]).then(() => {
      dispatch(actions.initializedSuccess());
    });
};

export default appReduser;
