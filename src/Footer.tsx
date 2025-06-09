export default function Footer() {
    return (
        <footer className="bg-secondary text-white text-center py-10 px-4 w-full">
            <div className="flex flex-col items-center justify-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} TecNM Huatusco
                </p>
            </div>
        </footer>
    );
}