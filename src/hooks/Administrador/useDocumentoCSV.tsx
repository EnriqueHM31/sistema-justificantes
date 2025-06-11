import { useRef, useState } from "react";

export function useArchivoCSV() {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [datosArchivo, setDatosArchivo] = useState<string[][]>([]);

    const handleClear = () => {
        setDatosArchivo([]);
        if (inputFileRef.current) {
            inputFileRef.current.value = "";
        }
    };

    return {
        inputFileRef,
        datosArchivo,
        setDatosArchivo,
        handleClear
    };
}
