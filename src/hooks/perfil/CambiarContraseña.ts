import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useCambiarContraseña() {
    const navigate = useNavigate();
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

    const cambiarContraseña = async (email: string, contrasenanueva: string | null, nueva?: string | null) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}modificarcontrasena`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, contrasenanueva, nueva }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                toast.success(data.message);

                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Error al cambiar la contraseña");
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
