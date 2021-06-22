import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "../../redux/actions/authAction";

const LoadUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return <></>;
};

export default LoadUser;
