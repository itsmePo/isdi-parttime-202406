import { useNavigate } from "react-router-dom";
import { useState } from "react";
import registerUser from "../../logic/registerUser";

const RegisterUser = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(""); // Estado para manejar el error

  const createUser = async (email, username, password) => {
    try {
      await registerUser(email, username, password); // Intentamos registrar el usuario
      console.log("El usuario fue creado correctamente");
      setTimeout(() => {
        navigate("/login"); // Redirige al login después de 10 segundos
      }, 10000);
    } catch (err) {
      console.error("Error al crear el usuario:", err.message);
      setError(err.message || "Error al crear el usuario. Por favor, inténtalo nuevamente."); // Mostrar el error
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita la recarga de la página
    const email = event.target.email.value;
    const username = event.target.username.value;
    const password = event.target.password.value;

    setError(""); // Limpiar errores antes de un nuevo intento

    try {
      await createUser(email, username, password); // Llamada a la función para crear el usuario
    } catch (err) {
      // No hacemos nada aquí porque `createUser` ya maneja los errores
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-900 via-purple-700 to-pink-800">
      <div className="login max-w-xs bg-slate-200 rounded-lg p-6 shadow-2xl">
        <div className="header text-center mb-4">
          <span className="text-xl font-bold">¡Únete ahora!</span>
          <p className="text-gray-600">Regístrate y comienza a disfrutar</p>
        </div>
        {error && (
          <div className="mb-4 p-2 text-red-600 bg-red-100 border border-red-500 rounded">
            {error} {/* Mostramos el mensaje de error si existe */}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="h-10 border border-gray-300 rounded px-3"
            type="text"
            name="username"
            placeholder="Nombre de Usuari@"
            required
          />
          <input
            className="h-10 border border-gray-300 rounded px-3"
            type="email"
            name="email"
            placeholder="E-Mail"
            required
          />
          <input
            className="h-10 border border-gray-300 rounded px-3"
            type="password"
            name="password"
            placeholder="Contraseña"
            required
          />
          <input
            className="h-10 border border-gray-300 rounded px-3"
            type="password"
            placeholder="Repite la contraseña"
            required
          />
          <input
            className="h-10 bg-blue-600 text-white font-semibold rounded cursor-pointer hover:animate-pulse"
            type="submit"
            value="¡Regístrate!"
          />
          <span className="text-center text-gray-600">
            ¿Ya eres miembro?{" "}
            <a href="/login" className="text-blue-600 font-medium">
              ¡Inicia sesión aquí!
            </a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
