import { Link } from "react-router-dom";

function TwoWayNav() {
  return (
    <nav className="twowaynav">
      <Link to="/angebote">Angebote</Link>
      <Link to="/gesuche">Gesuche</Link>
    </nav>
  );
}
export default TwoWayNav;
