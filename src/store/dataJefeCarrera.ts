// stores/useFormData.ts
import { create } from "zustand";
import type { EmailAddressResource } from "@clerk/types";

interface PublicMetadata {
    clave_empleado: string;
    carrera: string;
    cargo: string;
}

interface FormDataGlobal {
    firstName: string;
    lastName: string;
    emailAddresses: EmailAddressResource[];
    publicMetadata: PublicMetadata;
}

interface FormDataStore {
    formData: FormDataGlobal;
    setFormData: (data: Partial<FormDataGlobal>) => void;
    updateField: (name: string, value: string) => void;
    reiniciarFormData: () => void;
}

export const useFormData = create<FormDataStore>((set) => ({
    formData: {
        firstName: "",
        lastName: "",
        emailAddresses: [],
        publicMetadata: {
            clave_empleado: "",
            carrera: "",
            cargo: "Jefe de Carrera",
        },
    },
    setFormData: (data) => set((state) => ({
        formData: {
            ...state.formData,
            ...data,
            publicMetadata: {
                ...state.formData.publicMetadata,
                ...data.publicMetadata,
            },
        },
    })),
    updateField: (name, value) =>
        set((state) => {
            if (["clave_empleado", "carrera", "cargo", "role"].includes(name)) {
                return {
                    formData: {
                        ...state.formData,
                        publicMetadata: {
                            ...state.formData.publicMetadata,
                            [name]: value, // Aquí debería llegar el string completo del input
                        },
                    },
                };
            } if (name === "emailAddresses") {
                const current = state.formData.emailAddresses;
                const updatedEmail = {
                    ...current[0],
                    emailAddress: value,
                };

                return {
                    formData: {
                        ...state.formData,
                        emailAddresses: current.length > 0
                            ? [updatedEmail, ...current.slice(1)]
                            : [updatedEmail],
                    },
                };
            } else {
                return {
                    formData: {
                        ...state.formData,
                        [name]: value,
                    },
                };
            }
        }),
    reiniciarFormData: () =>
        set(() => ({
            formData: {
                firstName: "",
                lastName: "",
                emailAddresses: [],
                publicMetadata: {
                    clave_empleado: "",
                    carrera: "",
                    cargo: "Jefe de Carrera",
                    role: "",
                },
            },
        })),
}));
