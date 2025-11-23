import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children, usuario, onLogout }) {
  return (
    <div className="app-wrapper">
      <Navbar usuario={usuario} onLogout={onLogout} />
      <main className="app-main">
        {children}
      </main>
      <Footer />
    </div>
  );
}
