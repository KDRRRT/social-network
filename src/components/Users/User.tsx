import React from "react";
//@ts-ignore
import s from "./Users.module.css";
//@ts-ignore
import userPhoto from "../../assets/user.jpg";
import { NavLink } from "react-router-dom";
import { UserType } from "../../types/types";
import {Button} from 'antd'



type PropsType = {
  isInProgress: Array<number>
  user: UserType
  unfollow: (userId:number) => void
  follow: (userId:number) => void
  id:undefined
}

const User:React.FC<PropsType>=({ isInProgress, user, unfollow, follow }) => {
  let u = user;
  return (
    <div>
      <span>
        <div>
          <NavLink to={"./../profile/" + u.id}>
            <img
              src={u.photos.small != null ? u.photos.small : userPhoto}
              alt="///"
              className={s.userPhoto}
            />
          </NavLink>
        </div>
        <div>
          {u.followed ? (
            <Button
              disabled={isInProgress.some((id:number) => id === u.id)}
              onClick={() => {
                unfollow(u.id);
              }}
            >
              UNFOLLOW
            </Button>
          ) : (
            <Button
              disabled={isInProgress.some((id:number) => id === u.id)}
              onClick={() => {
                follow(u.id);
              }}
            >
              FOLLOW
            </Button>
          )}
        </div>
      </span>
      <span>
        <span>
          <div>{u.name}</div>
          <div>{u.status}</div>
        </span>
        <span>
          <div>{"u.location.country"}</div>
          <div>{"u.location.city"}</div>
        </span>
      </span>
    </div>
  );
}

export default User;
