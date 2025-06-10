// hooks/useLogin.ts
import { useSignIn, useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { toast } from "sonner";
import IconoError from "../../assets/iconos/iconoError";
import IconoLoading from "../../assets/iconos/IconoLoading";

export function useLogin() {
    const { signIn, setActive } = useSignIn();
    const { user } = useUser();
    const [form, setForm] = useState({
        idUsuario: "",
        contrasena: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleClickPassword = () => {
        setShowPassword(!showPassword);
    }

    if (signIn) {
        if (user) {
            console.log(user);
            const role = user.publicMetadata.role

            if (role === "Administrador") {
                window.location.href = "/administrador/registrarusuarios";
            }
        }

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
                    window.location.href = "/administrador/registrarusuarios";
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


    return {
        form,
        handleChange,
        handleSubmit,
        handleClickPassword,
        showPassword
    };
}
