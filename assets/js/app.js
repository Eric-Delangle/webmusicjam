import '../css/app.css';
import React, { useState } from 'react';
import ReactDOM from "react-dom";
import Navbar from "./components/Navbar";
import { HashRouter, Switch, Route, withRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MembersListPage from './pages/MembersListPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilPage from './pages/ProfilPage';
import MemberPage from './pages/MemberPage';
import { ToastContainer, toast } from 'react-toastify';
import AuthApi from "./services/AuthApi";
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";


//Permet de savoir si on est authentifié au démarrage de l'appli.
AuthApi.setup();

const App = () => {
  
    // Il faudrait par defaut qu'on demande a Authapi si on est connecté ou pas.
    
    const [isAuthenticated, setIsAuthenticated] = useState(
        AuthApi.isAuthenticated()
    );

    const NavbarWithRouter = withRouter(Navbar);


    return (
        /* Le HashRouter me permet de dire qu'on reste sur la meme page mais avec un element different  #/styles ou #/users, etc...*/
        /*  C'est le switch qui joue le rôle du router */
        
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated
        }}>
        
       
            <HashRouter>
                <NavbarWithRouter />
                <main className="container pt-5">
                    <Switch>
                        <Route path="/login"  component= { LoginPage }/>
                        <Route path="/register"  component= { RegisterPage }/>
                        <PrivateRoute path="/member" component = { MemberPage }/>
                        <Route path="/users/:id" component={ProfilPage} />
                        <Route path="/membersList" component={MembersListPage} />
                         <Route path="/" component={HomePage} />
                    </Switch>
                </main>
            </HashRouter>
           
            <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
            </AuthContext.Provider>
    );
    
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);

