import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from '@mui/material/Button';
import {RxCross1}  from "react-icons/rx"
import { Link } from "react-router-dom";


export default function AlertDialog({open,setOpen}) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog 
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <RxCross1  style={{position:"absolute",right:"30px",top:"30px",cursor:"pointer",}} onClick={()=>setOpen(false)}/>
        <DialogTitle id="alert-dialog-title" style={{paddingTop:"90px",textAlign:"center",fontSize: "20px",fontWeight: "600"}}>
          {"REQUEST SUBMITTED "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{textAlign:"center",}}>
            Thank you! Your request has been submitted successfully. There are
            many variations of passages of Lorem Ipsum available, but the
            majority have suffered alteration in some form randomized words
            which don't look even slightly believable.
          </DialogContentText>
        </DialogContent>
        <div style={{paddingBottom:"80px"}}>
            <Link to="/">
        <Button variant="contained" style={{width:'120px',marginLeft:"50%",transform:"translateX(-50%)"}}>Home Page</Button>     
            </Link>
        </div>
         </Dialog>
    </div>
  );
}
