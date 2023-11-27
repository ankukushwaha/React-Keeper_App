import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp(){
    const navigate = useNavigate();
    const [detail, setDetail] = useState({
        username: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const {value, name} = e.target;
        setDetail((prevValue) => {
            return{
                ...prevValue,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`http://localhost:4000/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(detail),
          });
      
          if (response.ok) {
            const json = await response.json();
            console.log(json);
            setDetail({username: "",
            email: "",
            password: ""});
            navigate("/login");
          } else {
            // Handle errors here
            console.error("Signup failed");
          }
        } catch (error) {
          console.error("Error during signup:", error.message);
        }
      };
      

    return(
        <form>
            <div className="mb-3">
                <label htmlFor="exampleInputUsername1" className="form-label">User Name</label>
                <input type="username" className="form-control" id="exampleInputUsername1" value={detail.username} onChange={handleChange} name="username"/>
               </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={detail.email} onChange={handleChange} name="email"/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" autoComplete="on" value={detail.password} onChange={handleChange} name="password" />
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>SignUp</button>
        </form>
    )
}

export default SignUp;