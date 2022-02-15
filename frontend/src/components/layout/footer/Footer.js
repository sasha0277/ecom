import React from 'react';
import appStore from "../../../images/Appstore.png";
import playStore from "../../../images/playstore.png";
import './Footer.css';

const Footer = () => {
    return (
        <footer id="footer">

            <div className="leftFooter">
    <h4>Download our App</h4>
    <p>Download for Android and iOS</p>
    <img src={playStore} alt ="playstore"/>
    <img src={appStore} alt ="appstore"/>

    </div>
    <div className="midFooter">
    <h1>Ecommerce</h1>
    <p>Best Quality is our goal</p>
    <p> Copyright 2022 &copy; All rights reserved</p>

    </div>
    <div className="rightFooter">
    <h4> Follow us </h4>
    <a  href="http://www.facebook.com/">Facebook</a>
    <a  href="http://www.instagram.com/">Instagram</a>
    <a  href="http://www.Twitter.com/">Twitter</a>

    </div>







        </footer>
    );
};

export default Footer;
