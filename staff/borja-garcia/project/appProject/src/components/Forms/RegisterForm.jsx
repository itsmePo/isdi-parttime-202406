import { useState } from 'react';

const RegistrationForm = ({ onsubmit }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password:'',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onsubmit(formData); //Llama la función que maneja el envío
    };

    return (
        <form onSubmit={handleSubmit} className='card w-96 bg-base-100 shadow-xl p-6'>
            <h2 className='text-2xl font-bold mb-4'>Registro</h2>
            <div className='form-control w-full max-w-xs'>
                <label className='label'>
                    <span className='label-text'>Nombre de usuario</span>
                </label>
                <input
                    type='text'
                    name='username'
                    placeholder='Escribe tu nombre de usuario'
                    className='input input-bordered w-full max-w-xs'
                    value={formData.username}
                    onChange={handleChange}
                    required
                    />
            </div>
            <div className='form-control w-full max-w-xs mt-4'>
                <label className='label'>
                    <span className='label-text'>Correo electrónico</span>
                </label>
                <input
                    type='email'
                    name='email'
                    placeholder='Escribe tu correo electrónico'
                    className='input input-bordered w-full max-w-xs'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    />
                    <span className='text-red-500 text-xs'>
                        {formData.emailError && 'El correo electrónico ya está registrado'}
                    </span>
                    <span className='text-red-500 text-xs'>
                        {formData.emailError && 'Correo electrónico inválido'}
                    </span>
                    <span className='text-red-500 text-xs'>
                        {formData.emailError && 'Este campo es obligatorio'}
                    </span>
                    <span className='text-red-500 text-xs'>
                        {formData.emailError && 'Este campo no puede estar vacío'}
                    </span>
                    </div>
                <div className='form-control w-full max-w-xs mt-4'>
                    <label className='label'>
                        <span className='label-text'>Contraseña</span>
                    </label>
                    <input
                        type='password'
                        name='password'
                        placeholder='Escribe tu contraseña'
                        className='input input-bordered w-full max-w-xs'
                        value={formData.password}
                        onChange={handleChange}
                        required
                        />
                    <span className='text-red-500 text-xs'>
                        {formData.passwordError && 'Contraseña demasiado corta'}
                    </span>
                    <span className='text-red-500 text-xs'>
                        {formData.passwordError && 'Contraseña inválida'}
                    </span>
                    </div>
                <div className='form-control w-full max-w-xs mt-4'>
                    <label className='label'>
                        <span className='label-text'>Confirmar contraseña</span>
                    </label>
                    <input
                        type='password'
                        name='confirmPassword'
                        placeholder='Confirma tu contraseña'
                        className='input input-bordered w-full max-w-xs'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        />
                    <span className='text-red-500 text-xs'>
                        {formData.confirmPasswordError && 'Las contraseñas no coinciden'}
                    </span>
                    <span className='text-red-500 text-xs'>
                        {formData.confirmPasswordError && 'Este campo no puede estar vacío'}
                    </span>
            </div>
            <button type='submit' className='btn btn-primary mt-6'>Registrarse</button>
        </form>
    );
};

export default RegistrationForm;