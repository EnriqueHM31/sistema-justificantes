import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { cambiarTitulo } from "@/assets/ts/CambioTitulo";

export function usePerfil() {
    const { user } = useUser();
    const [openFoto, setOpenFoto] = useState(false);
    const [openContraseña, setOpenContraseña] = useState(false);
    const role = user?.publicMetadata?.role as string;

    useEffect(() => {
        cambiarTitulo("Perfil - Administrador");
    }, []);

    const handleStart = () => {
        if (openFoto && openContraseña) return;
        setOpenFoto(false);
        setOpenContraseña(false);
    }

    const handleFoto = () => {
        if (openContraseña) {
            setOpenContraseña(false);
        }
        setOpenFoto(!openFoto);
    };

    const handleContraseña = () => {
        if (openFoto) {
            setOpenFoto(false);
        }
        setOpenContraseña(!openContraseña);
    };

    const cargando =
        !user ||
        !user.imageUrl ||
        !user.emailAddresses.length ||
        !user.fullName ||
        !role;
    return {
        user,
        openFoto,
        openContraseña,
        handleFoto,
        handleContraseña,
        handleStart,
        cargando,
        role
    }
}