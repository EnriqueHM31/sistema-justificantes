import { useState } from "react";
import { toast } from "sonner";
import { type ModalesRegistroProps } from "@/types";
import { useFormData } from "@/store/dataJefeCarrera";

export function useModales() {

    const { formData, reiniciarFormData } = useFormData();

    const [mostrarModalRegistrar, setMostrarModalRegistrar] = useState({
        registrar: false,
        confirmar_registro: false,
        documento_csv: false,
        confirmar_documento_csv: false
    } as ModalesRegistroProps);

    const handleModalConfirmacionRegistro = () => {

        if (!formData.publicMetadata.clave_empleado || !formData.firstName || !formData.lastName || !formData.emailAddresses[0].emailAddress || !formData.publicMetadata.carrera) {
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

    const handleinsertarRegistro = async () => {

        const toastId = toast.loading('Registrado al usuario...');
        try {

            const res = await fetch(`${import.meta.env.VITE_API_URL}/registro/jefescarrera`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    clave: formData.publicMetadata.clave_empleado,
                    nombre: formData.firstName,
                    apellidos: formData.lastName,
                    cargo: formData.publicMetadata.cargo,
                    email: formData.emailAddresses[0].emailAddress,
                    carrera: formData.publicMetadata.carrera,
                    password: 'Itsh12345%'
                }),
            });


            const data = await res.json() as { success: boolean, message: string };
            if (res.ok && data.success) {
                toast.success(data.message, {
                    id: toastId,
                });
                reiniciarFormData();

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