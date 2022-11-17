import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FilterForm from "./FilterForm";

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
    <>
    <FilterForm type="request" />
    <div className="flat-list request">
      {requests &&
        requests.map((request) => {
          return (
            <div key={request.id} className="flat-card">
              <Link to={`/gesuch/${request.id}`}>
                <p>{request.title}</p>
              </Link>
            </div>
          );
        })}
    </div>
    </>
  );
}
export default RequestList;
