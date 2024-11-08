import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import { FaMagic } from 'react-icons/fa';

function Login() {
  const [name, setName] = useState();

  const [email, SetEmail] = useState();

  const [password, setPassword] = useState();
  const [cookies, removeCookie] = useCookies([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/login",
        { name, email, password },
        { withCredentials: true }
      )
      .then((result) => {
        // console.log(result)

        if (result.data.success === true) {
          navigate("/home");
        }
      })
      .catch((err) => console.log(err));
  };



  const createBubbles = () => {
    const bubbles = [];
    for (let i = 1; i <= 10; i++) {
      bubbles.push(<div key={i} className="bubble"></div>);
    }
    return bubbles;
  };




  return (
    <div className="wrp">
      <div className="container">
      <div className="bubbles-background">{createBubbles()}</div> {/* Add bubbles to background */}
      <div className="login-card">
        {/* <div className="magic-icon">
          <FaMagic size={60} />
        </div> */}
      <form onSubmit={handleSubmit}>
        <h3>Login</h3>

        <div className="input-box">
          <lable>email</lable>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => SetEmail(e.target.value)}
          />
        </div>

        <div className="input-box">
          <lable>Password</lable>
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="remember-forgot">
          

          <button type="Submit">
            Login
            <span className="arrow">→</span>
            <div className="bubble-container"></div>
          </button>
        </div>
      </form>

      <div className="register-link">
        <p>for signup</p>
        <Link to="/signup">signup</Link>
      </div>
    </div>
    </div>
    </div>
  );
}

export default Login;
