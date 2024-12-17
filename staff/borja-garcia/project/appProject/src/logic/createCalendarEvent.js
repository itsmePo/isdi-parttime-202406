import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        //Llamada a la API (BE) para ver eventos
        fetchEvents().then(data => setEvents(data));
    }, []);
const fetchEvents = async () => {
    try {
        const response = await fetch('/api/events'); //Ruta al backend
        if (!response.ok) {
            throw new Error('HTTP error! status: ${response.status}');
        }
        return await response.json(); //Devolución datos backend
    } catch (error) {
        console.error("Error fetching events:", error);
        return[]; //Array vacío en caso de error
        }
    }
const handleSelect = ({ start, end }) => {
    const title = window.prompt('Nuevo evento:', '');
    if (title) {
        const newEvent = {
            start,
            end,
            title,
        };
        //Llamada a API en backend para guardar el evento
        saveEvent(newEvent).then(savedEvent => setEvents([...events, savedEvent]));
    }
    };
    const saveEvent = async (event) => {
        try {
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(event),
            });
            if (!response.ok) {
                throw new Error('HTTP error! status: ${response.status}');
            }
            return await response.json();
        } catch (error) {
            console.error("Error saving event:", error);
            return null; //Devuelve null en caso de error
        }
    }

    return (
        <div style={{ height:500 }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                selectable
                onSelectSlot={handleSelect}
            />
        </div>
    );
};

export default MyCalendar;