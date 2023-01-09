import logo from "../graphics/flatmatch-logo.png";
import { NavLink } from "react-router-dom";

function Header({ isAuthenticated, logOut }) {
  return (
    <header>
      <NavLink to="/">
        <img src={logo} alt="Flat Match" className="logo" />
      </NavLink>
      <nav>
        {isAuthenticated ? (
          <>
            <NavLink className="button-1" to="/nutzer">
              Übersicht
            </NavLink>
            <NavLink className="button-1" to="/nutzer/daten">
              Nutzerdaten
            </NavLink>
            <span className="button-1" onClick={logOut}>
              Logout
            </span>
          </>
        ) : (
          <>
            <NavLink className="button-1" to="/login">
              Login
            </NavLink>
            <NavLink className="button-1" to="/register">
              Registrierung
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
