import { useBusqueda } from "@/hooks/Administrador/useBusqueda";
import { useFormularioJefe } from "@/hooks/Administrador/useFormularioJefe";
import Navegacion from "@/pages/Administrador/components/Navegacion";

export default function Eliminar() {


    const { setFormDataRegistro } = useFormularioJefe();

    const { search, currentPage, resultadosFiltrados, totalPaginas, resultadosVisibles, handleChange, handlePageChange, handleSeleccionarUsuarioAEliminar, FormDataEliminar, handleEliminarJefeCarrera } = useBusqueda({ setFormDataRegistro });

    return (
        <>
            <Navegacion />

            <section className="flex xl:flex-row flex-col justify-center w-full py-10 max-w-laptop mx-auto gap-10 xl:px-0 px-6 min-h-[80dvh]">
                <div className="flex-2 flex gap-5 flex-col xl:order-1 order-2">
                    <h2 className="text-3xl font-bold">Eliminar usuario</h2>


                    {
                        FormDataEliminar !== null && (
                            <div className="flex flex-col gap-4">
                                <p className="flex  gap-2 xl:flex-row flex-col"><strong>Clave del usuario:</strong> {FormDataEliminar.clave_usuario}</p>
                                <p className="flex  gap-2 xl:flex-row flex-col"><strong>Nombre del usuario:</strong> {FormDataEliminar.nombre_usuario}</p>
                                <p className="flex  gap-2 xl:flex-row flex-col"><strong>Apellidos del usuario:</strong> {FormDataEliminar.apellidos_usuario}</p>
                                <p className="flex  gap-2 xl:flex-row flex-col"><strong>Cargo del usuario:</strong> {FormDataEliminar.role}</p>
                                <p className="flex  gap-2 xl:flex-row flex-col"><strong>Correo del usuario:</strong> {FormDataEliminar.correo_usuario}</p>
                                <p className="flex  gap-2 xl:flex-row flex-col"><strong>Carrera que dirige el usuario:</strong> {FormDataEliminar.carrera}</p>
                                <button onClick={() => handleEliminarJefeCarrera({ email: FormDataEliminar.correo_usuario })} className="bg-secondary text-white px-4 py-2 rounded-md font-bold" >Eliminar usuario</button>
                            </div>
                        )
                    }


                </div>

                <div className="flex-3 flex flex-col gap-4 w-full relative xl:order-2 order-1">
                    <h2 className="text-3xl font-bold">Buscar usuario</h2>
                    <p className=" py-0.5">
                        Buscar usuario por su clave o nombre y seleccionarlo para modificar
                    </p>

                    <form className="w-full">
                        <label htmlFor="default-search" className="sr-only">Buscar</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-blue-700 dark:text-blue-700" aria-hidden="true" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input
                                type="search"
                                id="default-search"
                                className="block w-full p-4 ps-10 text-sm border rounded-lg bg-white border-gray-600 placeholder-gray-400 text-secondary font-bold focus:ring-blue-500 focus:border-blue-500"
                                placeholder="ITSH_0000, Luis Enrique ..."
                                value={search}
                                onChange={handleChange}
                            />
                        </div>
                    </form>
                    {search.trim() !== "" ? (
                        resultadosFiltrados.length > 0 ? (
                            <div className="z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
                                <ul>
                                    {resultadosVisibles.map((usuario, index) => {
                                        const { firstName, lastName, emailAddresses, publicMetadata } = usuario;

                                        return (
                                            <li
                                                key={index}
                                                className="px-4 py-2 cursor-pointer hover:bg-blue-700 hover:text-white text-sm"
                                                onClick={() =>
                                                    handleSeleccionarUsuarioAEliminar({
                                                        clave_usuario: publicMetadata.clave_empleado || "",
                                                        nombre_usuario: firstName,
                                                        apellidos_usuario: lastName,
                                                        cargo_usuario: publicMetadata.cargo,
                                                        carrera: publicMetadata.carrera,
                                                        correo_usuario: emailAddresses[0]?.emailAddress,
                                                        role: publicMetadata.role
                                                    })
                                                }
                                            >
                                                <strong>{publicMetadata.clave_empleado}</strong> - {firstName} {lastName}
                                            </li>
                                        );
                                    })}
                                </ul>

                                {totalPaginas > 0 && resultadosFiltrados.length > 9 && (
                                    <div className="flex justify-center items-center gap-2 p-2 border-t border-gray-200 text-sm bg-gray-50 flex-wrap">
                                        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(numero => (
                                            <button
                                                key={numero}
                                                className={`px-2 py-1 rounded ${numero === currentPage
                                                    ? "bg-blue-700 text-white"
                                                    : "bg-white hover:bg-gray-200 border"
                                                    }`}
                                                onClick={() => handlePageChange(numero)}
                                            >
                                                {numero}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p className="text-center text-blue-500 font-extrabold text-sm">No hay resultados para esta búsqueda</p>
                        )
                    ) : null
                    }
                </div>
            </section>
        </>
    );
}
