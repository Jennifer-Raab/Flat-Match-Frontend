import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FilterForm from "./FilterForm";

function OfferList() {
  const [offers, setOffers] = useState();

  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API}/api/announcements/angebot`)
      .then((response) => response.json())
      .then((data) => setOffers(data))
      .catch((err) => console.log(err));
  }, [API]);

  console.log(offers);

  return (
    <>
    <FilterForm param={{type:"offer"}} setContent={setOffers} />
    <div className="flat-list offer">
      {offers &&
        offers.map((offer) => {
          return (
            <div key={offer.id} className="flat-card">
              <Link to={`/angebot/${offer.id}`}>
                <p>{offer.title}</p>
              </Link>
            </div>
          );
        })}
    </div>
    
    </>
  );
}
export default OfferList;
