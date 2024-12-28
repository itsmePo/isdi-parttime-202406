import EmergencyContact from "../models/contacts.js";
import Contact from "../models/contacts.js";
import User from "../models/users.js";
// Crear un contacto
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
  return await Contact.find();
};

export const deleteContactById = async (contactId) => {
  return await Contact.findByIdAndDelete(contactId);
}

export const updateContactById = async (contactId, updatedContact) => {
  return await Contact.findByIdAndUpdate(contactId, updatedContact, { new: true });
}

export const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
}
