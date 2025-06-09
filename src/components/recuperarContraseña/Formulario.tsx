import { useCambioContraseña } from "../../hooks/CambiarContraseña/CambiarContraseña";
import { toast } from "sonner";
import IconoCorrecto from "../../assets/iconos/iconoCorrecto";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

export default function Formulario() {

    const { envio, handleSubmit, handleInput, handleKeyDown, setInputRefs, handleBack } = useCambioContraseña();

    const handleSubmitEnvio = (e: React.FormEvent<HTMLFormElement>) => {
        handleSubmit(e);
        toast('Código enviado correctamente, revisa tu correo institucional', {
            icon: <IconoCorrecto />
        });
    }


    return (
        !envio ? (
            <form className="flex flex-col items-center mt-15 md:max-w-2/6 w-full mx-auto   justify-center gap-6" onSubmit={handleSubmitEnvio} >
                <div className="absolute top-4 left-4">
                    <button className=" text-white rounded-md p-2 w-full font-bold text-xl" onClick={() => window.location.href = "/"}>
                        <ArrowBackOutlinedIcon style={{ color: "#48e", fontWeight: "bold" }} />
                    </button>
                </div>

                <h1 className="text-3xl font-semibold max-w-3/4 text-center">Recuperar contraseña</h1>

                <label htmlFor="id_usuario" className="relative w-full">
                    <input type="text" name="id_usuario" id="id_usuario" placeholder=" " className="border border-input rounded-md px-4 py-4 w-full input_hover text-xl" />
                    <span className=" font-semibold absolute top-4 left-5 text-input px-3 bg-white text-xl">Correo Institucional</span>
                </label>

                <button type="submit" className="bg-primary text-white rounded-md p-2 w-full font-bold text-xl">Enviar</button>
            </form >
        ) : (
            <form className="flex flex-col items-center justify-center gap-6 mt-15" onSubmit={handleSubmit} >

                <div className="absolute top-4 left-4">
                    <button className=" text-white rounded-md p-2 w-full font-bold text-xl" onClick={handleBack}>
                        <ArrowBackOutlinedIcon style={{ color: "#48e", fontWeight: "bold" }} />
                    </button>
                </div>


                <h1 className="text-3xl font-semibold md:max-w-3/4 text-wrap text-center">Codigo de verificación</h1>
                <p className="md:max-w-2/6 text-center ">Ingrese el código de verificación que te hemos enviado a tu correo institucional</p>

                <div id="otp-container" className="flex md:gap-6 gap-2 justify-center items-center md:max-w-2/5 w-full">
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
                            className="border border-input rounded-md px-4 py-4 md:w-16 w-12 text-center text-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                    ))}
                </div>

                <button type="submit" className="bg-primary text-white rounded-md p-2 w-full font-bold text-xl">Enviar</button>
            </form >
        )
    )
}