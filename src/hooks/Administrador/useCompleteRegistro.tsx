import { useState } from "react";
import { toast } from "sonner";
import IconoCorrecto from "../../assets/iconos/iconoCorrecto";
import IconoError from "../../assets/iconos/iconoError"; // Asegúrate de tener uno

export function useCompleteRegistro({
    handleBDDocumentoCSV,
    errores,
}: {
    handleBDDocumentoCSV: () => void;
    errores: Record<number, boolean[]> | undefined;
}) {
    const [loading, setLoading] = useState(false);


    function hayErrores(errores: Record<number, boolean[]>): boolean | undefined | null {
        return Object.values(errores).some(fila =>
            fila.some(celda => celda === true)
        );
    }

    const handleClickRegistrarCSV = () => {
        if (errores) {
            if (hayErrores(errores)) {
                toast.warning("Corrige los errores antes de registrar", {
                    icon: <IconoError />,
                });
                return;
            }

            handleBDDocumentoCSV();
            setLoading(true);
        }
    };

    const handleClickComplete = () => {
        setLoading(false);
        toast.success("Registro completado correctamente", {
            icon: <IconoCorrecto />,
        });
    };

    return {
        handleClickRegistrarCSV,
        handleClickComplete,
        loading,
    };
}
