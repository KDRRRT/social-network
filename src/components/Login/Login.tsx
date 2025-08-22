import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikErrors } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { loginn } from "../../redux/authReduser.ts";
import { Navigate } from "react-router-dom";
import {AppStateType} from "../../redux/reduxStore.ts"


const LoginForm: React.FC<OwnPropsType> =({ messages }) => {
  const captchaUrl = useSelector((state: AppStateType)=> state.auth.captchaUrl)
  const isAuth = useSelector((state: AppStateType)=> state.auth.isAuth)
  //const messageError = useSelector((state: AppStateType)=> state.auth.messageError)

const dispatch = useDispatch()



  if (isAuth) return <Navigate to="/profile" />;
  // eslint-disable-next-line no-lone-blocks
  {
    captchaUrl && <img alt="///" src={captchaUrl} />;
  }
  const validationSchemaLoginForm = Yup.object().shape({
    password: Yup.string()
      .min(2, "Пароль слишком короткий")
      .max(15, "Пароль слишком длинный")
      .required("Введите пароль"),
  });
  const InitialValues : FormValues = {
    email: "",
    password: "",
    rememberMe: false,
    messages: null,
    captcha: null
  }
  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={InitialValues}
        validate={(values: { email: string; }) => {
          const errors: FormikErrors<FormValues> = {};
          if (!values.email) {
            errors.email = "Поле обязательно для ввода";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Неверно указан адрес";
          }
          return errors;
        }}
        validationSchema={validationSchemaLoginForm}
        onSubmit={(values: { email: string; password: string; rememberMe: boolean; captcha: null | string; }) => {
          //@ts-ignore
          dispatch(loginn(values.email, values.password, values.rememberMe, values.captcha));
        }}
      >
        {() => (
          <Form>
            <div>
              <Field type={"text"} name={"email"} placeholder={"e-mail"} />
            </div>
            <ErrorMessage name="email" component="div" />

            <div>
              <Field
                type={"password"}
                name={"password"}
                placeholder={"password"}
              />
            </div>
            <ErrorMessage name="password" component="div" />

            <div>
              <Field type={"checkbox"} name={"rememberMe"} />
              <label htmlFor={"rememberMe"}> remember me </label>
            </div>
            <div>
              {captchaUrl && (
                <Field
                  type={"text"}
                  placeholder={"anty-bot symbols"}
                  name={"captcha"}
                />
              )}
            </div>

            <button type={"submit"}>Log in</button>
            <div>{messages}</div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

type FormValues = {
  email: string
  password: string
  rememberMe: boolean
  captcha: null | string
  messages: null | string
}

type OwnPropsType = {
    messages: null | string
}

export default LoginForm