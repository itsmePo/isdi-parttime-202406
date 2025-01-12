import EmergencyContact from "../models/contacts.js";
import * as Errors from "../errors/errors.js";
import mongoose from "mongoose";

export const createContact = async (user, contactData) => {
  const newContact = new EmergencyContact({
    user: user._id,
    ...contactData,
  });

  // Guardar y devolver el nuevo contacto
  const savedContact = await newContact.save();
  if (!savedContact)
    throw new Errors.SaveError("Error al guardar el contacto de emergencia");
  return savedContact;
};

// Obtener todos los contactos
export const getContacts = async () => {
  const contactsFound = await EmergencyContact.find();
  if (!contactsFound || contactsFound.length === 0)
    throw new Errors.NotFoundError("No se encontraron contactos de emergencia");
  return contactsFound;
};

export const deleteContactById = async (contactId) => {
  try {
    const contactDeleted = await EmergencyContact.findByIdAndDelete(contactId);
    if (!contactDeleted)
      throw new Errors.DeleteError(
        "No se encontró el contacto de emergencia con el ID especificado"
      );
    return contactDeleted;
  } catch (error) {
    if (error instanceof mongoose.Error.CastError)
      throw new Errors.CastError("ID de contacto inválido");
    // Si el error no es un CastError, lo lanzamos tal cual
    throw error;
  }
};

export const updateContactById = async (contactId, updatedContact) => {
  try {
    const contactUpdated = await EmergencyContact.findByIdAndUpdate(
      contactId,
      updatedContact,
      { new: true }
    );
    if (!contactUpdated)
      throw new Errors.UpdateError(
        "No se encontró el contacto de emergencia con el ID especificado"
      );
    return contactUpdated;
  } catch (error) {
    if (error instanceof mongoose.Error.CastError)
      throw new Errors.CastError("ID de contacto inválido");
    // Si el error no es un CastError, lo lanzamos tal cual
    throw error;
  }
};

export const getContactById = async (contactId) => {
  try {
    const foundContact = await EmergencyContact.findById(contactId);
    if (!foundContact)
      throw new Errors.NotFoundError(
        "No se encontró el contacto de emergencia con el ID especificado"
      );
    return foundContact;
  } catch (error) {
    if (error instanceof mongoose.Error.CastError)
      throw new Errors.CastError("ID de contacto inválido");
    // Si el error no es un CastError, lo lanzamos tal cual
    throw error;
  }
};

export const getContactsByUserId = async (userId) => {
  try {
    const foundContacts = await EmergencyContact.find({ user: userId });
    if (!foundContacts)
      throw new Errors.NotFoundError(
        "No se encontraron contactos de emergencia para el usuario con el ID especificado"
      );
    return foundContacts;
  } catch (error) {
    if (error instanceof mongoose.Error.CastError)
      throw new Errors.CastError("ID de usuario inválido");
    // Si el error no es un CastError, lo lanzamos tal cual
    throw error;
  }
};
