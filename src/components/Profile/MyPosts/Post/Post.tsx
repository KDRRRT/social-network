import React from "react";
//@ts-ignore
import styles from "./Post.module.css";

type PropsType = {
  message: string
  likes: number
}

const Post: React.FC<PropsType>=(props)  =>{
  return (
    <div className={styles.item}>
      <img src="https://cs13.pikabu.ru/post_img/2023/10/28/2/1698456437194820220.jpg" />
      {props.message}
      <div className={styles.likes}>
        <img src="https://seeklogo.com/images/F/facebook-like-logo-32FAB6926D-seeklogo.com.png" />
        {props.likes}
      </div>
    </div>
  );
}

export default Post;
