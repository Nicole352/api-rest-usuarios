import React, { useState } from 'react';
import styles from './LoginForm.module.css';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensaje('');

    try {
      const res = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        onLogin(data.token);
      } else {
        setMensaje(`❌ ${data.error}`);
      }
    } catch (err) {
      setMensaje('❌ Error al conectar con el servidor');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

        <label>Contraseña:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />

        <button type="submit">Login</button>
      </form>
      {mensaje && <p className={styles.message}>{mensaje}</p>}
    </div>
  );
};

export default LoginForm;
