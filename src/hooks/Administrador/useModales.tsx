import { useState } from "react";
import { toast } from "sonner";
import { type UsuarioJefe } from "@/types";
import { type ModalesRegistroProps } from "@/types";

export function useModales() {

    const [mostrarModalRegistrar, setMostrarModalRegistrar] = useState({
        registrar: false,
        confirmar_registro: false,
        documento_csv: false,
        confirmar_documento_csv: false
    } as ModalesRegistroProps);

    const handleModalConfirmacionRegistro = ({ formData }: { formData: UsuarioJefe }) => {

        if (!formData.clave_usuario || !formData.nombre_usuario || !formData.apellidos_usuario || !formData.correo_usuario || !formData.carrera) {
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

    const handleinsertarRegistro = async ({ formData }: { formData: UsuarioJefe }) => {

        const toastId = toast.loading('Registrado al usuario...');
        try {




            const res = await fetch(`${import.meta.env.VITE_API_URL}registro`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    clave: formData.clave_usuario,
                    nombre: formData.nombre_usuario,
                    apellidos: formData.apellidos_usuario,
                    cargo: formData.cargo_usuario,
                    email: formData.correo_usuario,
                    carrera: formData.carrera,
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