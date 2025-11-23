import React from 'react';
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({ children, role, ...rest }) {
  
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

  return (
    <Route
      {...rest}
      render={() =>
        !usuario ? (
          <Redirect to="/login" />
        ) : role && usuario.rol !== role ? (
          <Redirect to="/login" />
        ) : (
          children
        )
      }
    />
  );
}
