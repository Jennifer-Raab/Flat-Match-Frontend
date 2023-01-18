import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormatHelper } from "./HelperFunctions";
import { client } from "./client";
import Slideshow from "./SlideShow";
import FavoriteSection from "./FavoriteSection";

function OfferDetail({ user, isAuthenticated }) {
  const [images, setImages] = useState([]);

  const [offer, setOffer] = useState();
  const { id } = useParams();

  useEffect(() => {
    client
      .getEntries({
        content_type: "flatMatchBildgalerie",
      })
      .then((response) => setImages(response.items[id - 1]))
      .catch(console.error);
  }, [id]);

  console.log("Images in App", images);

  console.log("id:", id);

  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API}/api/announcements/single/${id}`)
      .then((response) => response.json())
      .then((data) => setOffer(data))
      .catch((err) => console.log(err));
  }, [API, id]);

  console.log(offer);
  console.log("Images", images);
  return (
    <div className="offer-detail">
      {offer && (
        <div>
          <h1>{offer.title}</h1>

          <Slideshow images={images} />

          <table>
            <tbody>
              <tr>
                <th>Ort:</th>
                <td>{offer.city}</td>
              </tr>
              <tr>
                <th>Stadtteile:</th>
                <td>{offer.area}</td>
              </tr>
              <tr>
                <th>Miete:</th>
                <td>{FormatHelper("currency", offer.rent)}</td>
              </tr>
              <tr>
                <th>Kaution:</th>
                <td>{FormatHelper("currency", offer.deposit)}</td>
              </tr>
              <tr>
                <th>Zeitraum:</th>
                <td>
                  {FormatHelper("date", offer.startdate)} -{" "}
                  {FormatHelper("date", offer.enddate)}
                </td>
              </tr>
              <tr>
                <th>Geeignete Personenanzahl:</th>
                <td>{offer.number_of_persons}</td>
              </tr>
              <tr>
                <th>Anzahl der Schlafzimmer:</th>
                <td>{offer.number_of_bedrooms}</td>
              </tr>
              <tr>
                <th>Anzahl der Badezimmer:</th>
                <td>{offer.number_of_bathrooms}</td>
              </tr>
              <tr>
                <th>Größe:</th>
                <td>{FormatHelper("size", offer.size)}</td>
              </tr>
              <tr>
                {/* Hier müssen wir noch überlegen, wie wir die Punkte darstellen wollen. Alle darstellen und die zutreffenden mit einem Haken in der Checkbox oder mit Komma getrennt die zutreffenden? */}
                <th>Lage:</th>
                <td>{FormatHelper("array", offer.location)}</td>
              </tr>
              <tr>
                {/* Hier müssen wir noch überlegen, wie wir die Punkte darstellen wollen. Alle darstellen und die zutreffenden mit einem Haken in der Checkbox oder mit Komma getrennt die zutreffenden? */}
                <th>Ausstattung:</th>
                <td>{FormatHelper("array", offer.equipment)}</td>
              </tr>
              <tr>
                {/* Hier müssen wir noch überlegen, wie wir die Punkte darstellen wollen. Alle darstellen und die zutreffenden mit einem Haken in der Checkbox oder mit Komma getrennt die zutreffenden? */}
                <th>Wohnungstyp:</th>
                <td>{FormatHelper("array", offer.accomodation_type)}</td>
              </tr>
            </tbody>
          </table>
          <p>{FormatHelper("linebreak", offer.description)}</p>
          {user && user.id !== offer.creator_id ? (
            <FavoriteSection
              user={user}
              isAuthenticated={isAuthenticated}
              announcementId={id}
              announcementType={offer.type}
              announcement_creator_id={offer.creator_id}
            />
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}
export default OfferDetail;
