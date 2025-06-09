import NavegacionAdministrador from "../Administrador/components/Navegacion";
import iconoUser from "../../assets/iconos/iconoUser.webp";
import iconoCamara from "../../assets/iconos/iconoCamara.webp";
import CambiarFoto from "../../components/perfil/CambiarFoto";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import CambiarContraseña from "../../components/perfil/CambiarContraseña";
import { usePerfil } from "../../hooks/perfil/perfil";

export default function Perfil() {
    const { user, openFoto, openContraseña, handleFoto, handleContraseña, cargando, role } = usePerfil();

    return (
        <div className="grid grid-rows-[auto_1fr] h-[90vh] overflow-hidden">
            <NavegacionAdministrador />


            {cargando ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', flex: "1" }}>
                    <CircularProgress size={100} color="info" />
                </Box>

            ) : (
                <section className="flex items-center justify-center w-full max-w-laptop mx-auto">
                    {/* Columna izquierda */}
                    <article className="flex flex-col gap-6 flex-1 items-start max-w-[800px]">
                        <h2 className="text-3xl text-secondary font-bold">Detalles del usuario</h2>
                        <div className="relative">
                            <img
                                src={user?.imageUrl || iconoUser}
                                alt="avatar"
                                className="w-32 h-32 rounded-full"
                            />
                            <button
                                className="absolute top-8/12 right-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white border border-white"
                                onClick={handleFoto}
                            >
                                <img src={iconoCamara} alt="camara" className="w-4 h-4" />
                            </button>
                        </div>

                        <h2 className="text-3xl font-semibold text-center">{user?.fullName}</h2>
                        <p className="text-xl font-semibold text-center">
                            {user?.emailAddresses[0].emailAddress}
                        </p>
                        <p className="text-xl font-semibold text-center">{role}</p>

                        <button className="bg-secondary text-white rounded-md px-4 py-2 w-fit max-w-md font-bold text-xl" onClick={handleContraseña}>
                            Cambiar contraseña
                        </button>
                    </article>

                    {/* Columna derecha */}
                    <div className="flex justify-center flex-1 border border-dashed border-gray-500 my-5 h-11/12 p-5">
                        {
                            openFoto ? (
                                <CambiarFoto />
                            ) : openContraseña ? (
                                <CambiarContraseña />
                            ) : (
                                <button className="text-gray-400 rounded-md p-2 w-full max-w-md font-bold text-xl">
                                    Edición del perfil
                                </button>
                            )
                        }

                    </div>
                </section>
            )}
        </div>
    );
}
