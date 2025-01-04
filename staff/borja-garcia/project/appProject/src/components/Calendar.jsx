import { useEffect, useState, useRef } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "../styles/calendar.css"; // Archivo CSS separado para estilos

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    category: "",
  });
  const [showForm, setShowForm] = useState(false); //Sabe si está abierto el form
  const formRef = useRef(null); // Genera una referencia para saber si está abierto el form

  const categories = ["Ansiedad", "Ataque de Pánico", "Autolesión", "Otro"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.start && newEvent.end && newEvent.category) {
      setEvents((prevEvents) => [
        ...prevEvents,
        {
          title: `${newEvent.title} (${newEvent.category})`,
          start: new Date(newEvent.start),
          end: new Date(newEvent.end),
          category: newEvent.category,
        },
      ]);
      setNewEvent({ title: "", start: "", end: "", category: "" });
      setShowForm(false); // Oculta el formulario después de añadir un evento
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

const handleCloseForm = () => {
    setShowForm(false); // Oculta el formulario cuando se cierra
}

useEffect(() => {
    const handleClickOutside = (event) => {
        if (formRef.current && !formRef.current.contains(event.target)) {
            setShowForm(false); // Oculta el formulario cuando se hace click fuera del mismo
        }
    };

    const handleEscape = (event) => {
        if (event.key === "Escape") {
            setShowForm(false); // Oculta el formulario cuando se presiona la tecla Esc
        }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);



  return (
    <div style={{ padding: "20px" }}>
      <h1>Mi Calendario 📅</h1>

      {/* Botón para mostrar/ocultar el formulario */}
      <button
        onClick={() => setShowForm((prev) => !prev)}
        style={{
          margin: "20px 0",
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {showForm ? "Cerrar Formulario" : "Crear Evento"}
      </button>

      {/* Formulario para crear un nuevo evento con animación */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Crear un nuevo evento</h3>
            <div style={{ marginBottom: "10px" }}>
              <label>Título:</label>
              <input
                type="text"
                name="title"
                value={newEvent.title}
                onChange={handleInputChange}
                style={{ width: "100%", padding: "5px", marginTop: "5px" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Fecha de inicio:</label>
              <input
                type="datetime-local"
                name="start"
                value={newEvent.start}
                onChange={handleInputChange}
                style={{ width: "100%", padding: "5px", marginTop: "5px" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Fecha de fin:</label>
              <input
                type="datetime-local"
                name="end"
                value={newEvent.end}
                onChange={handleInputChange}
                style={{ width: "100%", padding: "5px", marginTop: "5px" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Categoría:</label>
              <select
                name="category"
                value={newEvent.category}
                onChange={handleInputChange}
                style={{ width: "100%", padding: "5px", marginTop: "5px" }}
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleAddEvent}
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Añadir Evento
            </button>
            <button
            onClick={handleCloseForm}
            style={{
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              padding: "10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cerrar
          </button>
          </div>
        </div>
      )}

      {/* Calendario */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "40vh", maxWidth: "400px", maxHeight: "400px", margin: "20px 0" }}
        messages={{
          next: "Siguiente",
          previous: "Anterior",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
          agenda: "Agenda",
          noEventsInRange: "No hay eventos en este rango.",
        }}
      />
    </div>
  );
};

export default CalendarComponent;
