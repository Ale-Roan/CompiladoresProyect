"use client"
import React, { useState, useEffect } from 'react';

interface MiComponenteProps {
  id: string;
}

const CitasPage: React.FC<MiComponenteProps> = ({id}) => {
  const [citas, setcitas] = useState<any[]>([]);
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">citas:</h1>
      <ul>
        {citas.map((cita, index) => (
          <li key={index} className="border border-gray-300 rounded p-4 mb-4">
            <p><strong>ID Paciente:</strong> {cita.ID_cita}</p>
            <p><strong>Tipo Procedimiento:</strong> {cita.Nombre}</p>
            <p><strong>Notas Adicionales:</strong> {cita.Fecha_nacimiento}</p>
            <p><strong>fecha_cita:</strong> {cita.Genero}</p>
            <p><strong>hora cita:</strong> {cita.Telefono}</p>
            <p><strong>Correo Electrónico:</strong> {cita.Correo_electronico}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CitasPage;