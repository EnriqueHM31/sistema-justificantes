import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";


interface inputRef {
    value?: string;
    disabled?: boolean;
    focus: () => void;
}

export function useCambioContraseña() {
    const [envio, setEnvio] = useState(false);
    const inputs = useRef<inputRef[]>([]);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const email = (form.elements.namedItem("email_institucional") as HTMLInputElement)?.value.trim();

        if (!email) {
            return { success: false, message: "Ingrese el correo institucional" };
        }

        setEnvio(true);
        return { success: true, message: "" };
    };

    const handleNavigate = () => {
        navigate("/");
    }


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

    const handleBack = () => {
        window.location.href = "/cambiarcontraseña";
    }

    return {
        envio,
        handleSubmit,
        handleInput,
        handleKeyDown,
        setInputRefs,
        handleBack,
        handleNavigate
    }

}