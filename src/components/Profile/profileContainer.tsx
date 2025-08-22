import React from "react";
import { useEffect } from "react";
import Profile from "./Profile.tsx";
import { connect } from "react-redux";
import {
  getUserProfile,
  updateStatus,
  getStatus,
  savePhoto,
  saveProfile,
} from "../../redux/profileReducer.ts";
import { RouteProps, useLocation, useNavigate, useParams } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect.tsx";
import { compose } from "redux";
import { AppStateType } from "../../redux/reduxStore.ts";
import { ProfileType } from "../../types/types.ts";

type MapDispatchPropsType={
  getUserProfile:(userId:number) => void
    getStatus:(userId: number) => void
    updateStatus: (status: string)=> void
    savePhoto: (file: File) => void
    saveProfile:(profile: ProfileType)=> void
}
type MapStatePropsType = ReturnType <typeof mapStateToProps>

type PathParamsType={
  userId: string
}
//@ts-ignore
class ProfileContainer extends React.Component<MapStatePropsType & MapDispatchPropsType & RouteProps<PathParamsType>> {
  refreshProfile() {
    let userId = this.props.router.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
      if (!userId) {
        this.props.history.push("/login");
      }
    }
    this.props.getUserProfile(userId);
    this.props.getStatus(userId);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   debugger;
  //   if (this.props.router.params.userId !== prevProps.match.params.userId) {
  //     this.refreshProfile();
  //   }
  // }

  render() {
    return (
      <div>
        <Profile
          {...this.props}
          isOwner={!!this.props.authorizedUserId}
          profile={this.props.profile}
          status={this.props.status}
          updateStatus={this.props.updateStatus}
          savePhoto={this.props.savePhoto}
          saveProfile={this.props.saveProfile}
        />
      </div>
    );
  }
}



let mapStateToProps = (state:AppStateType) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
  };
};

function withRouter(Component: any) {
  function ComponentWithRouterProp(props: any) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    useEffect(() => {
      if (!props.isAuth) {
        navigate("/login");
      }
    }, [props.isAuth, navigate]);
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    getUserProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile,
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
