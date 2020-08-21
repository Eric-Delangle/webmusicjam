import React, { useState } from "react";
import Field from "./../components/forms/Field";
import { Link } from "react-router-dom";
import UsersApi from "../services/UsersApi";
import { toast } from "react-toastify";
import FieldList from "../components/forms/FieldList";

const RegisterPage = ({ history }) => {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
        city: "",
        style: "",
        instrument: ""
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
        city: "",
        style: "",
        instrument: ""
    });

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

    // Gestion des changements des inputs dans le formulaire.
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setUser({ ...user, [name]: value });
    };

    // Gestion de la soumission de l'utilisateur.
    const handleSubmit = async event => {
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
          
                <FieldList
                    name="style"
                    label="Style"
                    type= "checkbox"
                    options={optionsStyles}
                    placeholder="Votre style"
                    error={errors.style}
                    value={user.style}
                    onChange={handleChange}
                />
                <FieldList
                    name="instrument"
                    label="Instrument"
                    type= "checkbox"
                    options={optionsInstrus}
                    placeholder="Votre instrument"
                    error={errors.instrument}
                    value={user.instrument}
                    onChange={handleChange}
                />
              
                <br />
                <div className="form-group">
                    <button type="submit" className="btn btn-success">
                        Enregistrer
                </button>
                    <Link to="/login" className="btn btn-link">J'ai déjà un compte.</Link>
                </div>
            </form>
        </>

    );
}

export default RegisterPage;