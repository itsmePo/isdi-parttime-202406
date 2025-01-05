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

  const userId = token ? jwtDecode(token).userId : null;

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
