import React, { useState, useEffect } from 'react';
import UsersApi from '../services/UsersApi';
import { toast } from "react-toastify";

const ProfilPage = (props) => {

    const userid = window.localStorage.getItem("id");

    const [user, setUser] = useState({
        lastName: "",
        firstName: "",
        email: "",
        city:"",
        style:[],
        instrument:[]
    });

    const [errors, setErrors] = useState({
        lastName: "",
        firstName: "",
        email: "",
        city:"",
        style:[],
        instrument:[]
    })

    // Récuperation du profil en fonction de l'identifiant.
    const fetchUser = async userid => {
        try {
            // je dois recuperer l'id du membre voulu
            const { firstName, lastName, email, city, style, instrument } = await UsersApi.find(userid);
            setUser({ firstName, lastName, email, city, style, instrument });
            toast.info("Voici le profil demandé. ");
            //   setLoading(false);
        } catch (error) {
            toast.error("Le profil n'a pas pu être chargé");
            //    history.replace("/customers");
        }
    }

    useEffect(() => {
        fetchUser(userid);
    }, []);

    console.log(user.style);
    console.log(user.instrument);
    return (
        <>

            <h1>Profil de {user.firstName} {user.lastName}</h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">email</th>
                        <th scope="col">Ville</th>
                        <th scope="col">Style(s)</th>
                        <th scope="col">Instrument(s)</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>


                    <tr className="table-primary">

                        <td>{user.email}</td>
                        <td >{user.city}</td>

                        {user.style && user.style.map(genre =>
                            <td key={genre.id}>
                                {genre.name}
                            </td>

                        )}
                        {user.instrument && user.instrument.map(instru =>
                            <td key={instru.id}>
                                {instru.name}
                            </td>

                        )}
                    </tr>

                </tbody>
            </table>

        </>
    );
}

export default ProfilPage;