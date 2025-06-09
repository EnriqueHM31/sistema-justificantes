import { useState, useRef, useEffect } from "react";

interface inputRef {
    value?: string;
    disabled?: boolean;
    focus: () => void;
}

export function useCambioContraseña() {
    const [envio, setenvio] = useState(false);
    const inputs = useRef<inputRef[]>([]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setenvio(true);
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

    return {
        envio,
        handleSubmit,
        handleInput,
        handleKeyDown,
        setInputRefs
    }
}