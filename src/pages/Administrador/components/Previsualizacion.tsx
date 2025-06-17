import { useFormData } from "@/store/dataJefeCarrera";
import { type PrevisualizacionRegistroUnicoProps } from "@/types";

interface CampoDatos {
    etiqueta: string;
    valor: string;
}


export default function VistaPreviaUsuar({ onConfirmar, capitalizarNombre }: PrevisualizacionRegistroUnicoProps) {

    const { formData } = useFormData();

    const campos = [
        { etiqueta: "Clave", valor: formData.publicMetadata.clave_empleado },
        { etiqueta: "Nombre", valor: capitalizarNombre(formData.firstName) },
        { etiqueta: "Apellidos", valor: capitalizarNombre(formData.lastName) },
        { etiqueta: "Cargo", valor: formData.publicMetadata.cargo },
        { etiqueta: "Correo", valor: formData.emailAddresses[0]?.emailAddress },
        { etiqueta: "Carrera", valor: formData.publicMetadata.carrera },
    ] as CampoDatos[];

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
