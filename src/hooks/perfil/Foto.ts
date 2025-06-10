import { useState } from "react";
import { useUser } from "@clerk/clerk-react";



export function useFoto() {
    const [preview, setPreview] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const user = useUser();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            const imageURL = URL.createObjectURL(selectedFile);
            setPreview(imageURL);
            setFile(selectedFile);
        }
    };


    type tipo = typeof user.user;

    const handleSubmit = async (
        file: File | null,
        user: tipo,
        onSuccessToast: () => void,
        onErrorToast: (msg?: string) => void
    ) => {
        if (!file || !user) {
            onErrorToast("No hay imagen para subir.");
            return;
        }

        try {
            await user.setProfileImage({ file });
            onSuccessToast();
            setFile(null);
            setPreview(null);
        } catch (error) {
            console.error("Error al subir la foto:", error);
            onErrorToast("Hubo un error al actualizar la foto");
        }
    };

    return {
        preview,
        file,
        handleImageChange,
        handleSubmit,
    };
}