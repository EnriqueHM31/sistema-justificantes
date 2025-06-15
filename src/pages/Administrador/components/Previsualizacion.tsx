import { type PrevisualizacionRegistroUnicoProps } from "@/types";

export default function VistaPreviaUsuar({ usuario, onConfirmar, capitalizarNombre }: PrevisualizacionRegistroUnicoProps) {

    const campos = [
        { etiqueta: "Clave", valor: usuario.clave_usuario },
        { etiqueta: "Nombre", valor: capitalizarNombre(usuario.nombre_usuario) },
        { etiqueta: "Apellidos", valor: capitalizarNombre(usuario.apellidos_usuario) },
        { etiqueta: "Cargo", valor: usuario.cargo_usuario },
        { etiqueta: "Correo", valor: usuario.correo_usuario },
        { etiqueta: "Carrera", valor: usuario.carrera },
    ];

    return (
        <div className="flex flex-col gap-4 py-4 rounded-md bg-white shadow-md">
            <h3 className="text-xl font-bold text-secondary">Datos del Usuario</h3>

            {campos.map((campo, index) => (
                <p key={index} className="w-full flex gap-2">
                    <span className="text-secondary py-1 rounded min-w-30">{campo.etiqueta}:</span>
                    <strong>{campo.valor}</strong>
                </p>
            ))}

            <button
                onClick={onConfirmar}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Confirmar Registro
            </button>
        </div>
    );
}
