import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userType, setUserType] = useState(null);
    const [workgroupId, setWorkgroupId] = useState(null);
    const [roleId, setRoleId] = useState(null);

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

                    try {
                        // Decodificar el token
                        const decoded = jwtDecode(data.token);
                        if (decoded.id) {
                            localStorage.setItem("user_id", decoded.id);
                            localStorage.setItem("userType", decoded.userType);
                            localStorage.setItem("workgroup_id", decoded.workgroup_id);
                            localStorage.setItem("role_id", decoded.role_id);

                            // Actualizar el estado
                            setUser(decoded);
                            setUserType(decoded.userType);
                            setWorkgroupId(decoded.workgroup_id);
                            setRoleId(decoded.role_id);
                        }
                    } catch (error) {
                        console.error("Error al decodificar el token:", error);
                    }
                } else {
                    console.log("No se encontró token.");
                }
            })
            .catch(error => console.error("Error obteniendo autenticación:", error))
            .finally(() => setLoading(false));
    }, []);

    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user_id");
        localStorage.removeItem("userType");
        localStorage.removeItem("workgroup_id");
        localStorage.removeItem("role_id");
        
        setUser(null);
        setUserType(null);
        setWorkgroupId(null);
        setRoleId(null);
    };

    const refreshAuth = async () => {
        try {
            const response = await fetch(`${apiUrl}/auth/me`, {
                credentials: "include",
            });
            const data = await response.json();
            if (data.token) {
                console.log("Token actualizado exitosamente.");
                localStorage.setItem("authToken", data.token);
    
                try {
                    const decoded = jwtDecode(data.token);
                    if (decoded.id) {
                        localStorage.setItem("user_id", decoded.id);
                        localStorage.setItem("userType", decoded.userType);
                        localStorage.setItem("workgroup_id", decoded.workgroup_id);
                        localStorage.setItem("role_id", decoded.role_id);
    
                        setUser(decoded);
                        setUserType(decoded.userType);
                        setWorkgroupId(decoded.workgroup_id);
                        setRoleId(decoded.role_id);
                    }
                } catch (error) {
                    console.error("Error al decodificar el token:", error);
                }
            }
        } catch (error) {
            console.error("Error obteniendo autenticación:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, userType, workgroupId, roleId, loading, logout, refreshAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
