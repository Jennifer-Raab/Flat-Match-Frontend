import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RequestDetail() {
  const [request, setRequest] = useState();
  const { id } = useParams();

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
          {/* Hier auf alle Bilder zugreifen und eventuell einen slider oä einführen */}
          <div>
            <img
              className="request-pictures"
              src={request.images}
              alt={request.title}
            />
          </div>
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
                <td>{request.rent}</td>
              </tr>
              <tr>
                <th>Kaution:</th>
                <td>{request.deposit}</td>
              </tr>
              <tr>
                <th>Zeitraum:</th>
                <td>
                  {request.startdate} - {request.enddate}
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
                <td>{request.size}</td>
              </tr>
              <tr>
                {/* Hier müssen wir noch überlegen, wie wir die Punkte darstellen wollen. Alle darstellen und die zutreffenden mit einem Haken in der Checkbox oder mit Komma getrennt die zutreffenden? */}
                <th>Lage:</th>
                <td>{request.location}</td>
              </tr>
              <tr>
                {/* Hier müssen wir noch überlegen, wie wir die Punkte darstellen wollen. Alle darstellen und die zutreffenden mit einem Haken in der Checkbox oder mit Komma getrennt die zutreffenden? */}
                <th>Ausstattung:</th>
                <td>{request.eqipment}</td>
              </tr>
              <tr>
                {/* Hier müssen wir noch überlegen, wie wir die Punkte darstellen wollen. Alle darstellen und die zutreffenden mit einem Haken in der Checkbox oder mit Komma getrennt die zutreffenden? */}
                <th>Wohnungstyp:</th>
                <td>{request.accomodation_type}</td>
              </tr>
            </tbody>
          </table>
          <div>Beschreibung: {request.description}</div>
        </div>
      )}
    </div>
  );
}
export default RequestDetail;
