import { createSelector } from "reselect";
import { AppStateType } from "./reduxStore";

export function getPageSize(state: AppStateType) {
  return state.usersPage.pageSize;
}

export function getTotalUsersCount(state: AppStateType) {
  return state.usersPage.totalUsersCount;
}

export function getCurrentPage(state: AppStateType) {
  return state.usersPage.currentPage;
}

export function getIsFetching(state: AppStateType) {
  return state.usersPage.isFetching;
}

export function getIsInProgress(state: AppStateType) {
  return state.usersPage.isInProgress;
}
export function getUsersFilter(state: AppStateType) {
  return state.usersPage.filter
}

export const getUsersSel = createSelector(getUsersEasy, (users) => {
  return users.filter((u) => true); //селектор, которыйц мы создаем с библиотекой реселект
});

export function getUsersEasy(state: AppStateType) {
  return state.usersPage.users; //простой селектор,чтобы раздробить сложный
}
