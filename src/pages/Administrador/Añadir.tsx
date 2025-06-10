import Select from "./components/Select";
import Navegacion from "../Administrador/components/Navegacion";
import InputFileUpload from "./components/FileCSV";
import Previsualizacion from "./components/Previsualizacion";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningOutlinedIcon from '@mui/icons-material/WarningOutlined';
import { formulario, items } from "../../assets/ts/Administrador/Registrar";
import { type formDataRegistroAdminProps } from "../../types";
import { useRegistrar } from "../../hooks/Administrador/useRegistrar";
import ModalConfirmacion from "../../components/generales/ModalConfirmacion";




export default function Añadir() {

    const { formData, handleInputChange, handleCarreraChange, inputValidity, capitalizarNombre, handleModalCancelar, handleModalConfirmacion, mostrarModal } = useRegistrar();


    return (
        <>
            {
                mostrarModal && (
                    <ModalConfirmacion title="¿Realmente quieres registrar el usuario?" message="Esta acción no se puede deshacer" handleClickModalClose={handleModalCancelar} confirmarCambio={handleModalConfirmacion} />
                )
            }

            <Navegacion />

            <section className="flex justify-center w-full py-10 max-w-laptop mx-auto gap-10">
                <div className="flex-2 flex gap-5 flex-col">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-bold">Registro de usuarios</h2>
                        <InputFileUpload />
                    </div>

                    <form className="flex flex-col items-center justify-center gap-6 w-full mx-auto">
                        {formulario.map(({ id, label, type, pattern, required }) => (
                            <label key={id} className="relative w-full flex flex-col gap-3">
                                <span className="text-white px-4 py-2 rounded-lg min-w-2/5 w-fit text-xs bg-secondary font-bold">
                                    {label}
                                </span>

                                <div className="relative w-full">
                                    <input
                                        type={type}
                                        name={id}
                                        value={formData[id as keyof formDataRegistroAdminProps] as string}
                                        required={required}
                                        pattern={pattern}
                                        placeholder={label}
                                        onChange={handleInputChange}
                                        className={`border font-bold rounded-md p-4 w-full input_hover text-sm pr-10
                                            ${inputValidity[id] === true ? "border-green-500 outline-green-500" : ""}
                                            ${inputValidity[id] === false ? "border-red-500 outline-red-500" : ""}
                                        `}
                                    />
                                    {inputValidity[id] === true && (
                                        <CheckCircleIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />
                                    )}
                                    {inputValidity[id] === false && (
                                        <WarningOutlinedIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500" />
                                    )}
                                </div>
                            </label>
                        ))}

                        <label className="relative w-full flex flex-col gap-3">
                            <span className="text-white px-4 py-2 rounded-lg min-w-2/5 w-fit text-xs bg-secondary font-bold">Cargo del usuario</span>
                            <input
                                type="text"
                                name="cargo_usuario"
                                value="Jefe de Carrera"
                                disabled
                                className="border font-bold border-input rounded-md p-4 w-full input_hover text-sm select-none"
                            />
                        </label>

                        <label className="relative w-full flex flex-col gap-3">
                            <span className="text-white px-4 py-2 rounded-lg min-w-2/5 w-fit text-xs bg-secondary font-bold">Carrera que dirigirá</span>
                            <Select items={items} handleChange={handleCarreraChange} />
                        </label>
                    </form>
                </div>

                <div className="flex-3">
                    <h2 className="text-3xl font-bold mb-4 px-4">Previsualización</h2>
                    <Previsualizacion usuario={formData} onConfirmar={handleModalConfirmacion} capitalizarNombre={capitalizarNombre} />
                </div>
            </section>
        </>
    );
}
