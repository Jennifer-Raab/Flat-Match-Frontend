export const searchAnnouncements = async (formDataJson) => {
    try {
      console.log("searchJobs", formDataJson);
      
      const API = process.env.REACT_APP_API_URL;
      const { city, numberOfPersons, rent, type } = JSON.parse(formDataJson);
      let route = (type === "offers") ? "angebot" : "gesuch"
      const url = `${API}/api/announcements/${route}?city=${city}&numberOfPersons=${numberOfPersons}&rent=${rent}`;
      // const bodyObject = {
      //   city: city,
      //   numberOfPersons: numberOfPersons,
      //   rent: rent
      // }
      const data = await fetch(url, {
          method: 'GET',
          // TODO: Parse Body Object JSON and POST
          // body: JSON.stringify(bodyObject)
        }
      );
      const content = await data.json();
      console.log("content", content);
      return content;
    } catch (error) {
      return error;
    }
  };



  