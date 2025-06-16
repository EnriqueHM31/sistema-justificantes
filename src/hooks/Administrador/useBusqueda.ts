import { useEffect, useMemo, useState } from "react";
import { type UsuarioJefe, type UsuarioJefeFile } from "@/types";
import UsuariosMock from "@/pages/MOOKS/usuario.json";
import { toast } from "sonner";
import { type EmailAddressResource } from "@clerk/types";

interface UsuarioClerkProps {
    firstName: string;
    lastName: string;
    emailAddresses: EmailAddressResource[];
    publicMetadata: {
        clave_empleado?: string;
        cargo: string;
        carrera: string;
        matricula?: string;
        role: string;
    };
}

export function useBusqueda(setFormData: (value: UsuarioJefeFile) => void) {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [usuariosFiltrados, setUsuariosFiltrados] = useState<UsuarioClerkProps[]>([]);
    const [eliminar, setEliminar] = useState<UsuarioJefe>({
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

    const handleSeleccionarUsuario = (usuario: (typeof UsuariosMock)[0]) => {
        setFormData({
            clave_usuario: usuario.clave,
            nombre_usuario: usuario.nombre,
            apellidos_usuario: usuario.apellidos,
            cargo_usuario: usuario.cargo,
            carrera: usuario.carrera,
            correo_usuario: usuario.correo,
            file: null,
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
        setEliminar({
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
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/eliminar/jefescarrera`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (res.ok && data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Error al eliminar el usuario");
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
        handleSeleccionarUsuario,
        handleSeleccionarUsuarioAEliminar,
        eliminar,
        handleEliminarJefeCarrera,
    };
}
