import { useState } from "react";
import { toast } from "sonner";
import { type UsuarioJefe } from "@/types";

export function useModales() {

    const [mostrarModalRegistrar, setMostrarModalRegistrar] = useState({
        registrar: false,
        confirmar_registro: false,
        documento_csv: false,
        confirmar_documento_csv: false
    });

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


    return {
        mostrarModalRegistrar,
        handleModalConfirmacionRegistro,
        handleModalCancelarRegistro,
        handleModalConfirmacionDocumento,
        handleModalCancelarDocumento,
        handleBDDocumentoCSV,
    }
}