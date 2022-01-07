import React, { useRef, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import styles from './LoginPage.module.css'

import { login } from '../../../redux/actions'

import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Login = props => {
  const navigate = useNavigate()
    const dispatch = useDispatch();
    const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;
    const [formErrorMessage, setFormErrorMessage] = useState("");
    const [rememberMe, setRememberMe] = useState(rememberMeChecked);

    const handleRememberMe = () => {
      setRememberMe(!rememberMe);
    };
  
    const initialEmail = localStorage.getItem("rememberMe")
      ? localStorage.getItem("rememberMe")
      : "";

    const { control, handleSubmit } = useForm({
      defaultValues: {
        email: "",
        password: ""
      }
    });
    const formRef = useRef();
  
    const onSubmit = data => {
      console.log("[login]submit data:", data);
      dispatch(login(data)).then(res => {
        if(res.payload.loginSuccess) {
          window.localStorage.setItem("userId", res.payload.userId);
          if(rememberMe === true) {
            window.localStorage.setItem("rememberMe", data.id);
          } else {
          localStorage.removeItem('rememberMe');
        }
        navigate('/')
        window.location.replace("/");
      } else {
        setFormErrorMessage("Check out your Account or Password again");
      }
    }).catch((err) => {
      setFormErrorMessage("Check out your Account or Password again");
      setTimeout(() => {
        setFormErrorMessage("");
      }, 3000);
    });
  }


    return (<>
    <section className={styles.loginPage}>
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className={styles.loginform}
        >
          <label>Email </label>
          <Controller
            render={({ field }) => <input {...field} />}
            name="email"
            control={control}
            defaultValue=""
          />
          <label>Password </label>
          <Controller
            render={({ field }) => <input {...field} type="password" />}
            name="password"
            control={control}
            defaultValue=""
          />
          <input type="submit" />
        </form>
      </section>
      </>);
  };
  
  export default Login;