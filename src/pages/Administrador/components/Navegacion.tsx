import { useNavAdmin } from "../../../hooks/Navegacion/UseNavAdmin";
import iconoUser from "../../../assets/iconos/iconoUser.webp";
import { toast } from "sonner";
import IconoLoading from "../../../assets/iconos/IconoLoading";
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from "react";



export default function Navegacion() {
    const [openMenu, setOpenMenu] = useState(false);
    const { links, openDropdown, toggleDropdown, handleSignOut, user } = useNavAdmin();


    const handleSalir = () => {
        toast(
            <IconoLoading text="Cerrando sesión..." />,
        );
        handleSignOut();
    }


    const handleMenu = () => {
        setOpenMenu(!openMenu);
    }

    return (
        <nav className="border-gray-200 bg-secondary">

            <div className="flex items-center justify-between px-4">
                <h2 className="text-xs font-bold text-center text-white md:hidden">EaD-TecNM-Huatusco</h2>

                <div className="md:max-w-11/12 flex flex-wrap items-center  justify-between  py-4 md:py-4 md:px-10 gap-3 md:w-full">


                    <div className="flex items-center md:order-2  md:space-x-0 rtl:space-x-reverse">
                        <button
                            type="button"
                            className=" text-sm select-none flex items-center justify-center md:gap-2"
                            onClick={toggleDropdown}
                        >
                            <div className="w-10 h-10 rounded-full ">
                                {
                                    user?.imageUrl && (
                                        < img className="w-full h-full rounded-full" src={user?.imageUrl || iconoUser} alt="avatar" />
                                    )
                                }
                            </div>
                            <ArrowDropDownIcon style={{ color: "white" }} />
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

                    <div className={`items-center justify-between 
                                    absolute top-15 md:top-0 left-1/2 md:left-0 -translate-x-1/2 md:translate-none
                                    shadow rounded-xl
                                    w-full max-w-10/12
                                    bg-secondary
                                    z-50 mt-5 md:mt-0
                                    transition-all duration-300 ease-in-out
                                    ${openMenu ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}
                                    md:flex md:w-auto md:order-1 md:static md:translate-x-0 md:opacity-100 md:pointer-events-auto
                        `}>

                        <ul className="flex flex-col font-medium p-4 md:p-0 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
                            <li className="py-1 text-white text-xl md:flex hidden">EaD-TecNM-Huatusco</li>
                            {links.map((link, index) => (
                                <li
                                    key={index}
                                    className={`py-2 md:border-b-2 ${link.active ? "md:border-white bg-white md:bg-transparent" : "md:border-transparent"} cursor-pointer md:text-start text-center`}
                                >
                                    <a href={link.path} className={`block px-3  ${link.active ? "text-primary font-bold md:text-white" : "text-white font-normal"}`}>
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button className="md:hidden" onClick={handleMenu}>
                        <MenuIcon style={{ color: "white" }} />
                    </button>
                </div>
            </div>
        </nav>
    );
}
