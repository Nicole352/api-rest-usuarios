import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

function App() {
  const [token, setToken] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  const fetchUsuarios = async (tok = token) => {
    try {
      const res = await fetch('http://localhost:8080/api/users', {
        headers: { Authorization: `Bearer ${tok}` }
      });
      const data = await res.json();
      if (res.ok) setUsuarios(data);
    } catch (err) {
      console.error('Error al cargar usuarios:', err);
    }
  };

  const eliminarUsuario = async (id) => {
    if (!window.confirm('¿Eliminar este usuario?')) return;
    try {
      const res = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) fetchUsuarios();
    } catch {
      alert('❌ Error al eliminar');
    }
  };

  const cerrarSesion = () => {
    setToken('');
    setUsuarios([]);
    setUsuarioEditando(null);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Laboratorio 2 - Diaz Nicole</h1>

      {!token ? (
        <LoginForm onLogin={(tokenRecibido) => {
          setToken(tokenRecibido);
          fetchUsuarios(tokenRecibido);
        }} />
      ) : (
        <>
          <UserForm
            token={token}
            usuarioEditando={usuarioEditando}
            onUsuarioGuardado={() => {
              setUsuarioEditando(null);
              fetchUsuarios();
            }}
          />
          <UserList
            token={token}
            usuarios={usuarios}
            onEliminar={eliminarUsuario}
            onEditar={setUsuarioEditando}
          />
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button onClick={cerrarSesion} style={{ padding: '0.5rem 1rem' }}>
              🔒 Cerrar sesión
            </button>
          </div>
        </>
      )}

    </div>
  );
}

export default App;
