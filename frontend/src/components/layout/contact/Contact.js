import { Button } from "@material-ui/core";
import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:sasha0277@yahoo.com">
        <Button>Contact: sasha0277@yahoo.com</Button>
      </a>
    </div>
  );
};

export default Contact;