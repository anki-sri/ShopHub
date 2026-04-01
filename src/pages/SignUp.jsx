import {  useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

import "./Signup.css";

const SignUp = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateForm = () => {
        const newError = {};
        if (!name.trim()) {
            newError.name = "Name is required";
        }
        if (!email.trim()) {
            newError.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newError.email = "Email is invalid";
        }
        if (!password.trim()) {
            newError.password = "Password is required";
        } else if (password.length < 6) {
            newError.password = "Password must be at least 6 characters";
        }
        setError(newError);
        return Object.keys(newError).length === 0;
    };


    const handleSignUp = async (e) => {
        e.preventDefault()
        if (!validateForm()) {
            return;
        }
        setLoading(true);
        setError({});

        // Handle sign up logic here
        try{
            const res = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: name, email: email, password: password })
            });
            const data = await res.json();
            if(res.ok){
                navigate("/login");
            } else {
                setError({ message: data.message });
            }

        }catch(err) {
            setError({ message: "Sign up failed. Please try again." });
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="signup-container">
            <div className="signup-box">
                 <h1>Sign Up Page</h1>

            {error.message && <p className="error-message">{error.message}</p>}

            <div className="form-group">
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                {error.name && <p className="error-message">{error.name}</p>}
            </div>

            <div className="form-group">
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {error.email && <p className="error-message">{error.email}</p>}
            </div>

            <div className="form-group">
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {error.password && <p className="error-message">{error.password}</p>}
            </div>

            
        
            <button onClick={(e)=>handleSignUp(e)}
            disabled={loading}
            className="signup-btn">{loading ? "Signing Up..." : "Sign Up"}</button>
            <p>Already have account? <a href="/login">login</a></p>
        </div>
        </div>
    )
}

export default SignUp;