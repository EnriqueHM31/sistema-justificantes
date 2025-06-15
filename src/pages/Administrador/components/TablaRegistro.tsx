import { capitalizarNombre } from "@/assets/ts/Administrador/Registrar";
import { useCompleteRegistro } from "@/hooks/Administrador/useCompleteRegistro";
import { useTablaRegistro } from "@/hooks/Administrador/useTablaRegistro";
import { type TablaPrevisualizacionProps, type DataCSVProps } from "@/types";
import LoadingCarga from "@/components/generales/LoadingCarga";
import ModalConfirmacion from "@/components/generales/ModalConfirmacion";



export default function TablaPrevisualizacion({ datos, handleBDDocumentoCSV, mostrarModal, handleModalCancelarDocumento }: DataCSVProps) {
    const { errores, mostrarHasta, encabezados, filas, filasMostradas, mostrarMas, handleEdit } = useTablaRegistro({ datos }) as TablaPrevisualizacionProps;


    const { handleClickRegistrarCSV, handleClickComplete, loading } = useCompleteRegistro({ handleBDDocumentoCSV, errores });


    return (
        <>
            {
                mostrarModal.documento_csv && (
                    <ModalConfirmacion
                        title="¿Realmente quieres registrar a todos los usuarios?"
                        message="Esta acción no se puede deshacer"
                        handleClickModalClose={handleModalCancelarDocumento}
                        confirmarCambio={handleClickRegistrarCSV}
                    />
                )
            }
            {loading && <LoadingCarga onComplete={handleClickComplete} />}
            <div className="w-full overflow-x-auto py-7">
                <table className="w-full text-sm border border-gray-300">
                    <thead>
                        <tr>
                            {encabezados.map((encabezado, index) => (
                                <th
                                    key={index}
                                    className="border p-2 bg-blue-700 text-white border-black font-bold whitespace-nowrap"
                                >
                                    {capitalizarNombre(encabezado)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filasMostradas.map((fila, filaIndex) => (
                            <tr key={filaIndex}>
                                {fila.map((celda, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className={`border p-2 whitespace-nowrap ${errores && errores[filaIndex + 1]?.[colIndex]
                                            ? "bg-red-200 text-red-900 font-semibold"
                                            : ""
                                            }`}
                                        contentEditable
                                        suppressContentEditableWarning
                                        onBlur={(e) =>
                                            handleEdit(
                                                filaIndex + 1,
                                                colIndex,
                                                e.currentTarget.innerText
                                            )
                                        }
                                    >
                                        {celda}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filas.length > mostrarHasta && (
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={mostrarMas}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Ver más
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
