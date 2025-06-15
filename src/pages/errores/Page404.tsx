import error404 from "@/assets/errores/404.webp";
import fondoErrores from "@/assets/fondos/fondo_errores.webp";


export default function Page404() {
    return (
        <>
            <div className="flex gap-8 items-center justify-center min-h-screen md:flex-row flex-col ">

                <img src={error404} alt="error 404" className="w-1/2 h-1/2 max-w-3/4 max-h-3/4 object-cover" />

                <div className="flex flex-col gap-4 ">
                    <h1 className="text-5xl font-semibold  text-center">Página no encontrada</h1>
                    <p className=" text-xl md:text-start text-center">La página que estas buscando no existe</p>
                    <a href="/" className="bg-primary text-white px-4 py-3 rounded-2xl text-center font-bold w-fit mt-5 md:mx-0 mx-auto">Volver al inicio</a>
                </div>


            </div>

            <img src={fondoErrores} alt="fondo error" className="w-full h-full absolute inset-0 -z-50" />
        </>
    )
}