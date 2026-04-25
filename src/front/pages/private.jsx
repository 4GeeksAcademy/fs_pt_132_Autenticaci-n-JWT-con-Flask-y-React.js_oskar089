import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Private = () => {
    const { store } = useGlobalReducer();
    const navigate = useNavigate();

    useEffect(() => {
        // Verificación de seguridad: si no hay token, fuera al login
        if (!store.token) {
            navigate("/login");
        }
    }, [store.token, navigate]);

    // Si estado está vacío mientras redirige, mostramos un loading
    if (!store.token) return (
        <div className="container mt-5 text-center">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
            </div>
        </div>
    );

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 text-center">
                    <div className="card shadow-lg border-0 rounded-3">
                        <div className="card-body p-5">
                            <h1 className="display-4 mb-4 text-success">🚢 Zona Privada</h1>
                            <p className="lead mb-4">
                                ¡Bienvenido a bordo! Has superado el muro de autenticación.
                            </p>
                            
                            <div className="alert alert-secondary d-inline-block">
                                <i className="fas fa-lock me-2"></i>
                                Acceso autorizado con el ID de usuario: <strong>{store.user || "Anónimo"}</strong>
                            </div>

                            <hr className="my-4" />
                            
                            <p className="text-muted">
                                Este contenido solo es visible para usuarios con un <strong>JWT (JSON Web Token)</strong> activo en su sesión.
                            </p>

                            <div className="mt-4">
                                <button 
                                    className="btn btn-primary btn-lg"
                                    onClick={() => navigate("/")}
                                >
                                    Volver al Inicio
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};