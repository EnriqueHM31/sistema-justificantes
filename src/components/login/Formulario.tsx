import { useSignIn } from "@clerk/clerk-react";
import { useState } from "react";
import { toast } from "sonner";
import IconoError from "../../assets/iconos/iconoError";
import IconoLoading from "../../assets/iconos/IconoLoading";
import { useAuth } from "@clerk/clerk-react";


export default function Formulario() {
    const { signIn, setActive } = useSignIn();
    const { signOut } = useAuth();
    const [form, setForm] = useState({
        idUsuario: "",
        contrasena: "",
    });


    if (signIn) {
        try {
            signOut();
        } catch (err) {
            console.error(err);
        }
        localStorage.clear();
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        const toastId = toast(<IconoLoading text="Iniciando sesión..." />);


        if (!form.idUsuario || !form.contrasena) {
            toast.error("Por favor, completa todos los campos.", {
                icon: <IconoError />,
                id: toastId,
            });
            return;
        }

        if (!signIn) {
            toast.error("El sistema de autenticación no está disponible.", {
                icon: <IconoError />,
                id: toastId,
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

                setTimeout(() => {
                    window.location.href = "/administrador/inicio";
                }, 2000);

            }

        } catch (err) {
            toast.error("Error al iniciar sesión. Verifica tus credenciales.", {
                icon: <IconoError />,
                id: toastId,
            });
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 max-w-2/6">
            <h1 className="text-3xl font-semibold text-center max-w-3/4">
                Entrar al sistema de justificantes TecNM Huatusco
            </h1>

            <label htmlFor="idUsuario" className="relative w-full max-w-md">
                <input
                    type="text"
                    id="idUsuario"
                    name="idUsuario"
                    autoComplete="username"
                    value={form.idUsuario}
                    onChange={handleChange}
                    placeholder=" "
                    className="border border-input rounded-md px-6 py-4 w-full input_hover text-xl"
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
                    autoComplete="current-password"
                    value={form.contrasena}
                    onChange={handleChange}
                    placeholder=" "
                    className="border border-input rounded-md px-6 py-4 w-full input_hover text-xl"
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
