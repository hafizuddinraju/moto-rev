//user info set database
export const saveUserMongodb = (name, email, specialty) => {
  console.log(name, email);
  const user = { name, email, specialty };
  fetch("https://server-bike.vercel.app/users", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error.message);
    });
};
