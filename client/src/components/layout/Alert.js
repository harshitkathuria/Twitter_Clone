import React from "react";
import { useSelector } from "react-redux";

const Alert = () => {
  const alert = useSelector(state => state.alert);

  const alertClass = "alert mt-3 mx-auto";
  return (
    alert && <div className={alertClass + ` ${alert.type}`}>{alert.msg}</div>
  );
};

export default Alert;
