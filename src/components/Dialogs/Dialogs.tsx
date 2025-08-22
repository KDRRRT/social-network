import React from "react";
//@ts-ignore
import styles from "./Dialogs.module.css";
import { Formik, Form, Field } from "formik";
import { NavLink } from "react-router-dom";
import { validateMesages } from "../../utils/validators/validators.ts";
import { InitialStateType } from "../../redux/dialogsReduser.ts";


type PropsType = {
dialogsPage: InitialStateType
addMessage: (newMessageText:string) => void
}

const Dialogs: React.FC<PropsType>=({dialogsPage, addMessage}) => {
  let state = dialogsPage;

  let dialogsElements = state.dialogs.map((d) => (
    <DialogItem name={d.name} id={d.id} />
  ));
  let messagesElements = state.messages.map((m) => (
    <Message message={m.message} />
  ));

  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogsItems}>{dialogsElements}</div>
      <div className={styles.messages}>
        {messagesElements}
        <AddMessageForm addMessage={addMessage} />
      </div>
    </div>
  );
}
function DialogItem({ id, name }) {
  return (
    <div className={styles.dialog}>
      <NavLink
        to={"/dialogs/" + id}
        style={({ isActive }) => ({
          textDecoration: isActive ? "underline" : "none",
        })}
      >
        <img
          src="https://cs13.pikabu.ru/post_img/2023/10/28/2/1698456437194820220.jpg"
          alt="///"
        />
        {name}
      </NavLink>
    </div>
  );
}

function Message({ message }) {
  return <div className={styles.message}>{message}</div>;
}

type AddMessageFormPropsType = {
addMessage:(newMessageText: string) => void
}

export const AddMessageForm: React.FC<AddMessageFormPropsType>=(props) => {
  let addNewMessage = (values:string) => {
    props.addMessage(values);
  };
  return (
    <Formik
      initialValues={{ newMessageText: "" }}
      onSubmit={(values: { newMessageText: string; }, { resetForm }: any) => {
        addNewMessage(values.newMessageText);
        resetForm();
      }}
    >
      {() => (
        <Form>
          <div>
            <Field
              name={"newMessageText"}
              as={"textarea"}
              placeholder={"Enter message"}
              validate={validateMesages}
            />
          </div>
          <button type={"submit"}>Send</button>
        </Form>
      )}
    </Formik>
  );
}

export default Dialogs;
