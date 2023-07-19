import React from 'react'

export default function CommonAlert(props) {
  return (
    <div className={`alert alert-${props.alertType} form-font`}>{props.alertText}</div>
  )
}

