import Navegacion from "../Administrador/components/Navegacion";
import InputFileUpload from "./components/FileCSV";
import Previsualizacion from "./components/Previsualizacion";
import ModalConfirmacion from "../../components/generales/ModalConfirmacion";
import TablaPrevisualizacion from "./components/TablaRegistro";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useModales } from "../../hooks/Administrador/useModales";
import { useFormularioJefe } from "../../hooks/Administrador/useFormularioJefe";
import { useArchivoCSV } from "../../hooks/Administrador/useDocumentoCSV";
import FormularioJefe from "./components/Formulario";

export default function Añadir() {

    const { formData, inputValidity, capitalizarNombre, handleInputChange, handleCarreraChange } = useFormularioJefe();
    const { datosArchivo, inputFileRef, handleClear, setDatosArchivo } = useArchivoCSV();
    const { handleModalConfirmacionRegistro, handleModalCancelarRegistro, handleModalConfirmacionDocumento, handleModalCancelarDocumento, handleBDDocumentoCSV, mostrarModalRegistrar } = useModales();


    return (
        <>
            {mostrarModalRegistrar.registrar && (
                <ModalConfirmacion
                    title="¿Realmente quieres registrar el usuario?"
                    message="Esta acción no se puede deshacer"
                    handleClickModalClose={handleModalCancelarRegistro}
                    confirmarCambio={() => handleModalConfirmacionRegistro({ formData })}
                />
            )}

            <Navegacion />

            <section className="flex justify-center w-full py-10 max-w-laptop mx-auto gap-10">
                <div className="flex-2 flex gap-5 flex-col">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-bold">Registro de usuarios</h2>
                        <InputFileUpload
                            onFileRead={setDatosArchivo}
                            inputFileRef={inputFileRef}
                        />
                    </div>

                    <FormularioJefe formData={formData} handleInputChange={handleInputChange} handleCarreraChange={handleCarreraChange} inputValidity={inputValidity} />
                </div>

                <div className="flex-3 relative overflow-x-auto flex gap-4 flex-col">
                    <h2 className="text-3xl font-bold">
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
                                className="bg-secondary hover:bg-blue-800 text-white rounded-md px-4 py-2 w-fit font-bold text-md md:text-lg"
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
