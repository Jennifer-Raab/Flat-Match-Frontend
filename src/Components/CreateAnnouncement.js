import { useEffect, useState } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
 // list,
} from "firebase/storage";
import { storage } from "../utils/firebase";
import { v4 } from "uuid";
import Checkbox from "./Checkbox";

export default function CreateAnnouncement({user}) {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, "images/");
  
  const uploadFile = (e) => {
    e.preventDefault();
    console.log("imageUpload", imageUpload);
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    console.log("imagesListRef", imagesListRef);
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);



  const [{ id, creator_id, type, title, city, area, startdate, enddate, size, number_of_persons, number_of_bedrooms, number_of_bathrooms, equipment, location, images, description, active, rent, deposit, accomodation_type }, setFormState] = useState({
    id: 0,
    creator_id: user.id,
    type: "",
    title: "",
    city: "",
    area: "",
    startdate: "",
    enddate: "",
    size: "",
    number_of_persons: "",
    number_of_bedrooms: "",
    number_of_bathrooms: "",
    equipment: [],
    location: [],
    images: [],
    description: "",
    active: true,
    rent: "",
    deposit: "",
    accomodation_type: []
  });

  const handleChange = (e) => setFormState((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  const handleChangeRadio = (e) => setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!type || !title || !city || !startdate || !enddate || !size || !number_of_persons || !number_of_bedrooms || !number_of_bathrooms || !rent || !deposit) return alert("Bitte füllen Sie alle Pflichtfelder aus!");
     
      e.target.elements["location"].forEach((elem) => {
        if (elem.checked) {
          location.push(elem.value);
        }
      });
      e.target.elements["equipment"].forEach((elem) => {
        if (elem.checked) {
          equipment.push(elem.value);
        }
      });
      e.target.elements["accomodation_type"].forEach((elem) => {
        if (elem.checked) {
          accomodation_type.push(elem.value);
        }
      });
      const formDataJson = JSON.stringify({
        "id": id,
    "creator_id": creator_id,
    "type": type,
    "title": title,
    "city": city,
    "area": area,
    "startdate": startdate,
    "enddate": enddate,
    "size": size,
    "number_of_persons": number_of_persons,
    "number_of_bedrooms": number_of_bedrooms,
    "number_of_bathrooms": number_of_bathrooms,
    "equipment": equipment,
    "location": location,
    "images": images,
    "description": description,
    "active": active,
    "rent": rent,
    "deposit": deposit,
    "accomodation_type": accomodation_type
       } );

       console.log("formDataJson", formDataJson);
    // const {content} = await createNewAnnouncement(formDataJson);
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log("type", type);

  return (
    <>
    <div className="filter-div">
        <h1>Anzeige erstellen</h1>
      <form className="filter-form" onSubmit={handleSubmit}>
        <fieldset>
            <div className="radio_container">
                <input type="radio" name="type" value="angebot" id="type_angebot" onChange={handleChangeRadio} checked={type === "angebot"}></input>
                <label htmlFor="type_angebot">Angebot</label>
                <input type="radio" name="type" value="gesuch" id="type_gesuch" onChange={handleChangeRadio} checked={type === "gesuch"}></input>
                <label htmlFor="type_gesuch">Gesuch</label>
            </div>
            <div>
                <label htmlFor="title">Titel*</label>
                <input type="text" name="title" id="title" value={title} onChange={handleChange}></input>
            </div>
            <div>
                <label htmlFor="city">Ort*</label>
                <input type="text" name="city" id="city" value={city} onChange={handleChange}></input>
            </div>
            <div>
                <label htmlFor="area">{ type === "angebot" ? "Stadtteil" : "Stadtteile" }</label>
                <input type="text" name="area" id="area" value={area} onChange={handleChange}></input>
            </div>
            <div>
                <label htmlFor="rent">{ type === "angebot" ? "Miethöhe" : "Maximale Miete" }*</label>
                <input type="text" name="rent" id="rent" value={rent} onChange={handleChange}></input>
            </div>
            <div>
                <label htmlFor="deposit">{ type === "angebot" ? "Kaution" : "Maximale Kaution" }*</label>
                <input type="text" name="deposit" id="deposit" value={deposit} onChange={handleChange}></input>
            </div>
            <div>
                <label htmlFor="startdate">Zeitraum von*</label>
                <input type="date" name="startdate" id="startdate" value={startdate} onChange={handleChange}></input>
            </div>
            <div>
                <label htmlFor="enddate">Zeitraum bis*</label>
                <input type="date" name="enddate" id="enddate" value={enddate} onChange={handleChange}></input>
            </div>
            <div>
                <label htmlFor="number_of_persons">{ type === "angebot" ? "Geeignete Personenanzahl" : "Personenanzahl" }*</label>
                <input type="number" min="1" max="20" name="number_of_persons" id="number_of_persons" value={number_of_persons} onChange={handleChange}></input>
            </div>
            <div>
                <label htmlFor="number_of_bedrooms">{ type === "angebot" ? "Anzahl Schlafzimmer" : "Gewünschte Anzahl Schlafzimmer" }*</label>
                <input type="number" min="1" max="10" name="number_of_bedrooms" id="number_of_bedrooms" value={number_of_bedrooms} onChange={handleChange}></input>
            </div>
            <div>
                <label htmlFor="number_of_bathrooms">{ type === "angebot" ? "Anzahl Badezimmer" : "Gewünschte Anzahl Badezimmer" }*</label>
                <input type="number" min="1" max="10" name="number_of_bathrooms" id="number_of_bathrooms" value={number_of_bathrooms} onChange={handleChange}></input>
            </div>
            <div>
                <label htmlFor="size">{ type === "angebot" ? "Wohnungsgröße" : "Minimale Wohnungsgröße" }*</label>
                <input type="number" min="1" max="250" name="size" id="size" value={size} onChange={handleChange}></input>
            </div>
            <div>
                <label>{ type === "angebot" ? "Lage" : "Präferierte Lage" }</label>
                <Checkbox name="location" value="Zentrale Innenstadt" />
                <Checkbox name="location" value="Geschäfte fußläufig" />
                <Checkbox name="location" value="Grünanlage fußläufig" />
                <Checkbox name="location" value="Gewässer fußläufig" />
                <Checkbox name="location" value="Sportanlage fußläufig" />
                <Checkbox name="location" value="Naturnah" />
                <Checkbox name="location" value="Gute Anbindung ÖPNV" />
            </div>
            <div>
                <label>{ type === "angebot" ? "Ausstattung" : "Gewünschte Ausstattung" }</label>
                <Checkbox name="equipment" value="Waschmaschine" />
                <Checkbox name="equipment" value="Waschmaschine" />
                <Checkbox name="equipment" value="Waschmaschine" />
                <Checkbox name="equipment" value="Waschmaschine" />
                <Checkbox name="equipment" value="Waschmaschine" />
                <Checkbox name="equipment" value="Waschmaschine" />
                <Checkbox name="equipment" value="Waschmaschine" />
                <Checkbox name="equipment" value="Waschmaschine" />
                <Checkbox name="equipment" value="Waschmaschine" />
                <Checkbox name="equipment" value="Waschmaschine" />
                <Checkbox name="equipment" value="Waschmaschine" />
                <Checkbox name="equipment" value="Waschmaschine" />
                <Checkbox name="equipment" value="Waschmaschine" />
                <Checkbox name="equipment" value="Waschmaschine" />
                <Checkbox name="equipment" value="Waschmaschine" />
                <Checkbox name="equipment" value="Waschmaschine" />
                <Checkbox name="equipment" value="Waschmaschine" />
                <Checkbox name="equipment" value="Waschmaschine" />
            </div>
            <div>
                <label>{ type === "angebot" ? "Wohnungstyp" : "Wohnungstyp" }</label>
                <Checkbox name="accomodation_type" value="Waschmaschine" />
            </div>
        </fieldset>
        <div className="button-container">
            <button type="submit" className="button-style">{ type === "angebot" ? "Angebot erstellen" : "Gesuch erstellen" }</button>
        </div>
        <input type="hidden" name="id" id="id" value={id}></input>
      </form>
    </div>
    <form>
      <input className="button-2"
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
    
      <button onClick={uploadFile} className="button-1">Bilddatei hochladen</button>
      
      <div className="flex-3 opened">
      {imageUrls.map((url) => {
        return (
          <div key={v4()}>
            <img src={url} alt="" />
          </div>
        )
        ;
      })}
      </div>
    </form>
    </>
  );
}
