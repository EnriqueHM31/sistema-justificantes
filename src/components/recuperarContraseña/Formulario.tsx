import { useCambioContraseña } from "../../hooks/CambiarContraseña/CambiarContraseña";
import { toast } from "sonner";
import IconoCorrecto from "../../assets/iconos/iconoCorrecto";

export default function Formulario() {

    const { envio, handleSubmit, handleInput, handleKeyDown, setInputRefs } = useCambioContraseña();

    const handleSubmitEnvio = (e: React.FormEvent<HTMLFormElement>) => {
        handleSubmit(e);
        toast('Código enviado correctamente, revisa tu correo institucional', {
            icon: <IconoCorrecto />
        });
    }


    return (
        !envio ? (
            <form className="flex flex-col items-center justify-center gap-6 " onSubmit={handleSubmitEnvio} >
                <h1 className="text-3xl font-semibold max-w-3/4 text-center">Recuperar contraseña</h1>

                <label htmlFor="id_usuario" className="relative">
                    <input type="text" name="id_usuario" id="id_usuario" placeholder=" " className="border border-input rounded-md px-4 py-4 w-100 input_hover text-xl" />
                    <span className=" font-semibold absolute top-3/12 right-9/12 text-input px-3 bg-white text-xl">Usuario</span>
                </label>

                <button type="submit" className="bg-primary text-white rounded-md p-2 w-100 font-bold text-xl">Enviar</button>
            </form >
        ) : (
            <form className="flex flex-col items-center justify-center gap-6" onSubmit={handleSubmit} >
                <h1 className="text-3xl font-semibold max-w-3/4 text-center">Codigo de verificación</h1>
                <p className="max-w-2/6 text-center ">Ingrese el código de verificación que te hemos enviado a tu correo institucional</p>

                <div id="otp-container" className="flex gap-6 justify-center items-center max-w-2/5">
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
                            className="border border-input rounded-md px-4 py-4 w-16 text-center text-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                    ))}
                </div>

                <button type="submit" className="bg-primary text-white rounded-md p-2 w-100 font-bold text-xl">Enviar</button>
            </form >
        )
    )
}