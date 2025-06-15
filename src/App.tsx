import CambiarContraseña from "./pages/CambiarContraseña";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Page404 from "./pages/errores/Page404";
import Footer from "./Footer";
import Perfil from "./pages/Administrador/Perfil";
import AdministradorAñadir from "./pages/Administrador/Añadir";
import AdministradorModificar from "./pages/Administrador/Modificar";
import AdministradorEliminar from "./pages/Administrador/Eliminar";
import AdministradorConfiguracion from "./pages/Administrador/Configuracion";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";


function App() {

  const location = useLocation();
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cambiarcontraseña" element={<CambiarContraseña />} />
        <Route path="/*" element={<Page404 />} />
        <Route path="/administrador/perfil" element={<Perfil />} />
        <Route path="/administrador/registrarusuarios" element={<AdministradorAñadir />} />
        <Route path="/administrador/modificarusuarios" element={<AdministradorModificar />} />
        <Route path="/administrador/eliminarusuarios" element={<AdministradorEliminar />} />
        <Route path="/administrador/configuracion" element={<AdministradorConfiguracion />} />
      </Routes>

      {
        (location.pathname !== '/' && decodeURIComponent(location.pathname) !== '/cambiarcontraseña' && decodeURIComponent(location.pathname) !== '/cambiarcontraseña/confirmar') && (
          <Footer />
        )
      }



      <Toaster
        position="bottom-right"
        duration={3000}
        theme="light"
        toastOptions={{
          style: {
            border: "1px solid #0f47ad",
            borderRadius: '10px',
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
