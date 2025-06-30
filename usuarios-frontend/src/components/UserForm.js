import React, { useState, useEffect } from 'react';

const UserForm = ({ token, usuarioEditando, onUsuarioGuardado }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (usuarioEditando) {
      setName(usuarioEditando.name);
      setEmail(usuarioEditando.email);
      setPassword('');
    } else {
      setName('');
      setEmail('');
      setPassword('');
    }
  }, [usuarioEditando]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    const url = usuarioEditando
      ? `http://localhost:8080/api/users/${usuarioEditando._id}`
      : 'http://localhost:8080/api/users';

    const metodo = usuarioEditando ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method: metodo,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje(usuarioEditando ? '✅ Usuario actualizado' : '✅ Usuario creado');
        onUsuarioGuardado();
        setName('');
        setEmail('');
        setPassword('');
      } else {
        setMensaje(`❌ Error: ${data.error || 'No se pudo guardar'}`);
      }
    } catch (err) {
      setMensaje('❌ Error de conexión');
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>{usuarioEditando ? 'Editar Usuario' : 'Registrar Nuevo Usuario'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label><br />
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label><br />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>{usuarioEditando ? 'Nueva Contraseña:' : 'Contraseña:'}</label><br />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required={!usuarioEditando} />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>
          {usuarioEditando ? 'Guardar Cambios' : 'Crear Usuario'}
        </button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default UserForm;
