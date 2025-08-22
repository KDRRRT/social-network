import MyPosts from "./MyPosts.tsx";
import { actions } from "../../../redux/profileReducer.ts";
import { connect } from "react-redux";
import { AppStateType } from "../../../redux/reduxStore.ts";
import { PostType } from "../../../types/types.ts";


type MapStatePropsType = {
  posts:Array<PostType>
  newPostText: string
}

type MapDispatchPropsType = {
  addPost:(newPostText: string) =>void
}

function mapStateToProps(state:AppStateType):MapStatePropsType {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    addPost: (newPostText:string) => {
      dispatch(actions.addPostActionCreator(newPostText));
    },
  };
}

const MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType,unknown, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
