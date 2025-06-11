

export interface UsuarioJefe {
    clave_usuario: string;
    nombre_usuario: string;
    apellidos_usuario: string;
    cargo_usuario: string;
    correo_usuario: string;
    carrera: string;
}

export interface UsuarioJefeFile extends UsuarioJefe {
    file: File | null | string
}
export interface PrevisualizacionRegistroUnicoProps {
    usuario: UsuarioJefe;
    onConfirmar: () => void;
    capitalizarNombre: (nombre: string) => string;
}

export interface InputFileUploadProps {
    onFileRead: (data: string[][]) => void;
    inputFileRef: RefObject<HTMLInputElement | null>; // ✅ CAMBIO AQUÍ
}

export interface ItemPropsFileCSV {
    name: string;
}

export interface SelectLabelsFileCSVProps {
    items: ItemPropsFileCSV[];
    handleChange: (value: string) => void;
}


export interface DataCSVProps {
    datos: string[][];
    handleBDDocumentoCSV: () => void;
    mostrarModal: ModalConfirmacionProps;
    handleModalCancelarDocumento: () => void;
}

export interface TablaPrevisualizacionProps {
    errores?: boolean[][];
    mostrarHasta: number;
    encabezados: string[];
    filas: string[][];
    filasMostradas: string[][];
    mostrarMas: () => void;
    handleEdit: (filaIndex: number, colIndex: number, newValue: string) => void;
}

interface useFileProps {
    onFileRead: (data: string[][]) => void;
}