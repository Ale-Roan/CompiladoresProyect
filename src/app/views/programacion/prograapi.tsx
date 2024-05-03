"use client"

import { useState, useEffect } from 'react';

const ProgramacionPage = () => {
  const [programacion, setprogramacion] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/citas')
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudieron obtener los datos');
        }
        return response.json();
      })
      .then(data => {
        setprogramacion(data);
      })
      .catch(error => {
        console.error('Error fetching programacion:', error);
      });
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Pacientes:</h1>
      <ul>
        {programacion.map((programacion, index) => (
          <li key={index} className="border border-gray-300 rounded p-4 mb-4">
            <p><strong>ID Historial:</strong> {historial.ID_Historial}</p>
            <p><strong>ID Paciente:</strong> {historial.ID_Paciente}</p>
            <p><strong>Tratamientos Previos:</strong> {historial.Tratamientos_previos}</p>
            <p><strong>Alergias:</strong> {historial.Alergias}</p>
            <p><strong>Medicamentos Actuales:</strong> {historial.Medicamentos_actuales}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgramacionPage;
