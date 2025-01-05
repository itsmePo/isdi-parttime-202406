import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import createEmergencyContact from "../../logic/createEmergencyContact";
import "../../styles/main.css";
import { useAuth } from "../../context/AuthContext";


const RegisterEmergencyContact = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const { userId } = useAuth();

    useEffect(() => {
        if (!userId) {
            navigate("/login");
        }
    }, [userId, navigate]);

    const createEmergencyContactFunc = async (name, phone, relationship, userId) => {
        try {
            await createEmergencyContact(name, phone, relationship, userId);
            console.log("El contacto de emergencia fue creado correctamente");
            navigate("/home");
        } catch (err) {
            console.error("Error al crear el contacto de emergencia:", err);
            setError(err.message || "Error al crear el contacto de emergencia.");
        }
    };
    
    const categories = ["Amigo", "Familiar", "Personal Médico", "Otro"];

    const handleSubmit = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const phone = event.target.phone.value;
        const relationship = event.target.relationship.value;

        setError("");
        if (userId) {
        createEmergencyContactFunc(name, phone, relationship, userId);
        } else {
            setError("Inicia sesión para continuar")
        }
    };
    
    return (
        <div className="container">
            <div className="card">
                <div className="header">
                    <h1>Agregar nuevo contacto de emergencia</h1>
                    <p>Llena el formulario para agregar un nuevo contacto de emergencia</p>
                </div>
                <form onSubmit={handleSubmit} className="form">
                    <input type="text" name="name" placeholder="Nombre completo" required />
                    <input type="tel" name="phone" placeholder="Teléfono" required />
                    <select name="relationship" required>
                        <option value="" disabled>Selecciona la relación</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    <button type="submit">Agregar contacto</button>
                </form>
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};

export default RegisterEmergencyContact;
