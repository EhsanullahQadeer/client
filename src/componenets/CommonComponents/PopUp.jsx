import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from '@mui/material/Button';
import {RxCross1}  from "react-icons/rx"
import { Link } from "react-router-dom";
import { Divider } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";


export default function AlertDialog({open,setOpen,desc,title}) {

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
        <RxCross1  style={{position:"absolute",right:"30px",top:"20px",cursor:"pointer",}} onClick={()=>setOpen(false)}/>
        <Divider style={{marginTop: '45px'}}/>
        <DialogTitle id="alert-dialog-title" style={{paddingTop:"0px", paddingBottom: '4px',textAlign:"center",fontSize: "20px",fontWeight: "600"}}>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{textAlign:"center",}}>
            {desc}
          </DialogContentText>
        </DialogContent>
        <div style={{paddingBottom:"30px"}}>
            <Link to="/">
        <Button variant="contained" style={{width:'140px',marginLeft:"50%",transform:"translateX(-50%)"}}>Home Page</Button>     
            </Link>
        </div>
         </Dialog>
    </div>
  );
}
