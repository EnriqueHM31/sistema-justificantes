import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface inputRef {
    value?: string;
    disabled?: boolean;
    focus: () => void;
}

export function useCambioContraseña() {
    const navigate = useNavigate();
    const [envio, setEnvio] = useState(false);
    const inputs = useRef<inputRef[]>([]);
    const [codigo, setCodigo] = useState("");
    const [codigoExpiraEn, setCodigoExpiraEn] = useState<number | null>(null);
    const [modificar, setModificar] = useState(false);
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (!codigoExpiraEn) return;

        const timer = setInterval(() => {
            setCodigoExpiraEn((prev) => {
                if (prev && prev > 0) return prev - 1;
                clearInterval(timer);
                return 0;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [codigoExpiraEn]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const email = (form.elements.namedItem("email_institucional") as HTMLInputElement)?.value.trim();

        if (!email) {
            toast.error("Ingresa tu correo institucional");
            return;
        }

        const toastId = toast.loading("Verificando tu correo...");

        try {
            const res = await fetch("http://localhost:3000/cambiarcontrasena", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                toast.success("Código enviado correctamente", { id: toastId });
                setEmail(email);
                setEnvio(true);
                setCodigo(data.message);
                setCodigoExpiraEn(30)
            } else {
                toast.error(data.message, { id: toastId });
            }
        } catch (error) {
            toast.error("Error en la conexión", { id: toastId });
        }
    };

    const handleSubmitVerificar = (
        e: React.FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault();

        if (codigoExpiraEn === 0) {
            toast.error("El código ha expirado. Solicita uno nuevo.");
            return;
        }

        const form = e.target as HTMLFormElement;
        const inputs = Array.from({ length: 6 }).map((_, index) =>
            (form.elements.namedItem(`otp${index}`) as HTMLInputElement)?.value.trim()
        );

        const codigoIngresado = inputs.join("");

        if (codigoIngresado.length < 6 || inputs.some((val) => val === "")) {
            toast.error("Debes ingresar los 6 dígitos del código.");
            return;
        }

        if (codigoIngresado !== codigo) {
            toast.error("El código ingresado no es correcto.");
            return;
        }

        toast.success("Código verificado correctamente.");
        setModificar(true);
    };

    const handleNavigate = () => {
        navigate("/");
    }

    const handleNavigateCambiarContrasena = () => {
        window.location.reload();
    };



    const handleInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        e.target.value = value;

        if (value && index < inputs.current.length - 1) {
            inputs.current[index + 1].disabled = false;
            inputs.current[index + 1].focus();
        }

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



    return {
        envio,
        handleSubmit,
        handleInput,
        handleKeyDown,
        setInputRefs,
        handleNavigate,
        handleSubmitVerificar,
        handleNavigateCambiarContrasena,
        codigoExpiraEn,
        modificar,
        email
    }

}