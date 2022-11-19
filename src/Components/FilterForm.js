import { useState } from "react";
import { searchAnnouncements } from "../utils/dbUtils";

function FilterForm({ param, setContent }) {
  console.log("setContent", setContent);
  const [{ city, numberOfPersons, rent, type }, setFormState] = useState({
    city: "",
    numberOfPersons: "",
    rent: "",
    type: param.type,
  });
  const handleChange = (e) =>
    setFormState((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // if (!email) return alert("Please fill out all the fields");
      const formDataJson = JSON.stringify({
        city: city,
        numberOfPersons: numberOfPersons,
        rent: rent,
        type: type,
      });
      console.log("formDataJson", formDataJson);
      const content = await searchAnnouncements(formDataJson);
      console.log("returnDataJson", content);
      setContent(content);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="filter-div">
      <input
        type="checkbox"
        name="toggle"
        id="toggle"
        className="hid-checkb"
      ></input>
      <label htmlFor="toggle" className="button-style">
        Filter
      </label>
      <form className="filter-form" onSubmit={handleSubmit}>
        <fieldset>
          <div>
            <label htmlFor="city">Stadt</label>
            <input
              type="text"
              name="city"
              id="city"
              value={city}
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <label htmlFor="numberOfPersons">Personenanzahl</label>
            <input
              type="number"
              name="numberOfPersons"
              id="numberOfPersons"
              min="1"
              max="10"
              value={numberOfPersons}
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <label htmlFor="rent">
              {type === "offer" ? "Maximale Miethöhe" : "Minimale Miethöhe"}
            </label>
            <input
              type="number"
              name="rent"
              id="rent"
              min="0"
              max="10000"
              value={rent}
              onChange={handleChange}
            ></input>
          </div>
        </fieldset>
        <div className="button-container">
          <input type="hidden" name="type" id="type" value={type}></input>
          <button type="submit" className="button-style">
            Filter anwenden
          </button>
        </div>
      </form>
    </div>
  );
}

export default FilterForm;
