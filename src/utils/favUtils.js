import axios from "axios";

export const CreateFavorite = async (formData, token) => {
  try {
    console.log("formData", formData);
    console.log("token", token);

    const postUrl = `${process.env.REACT_APP_API_URL}/api/favorites/create`;

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/favorites/create`,
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          Authorization: token,
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    console.log(res);
    if (!res.ok) throw new Error("Something went wrong");
    return await res.json();
  } catch (err) {
    return err;
  }
};
