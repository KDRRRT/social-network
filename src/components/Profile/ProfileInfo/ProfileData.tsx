import React from "react";
//@ts-ignore
import styles from "./ProfileInfo.module.css";
import { Formik, Form, Field } from "formik";
import { ProfileType } from "../../../types/types";


type PropsType={
  profile: ProfileType
  saveProfile:(formData:FormDataType) =>void
  deactivateEditMode: () => void
}
type FormDataType={
  fullName:string
  aboutMe: string
  lookingForAjob: boolean
  lookingForAJobDescription: string,
  messages: null

}

const ProfileDataForm: React.FC<PropsType >=({ saveProfile, profile, deactivateEditMode }) =>{
  return (
    <div>
      <Formik
        initialValues={{
          fullName: profile.fullName,
          aboutMe: profile.aboutMe,
          lookingForAjob: profile.lookingForAjob,
          lookingForAJobDescription: profile.lookingForAJobDescription,
          messages: null,
        }}
        onSubmit={(formData) => {
          saveProfile(formData);
          deactivateEditMode();
        }}
      >
        {() => (
          <Form>
            <div>
              <b>Full Name:</b>
              <Field
                className={styles.field}
                type={"text"}
                placeholder={"Full name"}
                name={"fullName"}
              />
            </div>
            <div>
              <b>About me:</b>
              <Field
                className={styles.field}
                type={"text"}
                placeholder={"About me"}
                name={"aboutMe"}
              />
            </div>
            <div>
              <b>Looking for a job:</b>
              <Field
                className={styles.field}
                type={"checkbox"}
                name={"lookingForAjob"}
              />
            </div>
            <b>My skills:</b>
            <div>
              <Field
                className={styles.field}
                placeholder={"Skills"}
                name={"lookingForAJobDescription"}
              />
            </div>
            <b>Contacts:</b>{" "}
            {Object.keys(profile.contacts).map((key) => (
              <div className={styles.contact}>
                <b>{key}:</b>
                <Field
                  className={styles.field}
                  placeholder={key}
                  name={"contacts." + key}
                />
              </div>
            ))}
            <div>
              <button type={"submit"}>Save</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ProfileDataForm;
