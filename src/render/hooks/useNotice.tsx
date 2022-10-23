import React, { ReactElement, useState } from "react";

import Alert, { AlertProp } from "../components/Alert";

export interface AlertOptions {
  autoHide?: boolean;
  duration?: number;
  message: string;
  type?: AlertProp["type"];
}

export interface Notice {
  show: (optons: AlertOptions) => void;
  hide: () => void;
  info: (optons: AlertOptions) => void;
  warning: (optons: AlertOptions) => void;
  success: (optons: AlertOptions) => void;
  faild: (optons: AlertOptions) => void;
  holder: ReactElement<AlertProp, any>;
}

const useNotice = (): Notice => {
  const [message, setMessage] = useState<string>("");
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [type, setType] = useState<AlertProp["type"]>("info");
  const [visible, setVisible] = useState<boolean>(false);

  const showAlert = (optons: AlertOptions) => {
    const { duration = 3000, type, message, autoHide = true } = optons;
    setType(type);
    setMessage(message);
    setVisible(true);
    if (timer) clearTimeout(timer);
    if (!autoHide) return;
    setTimer(setTimeout(() => setVisible(false), duration));
  };

  return {
    show(optons: AlertOptions) {
      showAlert(optons);
    },
    hide() {
      setVisible(false);
    },
    info(optons: AlertOptions) {
      showAlert({ ...optons, type: "info" });
    },
    warning(optons: AlertOptions) {
      showAlert({ ...optons, type: "warning" });
    },
    success(optons: AlertOptions) {
      showAlert({ ...optons, type: "success" });
    },
    faild(optons: AlertOptions) {
      showAlert({ ...optons, type: "faild" });
    },
    holder: <Alert visible={visible} type={type} message={message} />
  };
};

export default useNotice;
