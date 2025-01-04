import * as Errors from "../../errors";

const createEmergencyContact = async (contactName, phone, relationship, userId) => {
    try {
      const response = await fetch(`/api/emergency-contacts/users/${userId}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ contactName, phone, relationship }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Errors.ApiError(errorData.message);
      }

    return await response.json(); // Devuelve la respuesta JSON si fue exitosa
  } catch (err) {
    if (err instanceof TypeError) {
      throw new Errors.ServerError("Server is not connected");
    }
    throw new Errors.UnexpectedError(err.message || "Unexpected error occurred");
  }
};
  
export default createEmergencyContact;