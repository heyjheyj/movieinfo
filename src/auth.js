/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { auth } from "./redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    const navigate = useNavigate();

    const [userData, setUserData] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
      //To know my current status, send Auth request
      dispatch(auth()).then((res) => {
        let userData = res.payload;
        console.log("[Auth]res.data:", res.payload);
        setUserData(userData);
        //Not Loggined in Status
        if (!res.payload.isAuth) {
          if (option) {
            navigate("/login");
          }
          //Loggined in Status
        } else {
          //supposed to be Admin page, but not admin person wants to go inside
          if (adminRoute && !res.payload.isAdmin) {
            navigate("/");
          }
          //Logged in Status, but Try to go into log in page
          else {
            if (option === false) {
              navigate("/");
            }
          }
        }
      });
    }, []);

    return <SpecificComponent user={userData} {...props} />;
  }
  return AuthenticationCheck;
}
