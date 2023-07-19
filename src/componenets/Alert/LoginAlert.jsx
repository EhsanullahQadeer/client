import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
export default function Alert_Login() {
    const Alert = withReactContent(Swal)
      Alert.fire({
        allowOutsideClick: false,
        timer: 1000,
        icon: 'success',
      title: 'You Are Successfully Logged In',
      text: 'Redirecting',
        didOpen: () => {
          Alert.showLoading()
        },
      })
}
