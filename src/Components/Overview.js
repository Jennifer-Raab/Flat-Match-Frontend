import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { client } from "./client";

export default function Overview({ user }) {
  const [offers, setOffers] = useState();

  const [images, setImages] = useState([]);

  // const [requests, setRequests] = useState();
  // const [matches, setMatches] = useState();
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
    client
      .getEntries({
        content_type: "flatMatchBildgalerie",
      })
      .then((response) => setImages(response.items[0]))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>Hallo {user.username}</h1>
      <section>
        <h2>Eigene Angebote</h2>
        <div className="flex-3">
          {offers &&
            offers.map((offer) => {
              let slideImage = images.fields.bilder[0].fields.file;
              console.log("slideImage", slideImage);
              return (
                <div key={offer.id} className="flat-card-userpage">
                  <Link to={`/angebot/${offer.id}`}>
                    <div style={{ backgroundImage: `url(${slideImage.url})` }}>
                      <span>{offer.title}</span>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      </section>
      <section>
        <h2>Eigene Gesuche</h2>
        <div className="flex-3"></div>
      </section>
      <section>
        <h2>Matches</h2>
        <div className="flex-3"></div>
      </section>
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
