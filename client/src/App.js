import { useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from "./component/signup/Signup";
import {BrowserRouter as Router , Routes ,Route, BrowserRouter  } from 'react-router-dom'
import Login from "./component/Login/Login";
// import Navbar from "./component/navbar/Navbar";
import Header from "./card/Header";
import QrCode from "./card/QrCode";
import { useCookies } from "react-cookie";
import AdminDashboard from "./card/Dashboard";
import Dashboard from "./card/Dashboard";
import Users from "./card/Users";
import AddUserModal from "./card/AddUserModal";
import UserDetails from "./UserDetails";
import EditAddress from "./card/Update";


function App() {
  const [cookies, removeCookie] = useCookies([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if(!search) {
      return;
    }
    setLoading(true);

    fetch(`http://localhost:3000/dashboard=${search}`)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setUsers(res.items);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [search]); // every time search changes, we call the fn

  if(loading) {
    return <p>Loading...</p>
  }




  return (
    

    <div>
      <h1> user searcher</h1>
      <input
        type="text"
        placeholder="Search"
        onChange={e => setSearch(e.target.value)}
        value={search}
      />

      {users.map((user, name) => (  // {}you have ti return inthis fn, () using this return directly
        <UserDetails
          key={name}
          {...user}
        />
      ))}

    
      <BrowserRouter>
        <Routes>
          
          <Route path="" element={<Login/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/qrcode/:id" element={<QrCode />}/>

          
         <Route path="/home" element={<Header/>}/>
         <Route path="/dashboard" element={<Dashboard/>}/>
          

         <Route path="/users" element={<Users/>}/>
         <Route path="/update" element={<EditAddress/>}/>
         
        </Routes>
      </BrowserRouter> 
    </div>
   
  );
}

export default App;
