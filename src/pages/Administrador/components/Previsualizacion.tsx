interface Usuario {
    clave_usuario: string;
    nombre_usuario: string;
    apellidos_usuario: string;
    cargo_usuario: string;
    correo_usuario: string;
    carrera: string;
}

interface PrevisualizacionProps {
    usuario: Usuario;
    onConfirmar: () => void;
    capitalizarNombre: (nombre: string) => string;
}

export default function VistaPreviaUsuar({ usuario, onConfirmar, capitalizarNombre }: PrevisualizacionProps) {


    return (
        <div className="flex flex-col gap-4 border border-gray-300 p-4 rounded-md bg-white shadow-md">
            <h3 className="text-xl font-bold text-secondary">Datos del Usuario</h3>
            <p className="w-full flex gap-2">
                <span className="text-secondary py-1 rounded min-w-30">Clave:</span>
                <strong>{usuario.clave_usuario}</strong>
            </p>

            <p className="w-full flex gap-2">
                <span className="text-secondary py-1 rounded min-w-30">Nombre:</span>
                <strong>{capitalizarNombre(usuario.nombre_usuario)}</strong>
            </p>

            <p className="w-full flex gap-2">
                <span className="text-secondary py-1 rounded min-w-30">Apellidos:</span>
                <strong>{capitalizarNombre(usuario.apellidos_usuario)}</strong>
            </p>

            <p className="w-full flex gap-2">
                <span className="text-secondary py-1 rounded min-w-30">Cargo:</span>
                <strong>{usuario.cargo_usuario}</strong>
            </p>

            <p className="w-full flex gap-2">
                <span className="text-secondary py-1 rounded min-w-30">Correo:</span>
                <strong>{usuario.correo_usuario}</strong>
            </p>

            <p className="w-full flex gap-2">
                <span className="text-secondary py-1 rounded min-w-30">Carrera:</span>
                <strong>{usuario.carrera}</strong>
            </p>

            <button
                onClick={onConfirmar}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Confirmar Registro
            </button>
        </div>
    );
};