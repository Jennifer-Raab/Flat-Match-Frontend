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

export default function CreateAnnouncement() {
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

  return (
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
  );
}
