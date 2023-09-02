import withReactContent from 'sweetalert2-react-content';
import './Alert.css';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export function RedirectToLoginAlert() {
    const Alert = withReactContent(Swal);
    Alert.fire({
      title: "<div>Action Required!</div>",
      html: "Login required to perform this action",
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'Sign In',
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: 'Cancel',
      cancelButtonAriaLabel: "Thumbs down",
      footer: "Don't have an account?&nbsp;<div onClick='window.location.hash = signUp' style='color: #0D6EFD'> Sign up</div>",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.hash = "signIn";
      }
    });
    return null;
  }