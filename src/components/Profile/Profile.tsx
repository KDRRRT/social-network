import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo.tsx";
import MyPostsContainer from "./MyPosts/myPostsContainer.tsx";
import { Store, UnknownAction } from "redux";
import { ProfileType } from "../../types/types.ts";

function Profile(props: { saveProfile: () => void; 
  savePhoto: (file: File) => void; 
  isOwner: boolean; 
  profile: ProfileType; 
  status: string; 
  updateStatus: (status: string) => void; 
  store: Store<any, UnknownAction, unknown> | undefined; }) {
  return (
    <div>
      <ProfileInfo
      saveProfile={props.saveProfile}
      savePhoto={props.savePhoto}
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
      />
      <MyPostsContainer store={props.store} />
    </div>
  );
}

export default Profile;
