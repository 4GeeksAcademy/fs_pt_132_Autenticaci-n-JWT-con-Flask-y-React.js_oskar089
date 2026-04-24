import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Login = () => {
    const { dispatch } = useGlobalReducer();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            dispatch({ type: "login", payload: data }); 
            navigate("/private"); 
        } else {
            alert("Error en el login");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container mt-5 w-50">
            <input type="text" className="form-control mb-2" placeholder="Username" onChange={e => setUsername(e.target.value)} />
            <input type="password" className="form-control mb-2" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <button className="btn btn-success">Login</button>
        </form>
    );
};