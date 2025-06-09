import { create } from "zustand";

interface Link {
    name: string;
    path: string;
    active: boolean;
}

interface NavAdministradorState {
    links: Link[];
    setActiveByPath: (path: string) => void;
}

const LINKS_ADMINISTRADOR: Link[] = [
    { name: "Registrar", path: "/administrador/registrarusuarios", active: true },
    { name: "Modificar", path: "/administrador/modificarusuarios", active: false },
    { name: "Eliminar", path: "/administrador/eliminarusuarios", active: false },
    { name: "Configuración", path: "/administrador/configuracion", active: false },
];

export const useNavAdministrador = create<NavAdministradorState>((set) => ({
    links: LINKS_ADMINISTRADOR,
    setActiveByPath: (path) =>
        set((state) => ({
            links: state.links.map((link) => ({
                ...link,
                active: link.path === path,
            })),
        })),
}));
