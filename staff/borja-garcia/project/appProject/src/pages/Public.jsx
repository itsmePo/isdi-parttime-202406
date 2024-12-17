import SignIn from './publicPages/SignIn';
import RegisterUser from './publicPages/RegisterUser';
import NotFound from './NotFound';
import { Route, Routes } from 'react-router';

const Public = () => {
    return <div>
        <Routes>
            <Route path="/" element={<SignIn/>}/>
            <Route path="/register" element={<RegisterUser/>}/>
            <Route path="/*" element={<NotFound/>}/>
        </Routes>
    </div>
}

export default Public;