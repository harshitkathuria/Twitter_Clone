import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";

const Alert = () => {
  const alert = useSelector(state => state.alert);
  const reactAlert = useAlert();
  useEffect(() => {
    if (alert) {
      reactAlert.show(alert.msg, {
        type: alert.type
      });
    }
  }, [alert]);

  return <></>;
};

export default Alert;
