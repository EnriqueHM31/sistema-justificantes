import { useEffect, useMemo, useState } from "react";
import { type UsuarioJefe } from "@/types";
import { toast } from "sonner";
import { type UsuarioClerkProps } from "@/types";


export function useBusqueda({ setFormDataRegistro }: { setFormDataRegistro: React.Dispatch<React.SetStateAction<UsuarioJefe>> }) {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [usuariosFiltrados, setUsuariosFiltrados] = useState<UsuarioClerkProps[]>([]);
    const [FormDataEliminar, setFormDataEliminar] = useState<UsuarioJefe>({
        clave_usuario: "",
        nombre_usuario: "",
        apellidos_usuario: "",
        cargo_usuario: "",
        carrera: "",
        correo_usuario: "",
        role: ""
    });

    const resultadosPorPagina = 10;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    // ✅ useEffect para obtener y filtrar los usuarios de forma asíncrona
    useEffect(() => {
        const obtenerUsuarios = async () => {
            const query = search.toLowerCase().trim();
            if (!query) {
                setUsuariosFiltrados([]);
                return;
            }

            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/busqueda/todos`, {
                    credentials: "include",
                });

                const data = await res.json();

                if (!data.success) {
                    setUsuariosFiltrados([]);
                    return;
                }

                const usuarios = data.message as UsuarioClerkProps[];
                console.log(usuarios)

                const filtrados = usuarios.filter(usuario =>
                    usuario.publicMetadata.clave_empleado?.toLowerCase().includes(query) ||
                    usuario.firstName?.toLowerCase().includes(query) ||
                    usuario.lastName?.toLowerCase().includes(query)
                );


                setUsuariosFiltrados(filtrados);
            } catch (error) {
                console.error("Error al obtener usuarios:", error);
                setUsuariosFiltrados([]);
            }
        };

        obtenerUsuarios();
    }, [search]);

    const totalPaginas = Math.ceil(usuariosFiltrados.length / resultadosPorPagina);

    const resultadosVisibles = useMemo(() => {
        return usuariosFiltrados.slice(
            (currentPage - 1) * resultadosPorPagina,
            currentPage * resultadosPorPagina
        );
    }, [usuariosFiltrados, currentPage]);

    const handlePageChange = (numero: number) => {
        setCurrentPage(numero);
    };

    const handleSeleccionarUsuarioModificar = (usuario: UsuarioClerkProps) => {
        setFormDataRegistro({
            clave_usuario: usuario.publicMetadata.clave_empleado || "",
            nombre_usuario: usuario.firstName,
            apellidos_usuario: usuario.lastName,
            cargo_usuario: usuario.publicMetadata.cargo,
            carrera: usuario.publicMetadata.carrera,
            correo_usuario: usuario.emailAddresses[0]?.emailAddress,
        });
        setSearch("");
        setCurrentPage(1);
    };

    const handleSeleccionarUsuarioAEliminar = ({
        clave_usuario,
        nombre_usuario,
        apellidos_usuario,
        cargo_usuario,
        carrera,
        correo_usuario,
        role
    }: UsuarioJefe) => {
        console.log(role)
        setFormDataEliminar({
            clave_usuario,
            nombre_usuario,
            apellidos_usuario,
            cargo_usuario,
            carrera,
            correo_usuario,
            role
        });
    };

    const handleEliminarJefeCarrera = async ({ email }: { email: string }) => {
        if (!email) return toast.error("Debes seleccionar un usuario");
        const toastId = toast.loading("Eliminando usuario...");
        try {

            const res = await fetch(`${import.meta.env.VITE_API_URL}/eliminar/jefescarrera`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (res.ok && data.success) {
                toast.success(data.message, {
                    id: toastId,
                });
            } else {
                toast.error(data.message, {
                    id: toastId,
                });
            }
        } catch (error) {
            toast.error("Error al eliminar el usuario", {
                id: toastId,
            });
        } finally {
            setFormDataEliminar({
                clave_usuario: "",
                nombre_usuario: "",
                apellidos_usuario: "",
                cargo_usuario: "Jefe de Carrera",
                carrera: "",
                correo_usuario: "",
                role: ""
            });
            setSearch("");
        }
    };

    return {
        search,
        currentPage,
        resultadosFiltrados: usuariosFiltrados,
        totalPaginas,
        resultadosVisibles,
        handleChange,
        handlePageChange,
        handleSeleccionarUsuarioModificar,
        handleSeleccionarUsuarioAEliminar,
        FormDataEliminar,
        handleEliminarJefeCarrera,
    };
}
