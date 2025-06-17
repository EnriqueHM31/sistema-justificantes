import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavAdministrador } from "@/store/NavAdministrador";
import { useAuth, useUser } from "@clerk/clerk-react";
import { toast } from "sonner";

export function useNavAdmin() {
    const { links, setActiveByPath } = useNavAdministrador();
    const [openDropdown, setOpenDropdown] = useState(false);
    const location = useLocation();
    const { signOut } = useAuth();
    const { user } = useUser()


    const handleSignOut = async () => {
        try {
            toast.loading("Cerrando sesión...");
            setTimeout(async () => {
                await signOut();
                window.location.href = "/";
            }, 3000);
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        setActiveByPath(location.pathname);
    }, [location.pathname, setActiveByPath]);

    const toggleDropdown = () => setOpenDropdown(!openDropdown);


    return {
        links,
        openDropdown,
        toggleDropdown,
        handleSignOut,
        user
    }
}