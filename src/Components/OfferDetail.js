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
  }, [API]);

  console.log(offer);

  return (
    <div className="offer-detail">
      {/* {offer &&
        offer.rows.map((offer) => {
          return (
            <div key={offer.id} className="flat-card">
              <Link to={`/angebot/${offer.id}`}>
                <p>{offer.title}</p>
              </Link>
            </div>
          );
        })} */}
    </div>
  );
}
export default OfferDetail;
