import React, { useState, useEffect, useRef } from "react";
import QRCode from "react-qr-code";
import { useParams } from "react-router-dom";
import axios from "axios";
import html2canvas from 'html2canvas';


import Logo from "../images/man.png"
import  './Header.css'

import twitterLogo from "../images/twitter.jpg"
import instaLogo from "../images/instagram.jpg"
import githubLogo from "../images/github.jpg"
import facebookLogo from "../images/facebook.png"

function QrCode() {
  const { id } = useParams(); // Get the id from the URL
  const [user, setUser] = useState(null);
  const printRef = useRef(); // Corrected useRef without React.useRef

  useEffect(() => {
    // Fetch the user data from the backend
    const fetchUser = async () => {
      try {
        // console.log(id);
        const response = await axios.get(
          `http://localhost:5000/api/user/${id}`
        ); // Call to your Express backend

        console.log(response.data)
        setUser(response.data); // Set the user data in state
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
    // Removed the call to handleDownloadImage here to avoid the error
    
  }, [id]); // Dependencies should only include 'id' to avoid unnecessary rerenders

  // if (!user) return <p>loading...</p>;

  const handleDownloadImage = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL('image/jpg');
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = 'image.jpg';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  return (
    <div className="app-container">
      <button type="button" onClick={handleDownloadImage}>
        Download as Image
      </button>
      <div ref={printRef}>
         <div className="app-container">
       
      <div className='app--container--two'>
        <div className='app--container--three'>
       

    <div className='header--container'>
              <a href="/">
    <img src={Logo} alt="" width="100px" height="100px" /> </a> 
    
    <h3 className="buca">
      <h4>HEY!</h4>
          This Is Coder's Business Card!
        </h3>
         <h4 className='front'>
         our mission is to provide innovative technological solutions!
         </h4>

     <div className='footer--container'>
         <div className='footer--items'>
         <QRCode
          size={100}
          bgColor="white"
          fgColor="red"
          padding="100px"
          value={`http://localhost:3000/qrcode/${user._id}`} // Use dynamic user data
        />

      <img src={twitterLogo} alt="" className='footer--image-twitter' width ="100px" />
      <img src={instaLogo} alt="" className='footer--image-insta' width ="100px" />
      <img src={githubLogo} alt="" className='footer--image-git' width ="100px" />
      <img src={facebookLogo} alt="" className='footer--image-face'  width ="100px"/>

     
      </div>
    </div>
    </div>
    </div>
    </div>
    </div>
        
       
      </div>
    </div>
  );
}

export default QrCode;
