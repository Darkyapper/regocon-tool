import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Revisando autenticación...");
      
        fetch(`${apiUrl}/auth/me`, {
          credentials: "include", // Para enviar cookies automáticamente
        })
          .then(response => response.json())
          .then(data => {
            if (data.token) {
              console.log("Token obtenido desde el backend con éxito.");
              localStorage.setItem("authToken", data.token);
            } else {
              console.log("No se encontró token.");
            }
          })
          .catch(error => console.error("Error obteniendo autenticación:", error));
      }, []);
      
      

    const logout = () => {
        localStorage.removeItem("auth_token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
