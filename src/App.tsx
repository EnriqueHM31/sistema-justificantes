import Login from "./pages/Login";
import CambiarContraseña from "./pages/CambiarContraseña";
import { Routes, Route } from "react-router-dom";
import Page404 from "./pages/errores/Page404";
import { Toaster } from "sonner";
import AdministradorInicio from "./pages/Administrador/Inicio";
import AdministradorAñadir from "./pages/Administrador/Añadir";
import AdministradorModificar from "./pages/Administrador/Modificar";
import AdministradorEliminar from "./pages/Administrador/Eliminar";
import AdministradorConfiguracion from "./pages/Administrador/Configuracion";
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
          <Route path="/administrador/modificarusuarios" element={<AdministradorModificar />} />
          <Route path="/administrador/eliminarusuarios" element={<AdministradorEliminar />} />
          <Route path="/administrador/configuracion" element={<AdministradorConfiguracion />} />
        </Routes>
      </div>

      <Toaster
        position="bottom-right"
        duration={3000}
        theme="light"
        toastOptions={{
          style: {
            borderRadius: '20px',
            background: '#0f47ad',
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
