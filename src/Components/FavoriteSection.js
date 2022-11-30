import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "axios";

export default function FavoriteSection({
  user,
  isAuthenticated,
  announcementId,
  announcementType,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const postUrl = `${process.env.REACT_APP_API_URL}/api/favorites/create`;

  const [favorite, setFavorite] = useState({});

  const [token, setToken] = useState();

  useEffect(() => {
    localStorage.getItem("token") && setToken(localStorage.getItem("token"));
  }, []);

  const favToggle = (e) => {
    favHandler(e, true);
  };

  const commentHandler = (e) => {
    favHandler(e, false);
  };

  const favHandler = async (e, isToggle) => {
    let text = "";
    favorite.text && (text = favorite.text);
    !isToggle && (text = e.target.favtext.value);
    if (!isAuthenticated) {
      if (
        window.confirm(
          "Diese Funktion steht nur angemeldeten Nutzer zur Verfügung!"
        ) === true
      ) {
        navigate("/login", { state: { from: location } });
      }
      return;
    }

    setFavorite({
      user_id: user.id,
      announcementId: announcementId,
      announcementType: announcementType,
      toggleFavorite: isToggle,
      text: text,
    });

    await axios
      .post(postUrl, favorite, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        setFavorite(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="fave">
      <button className="favicon" onClick={favToggle}></button>
      <form onSubmit={commentHandler}>
        <textarea
          name="favtext"
          id="favtext"
          placeholder="Möchtest Du etwas Persönliches mitteilen?"
          value={favorite.text}
        ></textarea>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
