import { Avatar, Button, Typography } from "@material-ui/core";
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import React from "react";
import "./About.css";
const About = () => {
  const visitLinkedin = () => {
    window.location = "https://www.linkedin.com/in/sonny-sharma-b6baa5a3/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/sasha0277/image/upload/v1644013416/avatars/clvby5l7pzxposkg7qkb.png"
              alt="Founder"
            />
            <Typography>Sonny Sharma</Typography>
            <Button onClick={visitLinkedin} color="primary">
              Visit LinkedIn
            </Button>
            <span>
             This project is made for having fun with React.js and learning more concepts
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.linkedin.com/in/sonny-sharma-b6baa5a3/"
              target="blank"
            >
              <LinkedInIcon className="linkedinSvgIcon" />
            </a>

            <a href="https://github.com/sasha0277" target="blank">
              <GitHubIcon className="githubSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;