import React, { ChangeEvent, useState } from "react";
//@ts-ignore
import styles from "./ProfileInfo.module.css";
import Preloader from "../../Common/Preloader.tsx";
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks.tsx";
//@ts-ignore
import user from "../../../assets/user.jpg";
import ProfileDataForm from "./ProfileData.tsx";
import { ContactsType, ProfileType } from "../../../types/types.ts";

type PropsType={
  profile: ProfileType
  savePhoto:(file:File)=>void
  isOwner:boolean
  saveProfile:()=>void
  status:string
  updateStatus:(status:string) => void
  

}

const ProfileInfo: React.FC<PropsType>=(props) =>{
  let [editMode, setEditMode] = useState(false);
  function activateEditMode() {
    setEditMode(true);
  }
  function deactivateEditMode() {
    setEditMode(false);
  }

  if (!props.profile) {
    return <Preloader />;
  }
  function onMainPhotoSelected(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.length) {
      props.savePhoto(e.target.files[0]);
    }
  }
  return (
    <div>
      <div>
        <img
          src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
          width={"1000px"}
          alt="///"
        />
      </div>
      <div className={styles.descriptionBlock}>
        <img
          src={props.profile.photos.large || user}
          alt="///"
          className={styles.mainPhoto}
        />
        {props.isOwner && (
          <input type={"file"} onChange={onMainPhotoSelected} />
        )}
        {editMode ? (
          <ProfileDataForm
            profile={props.profile}
            saveProfile={props.saveProfile}
            deactivateEditMode={deactivateEditMode}
          />
        ) : (
          <ProfileData
            profile={props.profile}
            isOwner={props.isOwner}
            activateEditMode={activateEditMode}
          />
        )}

        {props.profile.userId}
      </div>
      <ProfileStatusWithHooks
        status={props.status}
        updateStatus={props.updateStatus}
      />
    </div>
  );
}

type ProfileDataPropsType={
profile: ProfileType
isOwner:boolean
activateEditMode:()=> void
}

const ProfileData: React.FC<ProfileDataPropsType>=(props)=> {
  return (
    <div>
      <div>
        <b>Full name</b> {props.profile.fullName}
      </div>
      <div>
        <b>About me</b> {props.profile.aboutMe}
      </div>
      <div>
        <b>Looking for a job:</b>
        {props.profile.lookingForAjob ? "yes" : "no"}
      </div>
      {props.profile.lookingForAjob && (
        <div>
          <b>My skills:</b> {props.profile.lookingForAJobDescription}
        </div>
      )}
      <div>
        <b>Contacts:</b>
        {Object.keys(props.profile.contacts).map((key) => (
          <Contact
            key={key}
            contactTitle={key}
            contactValue={props.profile.contacts[key as keyof ContactsType]}
          />
        ))}
      </div>
      {props.isOwner && (
        <button onClick={props.activateEditMode}>Edit Profile</button>
      )}
    </div>
  );
}

type ContactsPropsType={
  contactTitle: string
  contactValue:any
}

const Contact: React.FC<ContactsPropsType>=({ contactTitle, contactValue }) =>{
  return (
    <div className={styles.contact}>
      <b>{contactTitle}:</b> {contactValue}
    </div>
  );
}
export default ProfileInfo;
