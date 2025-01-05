import { createContext, useContext, useState } from "react";
import {jwtDecode} from "jwt-decode"; // Ajuste en la importación de jwt-decode
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  const login = (newToken) => {
    setToken(newToken);
    sessionStorage.setItem("token", newToken);
  };

  const logout = () => {
    setToken(null);
    sessionStorage.removeItem("token");
  };

  let userId = null;

  if (token && typeof token === "string") {
    try {
      const decoded = jwtDecode(token);
      userId = decoded.userId; // Asume que el token tiene un campo `userId`
    } catch (error) {
      console.error("Error al decodificar el token:", error.message);
      logout(); // Limpia el token inválido
    }
  }

console.log(token);
  return (
    <AuthContext.Provider value={{ token, login, logout, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


// Exportación predeterminada del AuthProvider y exportación nombrada de useAuth
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;