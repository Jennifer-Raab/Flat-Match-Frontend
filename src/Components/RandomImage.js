import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import image01 from "../images/bild01.jpg";
import image02 from "../images/bild02.jpg";
import image03 from "../images/bild04.jpg";
import image04 from "../images/bild04.jpg";
import image05 from "../images/bild05.jpg";
import image06 from "../images/bild06.jpg";
import image07 from "../images/bild07.jpg";

const images = [
    image01,
    image02,
    image03,
    image04,
    image05,
    image06,
    image07,
];


export default function RandomImage() {
    
    const [randomImage, setRandomImage] = useState();
    const location = useLocation();
    console.log(location.pathname);

    useEffect(() => {
        let randnum = Math.floor(Math.random() * 7);
        console.log("Random", randnum);
        setRandomImage(images[randnum]);
    }, [location.pathname]);
    console.log(location);
    if (!location.pathname.includes("gesuch/") && !location.pathname.includes("angebot/")) {
      return (
        <div className="randomimage">
          <img src={randomImage} alt="" />
        </div>
      );
    }
  }
  