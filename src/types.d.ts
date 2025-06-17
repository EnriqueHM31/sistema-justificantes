import { type EmailAddressResource } from "@clerk/types";

export interface UsuarioJefe {
    clave_usuario: string;
    nombre_usuario: string;
    apellidos_usuario: string;
    cargo_usuario: string;
    correo_usuario: string;
    carrera: string;
    role?: string;
}

interface UsuarioClerkProps {
    firstName: string;
    lastName: string;
    emailAddresses: EmailAddressResource[];
    publicMetadata: {
        clave_empleado?: string;
        cargo: string;
        carrera: string;
        matricula?: string;
        role: string;
    };
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
    carreravalue?: string;
}


export interface DataCSVProps {
    datos: string[][];
    handleBDDocumentoCSV: () => void;
    mostrarModal: ModalesRegistroProps;
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

export interface useFileProps {
    onFileRead: (data: string[][]) => void;
}

export interface inputRefProps {
    value?: string;
    disabled?: boolean;
    focus: () => void;
}

export interface ModalConfirmacionProps {
    title: string;
    message?: string;
    handleClickModalClose: () => void;
    confirmarCambio: () => void;
}

export interface NuevaConfirmarContraseñasProps {
    nueva: string;
    confirmar: string;
}

export interface DatosCSVProps {
    datos: string[][];
}

export interface FormularioJefeProps {
    formData: UsuarioJefe;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCarreraChange: (value: string) => void;
    inputValidity: { [key: string]: boolean | null };
}

export interface ModalesRegistroProps {
    registrar: boolean;
    confirmar_registro: boolean;
    documento_csv: boolean;
    confirmar_documento_csv: boolean;
}