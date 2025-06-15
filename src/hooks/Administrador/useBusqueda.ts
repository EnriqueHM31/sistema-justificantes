import { useMemo, useState } from "react";
import { type UsuarioJefeFile } from "@/types";
import UsuariosMock from "@/pages/MOOKS/usuario.json";

export function useBusqueda(setFormData: (value: UsuarioJefeFile) => void) {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const resultadosPorPagina = 10;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setCurrentPage(1); // Reiniciar a la primera página al buscar
    };

    const resultadosFiltrados = useMemo(() => {
        const query = search.toLowerCase().trim();
        if (!query) return [];
        return UsuariosMock.filter(usuario =>
            usuario.clave.toLowerCase().includes(query) ||
            usuario.nombre.toLowerCase().includes(query) ||
            usuario.apellidos.toLowerCase().includes(query)
        );
    }, [search]);

    const totalPaginas = Math.ceil(resultadosFiltrados.length / resultadosPorPagina);

    const resultadosVisibles = resultadosFiltrados.slice(
        (currentPage - 1) * resultadosPorPagina,
        currentPage * resultadosPorPagina
    );
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

    return {
        search,
        currentPage,
        resultadosFiltrados,
        totalPaginas,
        resultadosVisibles,
        handleChange,
        handlePageChange,
        handleSeleccionarUsuario,
    }
}