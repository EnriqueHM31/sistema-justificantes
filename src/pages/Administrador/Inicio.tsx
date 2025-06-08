import { useState } from "react";
import iconoUser from "../../assets/iconos/iconoUser.webp";

interface Link {
    name: string;
    path: string;
    active: boolean;
}

export default function AdministradorInicio() {
    const LINKS_ADMINISTRADOR: Link[] = [
        { name: "Inicio", path: "/administrador/inicio", active: true },
        { name: "Registrar", path: "/administrador/registrarusuarios", active: false },
        { name: "Modificar", path: "/administrador/modificarusuarios", active: false },
        { name: "Eliminar", path: "/administrador/eliminarusuarios", active: false },
        { name: "Configuración", path: "/administrador/configuracion", active: false },
    ];

    const [links, setLinks] = useState<Link[]>(LINKS_ADMINISTRADOR);
    const [openDropdown, setOpenDropdown] = useState(false);

    const handleLinkClick = (index: number) => {
        const updatedLinks = links.map((link, i) => ({
            ...link,
            active: i === index,
        }));
        setLinks(updatedLinks);
    }

    const toggleDropdown = () => {
        setOpenDropdown(!openDropdown);
    };


    return (
        <nav className="border-gray-200 bg-secondary">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4" >
                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button type="button" className="flex text-sm  rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 select-none" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom" onClick={toggleDropdown}>
                        <img className="w-8 h-8 rounded-full" src={iconoUser} alt="user photo" />
                    </button>

                    {
                        openDropdown && (
                            <div className="relative" id="user-dropdown">
                                <ul className="absolute right-0 top-10 z-10 shadow bg-white rounded-4xl min-w-40 w-full">
                                    <li>
                                        <a href="/administrador/perfil" className="block px-4 py-2 text-sm text-black hover:bg-hover-primary hover:text-white">Perfil</a>
                                    </li>
                                    <li>
                                        <a href="/administrador/cerrar-sesion" className="block px-4 py-2 text-sm text-black  hover:bg-hover-primary hover:text-white ">Cerrar sesión</a>
                                    </li>
                                </ul>
                            </div>
                        )
                    }

                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:border-gray-700">
                        {
                            links.map((link, index) => (
                                <li key={index} className={`py-2 border-b-2  ${link.active ? 'border-white' : 'border-transparent'} cursor-pointer`} onClick={() => handleLinkClick(index)}>
                                    <a href={link.path} className="block px-3 text-white" >{link.name}</a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div >
        </nav>

    );
}
