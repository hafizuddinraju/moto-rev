import { useEffect, useState } from "react";

//api token function
const ApiToken = (email) => {
  // console.log(email);
  const [token, setToken] = useState("");
  useEffect(() => {
    if (email) {
      fetch(`https://server-bike.vercel.app/jwt?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.accessToken) {
            localStorage.setItem("moto-token", data.accessToken);
            setToken(data.accessToken);
          }
        });
    }
  }, [email]);
  return [token];
};

export default ApiToken;
