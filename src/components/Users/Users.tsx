import React, { useEffect } from "react";
// @ts-ignore
import s from "./Users.module.css";
import User from "./User.tsx";
import UsersSearchForm from "./UsersSearchForm.tsx";
import { follow, unfollow, FilterType, getUsers} from "../../redux/usersReduser.ts";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPage, getIsInProgress, getPageSize, getTotalUsersCount, getUsersFilter, getUsersSel } from "../../redux/usersSelectors.ts";
import {   useSearchParams } from "react-router-dom";


const Users: React.FC=() => {

const users = useSelector(getUsersSel)
const totalUsersCount = useSelector(getTotalUsersCount)
const currentPage = useSelector(getCurrentPage)
const pageSize = useSelector(getPageSize)
const filter = useSelector(getUsersFilter)
const isInProgress = useSelector(getIsInProgress)
const dispatch = useDispatch()
   const [searchParams, setSearchParams] = useSearchParams()


   useEffect(() => {

      const result: any = {}
      // @ts-ignore
      for (const [key, value] of searchParams.entries()) {
         let value2: any = +value
         if (isNaN(value2)) {
            value2 = value
         }
         if (value === 'true') {
            value2 = true
         } else if (value === 'false') {
            value2 = false
         }
         result[key] = value2
      }

      let actualPage = result.page || currentPage
      let term = result.term || filter.term

      let friend = result.friend || filter.friend
      if (result.friend === false) {
         friend = result.friend
      }

      const actualFilter = {friend, term}
    //@ts-ignore
      dispatch(getUsers(actualPage, pageSize, actualFilter))

      // eslint-disable-next-line
   }, [])


   useEffect(() => {

      const term = filter.term
      const friend = filter.friend

      let urlQuery =
         (term === '' ? '' : `&term=${term}`)
         + (friend === null ? '' : `&friend=${friend}`)
         + (currentPage === 1 ? '' : `&page=${currentPage}`)

      setSearchParams(urlQuery)

      // eslint-disable-next-line
   }, [filter, currentPage])


useEffect(()=> {
  //@ts-ignore
dispatch(getUsers(currentPage, pageSize, filter))
}, [])
const onPageChanged = (pageNumber: number) => {
  //@ts-ignore
  dispatch(getUsers(pageNumber, pageSize, filter))
}
const onFilterChanged = (filter: FilterType) => {
  //@ts-ignore
dispatch(getUsers(1, pageSize, filter))
}
const follow1 = (userId:number) => {
  //@ts-ignore
dispatch(follow(userId))
}
const unfollow1 = (userId:number) => {
  //@ts-ignore
  dispatch(unfollow(userId))
}


  let pagesCount = Math.ceil(totalUsersCount / pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    // @ts-ignore
    pages.push(i);
  }
  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChanged}/>
      <div>
        {pages.map((p) => (
          <span
            key={p}
            className={currentPage === p ? s.selectedPage : s.page}
            onClick={(e) => {
              onPageChanged(p);
            }}
          >
            {p}
          </span>
        ))}
      </div>
      
      {users.map((user) => (
        <User
          key={user.id}
          user={user}
          isInProgress={isInProgress}
          unfollow={unfollow1}
          follow={follow1} 
          id={undefined}        />
      ))}
    </div>
  );

}

export default Users;
