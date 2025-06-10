import { useCambiarContraseña } from "../../hooks/perfil/CambiarContraseña";
import { toast } from "sonner";
import ReglasContraseña from "./Reglas";
import IconoError from "../../assets/iconos/iconoError";
import IconoCorrecto from "../../assets/iconos/iconoCorrecto";
import ModalConfirmacion from "./ModalConfirmacion";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function CambiarContraseña() {
    const { contraseñas, cambiarContraseña, getBorderColor, handleChange, mostrarModal, handleSubmit, handleClickModalClose, handleClickPasswordNueva, handleClickPasswordConfirmar, passwordVisible } = useCambiarContraseña();

    const handleSubmitBoton = (e: React.FormEvent) => {

        const { success, message } = handleSubmit(e);
        if (!success) {
            toast(message, {
                icon: <IconoError />
            });
            return;
        }
    };

    const confirmarCambio = async () => {
        try {
            await cambiarContraseña(contraseñas.nueva, contraseñas.confirmar);
            toast("Contraseña cambiada con éxito", {
                icon: <IconoCorrecto />
            });
        } catch (err) {
            toast("Error al cambiar la contraseña", {
                icon: <IconoError />
            });
            console.error(err);
        }
    };


    return (
        <>
            <form onSubmit={handleSubmitBoton} className="flex flex-col items-center justify-center w-full h-full gap-4 relative ">
                <h2 className="font-extrabold text-3xl">Cambiar contraseña</h2>

                <label htmlFor="contraseñanueva" className="relative w-full max-w-3/4">
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
                    <span className="absolute top-4 left-5 bg-white px-3 text-input font-semibold text-xl">
                        Nueva contraseña
                    </span>

                </label>

                <label htmlFor="confirmar" className="relative w-full max-w-3/4">
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
                    <span className="absolute top-4 left-5 bg-white px-3 text-input font-semibold text-xl">
                        Confirmar contraseña
                    </span>

                </label>

                <ReglasContraseña contraseñas={contraseñas} />

                <button type="submit" className="bg-primary text-white rounded-md py-2 px-7 max-w-3/4 w-full font-bold text-xl">
                    Cambio
                </button>
            </form>

            {mostrarModal && (
                <ModalConfirmacion handleClickModalClose={handleClickModalClose} confirmarCambio={confirmarCambio} />
            )
            }
        </>
    );
}
