import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/register', { name, email, password }, { withCredentials: true })
      .then((response) => {
        const { success, message } = response.data; // Correctly access response data
        if (success) {
          handleSuccess("successful!"); // Show success notification
          setTimeout(() => {
            navigate("/home"); // Redirect after success
          }, 1000);
        } else {
          handleError(message || "failed!"); // Show error message
        }
      })
      .catch((err) => {
        console.error(err);
        handleError("Something went wrong!"); // Handle general errors
      });
  };

  const handleError = (msg) =>
    toast.error(msg, {
      position: "bottom-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  return (
    <div className='wrp'>
      <form onSubmit={handleSubmit}>
        <h3>REGISTER</h3>
        <div className='input-box'>
          <label>Full Name</label>
          <input 
            type='text' 
            placeholder='Full name' 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>

        <div className='input-box'>
          <label>Email</label>
          <input 
            type='email' 
            placeholder='Email' 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div className='input-box'>
          <label>Password</label>
          <input 
            type='password' 
            placeholder='Password' 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        <div>
          <button type='submit'>Register</button>
        </div>
      </form>

      <div>
        <p>u have an accout</p>
        <Link to='/login'>Login</Link>
      </div>

      <ToastContainer /> {/* Toast container for notifications */}

     

    </div>
  );
}

export default Signup;
