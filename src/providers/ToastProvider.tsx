import { Fragment } from "react";
import { ToastContainer } from "react-toastify";

interface Props {
  children: React.ReactNode;
}

export const ToastProvider = ({ children }: Props) => {
  return (
    <Fragment>
      <ToastContainer />

      {children}
    </Fragment>
  );
};
