import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearProgress } from "../utils/api";

const Login = () => {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username.trim()) {
            clearProgress(); 
            localStorage.setItem("username", username);
            navigate("/quiz");
        } else {
            alert("Please enter a username");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ padding: "10px", fontSize: "16px" }}
            />
            <button onClick={handleLogin} style={{ padding: "10px 20px", marginLeft: "10px" }}>
                Start Quiz
            </button>
        </div>
    );
};

export default Login;
