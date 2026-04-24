import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer(); 
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: "logout" });
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-light bg-light px-3">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">Autenticación One Piece</span>
                </Link>
                <div className="ml-auto">
                    {!store.token ? (
                        <Link to="/login">
                            <button className="btn btn-primary">Entrar</button>
                        </Link>
                    ) : (
                        <button className="btn btn-danger" onClick={handleLogout}>
                            Salir
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};