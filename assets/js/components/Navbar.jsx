import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from "../contexts/AuthContext";
import AuthApi from "../services/AuthApi";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";

const Navbar = ({ history }) => {

    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    const handleLogout = () => {
        AuthApi.logout();
        setIsAuthenticated(false);
        toast.info("Vous êtes desormais déconnecté(e) ");
        history.push("/login");
    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

            <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink to="/membersList" className="btn btn-primary">Liste des membres</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/styles" className="btn btn-primary">Chercher par styles</NavLink>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/instruments">Chercher par instruments</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/experience">Chercher par niveau d'experience</a>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    {(!isAuthenticated && (
                        <>
                            <li className="nav-item">
                                <NavLink to="/register" className="btn btn-primary">Inscription</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/login" className="btn btn-primary">Connexion</NavLink>
                            </li>
                        </>
                    )) || (
                        <>
                            <li className="nav-item">
                                <NavLink to="/member" className="btn btn-primary">Votre espace</NavLink>
                            </li>
                            <li className="nav-item">
                                <button onClick={handleLogout} className="btn btn-danger">Déconnexion</button>
                            </li>
                            </>
                            )}
                </ul>

            </div>
        </nav>
    );
}

export default Navbar;