import { useNavAdmin } from "../../../hooks/Navegacion/UseNavAdmin";
import iconoUser from "../../../assets/iconos/iconoUser.webp";
import { toast } from "sonner";
import IconoLoading from "../../../assets/iconos/IconoLoading";



export default function Navegacion() {

    const { links, openDropdown, toggleDropdown, handleSignOut, user } = useNavAdmin();


    const handleSalir = () => {
        toast(
            <IconoLoading text="Cerrando sesión..." />,
        );
        handleSignOut();
    }

    return (
        <nav className="border-gray-200 bg-secondary">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button
                        type="button"
                        className="flex text-sm rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 select-none"
                        onClick={toggleDropdown}
                    >
                        {
                            user?.imageUrl && (
                                < img className="w-8 h-8 rounded-full" src={user?.imageUrl || iconoUser} alt="avatar" />
                            )
                        }
                    </button>

                    {openDropdown && (
                        <div className="relative" id="user-dropdown">
                            <ul className="absolute right-0 top-10 z-10 shadow bg-white  min-w-50 w-full">
                                <li>
                                    <a href="/administrador/perfil" className="block px-4 py-2 text-sm text-black hover:bg-hover-primary hover:text-white">Perfil</a>
                                </li>
                                <li>
                                    <button className="block px-4 py-2 text-sm text-black hover:bg-hover-primary hover:text-white w-full text-start" type="button" onClick={handleSalir}>
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
