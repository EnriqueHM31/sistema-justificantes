import { useCambiarContraseña } from "../../hooks/perfil/CambiarContraseña";
import ReglasContraseña from "./Reglas";
import ModalConfirmacion from "../generales/ModalConfirmacion";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function CambiarContraseña({ email }: { email: string }) {
    const { contraseñas, cambiarContraseña, getBorderColor, handleChange, mostrarModal, handleSubmit, handleClickModalClose, handleClickPasswordNueva, handleClickPasswordConfirmar, passwordVisible } = useCambiarContraseña();


    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full h-full gap-4 relative mt-10 md:mt-0 min-h-[50dvh] ">
                <h2 className="font-extrabold text-lg xl:text-3xl">Cambiar contraseña</h2>

                <label htmlFor="contraseñanueva" className="relative w-full md:md:max-w-3/4">
                    <input
                        type={passwordVisible.nueva ? "text" : "password"}
                        id="contraseñanueva"
                        name="nueva"
                        onChange={handleChange}
                        value={contraseñas.nueva}
                        className={`border ${getBorderColor("nueva")} rounded-md px-6 py-4 w-full input_hover text-xl`}
                        placeholder=" "
                    />
                    <div className="bg-primary flex items-center p-3 justify-center absolute top-4 right-5 rounded-full w-8 h-8 ">
                        <button type="button" onClick={handleClickPasswordNueva} >
                            {
                                passwordVisible.nueva ? (
                                    <VisibilityOffIcon amplitude={1} className="w-4 h-4" style={{ color: "#fff" }} />
                                ) : (
                                    <VisibilityIcon amplitude={1} className="w-4 h-4" style={{ color: "#fff" }} />
                                )
                            }
                        </button>
                    </div>
                    <span className="absolute xl:top-4 top-6 left-5 bg-white px-3 text-input font-semibold text-xs md:text-xl">
                        Nueva contraseña
                    </span>

                </label>

                <label htmlFor="confirmar" className="relative w-full md:max-w-3/4">
                    <input
                        type={passwordVisible.confirmar ? "text" : "password"}
                        id="confirmar"
                        name="confirmar"
                        onChange={handleChange}
                        value={contraseñas.confirmar}
                        className={`border ${getBorderColor("confirmar")} rounded-md px-6 py-4 w-full input_hover text-xl`}
                        placeholder=" "
                    />
                    <div className="bg-primary flex items-center p-3 justify-center absolute top-4 right-5 rounded-full w-8 h-8 ">
                        <button type="button" onClick={handleClickPasswordConfirmar} >
                            {
                                passwordVisible.confirmar ? (
                                    <VisibilityOffIcon amplitude={1} className="w-4 h-4" style={{ color: "#fff" }} />
                                ) : (
                                    <VisibilityIcon amplitude={1} className="w-4 h-4" style={{ color: "#fff" }} />
                                )
                            }
                        </button>
                    </div>
                    <span className="absolute top-6 xl:top-4 left-5 bg-white px-3 text-input font-semibold text-xs md:text-xl">
                        Confirmar contraseña
                    </span>

                </label>

                <ReglasContraseña contraseñas={contraseñas} />

                <button type="submit" className="bg-primary text-white rounded-md py-2 px-7 md:max-w-3/4 w-full font-bold text-xl">
                    Cambio
                </button>
            </form>

            {mostrarModal && (
                <ModalConfirmacion title="¿Realmente quieres cambiar la contraseña?" message="" handleClickModalClose={handleClickModalClose} confirmarCambio={() => cambiarContraseña(email, contraseñas.nueva)} />
            )
            }
        </>
    );
}
