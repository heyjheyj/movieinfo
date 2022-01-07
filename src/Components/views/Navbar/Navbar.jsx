import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

import { logout } from "../../../redux/actions";
import { useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import {VideoCameraOutlined} from '@ant-design/icons';

const Navbar = props => {
  const [user, setUser] = useState();

  useEffect(() => {
    let user = localStorage.getItem("userId");
    // console.log(user);
    setUser(user);
  }, [user]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout()).then(res => {
      if (res.payload.success) {
        console.log(res.payload.userInfo)
        localStorage.removeItem('userId')
        navigate("/");
      } else {
        alert("fail to logout");
      }
    });
  };

  return (
    <div className={styles.navbar}>
      <Link to="/">
      <section className={styles.leftNav}>
        <VideoCameraOutlined />
        <h3 className={styles.title}>MOVIE</h3>
      </section>
      </Link>
      <section className={styles.rightNav}>
        {user ?
          <>
          <Link to="/favorite">
            <h3>Favorite</h3>
          </Link>
          <h3 
            onClick={onLogout} 
            className={styles.logout}>
              Logout
          </h3>
          </> :
          <>
          <Link to="/login">
            <h3>Signin</h3>
          </Link>
          <Link to="/register">
            <h3 className={styles.signup}>Signup</h3>
          </Link>
        </>      
        }
      </section>
    </div>
  );
};

export default Navbar;
