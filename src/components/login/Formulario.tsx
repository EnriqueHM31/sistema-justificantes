


export default function Formulario() {

    return (

        <form className="flex flex-column items-center justify-center flex-col gap-6 ">
            <h1 className="text-3xl font-semibold max-w-3/4 text-center">Entrar al sistema de justificantes TecNM Huatusco</h1>

            <label htmlFor="id_usuario" className="relative">
                <input type="text" name="id_usuario" id="id_usuario" placeholder=" " className="border border-input rounded-md px-4 py-4 w-100 input_hover text-xl" />
                <span className=" font-semibold absolute top-3/12 right-9/12 text-input px-3 bg-white text-xl">Usuario</span>
            </label>

            <label htmlFor="contraseña" className="relative">
                <input type="password" name="contraseña" id="contraseña" placeholder=" " className="border border-input rounded-md px-4 py-4 w-100 input_hover text-xl" />
                <span className="font-semibold absolute top-3/12 right-8/12 text-input px-3 bg-white text-xl">Contraseña</span>
            </label>

            <button type="submit" className="bg-primary text-white rounded-md p-2 w-100 font-bold text-xl">Entrar</button>

            <a href="/cambiarcontraseña" className="text-primary/75 text-center hover:underline transition-all duration-100 ease-in-out">¿Olvidaste tu contraseña?</a>


        </form>
    )
}