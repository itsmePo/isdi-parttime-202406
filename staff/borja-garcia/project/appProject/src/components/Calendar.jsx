import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState({});

  const addNote = () => {
    const note = prompt('Añade una nota para esta fecha:');
    if (note) {
      setNotes({ ...notes, [date.toDateString()]: note });
    }
  };

  return (
    <div className="calendar">
      <Calendar onChange={setDate} value={date} />
      <button onClick={addNote}>Añadir Nota</button>
      <p>Nota para {date.toDateString()}: {notes[date.toDateString()] || 'Sin nota'}</p>
    </div>
  );
};

export default CalendarComponent;