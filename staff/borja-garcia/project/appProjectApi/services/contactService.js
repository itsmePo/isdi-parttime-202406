import EmergencyContact from "../models/contacts.js";
import { Errors } from "../errors";

export const createContact = async (user, contactData) => {

  const newContact = new EmergencyContact({
    user: user._id,
    ...contactData
  });

  // Guardar y devolver el nuevo contacto
  const savedContact = await newContact.save();
  if(!savedContact) {
    throw new Errors.SaveError("Error al guardar el contacto de emergencia");
  }
  return savedContact;
};

// Obtener todos los contactos
export const getContacts = async () => {
  const contactsFound = await EmergencyContact.find();
  if(!contactsFound) {
    throw new Errors.NotFoundError("No se encontraron contactos de emergencia");
  }
  return contactsFound;
};

export const deleteContactById = async (contactId) => {
  const contactDeleted = await EmergencyContact.findByIdAndDelete(contactId);
  if(!contactDeleted) {
    throw new Errors.DeleteError("No se encontró el contacto de emergencia con el ID especificado");
  }
  return contactDeleted;
};

export const updateContactById = async (contactId, updatedContact) => {
  const updatedContact = await EmergencyContact.findByIdAndUpdate(contactId, updatedContact, { new: true });
  if(!updatedContact) {
    throw new Errors.UpdateError("No se encontró el contacto de emergencia con el ID especificado");
  }
  return updatedContact;
};

export const getContactById = async (contactId) => {
  const foundContact = await EmergencyContact.findById(contactId);
  if(!foundContact) {
    throw new Errors.NotFoundError("No se encontró el contacto de emergencia con el ID especificado");
  }
  return foundContact;
};

export const getContactsByUserId = async (userId) => {
  const foundContacts = await EmergencyContact.find({ user: userId });
  if(!foundContacts) {
    throw new Errors.NotFoundError("No se encontraron contactos de emergencia para el usuario con el ID especificado");
  }
  return foundContacts;
};