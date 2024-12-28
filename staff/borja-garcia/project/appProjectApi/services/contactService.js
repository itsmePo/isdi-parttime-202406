import EmergencyContact from "../models/contacts.js";

export const createContact = async (user, contactData) => {

  const newContact = new EmergencyContact({
    user: user._id,
    ...contactData
  });

  // Guardar y devolver el nuevo contacto
  return await newContact.save();
};

// Obtener todos los contactos
export const getContacts = async () => {
  return await EmergencyContact.find();
};

export const deleteContactById = async (contactId) => {
  return await EmergencyContact.findByIdAndDelete(contactId);
}

export const updateContactById = async (contactId, updatedContact) => {
  return await EmergencyContact.findByIdAndUpdate(contactId, updatedContact, { new: true });
}

export const getContactById = async (contactId) => {
  return await EmergencyContact.findById(contactId);
}

export const getContactsByUserId = async (userId) => {
  return await EmergencyContact.find({ user: userId });
}