import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("auth_token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded); // Aquí guardas los datos del usuario
            } catch (error) {
                console.error("Error al decodificar el token:", error);
                setUser(null);
            }
        }
        setLoading(false);
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
