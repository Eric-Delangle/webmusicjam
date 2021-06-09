import React, { useState, useEffect } from 'react';
import UsersApi from '../services/UsersApi';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';

const ProfilPage = (props) => {

    const userid = window.localStorage.getItem("id");

    const [user, setUser] = useState({
        lastName: "",
        firstName: "",
        email: "",
        city: "",
        experience:"",
        styles: [],
        instruments: []
    });

    const [errors, setErrors] = useState({
        lastName: "",
        firstName: "",
        email: "",
        city: "",
        styles: [],
        experience:"",
        instruments: []
    })

    // Récuperation du profil en fonction de l'identifiant.
    const fetchUser = async userid => {
        try {
            // je dois recuperer l'id du membre voulu
            const { firstName, lastName, email, city, style, instrument, experience } = await UsersApi.find(userid);
            setUser({ firstName, lastName, email, city, style, instrument, experience });
            //   setLoading(false);
        } catch (error) {
            toast.error("Le profil n'a pas pu être chargé");
            //    history.replace("/customers");
        }
    }

    useEffect(() => {
        fetchUser(userid);
    }, []);

    return (
        <>
<div className="container text-center">
            <h1>Profil de {user.firstName} {user.lastName}</h1>
           
                        <h3 className="mt-3">Année(s) de pratique:</h3>
                        <p>{user.experience}</p>
              

                        <h3>email:</h3>
                        {user.email}

                
                        <h3>Ville:</h3>
                        <p >{user.city}</p>
                    
                        <h3>Style(s):</h3>
                        {user.style && user.style.map(genre =>
                            <p key={genre.id}>
                                {genre.name}
                            </p>
                        )}
                   
                 
                        <h3>Instrument(s):</h3>
                        {user.instrument && user.instrument.map(instru =>
                            <p key={instru.id}>
                                {instru.name}
                            </p>
                        )}
                   
                        <a className="btn btn-sm btn-info">
                            Contacter
                                    </a>

                                    </div>
           
        </>
    );
}

export default ProfilPage;