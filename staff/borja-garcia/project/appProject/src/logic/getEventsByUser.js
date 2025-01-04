import * as Errors from "../../errors";

const getEventsByUser = async (userId) => {
    try {
        const response = await fetch(`/api/events/user/${userId}`);
        if (!response.ok) {
            throw new Errors.ApiError("Error fetching events", response.status);
        }
     return await response.json(); // Devuelve la respuesta JSON si fue exitosa
   } catch (err) {
     if (err instanceof TypeError) {
       throw new Errors.ServerError("Server is not connected");
     }
     throw new Errors.UnexpectedError(err.message || "Unexpected error occurred");
   }
 };

 export default getEventsByUser;