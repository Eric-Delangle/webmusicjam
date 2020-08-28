import React, { useState } from "react";
import Field from "./../components/forms/Field";
import { Link } from "react-router-dom";
import UsersApi from "../services/UsersApi";
import StylesApi from "../services/StylesApi";
import InstrumentsApi from "../services/InstrumentsApi";
import { toast } from "react-toastify";
import FieldList from "../components/forms/FieldList";
import FieldInstrumentsList from "../components/forms/FieldInstrumentsList";
import FieldXp from "../components/forms/FieldXp";

const RegisterPage = ({ history }) => {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
        city: "",
        styles: [
            {name: "" }
        ],
        instruments: [
            { name: "" }
        ],
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

    /*
    const optionsInstrus = [
        { value: "basse", label: "Basse'" },
        { value: 'batterie', label: 'Batterie' },
        { value: 'guitare', label: 'Guitare' },
        { value: 'piano', label: 'Piano' },
        { value: 'chant', label: 'Chant' },
    ];

    const optionsStyles = [
        { value: "rock", label: "Rock'" },
        { value: 'blues', label: 'Blues' },
        { value: 'reggae', label: 'Reggae' },
        { value: 'jazz', label: 'Jazz' },
        { value: 'funk', label: 'Funk' },
    ];
*/

    // Gestion des changements des inputs dans le formulaire.
    const handleChange = ({ currentTarget }) => {

        const { name, value } = currentTarget;
        setUser({ ...user, [name]: value });
    };

    // Gestion des changements des inputs listes déroulantes.  
    const handleListChange = (event) => {
        event.preventDefault();

  
        const { name } = event;
        console.log(Array.from(event.target.selectedOptions).map(o => o.value))
        setUser({ ...user, [name]: Array.from(event.target.selectedOptions).map(o => o.value) },);


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
                    <br />

                    <label>
                        Choisissez votre ou vos instruments
                            <br />
                        <br />
                        <select value={user.instruments} onChange={handleListChange} multiple={true} >
                            <option value="basse">Basse</option>
                            <option value="batterie">Batterie</option>
                            <option value="guitare">Guitare</option>
                            <option value="piano">Piano</option>
                            <option value="chant">Chant</option>
                        </select>

                    </label>
        <br/>
                    <label>
                        Choisissez votre ou vos styles
                            <br />
                        <br />
                        <select value={user.styles} onChange={handleListChange} multiple={true} >
                            <option value="jazz">Jazz</option>
                            <option value="funk">Funk</option>
                            <option value="rock">Rock</option>
                            <option value="rap">Rap</option>
                            <option value="reggae">Reggae</option>
                        </select>

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