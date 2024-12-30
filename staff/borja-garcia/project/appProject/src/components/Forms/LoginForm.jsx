import { useNavigate } from "react-router-dom";
import userAuth from "../../logic/userAuth.js";

const Login = () => {
  const navigate = useNavigate();

  // Función para manejar el inicio de sesión
  const userLogin = async (email, password) => {
    try {
       userAuth(email, password);
      navigate("/home"); // Redirige al usuario a la página principal
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
    }
  };

  // Manejo del evento de envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault(); // Evita la recarga de la página
    const email = event.target.email.value;
    const password = event.target.password.value;

    userLogin(email, password); // Llama a la función de inicio de sesión
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-900 via-purple-700 to-pink-800">
      <div className="login max-w-xs bg-slate-200 rounded-lg p-6 shadow-2xl">
        <div className="header text-center mb-4">
          <span className="text-xl font-bold">¡Bienvenido de nuevo!</span>
          <p className="text-gray-600">Inicia sesión para continuar</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          <button
            className="h-10 bg-blue-600 text-white font-semibold rounded cursor-pointer hover:animate-pulse"
            type="submit"
          >
            Iniciar Sesión
          </button>
          <span className="text-center text-gray-600">
            ¿Sin cuenta?
            <a href="/register" className="text-blue-600 font-medium">
              ¡Regístrate aquí!
            </a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
