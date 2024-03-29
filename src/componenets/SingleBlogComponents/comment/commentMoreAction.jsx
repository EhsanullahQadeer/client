import React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FlagIcon from "@mui/icons-material/Flag";
import ConfirmationAlertMui from "../../Alert/Alerts";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function CommentOptions({
  isShowAction,
  user,
  handleEdit,
  handleDelete,
  handleReport,
  commentsReply,
  id,
}) {
  const { processing } = useSelector((state) => state.comments);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [toDeleteCommentId, setToDeleteCommentId] = useState(0);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  let showLoader =
    processing.deleteComment ||
    processing.deleteReplyOfComent ||
    processing.deleteReplyOfReply;
  return (
    <div>
      {isShowAction &&
        // When delte will be in progress
        (showLoader && toDeleteCommentId == id ? (
          <CircularProgress size={"30px"} style={{ color: "#57638b" }} />
        ) : (
          <IconButton
            id="demo-customized-button"
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            <MoreHorizIcon
              className={`${commentsReply && "moreHorizIconHiden"}`}
              style={{
                fontSize: `${commentsReply ? "30px" : "45px"}`,
                color: "#57638b",
              }}
            />
          </IconButton>
        ))}
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {user ? (
          <div>
            <MenuItem
              onClick={() => {
                handleClose(), handleEdit();
              }}
              disableRipple
            >
              <EditIcon />
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose(), setShowDeleteAlert(true);
              }}
              disableRipple
            >
              <DeleteIcon />
              Delete
            </MenuItem>
          </div>
        ) : (
          <MenuItem
            onClick={() => {
              handleClose(), handleReport();
            }}
            disableRipple
          >
            <FlagIcon />
            Report
          </MenuItem>
        )}
      </StyledMenu>
      {showDeleteAlert && (
        <ConfirmationAlertMui
          title="Delete comment"
          desc="Delete your comment permanently?"
          cancelBtnName="Cancel"
          confirmBtnName="Delete"
          onConfirm={() => {
            handleDelete();
            setToDeleteCommentId(id);
          }}
          setState={setShowDeleteAlert}
        />
      )}
    </div>
  );
}
