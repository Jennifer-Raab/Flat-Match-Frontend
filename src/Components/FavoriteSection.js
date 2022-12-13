import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// import axios from "axios";

export default function FavoriteSection({
  user,
  isAuthenticated,
  announcementId,
  announcementType,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const favUrl = `${process.env.REACT_APP_API_URL}/api/favorites/create`;
  const deleteUrl = `${process.env.REACT_APP_API_URL}/api/favorites/delete`;

  const [favorite, setFavorite] = useState({});
  const [formularText, setFormularText] = useState("");
  const [favoriteList, setFavoriteList] = useState({});

  const [token, setToken] = useState();

  useEffect(() => {
    localStorage.getItem("token") && setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (user) {
      fetch(`${process.env.REACT_APP_API_URL}/api/favorites/user/${user.id}`, {
        headers: { Authorization: token },
      })
        .then((response) => response.json())
        .then((data) => setFavoriteList(data))
        .catch((err) => console.log(err));
    }
  }, [user, token]);

  useEffect(() => {
    const found =
      favoriteList.length > 0
        ? favoriteList.find(
            (favoriteListItem) =>
              favoriteListItem.announcement_id === parseInt(announcementId)
          )
        : false;
    if (found) {
      setFavorite({
        id: found.id,
        user_id: found.user_id,
        announcement_id: found.announcement_id,
        type: found.type,
      });
      setFormularText(found.text);
    }
    console.log("found", found);
  }, [favoriteList, announcementId]);

  // Delete existing Favorite
  const favDelete = async (e) => {
    e.preventDefault();
    try {
      console.log("Favorite", favorite);
      const res = await fetch(`${deleteUrl}/${favorite.id}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      // Nicht vergessen zu checken, ob den response von Fetch kein fehlerhaftes Antwort zurückgebracht hat:
      if (!res.ok) throw new Error(`Fehler mit status code ${res.status}`);

      const parseFetch = await res.json();
      console.log("Deleted Favorite", parseFetch);
      setFavorite({});
      setFormularText("");
    } catch (err) {
      console.error(err.message);
    }
  };

  const favToggle = (e) => {
    favHandler(e, true);
  };

  const commentHandler = (e) => {
    favHandler(e, false);
  };

  const favHandler = async (e, isToggle) => {
    e.preventDefault();
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

    // await axios
    //   .post(favUrl, favorite, {
    //     headers: {
    //       authorization: token,
    //     },
    //   })
    //   .then((res) => {
    //     setFavorite(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    try {
      const res = await fetch(favUrl, {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          announcement_id: announcementId,
          type: announcementType,
          text: formularText,
        }),
      });

      // Nicht vergessen zu checken, ob den response von Fetch kein fehlerhaftes Antwort zurückgebracht hat:
      if (!res.ok) throw new Error(`Fehler mit status code ${res.status}`);

      // Sonst ist es alles in Ordnung, weiter machen!
      const parseFetch = await res.json();
      console.log("createdFavorite", parseFetch);
      setFavorite(parseFetch);
    } catch (err) {
      console.error(err.message);
    }
    // }

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
      {Object.keys(favorite).length > 0 ? (
        <>
          <button className="favicon active" onClick={favDelete}></button>
          <textarea
            name="favtext"
            id="favtext"
            placeholder="Möchtest Du etwas Persönliches mitteilen?"
            value={formularText}
            onChange={(e) => {
              setFormularText(e.target.value);
            }}
          ></textarea>
          <button onClick={commentHandler}>Ändern</button>
        </>
      ) : (
        <>
          <button className="favicon" onClick={favToggle}></button>
          <textarea
            name="favtext"
            id="favtext"
            placeholder="Möchtest Du etwas Persönliches mitteilen?"
            value={formularText}
            onChange={(e) => {
              setFormularText(e.target.value);
            }}
          ></textarea>
        </>
      )}
    </form>
  );
}
