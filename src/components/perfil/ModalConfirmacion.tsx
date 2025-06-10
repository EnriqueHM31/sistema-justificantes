export default function ModalConfirmacion({ handleClickModalClose, confirmarCambio }: { handleClickModalClose: () => void, confirmarCambio: () => void }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-md text-center w-3/4 md:w-full  md:max-w-md">
                <h3 className="text-sm md:text-xl font-semibold mb-4">¿Realmente quieres cambiar la contraseña?</h3>
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