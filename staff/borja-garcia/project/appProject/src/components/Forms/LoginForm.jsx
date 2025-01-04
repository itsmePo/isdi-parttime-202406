import { useNavigate } from "react-router-dom";
import userAuth from "../../logic/userAuth.js";
import "../../styles/main.css"
const Login = () => {
  const navigate = useNavigate();

  const userLogin = async (email, password) => {
    try {
      userAuth(email, password);
      navigate("/home");
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    userLogin(email, password);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h1>¡Bienvenido de nuevo!</h1>
          <p>Inicia sesión para continuar</p>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <input type="email" name="email" placeholder="E-Mail" required />
          <input type="password" name="password" placeholder="Contraseña" required />
          <button type="submit">Iniciar Sesión</button>
          <p>
            ¿Sin cuenta?{" "}
            <a href="/register">¡Regístrate aquí!</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
