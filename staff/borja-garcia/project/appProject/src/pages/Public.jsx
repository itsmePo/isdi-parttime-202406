import RegisterUser from '../components/Forms/RegisterForm';
import NotFound from './NotFound';
import { Route, Routes } from 'react-router';
import Login from '../components/Forms/LoginForm';
import Home from './Home';
const Public = () => {
    return <div>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<RegisterUser/>}/>
            <Route path="/*" element={<NotFound/>}/>
            <Route path="/home" element={<Home/>}/>
        </Routes>
    </div>
}

export default Public;