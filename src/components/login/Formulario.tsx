import { useSignIn } from "@clerk/clerk-react";
import { useState } from "react";
import { toast } from "sonner";
import IconoError from "../../assets/iconos/iconoError";

export default function Formulario() {
    const { signIn, setActive } = useSignIn();

    const [form, setForm] = useState({
        idUsuario: "",
        contrasena: "",
    });

    if (signIn) {
        localStorage.clear();
    }



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.idUsuario || !form.contrasena) {
            toast.error("Por favor, completa todos los campos.", {
                icon: <IconoError />,
            });
            return;
        }

        if (!signIn) {
            toast.error("El sistema de autenticación no está disponible.", {
                icon: <IconoError />,
            });
            return;
        }

        try {
            const result = await signIn.create({
                identifier: form.idUsuario,
                password: form.contrasena,
            });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                window.location.href = "/administrador/inicio";
            }

        } catch (err) {
            toast.error("Error al iniciar sesión. Verifica tus credenciales.", {
                icon: <IconoError />,
            });
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
            <h1 className="text-3xl font-semibold text-center max-w-3/4">
                Entrar al sistema de justificantes TecNM Huatusco
            </h1>

            <label htmlFor="idUsuario" className="relative w-full max-w-md">
                <input
                    type="text"
                    id="idUsuario"
                    name="idUsuario"
                    value={form.idUsuario}
                    onChange={handleChange}
                    placeholder=" "
                    className="border border-input rounded-md px-3 py-4 w-full input_hover text-xl"
                />
                <span className="absolute top-4 left-5 bg-white px-3 text-input font-semibold text-xl">
                    Usuario
                </span>
            </label>

            <label htmlFor="contrasena" className="relative w-full max-w-md">
                <input
                    type="password"
                    id="contrasena"
                    name="contrasena"
                    value={form.contrasena}
                    onChange={handleChange}
                    placeholder=" "
                    className="border border-input rounded-md px-3 py-4 w-full input_hover text-xl"
                />
                <span className="absolute top-4 left-5 bg-white px-3 text-input font-semibold text-xl">
                    Contraseña
                </span>
            </label>
            <button type="submit" className="bg-primary text-white rounded-md p-2 w-full max-w-md font-bold text-xl">
                Entrar
            </button>

            <a href="/cambiarcontraseña" className="text-primary/75 text-center hover:underline">
                ¿Olvidaste tu contraseña?
            </a>
        </form>
    );
}
