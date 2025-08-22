
import { PhotosType, PostType, ProfileType } from "../types/types";
import { InferActionsTypes } from "./reduxStore.ts";
import { profileAPI } from "../api/profile-api.ts";
import { BaseThunkType } from "./reduxStore.ts";


let initialState = {
  posts: [
    { id: 1, post: "yo", likes: 15 },
    { id: 2, post: "Hi everyone", likes: 20 },
    { id: 3, post: "its my new profile!", likes: 21 },
  ] as Array<PostType>,

  profile: null as ProfileType|null,
  status: "",
  newPostText: ""
};

type InitialStateType = typeof initialState

function profileReducer(state = initialState, action:ActionsTypes):InitialStateType {
  switch (action.type) {
    case 'ADD_POST':
      return {
        ...state,
        posts: [...state.posts, { id: 5, post: action.newPostText, likes: 0 }],
      };
    case 'SET_USER_PROFILE':
      return { ...state, profile: action.profile };
    case 'SET_STATUS':
      return { ...state, status: action.status };
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.postId),
      };
    case 'SAVE_PHOTO_SUCCESS':
      return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType};
    default:
      return state;
  }
}



type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>

export const actions = {
  addPostActionCreator:(newPostText:string)=> {
    return { type: 'ADD_POST', newPostText } as const
  },
  setUserProfile:(profile:ProfileType)=> {
    return {
      type: 'SET_USER_PROFILE',
      profile,
    } as const
  },
  setStatus:(status:string)=> {
    return {
      type: 'SET_STATUS',
      status,
    } as const
  },
  deletePost:(postId:number)=> {
    return {
      type: 'DELETE_POST',
      postId,
    } as const
  },
  savePhotoSuccess:(photos:PhotosType)=> {
    return {
      type: 'SAVE_PHOTO_SUCCESS',
      photos,
    } as const
  }
}


// export function updateNewPostTextActionCreator(text) {
//   return {
//     type: UPDATE_NEW_POST_TEXT,
//     newText: text,
//   };
// }



export const getUserProfile = (userId:number):ThunkType => async (dispatch) => {
  const data = await profileAPI.getProfile(userId);
  dispatch(actions.setUserProfile(data));
};

export const getStatus = (userId:number):ThunkType => async (dispatch) => {
  const data = await profileAPI.getStatus(userId);
  dispatch(actions.setStatus(data));
};

export const updateStatus = (status:string):ThunkType => async (dispatch) => {
  const data = await profileAPI.updateStatus(status);
  if (data.resultCode === 0) {
    dispatch(actions.setStatus(status));
  }
};
export const savePhoto = (file:any):ThunkType => async (dispatch) => {
  const data = await profileAPI.savePhoto(file);
  dispatch(actions.savePhotoSuccess(data.data.photos));
};
export const saveProfile = (profile:ProfileType):ThunkType => async (dispatch, getState:any) => {
  const userId = getState().auth.userId;
  const data = await profileAPI.saveProfile(profile);
  if (data.resultCode === 0) {
    dispatch(getUserProfile(userId));
  }
};

export default profileReducer;
