import NavegacionAdministrador from "@/pages/Administrador/components/Navegacion";
import iconoUser from "@/assets/iconos/iconoUser.webp";
import iconoCamara from "@/assets/iconos/iconoCamara.webp";
import CambiarFoto from "@/components/perfil/CambiarFoto";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import CambiarContraseña from "@/components/perfil/CambiarContraseña";
import { usePerfil } from "@/hooks/perfil/perfil";
import CloseIcon from '@mui/icons-material/Close';

export default function Perfil() {
    const { user, openFoto, openContraseña, handleFoto, handleContraseña, cargando, role, handleStart } = usePerfil();

    console.log(openFoto, openContraseña);

    return (
        <div className="grid grid-rows-[auto_1fr] md:h-screen overflow-hidden">
            <NavegacionAdministrador />


            {cargando ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', flex: "1", height: "100vh" }}>
                    <CircularProgress size={100} color="info" />
                </Box>

            ) : (
                <section className="flex flex-col xl:flex-row items-center justify-center w-full max-w-laptop mx-auto p-5 gap-6 md:gap-10 py-10 ">
                    {/* Columna izquierda */}
                    <article className="flex flex-col gap-6 flex-1 w-full items-center xl:items-start md:max-w-[800px]">
                        <h2 className="text-2xl md:text-3xl text-secondary font-bold">Detalles del usuario</h2>
                        <button type="button" className="relative" onClick={handleFoto}>
                            <img
                                src={user?.imageUrl || iconoUser}
                                alt="avatar"
                                className="w-32 h-32 rounded-full"
                            />
                            <div
                                className="absolute top-8/12 right-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white border border-white"

                            >
                                <img src={iconoCamara} alt="camara" className="w-4 h-4" />
                            </div>
                        </button>

                        <h2 className="text-md md:text-3xl font-semibold text-start w-full">
                            {user?.fullName}
                        </h2>
                        <p className="text-sm md:text-xl font-semibold text-start w-full">
                            {user?.emailAddresses[0].emailAddress}
                        </p>
                        <p className="text-sm md:text-xl font-semibold text-start w-full">{role}</p>

                        <button className="bg-secondary text-white rounded-md px-4 py-2 w-full md:w-fit md:max-w-md font-bold text-md md:text-xl " onClick={handleContraseña}>
                            Cambiar contraseña
                        </button>
                    </article>

                    {/* Columna derecha */}
                    <div className="relative flex justify-center items-center not-first-of-type: flex-1 border border-dashed border-gray-500 w-full xl:min-h-11/12 max-h-full xl:h-fit h-full p-5 xl:mb-0 mb-4">
                        {
                            (openFoto || openContraseña) && (
                                <button className="absolute top-5 right-5 transform rounded-full bg-primary text-white p-1 md:p-2 w-8 h-8 flex items-center justify-center md:max-w-md font-bold text-xl z-20 " type="button" onClick={handleStart}>
                                    <CloseIcon style={{ width: "20px", height: "20px" }} />
                                </button>
                            )
                        }

                        {
                            openFoto ? (
                                <CambiarFoto />
                            ) : openContraseña ? (
                                <CambiarContraseña email={user?.emailAddresses[0].emailAddress || ""} />
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
