import React from 'react'
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ClearIcon from "@mui/icons-material/Clear";
export default function StoryAdd({setOpen, setOpenStory}) {
  return (
    <div  className="d-flex  justify-content-center storyBodyMain">
      <div style={{background:"#174c8e"}} className="storyBody">
        <div className=" px-3 mt-3 storyBodyHead">
          
          <ClearIcon
            onClick={() => {
              setOpen(false), setOpenStory(false);
            }}
            style={{ fontSize: 32, cursor: "pointer",float:"right",color:"#FFF" }}
            className="my-auto"
          />
        </div>
        <div className="storyAdd-contentDiv">
          <h3>Lets's Gets Yourself Heard!</h3>
          <p>
          So,you are interested in getting yourself heard by millions.We help you get your voice heard
          ,videos watched,skills experties,knowledge,and business noticed by those for whom they matter a lot.
          </p>
          <p className='mt-3'>Kindly,contact us to get your stories displayed.</p>
          <div className='d-flex justify-space-between' style={{padding:" 0 13%"}}>
          <div className='col-4'>
          </div>
          <div className='col-8'>
          <p className='text-left p-0'>Our usual reply time</p>
          <p className='mt-2 text-left p-0'><span className="fa-sharp fa-regular fa-clock fa-lg mr-2 "></span><strong>A few hours</strong></p>
          </div>
        </div>
        </div>
        

        <div className="px-3 mb-3 story-signUpBtn">
          <Button
            className="btn-block"
            style={{ borderRadius: "100px",fontWeight:"600",letterSpacing:"3px"}}
            variant="contained"
            size="medium"
          >
            Contact Us
          </Button>
        </div>
      </div>
      <div className="ml-2 mt-3">
        <div className="mb-2">
          <IconButton className="b6babd pe-none" aria-label="delete">
            <RemoveRedEyeOutlinedIcon style={{ fontSize: 30 }} />
          </IconButton>
          <p className="text-center small b6babd pe-none ">900</p>
        </div>
        <div>
          <IconButton className="b6babd" aria-label="delete">
            <ShareOutlinedIcon style={{ fontSize: 30 }} />
          </IconButton>
        </div>
      </div>
    </div>
  )
}
