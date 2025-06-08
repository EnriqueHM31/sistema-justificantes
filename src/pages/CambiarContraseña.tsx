import Formulario from "../components/recuperarContraseña/Formulario"
import FondoCambiarContraseña from '../assets/fondos/fondo_cambiar_contraseña.webp';

export default function CambiarContraseña() {
    return (
        <>
            <div className="flex flex-col mt-8 min-h-screen">
                <Formulario />
            </div>

            <img src={FondoCambiarContraseña} alt="fondo cambiar contraseña" className="w-full h-full absolute inset-0 -z-50" />
        </>
    );
}