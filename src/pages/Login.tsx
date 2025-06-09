import Formulario from "../components/login/Formulario";
import FondoLogin from '../assets/fondos/fondo_login.webp';

export default function Login() {
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center m-0 p-0">
                <div className="w-full  flex items-center justify-center ">
                    <Formulario />
                </div>
            </div>
            <img src={FondoLogin} alt="fondo login" className="w-full h-full absolute inset-0 -z-50" />
        </>
    )
}