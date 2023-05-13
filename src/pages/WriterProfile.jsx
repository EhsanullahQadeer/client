import React from "react";
import { WriterProfileContent } from "../componenets/WritterProfileComponents/index";
import LightNavbar from "../componenets/CommonComponents/LightNavbar";

const WriterProfile = () => {
  return (
    <div>
      <LightNavbar signIn={false} getStarted={true} person={true} />
      <WriterProfileContent />
    </div>
  );
};

export default WriterProfile;
