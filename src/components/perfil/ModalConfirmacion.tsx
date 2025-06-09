export default function ModalConfirmacion({ handleClickModalOpen, confirmarCambio }: { handleClickModalOpen: () => void, confirmarCambio: () => void }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-md">
                <h3 className="text-xl font-semibold mb-4">¿Realmente quieres cambiar la contraseña?</h3>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={confirmarCambio}
                        className="bg-secondary text-white px-4 py-2 rounded-md"
                    >
                        Confirmar
                    </button>
                    <button
                        onClick={handleClickModalOpen}
                        className="bg-red-600 text-white px-4 py-2 rounded-md"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div >
    )
}