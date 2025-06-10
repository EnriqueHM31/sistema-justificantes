import { useUser } from "@clerk/clerk-react";
import { useState } from "react";

export function useCambiarContraseña() {
    const { user } = useUser();
    const [contraseñas, setContraseñas] = useState({ nueva: "", confirmar: "" });
    const [mostrarModal, setMostrarModal] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState({
        nueva: false,
        confirmar: false
    });
    const contraseñaValida = (contraseña: string) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(contraseña);

    const coincide = contraseñas.nueva === contraseñas.confirmar;
    const esValida = contraseñaValida(contraseñas.nueva);

    const handleClickPasswordNueva = () => {
        setPasswordVisible((prev) => ({ ...prev, nueva: !prev.nueva }));
    }
    const handleClickPasswordConfirmar = () => {
        setPasswordVisible((prev) => ({ ...prev, confirmar: !prev.confirmar }));
    }


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!esValida) {
            return { success: false, message: "La contraseña no cumple con las reglas." };
        }

        if (!coincide) {
            return { success: false, message: "Las contraseñas no coinciden." };
        }

        setMostrarModal(true);
        return { success: true };
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContraseñas((prev) => ({ ...prev, [name]: value }));
    };

    const getBorderColor = (campo: "nueva" | "confirmar") => {
        const baseFocus = "focus:outline-none focus:ring-2";

        if (contraseñas[campo] === "") return `border-input ${baseFocus}`;

        if (campo === "nueva") {
            return esValida
                ? `border-green-500 ${baseFocus} focus:ring-green-300`
                : `border-red-500 ${baseFocus} focus:ring-red-300`;
        }

        if (campo === "confirmar") {
            return coincide
                ? `border-green-500 ${baseFocus} focus:ring-green-300`
                : `border-red-500 ${baseFocus} focus:ring-red-300`;
        }

        return `border-input ${baseFocus}`;
    };

    const cambiarContraseña = async (actual: string, nueva: string) => {
        if (!user) throw new Error("Usuario no autenticado");


        try {
            console.log("cambiando contraseña", actual, nueva);
            return true
        } catch (error) {
            console.error("Error al cambiar la contraseña:", error);
            throw error;
        } finally {
            contraseñas.nueva = "";
            contraseñas.confirmar = "";
            setMostrarModal(false);
        }
    };

    const handleClickModalClose = () => {
        setMostrarModal(false);
    };

    return { cambiarContraseña, getBorderColor, handleChange, mostrarModal, handleSubmit, contraseñas, handleClickModalClose, handleClickPasswordNueva, handleClickPasswordConfirmar, passwordVisible };
}
