import { Dispatch } from "redux";
import { usersAPI } from "../api/users-api.ts";
import { UserType } from "../types/types";
import { BaseThunkType, InferActionsTypes } from "./reduxStore";




let initialState = {
  // это краткий хардкод стейт, чтобы было проще работать
  users: [] as Array<UserType>,
  pageSize: 5,
  totalUsersCount: 100,
  currentPage: 1,
  isFetching: true,
  isInProgress: [] as Array <number>,
  filter: {
    term: "",
    friend: null as null | boolean
  }
};
export type FilterType = typeof initialState.filter
export type InitialStateType = typeof initialState

function usersReduser(state = initialState, action:ActionsTypes):InitialStateType {
  //это редюсер, который прописывает, что возвращает каждый action
  switch (action.type) {
    case 'FOLLOW':
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: true };
          }
          return u;
        }),
      }; //тут можно было сократить код, попытка это сделать выведена в отдельный файл, но не получилось из-за того, что в инишиал стейт нет юзеров и функция считает, что юзеры - underfinded
    case 'UNFOLLOW':
      return {
        ...state,

        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: false };
          }
          return u;
        }),
      };
    case 'SET_USERS':
      return {
        ...state,
        users: [...action.users],
      };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.currentPage };
    case 'TOGGLE_IS_FETCHING':
      return { ...state, isFetching: action.isFetching };
    case 'TOGGLE_IS_IN_PROGRESS':
      return {
        ...state,
        isInProgress: action.isFetching
          ? [...state.isInProgress, action.userId]
          : state.isInProgress.filter((id) => id !== action.userId),
      };
      case 'SET_FILTER':
        return {...state, filter: action.payload}
    default:
      return state;
  }
}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
  followSuccess: (userId:number) => {
    // это action creatorы, они создают объеты со свойством тип
    return { type: 'FOLLOW', userId } as const
  },
  unfollowSuccess:(userId:number) => {
    return { type: 'UNFOLLOW', userId } as const
  },
  setUsers:(users:Array<UserType>) => {
    return { type: 'SET_USERS', users } as const
  },
  setCurrentPage:(currentPage:number) => {
    return { type: 'SET_CURRENT_PAGE', currentPage } as const
  },
 toggleIsFetching:(isFetching:boolean) =>{
    return { type: 'TOGGLE_IS_FETCHING', isFetching } as const
  },
  toggleIsInProgress:(isFetching:boolean, userId:number) => {
    return { type: 'TOGGLE_IS_IN_PROGRESS', isFetching, userId } as const
  },
  setFilter:(filter: FilterType) =>{
    return {type: 'SET_FILTER', payload: filter} as const
  }
}



type ThunkType = BaseThunkType<ActionsTypes>
type DispatchType = Dispatch<ActionsTypes>

export const getUsers = (page:number, pageSize:number, filter: FilterType): ThunkType  => async (dispatch) => {
  // это санка по выводу юзеров на экран, показе стрнаиц и тд
  dispatch(actions.toggleIsFetching(true));
  dispatch(actions.setCurrentPage(page));
  dispatch(actions.setFilter(filter))
  const data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend);
  dispatch(actions.toggleIsFetching(false));
  dispatch(actions.setUsers(data.items));
};

export const _followUnfollowFlow = async (
  //универсальная функция, чтобы избежать дублирование кода, это санка кста
  dispatch:DispatchType,
  userId:number,
  apiMethod:(userId: number) => Promise<ResponseType>,
  actionCreator:(userId: number) => ActionsTypes
) => {
  dispatch(actions.toggleIsInProgress(true, userId));
  const response = await apiMethod(userId);
  //@ts-ignore
  if (response.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.toggleIsInProgress(false, userId));
};

export const follow = (userId:number): ThunkType => async (dispatch) => {
  // это сокращенная санка подписки и отписки, мы просто в функцию выше прокидываем нужные параметры
  await _followUnfollowFlow(
    dispatch,
    userId,
    usersAPI.follow.bind(usersAPI),
    actions.followSuccess
  );
};

export const unfollow = (userId:number): ThunkType => async (dispatch) => {
  await _followUnfollowFlow(
    dispatch,
    userId,
    usersAPI.unfollow.bind(usersAPI),
    actions.unfollowSuccess
  );
};

export default usersReduser;
