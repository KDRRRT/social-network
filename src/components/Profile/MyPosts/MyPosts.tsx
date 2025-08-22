import React, { PureComponent } from "react";
//@ts-ignore
import styles from "./MyPosts.module.css";
import Post from "./Post/Post.tsx";
import { Formik, Form, Field } from "formik";
import {
  validatePosts,
} from "../../../utils/validators/validators.ts";
import { PostType } from "../../../types/types.ts";


type PropsType = {
addPost:(newPostText: string) => void
  posts: Array<PostType>
}

type AddPostFormPropsType = {
  addPost:(newPostText: string) => void
  posts: Array<PostType>
}

export const AddPostForm: React.FC<AddPostFormPropsType>=(props) =>{
  let addNewPost = (values: string) => {
    props.addPost(values);
  };
  return (
    <Formik
      initialValues={{ newPostText: "" }}
      onSubmit={(values: {newPostText:string}, { resetForm }:any) => {
        addNewPost(values.newPostText);
        resetForm();
      }}
    >
      {() => (
        <Form>
          <div>
            <Field
              name={"newPostText"}
              as={"textarea"}
              placeholder={"What's new?"}
              validate={validatePosts}
            />
          </div>
          <button type={"submit"}>Add post</button>
        </Form>
      )}
    </Formik>
  );
}

class MyPosts extends PureComponent<PropsType> {
  render() {
    let postsElements = this.props.posts.map((p) => (
      <Post message={p.post} likes={p.likes} />
    ));

    return (
      <div className={styles.postsBlock}>
        <h3>My posts</h3>
        <AddPostForm addPost={this.props.addPost} posts={[]} />
        <div className={styles.posts}>{postsElements}</div>
      </div>
    );
  }
}

export default MyPosts;
