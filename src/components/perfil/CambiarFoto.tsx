import IconoCorrecto from "../../assets/iconos/iconoCorrecto";
import IconoError from "../../assets/iconos/iconoError";
import { useFoto } from "../../hooks/perfil/Foto";
import { useUser } from "@clerk/clerk-react";
import { toast } from "sonner";

export default function CambiarFoto() {
    const { preview, file, handleImageChange, handleAntes, handleSubmit } = useFoto();
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
        <div className="flex flex-col items-center justify-center w-full h-full gap-4 relative">
            <h2 className="font-extrabold text-3xl">Cambiar foto</h2>

            <div className="flex items-center justify-center w-full h-full">
                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-11/12 border-2 border-dashed rounded-lg cursor-pointer"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 h-full">
                        {preview ? (
                            <>
                                <button
                                    className="absolute top-2 left-2 bg-gray-200 px-3 py-1 rounded"
                                    onClick={handleAntes}
                                >
                                    Anterior
                                </button>
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
                                <p className="mb-2 text-sm text-gray-700">
                                    <span className="font-semibold">Haz clic para subir</span> o arrastra
                                </p>
                                <p className="text-xs text-gray-500">SVG, PNG, JPG o GIF (MAX. 800x400px)</p>
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
                className="bg-secondary text-white rounded-md px-4 py-2 w-fit max-w-md font-bold text-xl text-start disabled:opacity-50"
            >
                Subir foto
            </button>
        </div>
    );
}
