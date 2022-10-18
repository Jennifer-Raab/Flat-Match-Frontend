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
      {request ? (
        <>
              <h3>{request.title}</h3>
              <p>{request.description
              .split("\n")
              .reduce((children, textSegment, index) => {
                return [
                  ...children,
                  index > 0 && <br key={index} />,
                  textSegment,
                ];
              }, [])}</p>
        </>
      ) : (
        "not found"
      )
    }
    </div>
  );
}
export default RequestDetail;
