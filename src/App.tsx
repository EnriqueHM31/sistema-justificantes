import Login from "./pages/Login";
import CambiarContraseña from "./pages/CambiarContraseña";
import { Routes, Route } from "react-router-dom";
import Page404 from "./pages/errores/Page404";
import { Toaster } from "sonner";
import AdministradorInicio from "./pages/Administrador/Inicio";
import AdministradorAñadir from "./pages/Administrador/Añadir";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";


function App() {

  return (
    <>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cambiarcontraseña" element={<CambiarContraseña />} />
          <Route path="/*" element={<Page404 />} />
          <Route path="/administrador/inicio" element={<AdministradorInicio />} />
          <Route path="/administrador/registrarusuarios" element={<AdministradorAñadir />} />
        </Routes>
      </div>

      <Toaster
        position="top-center"
        duration={3000}
        theme="light"
        toastOptions={{
          style: {
            border: '1px solid #fff',
            borderRadius: '20px',
            background: '#0f6cbf',
            color: '#fff',
          },
        }}
        visibleToasts={3}
        richColors
      />
    </>
  )
}

export default App
