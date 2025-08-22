import "./App.css";
import React, { Suspense } from "react";
import { Component, lazy } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import News from "./components/News/News.tsx";
import Settings from "./components/Settings/Settings.tsx";
import DialogsContainer from "./components/Dialogs/dialogsContainer.tsx";
import { UsersPage } from "./components/Users/usersContainer.tsx";
import ProfileContainer from "./components/Profile/profileContainer.tsx";

import LoginForm from "./components/Login/Login.tsx";
import { connect } from "react-redux";
import { compose } from "redux";
import { initializeApp } from "./redux/appReduser.ts";
import Preloader from "./components/Common/Preloader.tsx";
import store, { AppStateType } from "./redux/reduxStore.ts";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import {  Layout, Menu } from 'antd';
import AppHeader from "./components/Header/Header.tsx";
import  ChatPage  from "./pages/chat/ChatPage.tsx";
const { Content,  Sider } = Layout;

//import Music from "./components/Music/Music";
const Music = lazy(() => import("./components/Music/Music.tsx"));

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {initializeApp: () => void}

class App extends Component<MapPropsType & DispatchPropsType> {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }

    return (
      <Layout>
      <AppHeader/>
      <div style={{ padding: '0 48px' }}>
        <Layout
          style={{ padding: '24px 0'}}
        >
          <Sider width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              style={{ height: '100%' }}
            >
              <Menu.Item key='1'>
            <NavLink
                      to="/profile"
                      
                    >
                      Profile
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key='2'>
                    <NavLink
                      to="/dialogs"
                      
                    >
                      Messages
                    </NavLink>
                    </Menu.Item>
                    <Menu.Item key='6'>
                    <NavLink
                      to="/chat"
                    >
                      Chat
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key='3'>
                    <NavLink
                      to="/news"
                      
                    >
                      News
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key='4'>
                    <NavLink
                      to="/settings"
                      
                    >
                      Settings
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key='5'>
                    <NavLink
                      to="/users"
                      
                    >
                      Users
                    </NavLink>
                    </Menu.Item>
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Routes>
            <Route path="/profile/userId?" element={<ProfileContainer />} />
            <Route path="/profile/*" element={<ProfileContainer />} />
            <Route path="/dialogs" element={<DialogsContainer />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/news" element={<News />} />
            <Route path="/music" element={<Music />} />
            <Route path="/settings" element={<Settings />} />
              
            <Route
            path="/users"
            element={<UsersPage pageTitle={""} />}
            />
              
            <Route path="/login" element={<LoginForm messages={null} />} />
            </Routes>
            </Content>
        </Layout>
      </div>
    </Layout>
      // <div className="app-wrapper">
      //   <HeaderContainer />
      //   <Nav />
      //   <div className="app-wrapper-content">
      //     <Suspense
      //       fallback={
      //         <div>
      //           <Preloader />
      //         </div>
      //       }
      //     >
      //       <Routes>
      //         <Route path="/profile/userId?" element={<ProfileContainer />} />
      //         <Route path="/profile/*" element={<ProfileContainer />} />
      //         <Route path="/dialogs" element={<DialogsContainer />} />
      //         <Route path="/news" element={<News />} />
      //         <Route path="/music" element={<Music />} />
      //         <Route path="/settings" element={<Settings />} />
              
      //         <Route
      //           path="/users"
      //           element={<UsersPage pageTitle={""} />}
      //         />
              
      //         <Route path="/login" element={<LoginForm messages={null} />} />
      //       </Routes>
      //     </Suspense>
      //   </div>
      // </div>
    );
  }
}

const mapStateToProps = (state:AppStateType) => {
  return {
    initialized: state.app.initialized,
  };
};

let AppContainer = compose<React.ComponentType>(connect(mapStateToProps, { initializeApp }))(App);

const MainApp: React.FC=()=> {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
export default MainApp;
