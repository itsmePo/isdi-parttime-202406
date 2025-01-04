import { Route, Routes } from 'react-router';
import RegisterUser from '../components/Forms/RegisterForm';
import NotFound from './NotFound';
import Login from '../components/Forms/LoginForm';
const Public = () => {
    return <div>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<RegisterUser/>}/>
            <Route path="/*" element={<NotFound/>}/>
        </Routes>
    </div>
}

export default Public;
