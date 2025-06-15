import { useCambioContraseña } from "../../hooks/CambiarContraseña/CambiarContraseña";
import { useNavegacion } from "../../hooks/CambiarContraseña/Navegacion";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import CambiarContraseña from "../perfil/CambiarContraseña";
import { useInputs } from "../../hooks/CambiarContraseña/Inputs";

export default function Formulario() {

    const { envio, handleSubmit, handleSubmitVerificar, codigoExpiraEn, modificar, email } = useCambioContraseña();
    const { handleInput, handleKeyDown, setInputRefs } = useInputs();

    const { handleNavigate, handleNavigateCambiarContrasena } = useNavegacion();

    return (
        !envio ? (
            <form className="flex flex-col items-center mt-15 md:max-w-2/6 w-full mx-auto justify-center gap-6" onSubmit={handleSubmit} >
                <div className="absolute top-4 left-4 md:top-8 md:left-16">
                    <button className="bg-white text-white rounded-full flex items-center justify-center p-2 w-full font-bold text-xl" onClick={handleNavigate} type="button">
                        <ArrowBackOutlinedIcon style={{ color: "#48e", fontWeight: "bold" }} />
                    </button>
                </div>

                <h1 className="xl:text-3xl text-xl font-semibold md:max-w-3/4 text-center">Recuperar contraseña</h1>

                <label htmlFor="email_institucional" className="relative w-full">
                    <input type="text" name="email_institucional" id="email_institucional" placeholder=" " className="border border-input rounded-md px-4 py-4 w-full input_hover text-xl" />
                    <span className=" font-semibold absolute top-5 xl:top-4 left-5 text-input px-3 bg-white md:text-xl">Correo Institucional</span>
                </label>

                <button type="submit" className="bg-primary text-white rounded-md p-2 w-full font-bold text-md xl:text-xl">Enviar codigo</button>
            </form >
        ) : modificar ? (
            <div className="max-w-3/6 mx-auto">
                <CambiarContraseña email={email} />
            </div>
        )
            : (
                <form className="flex flex-col items-center justify-center gap-6 mt-15 p-5 md:max-w-1/2" onSubmit={(e) => handleSubmitVerificar(e)} >

                    <div className="absolute top-4 left-4 md:top-8 md:left-16">
                        <button className="bg-white text-white rounded-full flex items-center justify-center p-2 w-full font-bold text-xl" onClick={handleNavigate} type="button">
                            <ArrowBackOutlinedIcon style={{ color: "#48e", fontWeight: "bold" }} />
                        </button >
                    </div >


                    <h1 className="text-xl xl:text-3xl font-semibold md:max-w-3/4 text-wrap text-center">Codigo de verificación</h1>
                    <p className="md:max-w-3/4 w-full max-w-10/12 text-center text-sm xl:text-xl">Ingrese el código de verificación que te hemos enviado a tu correo institucional</p>

                    <div id="otp-container" className="flex md:gap-6 gap-2 justify-center items-center ">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <input
                                key={index}
                                name={`otp${index}`}
                                id={`otp${index}`}
                                type="text"
                                maxLength={1}
                                disabled={index !== 0}
                                inputMode="numeric"
                                onChange={(e) => handleInput(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                ref={(el) => setInputRefs(el, index)}
                                className="border border-input rounded-md md:p-4 p-2 md:w-16 w-10 text-center text-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            />
                        ))}
                    </div>

                    <button type="submit" className="bg-primary text-white rounded-md p-2 w-full font-bold text-xl  md:max-w-3/4 px-10 py-2">Verificar</button>

                    {
                        codigoExpiraEn && codigoExpiraEn > 0 ? (
                            <p className="text-sm text-gray-500">
                                El código expirará en {Math.floor(codigoExpiraEn / 60)}:{String(codigoExpiraEn % 60).padStart(2, "0")} minutos.
                            </p>
                        ) : (
                            <button
                                type="button"
                                className="bg-white text-secondary rounded-md p-2 border border-secondary font-bold text-xs w-fit md:max-w-3/4 px-10 py-2"
                                onClick={handleNavigateCambiarContrasena}
                            >
                                Solicitar uno nuevo
                            </button>
                        )
                    }

                </form >
            )
    )
}