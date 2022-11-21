
export const getUser = async (token) => {
    try {
      const data = await fetch(`${process.env.REACT_APP_API_URL}/api/users/me`, {
        headers: { Authorization: token }
      });
      const content = await data.json();
      console.log("content 1", content)
      return { content };
    } catch (error) {
      return { error };
    }
  };
  
  export const registerUser = async (formDataJson) => {
    try {
      console.log("API", process.env.REACT_APP_API_URL);
      console.log("formDataJson", formDataJson);
      const data = await fetch(
        `${process.env.REACT_APP_API_URL}/users`, {
          method: 'POST',
          body: formDataJson,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        }
      );
      const content = await data.json();
      console.log("content 2", content)
      return { content };
    } catch (error) {
      return { error };
    }
  };
  
  export const updateUser = async (formDataJson) => {
    try {
      console.log("API", `${process.env.REACT_APP_API_URL}/users/${JSON.parse(formDataJson).id}`);
      console.log("formDataJson", formDataJson);
      const data = await fetch(
        `${process.env.REACT_APP_API_URL}/users/${JSON.parse(formDataJson).id}`, {
          method: 'PUT',
          body: formDataJson,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        }
      );
      const content = await data.json();
      console.log("content 3", content)
      return { content };
    } catch (error) {
      return { error };
    }
  };
  
  export const loginUser = async (formDataJson) => {
    try {
      const data = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/login`, {
          method: 'POST',
          body: formDataJson,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        }
      );
      const content = await data.json();
      console.log("content", content)
      return { content };
    } catch (error) {
      return { error };
    }
  };