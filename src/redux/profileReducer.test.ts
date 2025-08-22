import { ProfileType } from "../types/types";
import profileReducer, {
  actions
} from "./profileReducer";

test("length of posts should be four", () => {
  let action = actions.addPostActionCreator("good text");
  let state = {
    posts: [
      { id: 1, post: "yo", likes: 15 },
      { id: 2, post: "Hi everyone", likes: 20 },
      { id: 3, post: "its my new profile!", likes: 21 },
    ],
    
      profile: null as ProfileType|null,
      status: "",
      newPostText: ""
  };
  let newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(4);
  expect(newState.posts[3].post).toBe("good text");
});

test("length of posts after deleting a post should be 2", () => {
  let action = actions.deletePost(1);
    let state = {
      posts: [
        { id: 1, post: "yo", likes: 15 },
        { id: 2, post: "Hi everyone", likes: 20 },
        { id: 3, post: "its my new profile!", likes: 21 },
      ],
      
  profile: null as ProfileType|null,
  status: "",
  newPostText: ""
    };
  let newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(2);
});
