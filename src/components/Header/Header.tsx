import React from "react";
//@ts-ignore
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import {Button, Layout} from 'antd'
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../redux/reduxStore";
import { logout } from "../../redux/authReduser.ts";



const AppHeader: React.FC=()  =>{
  const isAuth = useSelector((state:AppStateType)=> state.auth.isAuth)
  const login = useSelector((state:AppStateType)=> state.auth.login)
  const dispatch=useDispatch()
  const logout1 = ()=> {
    //@ts-ignore
    dispatch(logout())
  }
  const {Header} = Layout
  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
        
          <img style={{width:'50px', marginRight:'20px'}}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Wikimedia-logo.png/768px-Wikimedia-logo.png"
                alt="///"
              />
          
          <div className={styles.loginBlock}>
        {isAuth ? (
          <div>
            {login} <Button onClick={logout1}>Log out</Button>
          </div>
        ) : (
          <NavLink to={"/login"}>Login</NavLink>
        )}
      </div>
    
    </Header>
  );
}

export default AppHeader;