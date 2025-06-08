import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import IconoCorrecto from "../../assets/iconos/iconoCorrecto";

interface inputRef {
    value?: string;
    disabled?: boolean;
    focus: () => void;
}

export default function Formulario() {

    const [envio, setenvio] = useState(false);
    const inputs = useRef<inputRef[]>([]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setenvio(true);
        toast('Código enviado correctamente, revisa tu correo institucional', {
            icon: <IconoCorrecto />
        });
    }


    const handleInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        e.target.value = value;

        if (value && index < inputs.current.length - 1) {
            inputs.current[index + 1].disabled = false;
            inputs.current[index + 1].focus();
        }

        // Si se borra, deshabilita los siguientes
        for (let i = index + 1; i < inputs.current.length; i++) {
            if (!inputs.current[i - 1].value) {
                inputs.current[i].value = '';
                inputs.current[i].disabled = true;
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace') {
            if (!e.currentTarget.value && index > 0) {
                inputs.current[index - 1].focus();
                inputs.current[index - 1].value = '';
                e.preventDefault();
            }
        }

        // Prevenir letras
        const allowed = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'];
        if (!/^[0-9]$/.test(e.key) && !allowed.includes(e.key)) {
            e.preventDefault();
        }
    };

    useEffect(() => {
        if (inputs.current[0]) {
            inputs.current[0].disabled = false;
            inputs.current[0].focus();
        }
    }, []);


    const setInputRefs = (el: HTMLInputElement | null, index: number) => {
        if (el) {
            inputs.current[index] = el;
        }
    };

    return (
        !envio ? (
            <form className="flex flex-col items-center justify-center gap-6 " onSubmit={handleSubmit} >
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