// hooks/useLogin.ts
import { useSignIn, useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function useLogin() {
    const navigate = useNavigate();
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
            const role = user.publicMetadata.role

            if (role === "Administrador") {
                window.location.href = "/administrador/registrarusuarios";
            } else if (role === "Jefe de Carrera") {
                navigate("/jefecarrera/registrarusuarios");
            } else if (role === "estudiante") {
                navigate("/estudiante/inicio");
            } else {
                navigate("/")
            }
        }

    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const toastId = toast.loading("Iniciando sesión...");


        if (!form.idUsuario || !form.contrasena) {
            toast.error("Por favor, completa todos los campos.", {
                id: toastId,
            });
            return;
        }

        if (!signIn) {
            toast.error("El sistema de autenticación no está disponible.", {
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
                    console.log(user);
                    const role = user?.publicMetadata?.role as string;

                    if (role === "Administrador") {
                        navigate("/administrador/registrarusuarios");
                    } else if (role === "Jefe de Carrera") {
                        navigate("/jefecarrera/registrarusuarios");
                    } else if (role === "estudiante") {
                        navigate("/estudiante/inicio");
                    } else {
                        toast.error("Error al iniciar sesión. Verifica tus credenciales.");
                    }
                }, 2000);

            }
        } catch (err) {
            toast.error("Error al iniciar sesión. Verifica tus credenciales.", {
                id: toastId,
            });
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
