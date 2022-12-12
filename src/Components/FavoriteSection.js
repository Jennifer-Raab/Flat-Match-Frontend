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
  const favUrl = `${process.env.REACT_APP_API_URL}/api/favorites/create`;

  const [favorite, setFavorite] = useState({});
  const [favoriteList, setFavoriteList] = useState({});

  const [token, setToken] = useState();

  useEffect(() => {
    localStorage.getItem("token") && setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (user) {
      fetch(`${process.env.REACT_APP_API_URL}/api/favorites/user/${user.id}`, {
        headers: { "Authorization": token }
      })
        .then((response) => response.json())
        .then((data) => setFavoriteList(data))
        .catch((err) => console.log(err));
    }
  }, [user, token]);

  useEffect(() => {

      const found = (favoriteList.length > 0) ? favoriteList.find(favoriteListItem => favoriteListItem.announcement_id === parseInt(announcementId)) : false;
      if (found) {
        setFavorite({
          user_id: found.user_id,
          announcementId: found.announcement_id,
          announcementType: found.type,
          toggleFavorite: true,
         text: found.text,
        });
      }
      console.log("found", found);
  }, [favoriteList, announcementId]);


  const favToggle = (e) => {
    favHandler(e, true);
  };

  const commentHandler = (e) => {
    favHandler(e, false);
  };

  const favHandler = async (e, isToggle) => {
    e.preventDefault();
    let text = "";
    favorite.text && (text = favorite.text);
    !isToggle && (text = e.target.form.favtext.value);
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
      .post(favUrl, favorite, {
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
    // const res = await fetch(
    //   favUrl,
    //   {
    //     method: "POST",
    //     mode: 'cors',
    //     body: JSON.stringify(favorite),
    //     headers: {
    //       Authorization: token,
    //      'Accept': 'application/json',
    //      'Content-Type': 'application/json'
    //     },
    //   }
    // );
  };
  return (
    <form className="fave">
      <button className="favicon" onClick={favToggle}></button>
      <textarea
          name="favtext"
          id="favtext"
          placeholder="Möchtest Du etwas Persönliches mitteilen?"
          value={favorite.text}
        ></textarea>
        <button onClick={commentHandler}>submit</button>
    </form>
  );
}
