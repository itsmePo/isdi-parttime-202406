import { Route, Routes } from 'react-router';
import Home from './privatePages/Home';
import Calendar from './privatePages/CalendarPage';
import EmergencyContact from './privatePages/ContactPage';
import NotFound from './NotFound';

const Private = () => {
    return <div>
        <Routes>
            <Route path="/home" element={<Home/>}/>
            <Route path="/calendar" element={<Calendar/>}/>
            <Route path="/emergency-contacts" element={<EmergencyContact/>}/>
            <Route path="/*" element={<NotFound/>}/>
        </Routes>
    </div>
}

export default Private;