import SignIn from './publicPages/SignIn';
import RegisterUser from './publicPages/RegisterUser';
import NotFound from './NotFound';
import { Route, Routes } from 'react-router';
import Login from '../components/Forms/LoginForm';

const Public = () => {
    return <div>
        <Routes>
            <Route path="/" element={<SignIn/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<RegisterUser/>}/>
            <Route path="/*" element={<NotFound/>}/>
        </Routes>
    </div>
}

export default Public;