import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormatHelper } from "./HelperFunctions";
import { client } from "./client";
import Slideshow from "./SlideShow";
import FavoriteSection from "./FavoriteSection";

function RequestDetail({ user, isAuthenticated }) {
  const [request, setRequest] = useState();
  const [images, setImages] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    client
      .getEntries({
        content_type: "flatMatchBildgalerie",
      })
      .then((response) => setImages(response.items[id - 1]))
      .catch(console.error);
  }, [id]);

  console.log("id:", id);

  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API}/api/announcements/single/${id}`)
      .then((response) => response.json())
      .then((data) => setRequest(data))
      .catch((err) => console.log(err));
  }, [API, id]);

  console.log(request);

  return (
    <div className="request-detail">
      {request && (
        <div>
          <h1>{request.title}</h1>
          <Slideshow images={images} />

          <table>
            <tbody>
              <tr>
                <th>Ort:</th>
                <td>{request.city}</td>
              </tr>
              <tr>
                <th>Stadtteile:</th>
                <td>{request.area}</td>
              </tr>
              <tr>
                <th>Miete:</th>
                <td>{FormatHelper("currency", request.rent)}</td>
              </tr>
              <tr>
                <th>Kaution:</th>
                <td>{FormatHelper("currency", request.deposit)}</td>
              </tr>
              <tr>
                <th>Zeitraum:</th>
                <td>
                  {FormatHelper("date", request.startdate)} -{" "}
                  {FormatHelper("date", request.enddate)}
                </td>
              </tr>
              <tr>
                <th>Geeignete Personenanzahl:</th>
                <td>{request.number_of_persons}</td>
              </tr>
              <tr>
                <th>Anzahl der Schlafzimmer:</th>
                <td>{request.number_of_bedrooms}</td>
              </tr>
              <tr>
                <th>Anzahl der Badezimmer:</th>
                <td>{request.number_of_bathrooms}</td>
              </tr>
              <tr>
                <th>Größe:</th>
                <td>{FormatHelper("size", request.size)}</td>
              </tr>
              <tr>
                {/* Hier müssen wir noch überlegen, wie wir die Punkte darstellen wollen. Alle darstellen und die zutreffenden mit einem Haken in der Checkbox oder mit Komma getrennt die zutreffenden? */}
                <th>Lage:</th>
                <td>{FormatHelper("array", request.location)}</td>
              </tr>
              <tr>
                {/* Hier müssen wir noch überlegen, wie wir die Punkte darstellen wollen. Alle darstellen und die zutreffenden mit einem Haken in der Checkbox oder mit Komma getrennt die zutreffenden? */}
                <th>Ausstattung:</th>
                <td>{FormatHelper("array", request.equipment)}</td>
              </tr>
              <tr>
                {/* Hier müssen wir noch überlegen, wie wir die Punkte darstellen wollen. Alle darstellen und die zutreffenden mit einem Haken in der Checkbox oder mit Komma getrennt die zutreffenden? */}
                <th>Wohnungstyp:</th>
                <td>{FormatHelper("array", request.accomodation_type)}</td>
              </tr>
            </tbody>
          </table>
          <p>{FormatHelper("linebreak", request.description)}</p>
          <FavoriteSection user={user} isAuthenticated={isAuthenticated} announcementId={id} announcementType={request.type} />
        </div>
      )}
    </div>
  );
}
export default RequestDetail;
