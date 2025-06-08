import Formulario from "../components/login/Formulario";
import FondoLogin from '../assets/fondos/fondo_login.webp';

export default function Login() {
    return (
        <>
            <div className="w-full h-screen flex items-center justify-center ">
                <Formulario />
            </div>
            <img src={FondoLogin} alt="fondo login" className="w-full h-full absolute inset-0 -z-50" />
        </>
    )
}