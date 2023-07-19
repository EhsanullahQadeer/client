import React, { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
//
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export function RemoveBookMarkAlert(isRemoved) {
  return new Promise((resolve) => {
    const Alert = withReactContent(Swal);
    Alert.fire({
      title: "Removing Bookmark?",
      text: "Are you sure you want to remove this blog from bookmark?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove it!",
    }).then((result) => {
      resolve(result);
    });
  });
}
//
export function RedirectToLoginAlert() {
  const Alert = withReactContent(Swal);
  Alert.fire({
    title: "<strong>Not logged In</strong>",
    icon: "info",
    html: "Do you want to login/signup?",
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: 'Yes <span class="fa fa-thumbs-up"></span> ',
    confirmButtonAriaLabel: "Thumbs up, great!",
    cancelButtonText: 'No <span class="fa fa-thumbs-down"></span>',
    cancelButtonAriaLabel: "Thumbs down",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.hash = "signIn";
    }
  });
  return null;
}
//

export function AuthenticateAlert({title,desc}) {
  const Alert = withReactContent(Swal);
  Alert.fire({
    allowOutsideClick: false,
    timer: 1000,
    icon: "success",
    title:title,
    text:desc,
    didOpen: () => {
      Alert.showLoading();
    },
  });
}

export function RemoveBookMarkSuccessAlert() {
  Swal.fire({
    title: "Removed!",
    text: "Your bookmark has been removed.",
    icon: "success",
    timer: 1500,
  });
}
export function SmallAlert({ icon, title, danger }) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    iconColor: danger && "#f27474",
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: icon,
    title: title,
  });
}

//confirmation mui alert

export default function ConfirmationAlertMui({
  title,
  desc,
  cancelBtnName,
  confirmBtnName,
  setState,
  onConfirm,
}) {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setState(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {desc}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{cancelBtnName}</Button>
          <Button
            onClick={() => {
              handleClose(), onConfirm();
            }}
            autoFocus
          >
            {confirmBtnName}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
