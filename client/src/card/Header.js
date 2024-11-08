// Header.js
import React, { useEffect, useState , useRef} from "react";
import Logo from "../component/images/giff.gif";
import "./Header.css";
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie"; // Keep using useCookies here
import twitterLogo from "../images/twitter.jpg";
import instaLogo from "../images/instagram.jpg";
import githubLogo from "../images/github.jpg";
import facebookLogo from "../images/facebook.png";
import axiosInstance from "../axiosInstance"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShareButton from "../component/ShareButton";



// import React, { useState, useEffect, useRef } from "react";
import QRCode from "react-qr-code";
import { useParams } from "react-router-dom";
import axios from "axios";
import html2canvas from 'html2canvas';

// import twitterLogo from "../images/twitter.jpg"
// import instaLogo from "../images/instagram.jpg"
// import githubLogo from "../images/github.jpg"
// import facebookLogo from "../images/facebook.png"

function Header() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(['token']); // Specify 'token' dependency
  const [profile, setprofile] = useState({});

  

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
        return;
      }

      try {
        const { data } = await axiosInstance.post("/userdata");
        const { status, user } = data;
        setprofile(user);

        console.log(data)

        if (status) {
          toast(`Hello ${user.name}`, {
            position: "top-right",
            autoClose:1000
          });
        } else {
          removeCookie("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error verifying cookie", error);
        removeCookie("token");
        navigate("/login");
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);













  const { id } = useParams(); // Get the id from the URL
  const [user, setUser] = useState(null);
  const printRef = useRef();


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
    
  }, [id]);



  const handleDownloadImage = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL('image/jpg');
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = 'image.png';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };












  const Logout = () => {
    removeCookie("token");
    navigate("/login");
  };


  const shareUrl = window.location.href; // Current page URL
  const title = 'Digital Card Ethiopia';

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`, '_blank');
  };


  const HomePage = () => {
    return (
      <div>
        <h1>Welcome to My Website</h1>
       
        <ShareButton />
      </div>
    );
  };


  

  return (
    <div className="business-card-container">

      <button type="button" onClick={handleDownloadImage} className="fantasy-button">
        Download This Card
      </button>
      <div ref={printRef}>

    <div className="floating-glow"></div>
    <div className="particles"></div>
    <div className="business-card">
      <div className="card-top">
            <a href="/">
              <img src={Logo} 
              alt="Company Logo" 
              className="company-logo" />
            </a>
            
            <h3 className="buca">
              <h4> HEY {profile.name}! </h4>
              <p className="slogan">our mission is to provide innovative technological solutions!</p>
            </h3>   </div>



            <div className="card-body">
          <h3> Addisway Software Company </h3>
          <p className="job-title">Website Developers</p>

          <div className="contact-info">
            <p><strong>Phone:</strong> +2519611996</p>
            <p><strong>Email:</strong> epicurus9@gmail.com</p>
            <p><strong>Website:</strong>https://addisway.com</p>
          </div>

          <div className="address">
            <p>Aberus Buld , Addis Abeba , Ethiopia  </p>
            <p>Stock Colorado 123</p>
          </div>
        </div>

        
       
            <div className="footer--container">
              <div className="footer--items">
                {/* <a href="http://localhost:3000/qrcode"> QRcode </a> */}

                  <button onClick={shareOnFacebook}><img
                  src={twitterLogo}
                  alt=""
                  className="footer--image-twitter"
                  width="100px"
                /></button>
                  <button onClick={shareOnLinkedIn}><img
                  src={instaLogo}
                  alt=""
                  className="footer--image-insta"
                  width="100px"
                /></button>
                  <button onClick={shareOnTwitter}><img
                  src={githubLogo}
                  alt=""
                  className="footer--image-git"
                  width="100px"
                /></button>
                  <button onClick={shareOnFacebook}>
                  <img
                  src={facebookLogo}
                  alt=""
                  className="footer--image-face"
                  width="100px"
                /></button>

        <QRCode  className="qr"
        
          size={100}
          bgColor="white"
          fgColor="black"
          padding="100px"
          value={`https://addisway.com/`} 
        /></div>
        </div>
           
  </div>
              
            </div>


            {profile.role == "Admin" &&  <Link to='/dashboard' className="Dashboard">Dashboard</Link>}
            <button className="logout" onClick={Logout}>Logout</button>
           
      
      <ToastContainer hideProgressBar={true}/>
    </div>
  );
}

export default Header;