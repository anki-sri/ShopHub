import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/slices/authSlice";
import "./Signup.css";
const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()
        // handle login logic here
        const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, password: password })
        });

        const data = await res.json();
        console.log(res, "data");

        if (res.ok) {
            dispatch(loginSuccess({ user: data.user, token: data.token }));
            navigate("/cart");
        } else {
            alert(data.message);
        }
    };
    return (
        <div className="signup-container">
            <div className="signup-box">
                <h1>Login Page</h1>

                <div className="form-group">
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
        <button onClick={(e)=>handleLogin(e)} className="signup-btn">Login</button>
            </div>
            
        </div>
    )
}
export default Login;