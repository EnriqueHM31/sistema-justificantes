import { useLogin } from "../../hooks/login/UseLogin";


export default function Formulario() {
    const { form, handleChange, handleSubmit } = useLogin();

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 md:max-w-2/6 max-w-10/12">
            <h1 className="xl:text-3xl text-2xl font-semibold text-center md:max-w-3/4">
                Entrar al sistema de justificantes TecNM Huatusco
            </h1>

            <label htmlFor="idUsuario" className="relative w-full max-w-md">
                <input
                    type="text"
                    id="idUsuario"
                    name="idUsuario"
                    autoComplete="username"
                    value={form.idUsuario}
                    onChange={handleChange}
                    placeholder=" "
                    className="border border-input rounded-md px-6 py-4 w-full input_hover text-xl"
                />
                <span className="absolute top-4 left-5 bg-white px-3 text-input font-semibold text-xl">
                    Usuario
                </span>
            </label>

            <label htmlFor="contrasena" className="relative w-full max-w-md">
                <input
                    type="password"
                    id="contrasena"
                    name="contrasena"
                    autoComplete="current-password"
                    value={form.contrasena}
                    onChange={handleChange}
                    placeholder=" "
                    className="border border-input rounded-md px-6 py-4 w-full input_hover text-xl"
                />
                <span className="absolute top-4 left-5 bg-white px-3 text-input font-semibold text-xl">
                    Contraseña
                </span>
            </label>
            <button type="submit" className="bg-primary text-white rounded-md p-2 w-full max-w-md font-bold text-xl">
                Entrar
            </button>

            <a href="/cambiarcontraseña" className="text-primary/75 text-center hover:underline">
                ¿Olvidaste tu contraseña?
            </a>
        </form>
    );
}
