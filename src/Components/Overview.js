import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFirstdraft } from "react-icons/fa";
import { BsArrowRightSquareFill } from "react-icons/bs";
import { client } from "./client";

export default function Overview({ user }) {
  const currentAnnouncementUrl = `${process.env.REACT_APP_API_URL}/api/users/current`;
  const [offers, setOffers] = useState();
  const [requests, setRequests] = useState();
  const [matches, setMatches] = useState();
  const [likedOffers, setLikedOffers] = useState();
  const [likedRequests, setLikedRequests] = useState();

  const [currentOffer, setCurrentOffer] = useState(user.active_offer_id);
  const [currentRequest, setCurrentRequest] = useState(user.active_request_id);

  console.log("Current  u r", currentOffer, currentRequest);

  const [token, setToken] = useState();

  useEffect(() => {
    localStorage.getItem("token") && setToken(localStorage.getItem("token"));
  }, []);

  const [images, setImages] = useState([]);
  // const [liked, setLiked] = useState();
  // const [suggestions, setSuggestions] = useState();

  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    console.log("token", token);
    fetch(`${API}/api/announcements/angebot/${user.id}`, {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((data) => setOffers(data))
      .catch((err) => console.log(err));
  }, [API, user.id, token]);

  useEffect(() => {
    fetch(`${API}/api/announcements/gesuch/${user.id}`, {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((data) => setRequests(data))
      .catch((err) => console.log(err));
  }, [API, user.id, token]);

  useEffect(() => {
    fetch(`${API}/api/favorites/matches/${user.id}`, {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((data) => setMatches(data))
      .catch((err) => console.log(err));
  }, [API, user.id, token]);

  useEffect(() => {
    fetch(`${API}/api/announcements/liked/gesuch/${user.id}`, {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((data) => setLikedOffers(data))
      .catch((err) => console.log(err));
  }, [API, user.id, token]);

  useEffect(() => {
    fetch(`${API}/api/announcements/liked/angebot/${user.id}`, {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((data) => setLikedRequests(data))
      .catch((err) => console.log(err));
  }, [API, user.id, token]);

  useEffect(() => {
    client
      .getEntries({
        content_type: "flatMatchBildgalerie",
      })
      .then((response) => setImages(response.items[0]))
      .catch(console.error);
  }, []);

  // Aufklappen der Seitenabschnitte

  const expand = (e) => {
    let cls = e.target.previousSibling.className;
    if (cls.indexOf(" opened") === -1) {
      e.target.previousSibling.className += " opened";
    } else {
      e.target.previousSibling.className = cls.replace(" opened", "");
    }
  };

  // Senden der ausgewählten aktuellen Anzeige
  const handleCurrentOffer = async () => {
    const result = await handleCurrentAnnouncement(
      "offer",
      document.querySelector('input[name="current-offer"]:checked').value
    );
    console.log("return wert id", result.active_offer_id);
    setCurrentOffer(result.active_offer_id);
  };
  const handleCurrentRequest = async () => {
    const result = await handleCurrentAnnouncement(
      "request",
      document.querySelector('input[name="current-request"]:checked').value
    );
    console.log("return wert id", result.active_request_id);
    setCurrentRequest(result.active_request_id);
  };
  const handleCurrentAnnouncement = async (type, announcementId) => {
    try {
      const res = await fetch(currentAnnouncementUrl, {
        method: "PUT",
        mode: "cors",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          type: type,
          announcementId: announcementId,
        }),
      });
      if (!res.ok) throw new Error(`Fehler mit status code ${res.status}`);
      const parseFetch = await res.json();
      console.log("changedCurrentAnnouncement", parseFetch[0]);
      return parseFetch[0];
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h1>Hallo {user.username}</h1>
      {offers && offers.length > 0 ? (
        <section>
          <h2>Eigene Angebote: {offers.length}</h2>

          {console.log("offers", offers)}
          <form name="offers" className="flex-3">
            {offers.map((offer) => {
              let slideImage = images.fields.bilder[0].fields.file;
              // console.log("slideImage", slideImage);
              return (
                <div key={offer.id} className="flat-card-userpage">
                  <Link
                    className="button-1 pos-2-2"
                    title="Zum Angebot"
                    to={`/angebot/${offer.id}`}
                  >
                    <BsArrowRightSquareFill />
                  </Link>
                  {offer.id === currentOffer ? (
                    <input
                      className="hid-checkb"
                      name="current-offer"
                      type="radio"
                      id={`offer_aktiv_${offer.id}`}
                      value={offer.id}
                      onChange={handleCurrentOffer}
                      checked
                    ></input>
                  ) : (
                    <input
                      className="hid-checkb"
                      name="current-offer"
                      type="radio"
                      id={`offer_aktiv_${offer.id}`}
                      value={offer.id}
                      onClick={handleCurrentOffer}
                    ></input>
                  )}

                  <label
                    className="button-1 pos-1-2"
                    title="Aktives Angebot auswählen"
                    htmlFor={`offer_aktiv_${offer.id}`}
                  >
                    <FaFirstdraft />
                  </label>

                  <img src={slideImage.url} alt="" />
                  <span>{offer.title}</span>
                </div>
              );
            })}
          </form>
          {offers.length > 3 ? (
            <button onClick={expand} className="button-2"></button>
          ) : (
            <hr />
          )}
        </section>
      ) : (
        <p>Noch keine Angebote</p>
      )}

      {requests && requests.length > 0 ? (
        <section>
          <h2>Eigene Gesuche: {requests.length}</h2>
          <form name="requests" className="flex-3">
            {requests.map((request) => {
              let slideImage = images.fields.bilder[0].fields.file;
              // console.log("slideImage", slideImage);
              return (
                <div key={request.id} className="flat-card-userpage">
                  <Link
                    className="button-1 pos-2-2"
                    title="Zum Gesuch"
                    to={`/gesuch/${request.id}`}
                  >
                    <BsArrowRightSquareFill />
                  </Link>
                  {request.id === currentRequest ? (
                    <input
                      className="hid-checkb"
                      name="current-request"
                      type="radio"
                      id={`request_aktiv_${request.id}`}
                      value={request.id}
                      onChange={handleCurrentRequest}
                      checked
                    ></input>
                  ) : (
                    <input
                      className="hid-checkb"
                      name="current-request"
                      type="radio"
                      id={`request_aktiv_${request.id}`}
                      value={request.id}
                      onClick={handleCurrentRequest}
                    ></input>
                  )}

                  <label
                    className="button-1 pos-1-2"
                    title="Aktives Gesuch auswählen"
                    htmlFor={`request_aktiv_${request.id}`}
                  >
                    <FaFirstdraft />
                  </label>

                  <img src={slideImage.url} alt="" />
                  <span>{request.title}</span>
                </div>
              );
            })}
          </form>
          {requests.length > 3 ? (
            <button onClick={expand} className="button-2"></button>
          ) : (
            <hr />
          )}
        </section>
      ) : (
        <p>Noch keine Gesuche</p>
      )}

      {matches ? (
        <section>
          <h2>Matches: {matches.length}</h2>
          {console.log("matches", matches)}
          <div className="flex-3">
            {matches.map((match) => {
              let slideImage = images.fields.bilder[0].fields.file;
              let slideImage2 = images.fields.bilder[2].fields.file;
              // console.log("slideImage", slideImage);
              return (
                <div
                  key={match.offer_id + "_" + match.request_id}
                  className="flat-card-userpage"
                >
                  <Link
                    className="button-1 pos-1-3"
                    title="Zum Angebot"
                    to={`/gesuch/${match.request_id}`}
                  >
                    <BsArrowRightSquareFill />
                  </Link>
                  <Link
                    className="button-1 pos-2-3"
                    title="Zum Gesuch"
                    to={`/angebot/${match.offer_id}`}
                  >
                    <BsArrowRightSquareFill />
                  </Link>
                  {user.id === match.offer_creator_id ? (
                    <Link
                      className="button-2 pos-3-3"
                      title="Kontakt aufnehmen"
                      to={`/kontakt/${match.request_creator_id}`}
                    >
                      Kontakt
                    </Link>
                  ) : (
                    <Link
                      className="button-2 pos-3-3"
                      title="Kontakt aufnehmen"
                      to={`/kontakt/${match.offer_creator_id}`}
                    >
                      Kontakt
                    </Link>
                  )}

                  <div className="matchcard-image">
                    <img
                      src={slideImage.url}
                      alt=""
                      className="matchcard-image-tl"
                    />
                    <img
                      src={slideImage2.url}
                      alt=""
                      className="matchcard-image-br"
                    />
                    <span>{match.offer_title}</span>
                    <span>{match.request_title}</span>
                  </div>
                </div>
              );
            })}
          </div>
          {matches.length > 3 ? (
            <button onClick={expand} className="button-2"></button>
          ) : (
            <hr />
          )}
        </section>
      ) : (
        <p>Noch keine Matches</p>
      )}

      {likedOffers && likedOffers.length > 0 ? (
        <section>
          <h2>
            Angebote, die eins meiner Gesuche geliked haben:{" "}
            {likedOffers.length}
          </h2>

          {console.log("likedOffers", likedOffers)}
          <div className="flex-3">
            {likedOffers.map((likedOffer) => {
              let slideImage = images.fields.bilder[0].fields.file;
              // console.log("slideImage", slideImage);
              return (
                <div key={likedOffer.id} className="flat-card-userpage">
                  <Link
                    className="button-1 pos-1-1"
                    title="Zum Angebot"
                    to={`/angebot/${likedOffer.id}`}
                  >
                    <BsArrowRightSquareFill />
                  </Link>

                  <img src={slideImage.url} alt="" />
                  <span>{likedOffer.title}</span>
                </div>
              );
            })}
          </div>
          {likedOffers.length > 3 ? (
            <button onClick={expand} className="button-2"></button>
          ) : (
            <hr />
          )}
        </section>
      ) : (
        <p>Noch kein Angebot, welches mein Gesuch geliked hat</p>
      )}

      {likedRequests && likedRequests.length > 0 ? (
        <section>
          <h2>
            Gesuche, die eins meiner Angebote geliked haben:{" "}
            {likedRequests.length}
          </h2>

          {console.log("likedRequests", likedRequests)}
          <div className="flex-3">
            {likedRequests.map((likedRequest) => {
              let slideImage = images.fields.bilder[0].fields.file;
              // console.log("slideImage", slideImage);
              return (
                <div key={likedRequest.id} className="flat-card-userpage">
                  <Link
                    className="button-1 pos-1-1"
                    title="Zum Angebot"
                    to={`/angebot/${likedRequest.id}`}
                  >
                    <BsArrowRightSquareFill />
                  </Link>

                  <img src={slideImage.url} alt="" />
                  <span>{likedRequest.title}</span>
                </div>
              );
            })}
          </div>
          {likedRequests.length > 3 ? (
            <button onClick={expand} className="button-2"></button>
          ) : (
            <hr />
          )}
        </section>
      ) : (
        <p>Noch kein Gesuch, welches mein Angebot geliked hat</p>
      )}

      <section>
        <h2>Matchvorschläge</h2>
        <div className="flex-3"></div>
      </section>
    </div>
  );
}
