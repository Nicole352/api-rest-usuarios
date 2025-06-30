import React from 'react';

const UserList = ({ token, usuarios, onEliminar, onEditar }) => {
  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Lista de Usuarios</h2>
      {!token && <p>🔒 Debes iniciar sesión.</p>}
      {usuarios.length > 0 ? (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario._id}>
                <td>{usuario.name}</td>
                <td>{usuario.email}</td>
                <td>
                  <button onClick={() => onEditar(usuario)}>✏️ Editar</button>
                  <button onClick={() => onEliminar(usuario._id)} style={{ marginLeft: '0.5rem' }}>🗑️ Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay usuarios para mostrar.</p>
      )}
    </div>
  );
};

export default UserList;
