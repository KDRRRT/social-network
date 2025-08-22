import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppStateType } from "../redux/reduxStore";




function mapStateToPropsForRedirect(state:AppStateType) {
  return {
    isAuth: state.auth.isAuth,
  };
}

type MapPropsType = {
  isAuth:boolean
}

export function withAuthRedirect(Component) {
  class RedirectComponent extends React.Component<MapPropsType> {
    render() {
      if (this.props.isAuth === false) return <Navigate to={"/login"} />;
      return <Component {...this.props} />;
    }
  }
  let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(
    RedirectComponent
  );

  return ConnectedAuthRedirectComponent;
}

