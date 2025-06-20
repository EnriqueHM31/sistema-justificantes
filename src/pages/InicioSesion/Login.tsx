import Formulario from "@/components/login/Formulario";
import FondoLogin from '@/assets/fondos/fondo_login.png';
import { useUser } from "@clerk/clerk-react";

export default function Login() {
    const { user } = useUser();
    console.log(user?.publicMetadata.role)
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center m-0 p-0">
                <div className="w-full  flex items-center justify-center z-50 ">
                    <Formulario />
                </div>
            </div>
            <img src={FondoLogin} alt="fondo login" className=" absolute -z-50 inset-0 w-full h-full   md:h-screen brightness-100 " />
        </>
    )
}