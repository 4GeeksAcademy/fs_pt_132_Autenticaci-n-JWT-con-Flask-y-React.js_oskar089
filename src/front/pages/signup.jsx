import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null);
        console.log("Antes de response")
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        console.log("antes del if")
        console.log(response)
        if (response.ok) {
            alert("Usuario creado con éxito. Ahora puedes loguearte.");
            navigate("/login"); // Tras el registro, lo mandamos al login
        } else {
            const data = await response.json();
            setError(data.msg || "Error al registrar usuario");
        }
    };

    return (
        <div className="container mt-5 w-50">
            <h2 className="mb-4">Crear Cuenta Nueva</h2>
            <form onSubmit={handleSignup} className="card p-4 shadow">
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={username} 
                        onChange={e => setUsername(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button className="btn btn-primary w-100">Registrarse</button>
            </form>
        </div>
    );
};