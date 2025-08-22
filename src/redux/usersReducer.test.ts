import usersReduser, { actions, InitialStateType } from "./usersReduser"

let state: InitialStateType;
beforeEach(()=> {
    state = { users: [
    {id: 0, name: "Tanya", followed: false, status: "lol", photos: {small: null, large: null} }, 
    {id: 1, name: "Vlad", followed: false, status: "yoyoyo", photos: {small: null, large: null}},
    {id: 2, name: "Olya", followed: true, status: "lol", photos: {small: null, large: null} }, 
    {id: 3, name: "Ilya", followed: true, status: "yoyoyo", photos: {small: null, large: null}}
] ,
  pageSize: 5,
  totalUsersCount: 100,
  currentPage: 1,
  isFetching: false,
  isInProgress: []}
})


test("follow success", ()=> {

const newState = usersReduser(state, actions.followSuccess(1))
expect(newState.users[0].followed).toBeFalsy()
expect(newState.users[1].followed).toBeTruthy()
})

test("unfollow success", ()=> {

const newState = usersReduser(state, actions.unfollowSuccess(3))
expect(newState.users[3].followed).toBeFalsy()
expect(newState.users[2].followed).toBeTruthy()
})