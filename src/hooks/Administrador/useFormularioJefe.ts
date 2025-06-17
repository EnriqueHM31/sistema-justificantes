import { useEffect, useState } from "react";
import { capitalizarNombre, generarCorreoJefeCarrera } from "@/assets/ts/Administrador/Registrar";
import { useFormData } from "@/store/dataJefeCarrera";

export function useFormularioJefe() {
    const { formData, updateField } = useFormData();

    const [inputValidity, setInputValidity] = useState<{ [key: string]: boolean | null }>({
        clave_usuario: null,
        nombre_usuario: null,
        apellidos_usuario: null,
        correo_usuario: null,
    });

    useEffect(() => {
        // Si se limpió el formulario, reinicia la validación
        const isReset =
            formData.publicMetadata.clave_empleado === "" &&
            formData.firstName === "" &&
            formData.lastName === "" &&
            (formData.emailAddresses[0]?.emailAddress || "") === "";

        if (isReset) {
            setInputValidity({
                clave_usuario: null,
                nombre_usuario: null,
                apellidos_usuario: null,
                correo_usuario: null,
            });
        }
    }, [formData]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, pattern } = e.target;

        const valorProcesado =
            name === "firstName" || name === "lastName"
                ? capitalizarNombre(value)
                : value;

        updateField(name, valorProcesado);

        if (value === "") {
            setInputValidity((prev) => ({ ...prev, [name]: null }));
        } else if (pattern) {
            const regex = new RegExp(pattern);
            setInputValidity((prev) => ({ ...prev, [name]: regex.test(valorProcesado) }));
        }

        if (name === "firstName" || name === "lastName") {
            const formData = useFormData.getState().formData;
            const correo = generarCorreoJefeCarrera(
                name === "firstName" ? valorProcesado : formData.firstName,
                name === "lastName" ? valorProcesado : formData.lastName
            );

            updateField("emailAddresses", correo);

            const correoPattern = /^[a-zA-Z]+@huatusco\.tecnm\.mx$/;
            setInputValidity((prev) => ({
                ...prev,
                correo_usuario: correoPattern.test(correo)
            }));
        }

        if (name === "emailAddresses") {
            const correo = value as string;
            const correoPattern = /^[a-zA-Z]+@huatusco\.tecnm\.mx$/;
            setInputValidity((prev) => ({
                ...prev,
                correo_usuario: correoPattern.test(correo)
            }));
        }
    };


    const handleCarreraChange = (value: string) => {
        updateField("carrera", value);
    };

    return {
        formData,
        handleInputChange,
        handleCarreraChange,
        inputValidity,
        capitalizarNombre,
    };
}
