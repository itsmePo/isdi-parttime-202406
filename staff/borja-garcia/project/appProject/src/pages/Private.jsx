import { Route, Routes } from 'react-router';
import Home from './privatePages/Home';
import Calendar from './privatePages/CalendarPage';
import NotFound from './NotFound';

const Private = () => {
    return <div>
        <Routes>
            <Route path="/home" element={<Home/>}/>
            <Route path="/calendar" element={<Calendar/>}/>
            <Route path="/*" element={<NotFound/>}/>
        </Routes>
    </div>
}

export default Private;