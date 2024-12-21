import EmergencyContact from "../models/contacts.js";
import Contact from "../models/contacts.js";
import User from "../models/users.js";
// Crear un contacto
export const createContact = async (user, contactData) => {
  
  const userId = user._id;

  const newContact = new EmergencyContact({ user: userId, contactData });
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
