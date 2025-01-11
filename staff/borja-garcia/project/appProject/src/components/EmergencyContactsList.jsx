import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const EmergencyContactsDropdown = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState("");
  const [selectedContact, setSelectedContact] = useState(null); // Cambiado a null para manejar el objeto
  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchContacts = async () => {
      try {
        const response = await fetch(`/api/emergency-contacts/users/${userId}`);
        if (!response.ok) {
          throw new Error("Error al obtener los contactos");
        }
        const data = await response.json();
        setContacts(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Error al obtener los contactos");
      }
    };

    fetchContacts();
  }, [userId, navigate]);

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    const contact = contacts.find((contact) => contact._id === selectedId);
    setSelectedContact(contact);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h1>Contactos de Emergencia</h1>
        </div>
        {error && <p className="error">{error}</p>}
        {contacts.length > 0 ? (
          <div className="dropdown">
            <label htmlFor="contactsDropdown">Selecciona un contacto:</label>
            <select
              id="contactsDropdown"
              onChange={handleSelectChange}
              defaultValue=""
            >
              <option value="" disabled>
                -- Elige un contacto --
              </option>
              {contacts.map((contact) => (
                <option key={contact._id} value={contact._id}>
                  {contact.contactName}
                </option>
              ))}
            </select>
            {selectedContact && (
              <div className="contact-details">
                <h3>Detalles del contacto seleccionado:</h3>
                <p><strong>Nombre:</strong> {selectedContact.contactName}</p>
                <p><strong>Teléfono:</strong> {selectedContact.phone}</p>
                <p><strong>Relación:</strong> {selectedContact.relationship}</p>
              </div>
            )}
          </div>
        ) : (
          <p>No hay contactos de emergencia registrados.</p>
        )}
      </div>
    </div>
  );
};

export default EmergencyContactsDropdown;
