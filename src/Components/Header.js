import logo from "../graphics/flatmatch-logo.png";
import { NavLink } from "react-router-dom";

function Header({ isAuthenticated, logOut }) {
  return (
    <header>
      <NavLink to="/">
        <img src={logo} alt="Flat Match" className="logo" />
      </NavLink>
      <nav>
                { isAuthenticated ? (
                     <>
                      <NavLink to="/nutzer">Übersicht</NavLink>
                      <NavLink to="/nutzer/daten">Nutzerdaten</NavLink>
                      <span onClick={logOut}>Logout</span>
                     </>
                ) : (
                    <>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/register">Registrierung</NavLink>
                    </>
                )}
                </nav>
    </header>
  );
}

export default Header;
