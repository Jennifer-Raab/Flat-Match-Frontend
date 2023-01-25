import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FilterForm from "./FilterForm";

function OfferList() {
  const [offers, setOffers] = useState();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/announcements/angebot`)
      .then((response) => response.json())
      .then((data) => setOffers(data))
      .catch((err) => console.log(err));
  }, []);

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
