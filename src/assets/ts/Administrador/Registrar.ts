export const items = [
    { name: "Sistemas Computacionales" },
    { name: "Ingeniería Informática" },
    { name: "Ingeniería de Software" },
    { name: "Sistemas de Información" },
    { name: "Electrónica" },
    { name: "Electrónica y Telecomunicaciones" },
    { name: "Telecomunicaciones" },
    { name: "Informática" },
    { name: "Ciencias de la Computación" },
    { name: "Matemáticas" },
    { name: "Física" },
    { name: "Química" },
];

export const formulario = [
    {
        id: "clave_empleado",
        label: "Clave de usuario",
        type: "text",
        pattern: "^ITSH_\\d{4}$",
        required: true
    },
    {
        id: "firstName",
        label: "Nombre de usuario",
        type: "text",
        pattern: "^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{2,50}$",
        required: true
    },
    {
        id: "lastName",
        label: "Apellidos de usuario",
        type: "text",
        pattern: "^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{2,50}$",
        required: true
    },
    {
        id: "emailAddresses",
        label: "Correo del usuario",
        type: "email",
        pattern: "^[a-zA-Z]+@huatusco\\.tecnm\\.mx$",
        required: true
    },
];


export const generarCorreoJefeCarrera = (firstName: string, lastName: string): string => {
    if (!firstName || !lastName) return "";

    const nombreTrim = firstName.trim().toLowerCase();
    const apellidosTrim = lastName.trim().toLowerCase().split(" ");

    const inicialNombre = nombreTrim.charAt(0);
    const apellidoPaterno = apellidosTrim[0] || "";
    const inicialSegundoApellido = apellidosTrim[1]?.charAt(0) || "";

    return `${inicialNombre}${apellidoPaterno}${inicialSegundoApellido}@huatusco.tecnm.mx`;
};

export function capitalizarNombre(nombre: string): string {
    return nombre
        .toLowerCase()
        .split(' ')
        .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
        .join(' ');
}