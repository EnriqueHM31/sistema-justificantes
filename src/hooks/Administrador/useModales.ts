import { useState } from "react";
import { toast } from "sonner";
import { type UsuarioJefe } from "@/types";
import { type ModalesRegistroProps } from "@/types";

export function useModales({ setFormDataRegistro }: { setFormDataRegistro: React.Dispatch<React.SetStateAction<UsuarioJefe>> }) {

    const [mostrarModalRegistrar, setMostrarModalRegistrar] = useState({
        registrar: false,
        confirmar_registro: false,
        documento_csv: false,
        confirmar_documento_csv: false
    } as ModalesRegistroProps);

    const handleModalConfirmacionRegistro = ({ formDataRegistro }: { formDataRegistro: UsuarioJefe }) => {

        if (!formDataRegistro.clave_usuario || !formDataRegistro.nombre_usuario || !formDataRegistro.apellidos_usuario || !formDataRegistro.correo_usuario || !formDataRegistro.carrera) {
            return toast.error("Los campos no pueden estar vacíos")
        }

        setMostrarModalRegistrar(prev => ({ ...prev, registrar: true }));
    }


    const handleModalCancelarRegistro = () => {
        setMostrarModalRegistrar(prev => ({ ...prev, registrar: false }));
    }

    const handleModalConfirmacionDocumento = () => {
        setMostrarModalRegistrar(prev => ({ ...prev, documento_csv: true }));
    }

    const handleModalCancelarDocumento = () => {
        setMostrarModalRegistrar(prev => ({ ...prev, documento_csv: false }));
    }

    const handleBDDocumentoCSV = () => {
        setMostrarModalRegistrar(prev => ({ ...prev, documento_csv: false }));
    };

    const handleinsertarRegistro = async ({ formDataRegistro }: { formDataRegistro: UsuarioJefe }) => {

        const toastId = toast.loading('Registrado al usuario...');
        try {

            const res = await fetch(`${import.meta.env.VITE_API_URL}/registro/jefescarrera`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    clave: formDataRegistro.clave_usuario,
                    nombre: formDataRegistro.nombre_usuario,
                    apellidos: formDataRegistro.apellidos_usuario,
                    cargo: formDataRegistro.cargo_usuario,
                    email: formDataRegistro.correo_usuario,
                    carrera: formDataRegistro.carrera,
                    password: 'Itsh12345%'
                }),
            });


            const data = await res.json() as { success: boolean, message: string };
            if (res.ok && data.success) {
                toast.success(data.message, {
                    id: toastId,
                });

            } else {
                toast.error(data.message, {
                    id: toastId,
                });
            }
        } catch (error) {
            console.error(error);
            toast.error("Error al registrar al usuario", {
                id: toastId,
            });
        } finally {
            setMostrarModalRegistrar(prev => ({ ...prev, registrar: false }));
            setFormDataRegistro(prev => ({ ...prev, clave_usuario: "", nombre_usuario: "", apellidos_usuario: "", cargo_usuario: "Jefe de Carrera", correo_usuario: "", carrera: "" }));
        }
    }


    return {
        mostrarModalRegistrar,
        handleModalConfirmacionRegistro,
        handleModalCancelarRegistro,
        handleModalConfirmacionDocumento,
        handleModalCancelarDocumento,
        handleBDDocumentoCSV,
        handleinsertarRegistro
    }
}