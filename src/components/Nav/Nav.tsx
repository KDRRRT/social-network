import React from "react";
//@ts-ignore
import styles from "./Nav.module.css";
import { NavLink } from "react-router-dom";


type PropsType = {
  
}

const Nav: React.FC<PropsType>=()=> {
  return (
    <nav className={styles.nav}>
      <div className={styles.item}>
        <NavLink
          to="/profile"
          style={({ isActive }) => ({
            textDecoration: isActive ? "underline" : "none",
          })}
        >
          Profile
        </NavLink>
      </div>
      <div className={styles.item}>
        <NavLink
          to="/dialogs"
          style={({ isActive }) => ({
            textDecoration: isActive ? "underline" : "none",
          })}
        >
          Messages
        </NavLink>
      </div>
      <div className={styles.item}>
        <NavLink
          to="/news"
          style={({ isActive }) => ({
            textDecoration: isActive ? "underline" : "none",
          })}
        >
          News
        </NavLink>
      </div>
      <div className={styles.item}>
        <NavLink
          to="/music"
          style={({ isActive }) => ({
            textDecoration: isActive ? "underline" : "none",
          })}
        >
          Music
        </NavLink>
      </div>
      <div className={styles.item}>
        <NavLink
          to="/settings"
          style={({ isActive }) => ({
            textDecoration: isActive ? "underline" : "none",
          })}
        >
          Settings
        </NavLink>
      </div>
      <div className={styles.item}>
        <NavLink
          to="/users"
          style={({ isActive }) => ({
            textDecoration: isActive ? "underline" : "none",
          })}
        >
          Users
        </NavLink>
      </div>
      <div>
        <div className={styles.friends}>Best friends:</div>
        <img
          src="https://cs13.pikabu.ru/post_img/2023/10/28/2/1698456437194820220.jpg"
          alt="///"
        />
        <img
          src="https://cs13.pikabu.ru/post_img/2023/10/28/2/1698456437194820220.jpg"
          alt="///"
        />
        <img
          src="https://cs13.pikabu.ru/post_img/2023/10/28/2/1698456437194820220.jpg"
          alt="///"
        />
      </div>
    </nav>
  );
}

export default Nav;
