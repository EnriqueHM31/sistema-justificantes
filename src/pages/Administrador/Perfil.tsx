import { useEffect } from "react";
import NavegacionAdministrador from "../Administrador/components/Navegacion";
import { cambiarTitulo } from "../../assets/ts/CambioTitulo";
import { useUser } from "@clerk/clerk-react";
import iconoUser from "../../assets/iconos/iconoUser.webp";


export default function Perfil() {

    const { user } = useUser();

    useEffect(() => {
        cambiarTitulo("Perfil - Administrador");
    }, []);


    return (
        <>

            <div className="grid grid-rows-[auto_1fr] h-[90vh] overflow-hidden">
                {/* NAVBAR: Altura automática */}
                <NavegacionAdministrador />

                {/* CONTENIDO PRINCIPAL: Ocupa el resto del viewport */}
                <div className="flex items-center justify-center w-full bg-amber-200">
                    <div className="flex flex-col gap-6  flex-1 max-w-[800px]">
                        {user?.imageUrl && (
                            <img
                                src={user?.imageUrl || iconoUser}
                                alt="avatar"
                                className="w-20 h-20 rounded-full mx-auto"
                            />
                        )}
                        <h1 className="text-3xl font-semibold text-center">
                            {user?.fullName}
                        </h1>
                        <p className="text-xl font-semibold text-center">
                            {user?.emailAddresses[0].emailAddress}
                        </p>
                        <div className="flex justify-center">
                            <button className="bg-primary text-white rounded-md p-2 w-full max-w-md font-bold text-xl">
                                Editar perfil
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
