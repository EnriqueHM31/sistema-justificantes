import IconoCorrecto from "@/components/iconos/iconoCorrecto";
import IconoError from "@/components/iconos/iconoError";
import { useFoto } from "@/hooks/perfil/Foto";
import { useUser } from "@clerk/clerk-react";
import { toast } from "sonner";

export default function CambiarFoto() {
    const { preview, file, handleImageChange, handleSubmit } = useFoto();
    const { user } = useUser();

    const handleClick = () => {
        handleSubmit(
            file,
            user,
            () =>
                toast("Foto actualizada con éxito", {
                    icon: <IconoCorrecto />,
                }),
            (msg = "Error") =>
                toast(`${msg} al actualizar la foto`, {
                    icon: <IconoError />,
                }),
        );
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4 relative my-10">
            <h2 className="font-extrabold text-lg md:text-3xl">Cambiar foto</h2>

            <div className="flex items-center justify-center w-full h-full">
                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full 
                    md:h-11/12 md:min-h-[50dvh] h-full border-2 border-dashed rounded-lg cursor-pointer"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 h-full">
                        {preview ? (
                            <>
                                <img
                                    src={preview}
                                    alt="Vista previa"
                                    className="w-52 h-52 object-cover rounded-full"
                                />
                            </>
                        ) : (
                            <>
                                <svg
                                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                </svg>
                                <p className="mb-2 text-xs xl:text-sm text-gray-700 font-semibold">
                                    <span className="">Haz clic para subir</span> o arrastra
                                </p>
                                <p className="text-xs xl:text-sm md:max-w-full max-w-3/4 text-gray-500 text-center">PNG, JPG o JPGE (MAX. 800x400px)</p>
                            </>
                        )}
                    </div>

                    <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </label>
            </div>

            <button
                onClick={handleClick}
                disabled={!file}
                className="bg-secondary text-white rounded-md px-4 py-2 w-fit max-w-md font-bold text-md xl:text-xl text-start disabled:opacity-50"
            >
                Subir foto
            </button>
        </div>
    );
}
