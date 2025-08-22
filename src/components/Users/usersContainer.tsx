import { useSelector } from "react-redux";
import {getIsFetching} from "../../redux/usersSelectors.ts";
import React from "react";
import Users from "./Users.tsx";
import Preloader from "../Common/Preloader.tsx";


type UsersPagePropsType = {
pageTitle: string
}
export const UsersPage: React.FC<UsersPagePropsType>=(props) => {
  const isFetching = useSelector(getIsFetching)
return (
 <>
      <h2>{props.pageTitle}</h2>
        {isFetching ? <Preloader /> : null}
        <Users/>
      </>
)
}

