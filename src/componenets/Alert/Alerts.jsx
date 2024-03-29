import React, { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
//
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import './Alert.css';

export function RedirectToLoginAlert() {
  const Alert = withReactContent(Swal);
  const handleSignUp = () => {
    window.location.hash = "signUp";
    Alert.close();
  }
  Alert.fire({
    customClass: {
      container: 'my-custom-alert',
    },
    title: "<div>Action Required!</div>",
    html: "Login required to perform this action",
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: 'Sign In',
    confirmButtonAriaLabel: "Thumbs up, great!",
    cancelButtonText: 'Cancel',
    cancelButtonAriaLabel: "Thumbs down",
    footer: (
      <div style={{ display: 'flex', gap: '5px' }}>
        Don't have an account? <div onClick={handleSignUp} style={{ color: '#0D6EFD', cursor: 'pointer' }}>Sign Up</div>
      </div>
    ),
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.hash = "signIn";
    }
  });
  return null;
}

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

export function AuthenticateAlert({ title, desc }) {
  const Alert = withReactContent(Swal);
  Alert.fire({
    allowOutsideClick: false,
    timer: 1000,
    icon: "success",
    title: title,
    text: desc,
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
