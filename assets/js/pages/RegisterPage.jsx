import React, { useState, useEffect } from "react";
import Field from "./../components/forms/Field";
import { Link } from "react-router-dom";
import UsersApi from "../services/UsersApi";
import StylesApi from "../services/StylesApi";
import InstrumentsApi from "../services/InstrumentsApi";
import { toast } from "react-toastify";
import FieldXp from "../components/forms/FieldXp";

const RegisterPage = ({ history }) => {
  const [styles, setStyles] = useState([]);
  const [instruments, setInstruments] = useState([]);

  const [checked, setChecked] = useState([]);

  const optionsInstrus = instruments.map((instrument) => (
    <option key={instrument.id} value={instrument.id}>
      {instrument.name}
    </option>
  ));

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    city: "",
    instrument: [],
    style: [],
    experience: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    city: "",
    instrument: [],
    style: [],
    experience: "",
  });

  // Récuperation des styles
  const fetchStyles = async () => {
    try {
      const data = await StylesApi.findAll();
      setStyles(data);
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
    } catch (error) {
      toast.error("Impossible de charger les instruments");
      history.replace("/home");
    }
  };

  // Récupération de la liste des instruments à chaque chargement du composant.
  useEffect(() => {
    fetchInstruments();
  }, []);

  // Gestion des changements des inputs dans le formulaire.
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;

    setUser({ ...user, [name]: value });
  };

  // Selection du ou des instruments
  const checkInstrusChange = (e) => {
    const value = e.target.value;

    // si la case est cochée elle est true si elle est decochée elle est false
    // si checked est true je dois l'ajouter au tableau des options choisies
    // si elle est false je le sors du tableau

    if (e.target.checked) {
      user.instrument.push({ id: value });
    } else {
      user.instrument.pop({ id: value });
    }

    setUser({
      ...user,
      // instrument:[{id:value}]
    });
  };

  // Selection du ou des styles
  const checkStylesChange = (e) => {
    const value = e.target.value;

    // si la case est cochée elle est true si elle est decochée elle est false
    // si checked est true je dois l'ajouter au tableau des options choisies
    // si elle est false je le sors du tableau

    if (e.target.checked) {
      user.style.push({ id: value });
    } else {
      user.style.pop({ id: value });
    }

    setUser({
      ...user,
      // instrument:[{id:value}]
    });
  };

  // Gestion de la soumission de l'utilisateur.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.instrument == "") {
      toast.error("Vous devez choisir au moins un instrument !");
    }
    if (user.style == "") {
      toast.error("Vous devez choisir au moins un style !");
    }
    const apiErrors = {};

    if (user.password !== user.passwordConfirm) {
      apiErrors.passwordConfirm =
        "Votre confirmation de mot de passe n'est pas conforme avec le mot de passe original";
      setErrors(apiErrors);
      toast.error("Il y a des erreurs dans votre formulaire !");
      return;
    }

    try {
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
              <p className="label">Choisissez votre ou vos instruments</p>
              {instruments.map((instrument) => (
                <Field
                  key={instrument.id}
                  value={instrument.id}
                  type="checkbox"
                  name={instrument.name}
                  checked={!checked}
                  label={instrument.name}
                  onChange={checkInstrusChange}
                />
              ))}

              <br />
            </div>
            <div className="item">
              <p className="label">Choisissez votre ou vos styles</p>
              {styles.map((style) => (
                <Field
                  key={style.id}
                  value={style.id}
                  type="checkbox"
                  name={style.name}
                  checked={!checked}
                  label={style.name}
                  onChange={checkStylesChange}
                />
              ))}

              <br />
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
