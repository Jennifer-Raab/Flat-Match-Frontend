import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFirstdraft } from "react-icons/fa";
import { BsArrowRightSquareFill } from "react-icons/bs";
import { client } from "./client";

export default function Overview({ user }) {
  const [offers, setOffers] = useState();
  const [requests, setRequests] = useState();
  const [matches, setMatches] = useState();

  const [images, setImages] = useState([]);
  // const [liked, setLiked] = useState();
  // const [suggestions, setSuggestions] = useState();

  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API}/api/announcements/angebot/${user.id}`)
      .then((response) => response.json())
      .then((data) => setOffers(data))
      .catch((err) => console.log(err));
  }, [API, user.id]);

  useEffect(() => {
    fetch(`${API}/api/announcements/gesuch/${user.id}`)
      .then((response) => response.json())
      .then((data) => setRequests(data))
      .catch((err) => console.log(err));
  }, [API, user.id]);

  useEffect(() => {
    fetch(`${API}/api/favorites/matches/${user.id}`)
      .then((response) => response.json())
      .then((data) => setMatches(data))
      .catch((err) => console.log(err));
  }, [API, user.id]);

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

  return (
    <div>
      <h1>Hallo {user.username}</h1>
      {offers ? (
        <section>
          <h2>Eigene Angebote: {offers.length}</h2>
          <div className="flex-3">
            {offers.map((offer) => {
              let slideImage = images.fields.bilder[0].fields.file;
              console.log("slideImage", slideImage);
              return (
                <div key={offer.id} className="flat-card-userpage">
                  <Link className="button-1" to={`/angebot/${offer.id}`}>
                    <BsArrowRightSquareFill />
                  </Link>

                  <input
                    className="hid-checkb"
                    name="current-offer"
                    type="radio"
                    id={`offer_aktiv_${offer.id}`}
                  ></input>
                  <label className="button-1" for={`offer_aktiv_${offer.id}`}>
                    <FaFirstdraft />
                  </label>

                  <img src={slideImage.url} alt="" />
                  <span>{offer.title}</span>
                </div>
              );
            })}
          </div>
          {offers.length > 3 ? (
            <button onClick={expand} class="button-2"></button>
          ) : (
            ""
          )}
        </section>
      ) : (
        ""
      )}

      {requests ? (
        <section>
          <h2>Eigene Gesuche: {requests.length}</h2>
          <div className="flex-3">
            {requests.map((request) => {
              let slideImage = images.fields.bilder[0].fields.file;
              console.log("slideImage", slideImage);
              return (
                <div key={request.id} className="flat-card-userpage">
                  <Link to={`/angebot/${request.id}`}>
                    <img src={slideImage.url} alt="" />
                    <span>{request.title}</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        ""
      )}

      {matches ? (
        <section>
          <h2>Matches: {matches.length}</h2>
          {console.log("matches", matches)}
          <div className="flex-3">
            {matches.map((match) => {
              let slideImage = images.fields.bilder[0].fields.file;
              console.log("slideImage", slideImage);
              return (
                <div key={match.id} className="flat-card-userpage">
                  <Link to={`/angebot/${match.id}`}>
                    <img src={slideImage.url} alt="" />
                    <span>{match.title}</span>
                    <span>{match.title}</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        ""
      )}
      <section>
        <h2>Geliked von</h2>
        <div className="flex-3"></div>
      </section>
      <section>
        <h2>Matchvorschläge</h2>
        <div className="flex-3"></div>
      </section>
    </div>
  );
}
