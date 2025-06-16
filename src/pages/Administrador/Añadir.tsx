import Navegacion from "@/pages/Administrador/components/Navegacion";
import InputFileUpload from "@/pages/Administrador/components/FileCSV";
import Previsualizacion from "@/pages/Administrador/components/Previsualizacion";
import ModalConfirmacion from "@/components/generales/ModalConfirmacion";
import TablaPrevisualizacion from "@/pages/Administrador/components/TablaRegistro";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useModales } from "@/hooks/Administrador/useModales";
import { useFormularioJefe } from "@/hooks/Administrador/useFormularioJefe";
import { useArchivoCSV } from "@/hooks/Administrador/useDocumentoCSV";
import FormularioJefe from "@/pages/Administrador/components/Formulario";

export default function Añadir() {

    const { formData, inputValidity, capitalizarNombre, handleInputChange, handleCarreraChange } = useFormularioJefe();

    const { datosArchivo, inputFileRef, handleClear, setDatosArchivo } = useArchivoCSV();

    const { handleModalConfirmacionRegistro, handleModalCancelarRegistro, handleModalConfirmacionDocumento, handleModalCancelarDocumento, handleBDDocumentoCSV, mostrarModalRegistrar, handleinsertarRegistro } = useModales();


    return (
        <>
            {mostrarModalRegistrar.registrar && (
                <ModalConfirmacion
                    title="¿Realmente quieres registrar el usuario?"
                    message="Esta acción no se puede deshacer"
                    handleClickModalClose={handleModalCancelarRegistro}
                    confirmarCambio={() => handleinsertarRegistro({ formData })}


                />
            )}

            <Navegacion />

            <section className="flex lg:flex-row flex-col justify-center w-full py-10 max-w-laptop mx-auto gap-10 xl:px-0 px-6">
                <div className="flex-2 flex gap-5 flex-col">
                    <div className="flex sm:flex-row flex-col md:gap-0 gap-4 items-center justify-between">
                        <h2 className="text-2xl xl:text-3xl font-bold">Registro de usuarios</h2>
                        <InputFileUpload
                            onFileRead={setDatosArchivo}
                            inputFileRef={inputFileRef}
                        />
                    </div>

                    <FormularioJefe formData={formData} handleInputChange={handleInputChange} handleCarreraChange={handleCarreraChange} inputValidity={inputValidity} />
                </div>

                <div className="flex-3 relative overflow-x-auto flex gap-4 flex-col">
                    <h2 className="text-sm md:text-3xl font-bold">
                        Previsualización{" "}
                        {datosArchivo.length > 0 ? "del documento CSV" : "del registro"}
                    </h2>

                    {datosArchivo.length > 0 ? (
                        <>
                            <button
                                className="absolute top-0 right-0 bg-secondary z-30 rounded-full p-2"
                                type="button"
                                onClick={handleClear}
                            >
                                <CloseOutlinedIcon sx={{ color: "white" }} />
                            </button>

                            <button
                                className="bg-secondary hover:bg-blue-800 text-white rounded-md px-4 py-2 w-fit font-bold text-xs md:text-lg"
                                onClick={handleModalConfirmacionDocumento}
                            >
                                Registrar a todos los usuarios
                            </button>
                            <TablaPrevisualizacion datos={datosArchivo} handleBDDocumentoCSV={handleBDDocumentoCSV} mostrarModal={mostrarModalRegistrar} handleModalCancelarDocumento={handleModalCancelarDocumento} />
                        </>
                    ) : (
                        <Previsualizacion
                            usuario={formData}
                            onConfirmar={() => handleModalConfirmacionRegistro({ formData })}
                            capitalizarNombre={capitalizarNombre}
                        />
                    )}
                </div>
            </section>
        </>
    );
}
