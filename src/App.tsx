import CambiarContraseña from "@/pages/CambiarContraseña/CambiarContraseña";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Login from "@/pages/InicioSesion/Login";
import Page404 from "@/pages/errores/Page404";
import Footer from "@/components/generales/Footer";
import Perfil from "@/pages/Administrador/Perfil";
import AdministradorAñadir from "@/pages/Administrador/Añadir";
import AdministradorModificar from "@/pages/Administrador/Modificar";
import AdministradorEliminar from "@/pages/Administrador/Eliminar";
import AdministradorConfiguracion from "@/pages/Administrador/Configuracion";

import JefeCarreraAñadir from "@/pages/JefeCarrera/Añadir";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import IconoError from "./components/iconos/iconoError";
import IconoCorrecto from "./components/iconos/iconoCorrecto";
import IconoLoading from "./components/iconos/IconoLoading";


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


        <Route path="/jefecarrera/registrarusuarios" element={<JefeCarreraAñadir />} />
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
            display: "flex",
            gap: "20px",
          },
        }}
        visibleToasts={3}
        richColors
        icons={
          {
            error: <IconoError />,
            success: <IconoCorrecto />,
            loading: <IconoLoading />
          }
        }

        swipeDirections={[
          "top",
          "bottom",
          "left",
          "right",
        ]}
      />
    </>
  )
}

export default App
