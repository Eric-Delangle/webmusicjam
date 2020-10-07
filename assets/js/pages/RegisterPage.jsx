import React, { useState, useEffect } from "react";
import Field from "./../components/forms/Field";
import { Link } from "react-router-dom";
import UsersApi from "../services/UsersApi";
import StylesApi from "../services/StylesApi";
import InstrumentsApi from "../services/InstrumentsApi";
import { toast } from "react-toastify";
import FieldXp from "../components/forms/FieldXp";
import Select from "./../components/forms/Select";

const RegisterPage = ({ history }) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    city: "",
    styles: [],
    instruments: [],
    experience: "",
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
    experience: "",
  });

  const [styles, setStyles] = useState([]);
  const [instruments, setInstruments] = useState([]);

  // Récuperation des styles
  const fetchStyles = async () => {
    try {
      const data = await StylesApi.findAll();
      setStyles(data);
      console.log(data);
    } catch (error) {
      toast.error("Impossible de charger les styles");
      history.replace("/home");
    }
  };

  // Récupération de la liste des styles à chaque chargement du composant.
  useEffect(() => {
    fetchStyles();
  }, []);

  // Récuperation des instruments
  const fetchInstruments = async () => {
    try {
      const data = await InstrumentsApi.findAll();
      setInstruments(data);
      console.log(data);
    } catch (error) {
      toast.error("Impossible de charger les instruments");
      history.replace("/home");
    }
  };

  // Récupération de la liste des instruments à chaque chargement du composant.
  useEffect(() => {
    fetchInstruments();
  }, []);

  // Gestion des changements des inputs dans le formulaire simple.
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setUser({ ...user, [name]: value });
  };

  // Gestion de la soumission de l'utilisateur.
  const handleSubmit = async (event) => {
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
      toast.success(
        "Vous êtes desormais inscrit(e), vous pouvez vous connecter !"
      );
      history.replace("/login");
    } catch (error) {
      console.log(error.response);
      const { violations } = error.response.data;

      if (violations) {
        violations.forEach((violation) => {
          apiErrors[violation.propertyPath] = violation.message;
        });
        setErrors(apiErrors);
      }
      toast.error("Il y a des erreurs dans votre formulaire !");
    }
  };

  return (
    <>
      <div className="container">
        <h1>Inscription</h1>
        <form onSubmit={handleSubmit}>
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
          <div className="bloc_selects">
              <div className="item">
            <label>
              Choisissez votre ou vos instruments
              <br />
              <br />
              <Select
                name="instruments"
                label="instruments"
                value={instruments.name}
                error={errors.instrument}
                onChange={handleChange}
              >
                {instruments.map((instrument) => (
                  <option key={instrument.id} value={instrument.id}>
                    {instrument.name}
                  </option>
                ))}
              </Select>
              <br />
              <label>
                <Field
                  name="instrument"
                  label="Vous pouvez aussi ajouter un instrument"
                  type="text"
                  placeholder="Ajouter un instrument"
                  error={errors.passwordConfirm}
                  value={user.passwordConfirm}
                  onChange={handleChange}
                />
              </label>
            </label>
</div>
<div className="item">
            <label>
              Choisissez votre ou vos styles
              <br />
              <br />
              <Select
                name="style"
                label="styles"
                value={styles.name}
                error={errors.style}
                onChange={handleChange}
              >
                {styles.map((style) => (
                  <option key={style.id} value={style.id}>
                    {style.name}
                  </option>
                ))}
              </Select>
              <label>

                <Field
                  name="style"
                  label="Vous pouvez aussi ajouter un style"
                  type="text"
                  placeholder="Ajouter un style"
                  error={errors.style}
                  value={user.style}
                  onChange={handleChange}
                />
              </label>
            </label>
            </div>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-success">
              Enregistrer
            </button>
            <Link to="/login" className="btn btn-link">
              J'ai déjà un compte.
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
