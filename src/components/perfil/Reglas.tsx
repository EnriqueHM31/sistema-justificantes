interface Contraseñas {
    nueva: string;
    confirmar: string;
}

export default function ReglasContraseña({ contraseñas }: { contraseñas: Contraseñas }) {
    const rules = [
        {
            id: "check-length",
            label: "Mínimo 8 caracteres",
            test: contraseñas.nueva.length >= 8,
        },
        {
            id: "check-mayuscula",
            label: "Al menos una mayúscula",
            test: /[A-Z]/.test(contraseñas.nueva),
        },
        {
            id: "check-minuscula",
            label: "Al menos una minúscula",
            test: /[a-z]/.test(contraseñas.nueva),
        },
        {
            id: "check-numero",
            label: "Al menos un número",
            test: /\d/.test(contraseñas.nueva),
        },
        {
            id: "check-simbolo",
            label: "Al menos un símbolo",
            test: /[\W_]/.test(contraseñas.nueva),
        },
    ];

    return (
        <div className="flex flex-col gap-1 w-full md:max-w-3/4 mt-2">
            {rules.map(({ id, label, test }) => (
                <label
                    key={id}
                    className={`flex items-center gap-2 ${test ? "text-green-600" : "text-red-600"} text-xs`}
                >
                    <label className="flex items-center cursor-pointer relative">
                        <input
                            type="checkbox"
                            checked={test}
                            readOnly
                            className={`peer w-4 h-4 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border ${test ? "border-green-600" : "border-red-600"
                                } checked:bg-green-600 checked:border-green-600`}
                            id={id}
                        />
                        <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3.5 w-3.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="1"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                    </label>
                    {label}
                </label>
            ))}
        </div>
    );
}
