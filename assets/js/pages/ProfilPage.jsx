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
            const { firstName, lastName, email, city, styles, instruments, experience } = await UsersApi.find(userid);
            setUser({ firstName, lastName, email, city, styles, instruments, experience });
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
    console.log(user);
    return (
        <>

            <h1>Profil de {user.firstName} {user.lastName}</h1>
            <table className="table table-hover">
                <tbody>
                    <tr className="table-primary">
                        <th scope="col">Année(s) de pratique:</th>
                        <td>{user.experience}</td>
                    </tr>
                    <tr className="table-primary">

                        <th scope="col">email:</th>
                        <td>{user.email}</td>

                    </tr>
                    <tr className="table-primary">
                        <th scope="col">Ville:</th>
                        <td >{user.city}</td>
                    </tr>
                    <tr className="table-primary">
                        <th scope="col">Style(s):</th>
                        {user.styles && user.styles.map(genre =>
                            <td key={genre.id}>
                                {genre.name}
                            </td>
                        )}
                    </tr>
                    <tr className="table-primary">
                        <th scope="col">Instrument(s):</th>
                        {user.instruments && user.instruments.map(instru =>
                            <td key={instru.id}>
                                {instru.name}
                            </td>
                        )}
                    </tr>
                    <td>
                        <a className="btn btn-sm btn-info">
                            Le contacter
                                    </a></td>


                </tbody>
            </table>

        </>
    );
}

export default ProfilPage;