import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SolicitudesPage from "./pages/SolicitudesPage";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import CrearAreaPage from "./pages/CrearAreaPage.jsx";
import CrearSubcategoriaPage from "./pages/CrearSubcategoriaPage.jsx";
import CrearRequerimientoPage from "./pages/CrearRequerimientoPage.jsx";
import CrearUsuarioPage from "./pages/CrearUsuarioPage.jsx";
import ListarSolicitudesAdmin from "./pages/ListarSolicitudesAdmin.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

function useUsuarioInicial() {
  try {
    return JSON.parse(localStorage.getItem('usuario') || 'null');
  } catch (e) {
    return null;
  }
}

function App() {
  const [usuario, setUsuario] = useState(useUsuarioInicial());

  const handleLogin = (usuarioObj) => {
    setUsuario(usuarioObj);
    // guardar localStorage ya hacen los componentes, pero asegurar
    try { localStorage.setItem('usuario', JSON.stringify(usuarioObj)); } catch (e) {}
  };

  const handleLogout = () => {
    setUsuario(null);
    try { localStorage.removeItem('usuario'); } catch (e) {}
  };

  return (
    <Router>
      <Layout usuario={usuario} onLogout={handleLogout}>
        <Switch>
          <Route path="/login" render={(props) => <Login {...props} onLogin={handleLogin} />} />
          <Route path="/register" component={Register} />

          {/* Solicitudes: accesible para usuarios y admins (el admin tiene su vista en /admin/solicitudes) */}
          <ProtectedRoute path="/solicitudes">
            <SolicitudesPage />
          </ProtectedRoute>

          <ProtectedRoute path="/dashboard">
            <Dashboard />
          </ProtectedRoute>

          {/* Admin sub-pages */}
          <ProtectedRoute path="/admin/areas" role="admin">
            <CrearAreaPage />
          </ProtectedRoute>
          <ProtectedRoute path="/admin/subcategorias" role="admin">
            <CrearSubcategoriaPage />
          </ProtectedRoute>
          <ProtectedRoute path="/admin/requerimientos" role="admin">
            <CrearRequerimientoPage />
          </ProtectedRoute>
          <ProtectedRoute path="/admin/usuarios" role="admin">
            <CrearUsuarioPage />
          </ProtectedRoute>
          <ProtectedRoute path="/admin/solicitudes" role="admin">
            <ListarSolicitudesAdmin />
          </ProtectedRoute>

          {/* Admin */}
          <ProtectedRoute path="/admin" role="admin">
            <AdminPanel />
          </ProtectedRoute>

          {/* Default */}
          <Redirect to="/login" />

        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
