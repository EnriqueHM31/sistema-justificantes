import { type ModalConfirmacionProps } from "@/types";

export default function ModalConfirmacion({ title, message, handleClickModalClose, confirmarCambio }: ModalConfirmacionProps) {


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-60">
            <div className="bg-white p-6 rounded-lg shadow-md text-center w-3/4 md:w-full  md:max-w-md">
                <h3 className="text-sm md:text-xl font-semibold mb-4">{title}</h3>
                {
                    message && (
                        <p className="text-sm md:text-sm  mb-4">{message}</p>
                    )
                }

                <div className="flex justify-center gap-4">
                    <button
                        onClick={confirmarCambio}
                        className="bg-secondary text-white px-4 py-2 rounded-md xl:text-xl text-sm"
                    >
                        Confirmar
                    </button>
                    <button
                        onClick={handleClickModalClose}
                        className="bg-red-600 text-white px-4 py-2 rounded-md xl:text-xl text-sm"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div >
    )
}