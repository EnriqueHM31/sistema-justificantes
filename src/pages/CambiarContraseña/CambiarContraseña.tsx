import Formulario from "@/components/recuperarContraseña/Formulario"
import FondoCambiarContraseña from '@/assets/fondos/fondo_cambiar_contraseña.png';

export default function CambiarContraseña() {
    return (
        <>
            <div className="flex flex-col min-h-dvh p-4 items-center md:justify-start">
                <Formulario />
            </div>

            <img src={FondoCambiarContraseña} alt="fondo cambiar contraseña" className="w-full h-full absolute inset-0 -z-50" />
        </>
    );
}