
export type InputRef = HTMLInputElement;

export const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    inputs: React.RefObject<InputRef[]>
) => {
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

export const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    inputs: React.RefObject<InputRef[]>
) => {
    if (e.key === 'Backspace') {
        if (!e.currentTarget.value && index > 0) {
            inputs.current[index - 1].focus();
            inputs.current[index - 1].value = '';
            e.preventDefault();
        }
    }

    const allowed = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'];
    if (!/^[0-9]$/.test(e.key) && !allowed.includes(e.key)) {
        e.preventDefault();
    }
};

export const setInputRef = (
    el: HTMLInputElement | null,
    index: number,
    inputs: React.RefObject<InputRef[]>
) => {
    if (el) {
        inputs.current[index] = el;
    }
};
