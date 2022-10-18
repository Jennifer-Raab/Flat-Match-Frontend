import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function RequestList() {
  const [requests, setRequests] = useState();

  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API}/api/announcements/gesuch`)
      .then((response) => response.json())
      .then((data) => setRequests(data))
      .catch((err) => console.log(err));
  }, [API]);

  console.log(requests);

  return (
    <div className="flat-list request">
      {requests &&
        requests.rows.map((request) => {
          return (
            <div key={request.id} className="flat-card">
              <Link to={`/gesuch/${request.id}`}>
                <p>{request.title}</p>
              </Link>
            </div>
          );
        })}
    </div>
  );
}
export default RequestList;
