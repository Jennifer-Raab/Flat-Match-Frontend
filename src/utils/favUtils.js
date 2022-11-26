export const CreateFavorite = async ( formData, token ) => {
    try {
        console.log("formData", formData);
        console.log("token", token);
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/favorites/create`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
           "Authorization": token,
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (!res.ok) throw new Error("Something went wrong");
      const fav = await res.json();
      return fav;
    } catch (err) {
      return err;
    }
  }