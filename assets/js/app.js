import '../css/app.css';
import React, { useState } from 'react';
import ReactDOM from "react-dom";
import Navbar from "./components/Navbar";
import { HashRouter, Switch, Route, withRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StylesPage from './pages/StylesPage';
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

//Permet de savoir si on est authentifié au démarrage de l'appli.
//AuthApi.setup();

const App = () => {

    // Il faudrait par defaut qu'on demande a Authapi si on est connecté ou pas.
    /*
    const [isAuthenticated, setIsAuthenticated] = useState(
        AuthApi.isAuthenticated()
    );
*/
    const NavbarWithRouter = withRouter(Navbar);


    return (
        /* Le HashRouter me permet de dire qu'on reste sur la meme page mais avec un element different  #/hobbies ou #/users, etc...*/
        /*  C'est le switch qui joue le rôle du router */
        /*
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated
        }}>
        */
       <>
            <HashRouter>
                <NavbarWithRouter />
                <main className="container pt-5">
                    <Switch>
                        <Route path="/stylesPage" component={StylesPage} />
                         <Route path="/" component={HomePage} />
                    </Switch>
                </main>
            </HashRouter>
            <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
        </>
    );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);
