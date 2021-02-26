import React, { useEffect, useState, useContext } from 'react';
import UsersApi from '../services/UsersApi';
import StylesApi from '../services/StylesApi';
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom';

const MemberPage = (props) => {

    // je récupere le token 
    const jwt = window.localStorage.getItem("authToken");
    console.log(jwt);
    // je le décode
    const decoded = jwt_decode(jwt);
    console.log(decoded);
    // j'en extrait l'id
    const id = decoded.id;

    console.log(id)

    const [user, setUser] = useState([]);

    // Récuperation des données du membre pour l'affichage gràce à l'id. 
    async function fetchUser(id) {
        try {
            const user = await UsersApi.find(id);
            setUser(user);

        } catch (error) {
            console.log(error.response);
        }

    }

    useEffect(() => {

        fetchUser(id);

    }, [id]);

    console.log(user)
    console.log(user.style)
    return (
        <>

            <h1>Ton espace perso.</h1>
            {/* La je vais inclure une div qui fera apparaitre la page de visioconference */}
            <div id="visio"><p className="">Ecran de visio</p></div>
            <table className="table table-hover">

                <thead>
                    <tr>
                        <th scope="row">Style(s)</th>
                        <th scope="col">Instrument(s)</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Prenom</th>
                        <th scope="col">Ville</th>
                        <th scope="col">Email</th>
                        <th scope="col"className="text-center" >Année(s) de pratique</th>
                    </tr>
                </thead>
                <tbody>

                    <tr className="table-primary">
                        {user.style && user.style.map(item=>
                            <td key={item.id}>{item.name}</td>
                        )}
                          {user.instrument&& user.instrument.map(item=>
                            <td key={item.id}>{item.name}</td>
                        )}
                        
                        <td>{user.lastName}</td>
                        <td>{user.firstName}</td>
                        <td>{user.city}</td>
                        <td>{user.email}</td>
                        <td className="text-center">{user.experience}</td>
                    </tr>

                </tbody>
            </table>
        </>

    );
}

export default MemberPage;