import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function OfferDetail() {
  const [offer, setOffer] = useState();
  const { id } = useParams();

  console.log("id:", id);

  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API}/api/announcements/single/${id}`)
      .then((response) => response.json())
      .then((data) => setOffer(data))
      .catch((err) => console.log(err));
  }, [API, id]);

  console.log(offer);

  return (
    <div className="offer-detail">
      {offer ? (
  	    <>
          <h3>{offer.title}</h3>
          <p>{offer.description
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
export default OfferDetail;
