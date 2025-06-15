import { useNavigate } from "react-router-dom";

export function useNavegacion() {
    const navigate = useNavigate();


    const handleNavigate = () => {
        navigate("/");
    }

    const handleNavigateCambiarContrasena = () => {
        window.location.reload();
    };

    return { handleNavigate, handleNavigateCambiarContrasena };
}