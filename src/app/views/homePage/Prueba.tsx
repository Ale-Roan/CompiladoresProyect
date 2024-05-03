"use client"

import { useState, useEffect } from 'react';

const PacientesPage = () => {
  const [pacientes, setPacientes] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/datos')
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudieron obtener los datos');
        }
        return response.json();
      })
      .then(data => {
        setPacientes(data);
      })
      .catch(error => {
        console.error('Error fetching pacientes:', error);
      });
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Pacientes:</h1>
      <ul>
        {pacientes.map((paciente, index) => (
          <li key={index} className="border border-gray-300 rounded p-4 mb-4">
            <p><strong>ID:</strong> {paciente.ID_Paciente}</p>
            <p><strong>Nombre:</strong> {paciente.Nombre}</p>
            <p><strong>Fecha de nacimiento:</strong> {paciente.Fecha_nacimiento}</p>
            <p><strong>Género:</strong> {paciente.Genero}</p>
            <p><strong>Teléfono:</strong> {paciente.Telefono}</p>
            <p><strong>Correo electrónico:</strong> {paciente.Correo_electronico}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PacientesPage;
