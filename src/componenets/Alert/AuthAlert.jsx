import withReactContent from 'sweetalert2-react-content';
import './Alert.css';
import Swal from 'sweetalert2';

export function RedirectToLoginAlert() {
  const Alert = withReactContent(Swal);
  const handleSignUp = ()=> {
    window.location.hash = "signUp";
    Alert.close();
  }
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
      footer: (
        <div style={{display: 'flex', gap: '5px'}}>
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