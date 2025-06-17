import { useState } from "react";
import { toast } from "sonner";

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
                toast.error("Corrige los errores antes de registrar")
                return;
            }

            handleBDDocumentoCSV();
            setLoading(true);
        }
    };

    const handleClickComplete = () => {
        setLoading(false);
        toast.success("Registro completado correctamente")
    };

    return {
        handleClickRegistrarCSV,
        handleClickComplete,
        loading,
    };
}
