import { useState } from "react";
import { capitalizarNombre, generarCorreoJefeCarrera } from "@/assets/ts/Administrador/Registrar";
import { type UsuarioJefe } from "@/types";

export function useFormularioJefe() {
    const [formData, setFormData] = useState<UsuarioJefe>({
        clave_usuario: "",
        nombre_usuario: "",
        apellidos_usuario: "",
        cargo_usuario: "Jefe de Carrera",
        correo_usuario: "",
        carrera: "",
    });

    const [inputValidity, setInputValidity] = useState<{ [key: string]: boolean | null }>({
        clave_usuario: null,
        nombre_usuario: null,
        apellidos_usuario: null,
        correo_usuario: null,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, pattern } = e.target;

        const valorProcesado =
            name === "nombre_usuario" || name === "apellidos_usuario"
                ? capitalizarNombre(value)
                : value;

        setFormData(prev => {
            const updated = { ...prev, [name]: valorProcesado };

            if (name === "nombre_usuario" || name === "apellidos_usuario") {
                const correo = generarCorreoJefeCarrera(
                    name === "nombre_usuario" ? valorProcesado : updated.nombre_usuario,
                    name === "apellidos_usuario" ? valorProcesado : updated.apellidos_usuario
                );
                updated.correo_usuario = correo;

                const correoInput = document.getElementById("correo_usuario") as HTMLInputElement | null;
                if (correoInput) correoInput.value = correo;

                const correoPattern = /^[a-zA-Z]+@huatusco\.tecnm\.mx$/;
                setInputValidity(prev => ({ ...prev, correo_usuario: correoPattern.test(correo) }));
            }

            return updated;
        });

        if (value === "") {
            setInputValidity(prev => ({ ...prev, [name]: null }));
        } else if (pattern) {
            const regex = new RegExp(pattern);
            setInputValidity(prev => ({ ...prev, [name]: regex.test(valorProcesado) }));
        }
    };

    const handleCarreraChange = (value: string) => {
        setFormData(prev => ({ ...prev, carrera: value }));
    };

    return {
        formData,
        handleInputChange,
        handleCarreraChange,
        inputValidity,
        capitalizarNombre,
        setFormData,
    };
}
