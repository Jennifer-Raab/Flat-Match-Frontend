import logo from "../graphics/flatmatch-logo.png";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header>
      <NavLink to="/">
        <img src={logo} alt="Flat Match" className="logo" />
      </NavLink>
    </header>
  );
}

export default Header;
