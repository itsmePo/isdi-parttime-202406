import Validator from "../../validator.js";
import * as Errors from "../../errors.js";

const userAuth =  (email, password) => {
  Validator.password(password)
  Validator.email(email)


  return fetch(`${import.meta.env.VITE_API_URL}users/auth`, {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then((res) => {
      if (res.status === 200) return res.json()
        .then(body => sessionStorage.setItem("token", body.token));
      return res.json()
      
        // .then(body => {
        //   const constructor = Errors[body.name]
        //   throw new constructor(`${body.message}`);
        // })
    })
    .catch((err) => {
      if (err instanceof TypeError)
        
        throw new Errors.ServerError("Server in not connected");
        console.log("URL del fetch:", `${import.meta.env.VITE_API_URL}users/auth`);

      throw new Errors.UnexpectedError();
    });
};


export default userAuth;
