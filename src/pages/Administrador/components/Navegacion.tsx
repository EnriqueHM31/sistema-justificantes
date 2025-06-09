import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavAdministrador } from "../../../store/NavAdministrador";
import iconoUser from "../../../assets/iconos/iconoUser.webp";
import { toast } from "sonner";
import { useAuth } from "@clerk/clerk-react";
import IconoLoading from "../../../assets/iconos/IconoLoading";



export default function Navegacion() {

    const { links, setActiveByPath } = useNavAdministrador();
    const [openDropdown, setOpenDropdown] = useState(false);
    const location = useLocation();
    const { signOut } = useAuth();


    const handleSignOut = async () => {
        try {

            toast(
                <IconoLoading text="Cerrando sesión..." />,
            );

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

    return (
        <nav className="border-gray-200 bg-secondary">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button
                        type="button"
                        className="flex text-sm rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 select-none"
                        onClick={toggleDropdown}
                    >
                        <img className="w-8 h-8 rounded-full" src={iconoUser} alt="user photo" />
                    </button>

                    {openDropdown && (
                        <div className="relative" id="user-dropdown">
                            <ul className="absolute right-0 top-10 z-10 shadow bg-white rounded-4xl min-w-50 w-full">
                                <li>
                                    <a href="/administrador/perfil" className="block px-4 py-2 text-sm text-black hover:bg-hover-primary hover:text-white">Perfil</a>
                                </li>
                                <li>
                                    <button className="block px-4 py-2 text-sm text-black hover:bg-hover-primary hover:text-white w-full text-start" type="button" onClick={handleSignOut}>
                                        Cerrar sesión
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                        {links.map((link, index) => (
                            <li
                                key={index}
                                className={`py-2 border-b-2 ${link.active ? "border-white" : "border-transparent"} cursor-pointer`}
                            >
                                <a href={link.path} className="block px-3 text-white">
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
