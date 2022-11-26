import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CreateFavorite } from "../utils/favUtils";


export default function FavoriteSection({ user, isAuthenticated, announcementId, announcementType }) {

    const navigate = useNavigate();
    const location = useLocation();

  const [{ text }, setFormState] = useState({
    text: "",
  });
  
  const [token, setToken] = useState(null);

  const handleChange = (e) => setFormState((prev) => ({ ...prev, [e.target.id]: e.target.value }));

    const toggleFav = async () => {
        if (!isAuthenticated) {
            if (window.confirm("Diese Funktion steht nur angemeldeten Nutzer zur Verfügung!") === true) {
                navigate("/login", { state: { from: location } });
            }
        } else {
            setToken(localStorage.getItem("token"));
            const formDataJson = JSON.stringify({
                "user_id": user.id,
                "announcementId": announcementId,
                "announcementType": announcementType,
                "text": text
            });

            console.log("formDataJson", formDataJson);
            console.log("token", token);
            const result = await CreateFavorite(formDataJson, token);

            console.log("result", result);
        }
    }
    return (
        <div className="fave">
            <button className="favicon" onClick={toggleFav}></button>
            <textarea name="favtext" id="favtext" placeholder="Möchtest Du etwas Persönliches mitteilen?" onChange={handleChange}></textarea>
        </div>
    );
}