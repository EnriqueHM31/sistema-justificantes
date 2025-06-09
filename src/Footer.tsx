import { toast } from "sonner";
import iconoCopia from "./assets/iconos/iconoCopia.webp";
import IconoCorrecto from "./assets/iconos/iconoCorrecto";
import IconoError from "./assets/iconos/iconoError";
import { useUser } from "@clerk/clerk-react";
import { useNavAdmin } from "./hooks/Navegacion/UseNavAdmin";
const DATOS_INSTITUTO = [
    { dato: "tecnm@tecnm.com.mx" },
    { dato: "273 222 2222" },
]

const handleClick = async (dato: string) => {
    try {
        await navigator.clipboard.writeText(dato);
        toast.success("Texto copiado al portapapeles", {
            icon: <IconoCorrecto />
        });
    } catch (err) {
        toast.error("No se pudo copiar", {
            icon: <IconoError />
        });
        console.error("Error al copiar:", err);
    }
};


export default function Footer() {

    const { user } = useUser();

    const { handleSignOut } = useNavAdmin();

    return (

        <footer className=" text-white ">
            <div className="bg-[#343a40] text-center py-10 px-4 w-full flex items-center justify-center">

                <div className="w-laptop flex justify-between items-center">

                    <div className="flex flex-col gap-1 items-start justify-start">
                        <p className="text-lg font-extrabold ">
                            Contactanos por:
                        </p>
                        {
                            DATOS_INSTITUTO.map((info, index) => (
                                <button key={index} className="list-none flex items-center gap-2" onClick={() => handleClick(info.dato)}>
                                    {info.dato}

                                    <img src={iconoCopia} alt="icono copia" className="w-3 h-3" />
                                </button>

                            ))
                        }
                    </div>


                    <div>
                        <p className="text-lg font-bold text-center">
                            {user?.fullName}
                        </p>
                        <p>
                            {user?.emailAddresses[0].emailAddress}
                        </p>
                        <button className="hover:underline" onClick={handleSignOut}>
                            (Cerrar Sesion)
                        </button>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-lg font-bold ">
                            &copy; {new Date().getFullYear()} TecNM Huatusco
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-naranja flex items-center justify-center">
                <div className="w-laptop flex flex-col justify-center items-center py-4 px-4">
                    <p className="text-white text-center w-full flex items-center justify-center font-bold">
                        Desarrollado por:
                    </p>
                    <p>Luis Enrique Hernandez Marin</p>
                </div>
            </div>
        </footer>
    );
}