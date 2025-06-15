import { useEffect, useState } from "react";

import { type DatosCSVProps } from "@/types";

const regexClave = /^ITSH_\d{4}$/;
const regexTexto = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/;
const regexCorreo = /^[a-zA-Z0-9._%+-]+@huatusco\.tecnm\.mx$/;
const cargoValido = "Jefe de Carrera";
const REGISTROS_POR_PAGINA = 10;

export function useTablaRegistro({ datos }: DatosCSVProps) {
    const [tabla, setTabla] = useState<string[][]>([]);
    const [errores, setErrores] = useState<boolean[][]>([]);
    const [mostrarHasta, setMostrarHasta] = useState<number>(REGISTROS_POR_PAGINA);

    useEffect(() => {
        setTabla(datos);
        setErrores(validarDatos(datos));
        setMostrarHasta(REGISTROS_POR_PAGINA);
    }, [datos]);

    const validarCelda = (valor: string, columna: string): boolean => {
        switch (columna.toLowerCase()) {
            case "clave":
                return regexClave.test(valor.trim());
            case "nombre":
            case "apellidos":
            case "carrera":
                return regexTexto.test(valor.trim());
            case "cargo":
                return valor.trim() === cargoValido;
            case "correo":
                return regexCorreo.test(valor.trim());
            default:
                return true;
        }
    };

    const validarDatos = (datos: string[][]): boolean[][] => {
        const encabezados = datos[0];

        const erroresLocal: boolean[][] = datos.map(() =>
            new Array(encabezados.length).fill(false)
        );

        for (let i = 1; i < datos.length; i++) {
            for (let j = 0; j < encabezados.length; j++) {
                const celda = datos[i][j];
                const columna = encabezados[j];
                if (!validarCelda(celda, columna)) {
                    erroresLocal[i][j] = true;
                }
            }
        }

        const idxClave = encabezados.findIndex((h) => h.toLowerCase() === "clave");
        const idxCorreo = encabezados.findIndex((h) => h.toLowerCase() === "correo");

        if (idxClave === -1 || idxCorreo === -1) {
            console.warn("Faltan las columnas 'clave' o 'correo' en los encabezados.");
            return erroresLocal;
        }

        const clavesContador: Record<string, number[]> = {};
        const correosContador: Record<string, number[]> = {};

        for (let i = 1; i < datos.length; i++) {
            const clave = datos[i][idxClave]?.trim().toLowerCase();
            const correo = datos[i][idxCorreo]?.trim().toLowerCase();

            if (clave) {
                if (!clavesContador[clave]) clavesContador[clave] = [];
                clavesContador[clave].push(i);
            }
            if (correo) {
                if (!correosContador[correo]) correosContador[correo] = [];
                correosContador[correo].push(i);
            }
        }

        Object.values(clavesContador).forEach((indices) => {
            if (indices.length > 1) {
                indices.forEach((i) => {
                    erroresLocal[i][idxClave] = true;
                });
            }
        });

        Object.values(correosContador).forEach((indices) => {
            if (indices.length > 1) {
                indices.forEach((i) => {
                    erroresLocal[i][idxCorreo] = true;
                });
            }
        });

        return erroresLocal;
    };

    const handleEdit = (filaIndex: number, colIndex: number, newValue: string) => {
        const nuevaTabla = tabla.map((fila, i) =>
            i === filaIndex ? [...fila.slice(0, colIndex), newValue, ...fila.slice(colIndex + 1)] : [...fila]
        );
        setTabla(nuevaTabla);
        setErrores(validarDatos(nuevaTabla));
    };

    const encabezados = tabla[0] ?? [];
    const filas = tabla.length > 1 ? tabla.slice(1) : [];
    const filasMostradas = filas.slice(0, mostrarHasta);

    const mostrarMas = () => {
        setMostrarHasta((prev) => prev + REGISTROS_POR_PAGINA);
    };

    return {
        errores,
        mostrarHasta,
        encabezados,
        filas,
        filasMostradas,
        mostrarMas,
        handleEdit
    };
}
