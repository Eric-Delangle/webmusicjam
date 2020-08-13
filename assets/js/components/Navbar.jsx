import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from "../contexts/AuthContext";

const Navbar = (props) => {

    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    const handleLogout = () => {
        AuthApi.logout();
        setIsAuthenticated(false);
        toast.info("Vous êtes desormais déconnecté(e) ");
        // history.push("/login");
    };

    return (

            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand" href="#">Faites votre choix</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                        <NavLink to="/StylesPage" className="btn btn-primary">Chercher par styles</NavLink>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Chercher par instruments</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Chercher par niveau d'experience</a>
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
                                <li className="nav-item">
                                    <button onClick={handleLogout} className="btn btn-danger">Déconnexion</button>
                                </li>
                            )}
                    </ul>

                </div>
            </nav>
    );
}

export default Navbar;