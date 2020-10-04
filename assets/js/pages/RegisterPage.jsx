import React, { useState } from "react";
import Field from "./../components/forms/Field";
import { Link } from "react-router-dom";
import UsersApi from "../services/UsersApi";
import StylesApi from "../services/StylesApi";
import InstrumentsApi from "../services/InstrumentsApi";
import { toast } from "react-toastify";
import FieldList from "../components/forms/FieldList";
import FieldXp from "../components/forms/FieldXp";
import Select from 'react-select';

const RegisterPage = ({ history }) => {


    const selectedOptions = null;

    const [user, setUser] = useState({

        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
        city: "",
        styles: [],
        instruments: [],
        experience: ""
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
        city: "",
        styles: [],
        instruments: [],
        experience: ""
    });

    const [instruments, setInstruments] = useState([]);

    const optionsInstrus = [
        { value: "basse", label: "Basse,", id: 494 },
        { value: 'batterie', label: 'Batterie', id: 495 },
        { value: 'guitare', label: 'Guitare', id: 493 },
        { value: 'piano', label: 'Piano', id: 496 },
        { value: 'chant', label: 'Chant', id: 497 },
    ];

    const optionsStyles = [
        { value: "rock", label: "Rock", id: 531 },
        { value: 'metal', label: 'Métal', id: 537 },
        { value: 'reggae', label: 'Reggae', id: 532 },
        { value: 'jazz', label: 'Jazz', id: 535 },
        { value: 'funk', label: 'Funk', id: 533 },
        { value: 'pop', label: 'Pop', id: 534 },
        { value: 'rap', label: 'Rap', id: 536 },
    ];


    // Gestion des changements des inputs dans le formulaire simple.
    const handleChange = ({ currentTarget }) => {

        const { name, value } = currentTarget;
        setUser({ ...user, [name]: value });
    };


    // Gestion des changements des inputs listes déroulantes.
    const handleListStylesChange = (event) => {
        //event.preventDefault();
        console.log(user)
        console.log(event)



        const { name, styles } = event;
        //console.log(Array.from(event.target.selectedOptions).map(o => o.value))
        setUser({ ...user, [name]: Array.from(event).map(o => o.value) });


    };

    // Gestion des changements des inputs listes déroulantes.
    const handleListInstrusChange = (event) => {
        //event.preventDefault();
        console.log(user)
        console.log(event)
        const instruments = user.instruments
        const  {name, value } =Array.from(event).map(o => o.value)  ;
        //console.log(Array.from(event.target.selectedOptions).map(o => o.value))
        setInstruments({ ...user, [instruments]:value});


    };

    // Gestion de la soumission de l'utilisateur.
    const handleSubmit = async event => {
        console.log(user);
        event.preventDefault();
        const apiErrors = {};

        if (user.password !== user.passwordConfirm) {
            apiErrors.passwordConfirm =
                "Votre conformation de mot de passe n'est pas conforme avec le mot de passe original";
            setErrors(apiErrors);
            toast.error("Il y a des erreurs dans votre formulaire !");
            return;
        }

        try {

            // setUser( ...user,  Array.from(event.target.selectedOptions).map(o => o.value));
            await UsersApi.register(user);

            setErrors({});
            // flash success
            toast.success("Vous êtes desormais inscrit(e), vous pouvez vous connecter !");
            history.replace('/login');
        } catch (error) {
            console.log(error.response);
            const { violations } = error.response.data;

            if (violations) {

                violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message;
                });
                setErrors(apiErrors);
            }
            toast.error("Il y a des erreurs dans votre formulaire !");
        }
    }


    return (


        <>
            <div className="container">
                <h1>Inscription</h1>
                <form onSubmit={handleSubmit} >
                    <Field
                        name="firstName"
                        label="Prénom"
                        placeholder="Votre prénom"
                        error={errors.firstName}
                        value={user.firstName}
                        onChange={handleChange}
                    />
                    <Field
                        name="lastName"
                        label="Nom"
                        placeholder="Votre nom"
                        error={errors.lastName}
                        value={user.lastName}
                        onChange={handleChange}
                    />
                    <Field
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Votre email"
                        error={errors.email}
                        value={user.email}
                        onChange={handleChange}
                    />
                    <Field
                        name="city"
                        label="Ville"
                        placeholder="Votre ville"
                        error={errors.city}
                        value={user.city}
                        onChange={handleChange}
                    />
                    <Field
                        name="password"
                        label="Mot de passe"
                        type="password"
                        placeholder="Votre mot de passe"
                        error={errors.password}
                        value={user.password}
                        onChange={handleChange}
                    />
                    <Field
                        name="passwordConfirm"
                        label="Confirmation"
                        type="password"
                        placeholder="Confirmez votre mot de passe"
                        error={errors.passwordConfirm}
                        value={user.passwordConfirm}
                        onChange={handleChange}
                    />

                    <FieldXp
                        name="experience"
                        label="Experience"
                        type="number"
                        placeholder="Votre experience en année(s)"
                        error={errors.experience}
                        value={user.experience}
                        onChange={handleChange}
                    />

                    <label>
                        Choisissez votre ou vos instruments
                            <br />
                        <br />
                        <Select
                            className="noir"
                            value={selectedOptions}
                            onChange={handleListInstrusChange}
                            options={optionsInstrus}
                            isMulti
                        />
                    </label>
                    <br />
                    <br />
                    <label>
                        Choisissez votre ou vos instruments
                            <br />
                        <br />
                        <Select
                            className="noir"
                            value={selectedOptions}
                            onChange={handleListStylesChange}
                            options={optionsStyles}
                            isMulti
                        />
                    </label>
                    <div className="form-group">
                        <button type="submit" className="btn btn-success">
                            Enregistrer
                </button>
                        <Link to="/login" className="btn btn-link">J'ai déjà un compte.</Link>
                    </div>
                </form>

            </div>

        </>

    );
}

export default RegisterPage;