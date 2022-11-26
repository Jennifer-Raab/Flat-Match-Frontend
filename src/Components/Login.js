import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { loginUser } from "../utils/userUtils";


export default function Login({ isAuthenticated, setToken, setIsAuthenticated }) {
    const [{ email, password }, setFormState] = useState({
        email: "",
        password: "",
      });

      const handleChange = (e) => setFormState((prev) => ({ ...prev, [e.target.id]: e.target.value }));

      const handleSubmit = async (e) => {
        try {
          e.preventDefault();
          if (!email || !password) return alert("Bitte geben Sie Ihren Benutzernamen und Ihre E-Mail-Adresse ein!");
          const formDataJson = JSON.stringify({
            "email": email,
            "password": password,
        });

        const {content} = await loginUser(formDataJson);
          localStorage.setItem("token", content.token);
          setToken(content.token);
          setIsAuthenticated(true);
        } catch (error) {
          console.log(error.message);
        }
      };

      const location = useLocation();

console.log("Location: ", location);

      const from = location.state?.from || "/";

  return isAuthenticated ? (
    <Navigate to={from} replace="true" />
  ) : (
    <div className="filter-div">
        <h1>Login</h1>
      <form className="filter-form" onSubmit={handleSubmit}>
        <fieldset>
            <div>
                <label htmlFor="email">E-Mail</label>
                <input type="email" name="email" id="email" value={email} onChange={handleChange}></input>
            </div>
            <div>
                <label htmlFor="password">Passwort</label>
                <input type="password" name="password" id="password" value={password} onChange={handleChange}></input>
            </div>
        </fieldset>
        <div className="button-container">
            <button type="submit" className="button-style">Anmelden</button>
        </div>
      </form>
    </div>
  )
}