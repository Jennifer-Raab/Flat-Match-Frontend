import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "./utils/userUtils";
import Header from "./Components/Header";
import TwoWayNav from "./Components/TwoWayNav";
import RandomImage from "./Components/RandomImage";
import RequestList from "./Components/RequestList";
import OfferList from "./Components/OfferList";
import OfferDetail from "./Components/OfferDetail";
import RequestDetail from "./Components/RequestDetail";
import Login from "./Components/Login";
import Overview from "./Components/Overview";
import ProtectedLayout from './Components/ProtectedLayout';

function App() {

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  
  useEffect(() => {
    const validateToken = async () => {
      try {
        const { content } = await getUser(token);
        setUser(content);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem("token");
        setToken(null);
        console.log(error.message);
      }
    };
    token && validateToken();
  }, [token]);

  const logOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    navigate("/");
  };
  
  return (
    <div className="App">
      <Header isAuthenticated={isAuthenticated} logOut={logOut} />
      <RandomImage />
      <main>
        <Routes>
          <Route path="/" element={<TwoWayNav />} />
          <Route path="/angebote" element={<OfferList />} />
          <Route path="/gesuche" element={<RequestList />} />
          <Route path="/angebot/:id" element={<OfferDetail />} />
          <Route path="/gesuch/:id" element={<RequestDetail />} />
          <Route path="/login" element={<Login isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setToken={setToken} />} />
          <Route
            path="/nutzer"
            element={<ProtectedLayout isAuthenticated={isAuthenticated} />}
          >
            <Route index element={<Overview user={user} isAuthenticated={isAuthenticated} />} />
            <Route path="daten" />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
