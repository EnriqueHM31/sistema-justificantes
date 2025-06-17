import { formulario, items } from "@/assets/ts/Administrador/Registrar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningOutlinedIcon from "@mui/icons-material/WarningOutlined";
import Select from "@/pages/Administrador/components/Select";
import { type FormularioJefeProps } from "@/types";
import { useFormData } from "@/store/dataJefeCarrera";


export default function Formulario({ handleInputChange, handleCarreraChange, inputValidity }: FormularioJefeProps) {

    const { formData } = useFormData();


    return (
        <form className="flex flex-col items-center justify-center gap-6 w-full mx-auto">
            {formulario.map(({ id, label, type, pattern, required }) => (
                <label key={id} className="relative w-full flex flex-col gap-3">
                    <span className="text-white px-4 py-2 rounded-lg min-w-2/5 w-fit text-xs bg-secondary font-bold">
                        {label}
                    </span>

                    <div className="relative w-full">
                        {(() => {
                            const validityKey = id === "emailAddresses" ? "correo_usuario" : id;
                            const isValid = inputValidity[validityKey];

                            return (
                                <>
                                    <input
                                        type={type}
                                        name={id}
                                        value={
                                            id === "emailAddresses"
                                                ? formData.emailAddresses[0]?.emailAddress || ""
                                                : id === "clave_empleado"
                                                    ? formData.publicMetadata.clave_empleado || ""
                                                    : (formData[id as keyof typeof formData] as string) || ""
                                        }

                                        required={required}
                                        pattern={pattern}
                                        placeholder={label}
                                        onChange={handleInputChange}
                                        className={`border font-bold rounded-md p-4 w-full input_hover text-sm pr-10
                                        ${isValid === true ? "border-green-500 outline-green-500" : ""}
                                        ${isValid === false ? "border-red-500 outline-red-500" : ""}
                                        `}
                                    />
                                    {isValid === true && (
                                        <CheckCircleIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />
                                    )}
                                    {isValid === false && (
                                        <WarningOutlinedIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500" />
                                    )}
                                </>
                            );
                        })()}
                    </div>

                </label>
            ))}

            <label className="relative w-full flex flex-col gap-3">
                <span className="text-white px-4 py-2 rounded-lg min-w-2/5 w-fit text-xs bg-secondary font-bold">
                    Cargo del usuario
                </span>
                <input
                    type="text"
                    name="cargo_usuario"
                    value="Jefe de Carrera"
                    disabled
                    className="border font-bold border-input rounded-md p-4 w-full input_hover text-sm select-none"
                />
            </label>

            <label className="relative w-full flex flex-col gap-3">
                <span className="text-white px-4 py-2 rounded-lg min-w-2/5 w-fit text-xs bg-secondary font-bold">
                    Carrera que dirigirá
                </span>
                <Select items={items} handleChange={handleCarreraChange} carreravalue={formData.publicMetadata.carrera ?? ""} />
            </label>
        </form>
    )
}