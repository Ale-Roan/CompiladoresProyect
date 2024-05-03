"use client"

import { useState, useEffect } from 'react';

interface MiComponenteProps {
  tratamientos: any[];
}

const TratamientosPage: React.FC<MiComponenteProps> = ({tratamientos}) => {


  return (
    <div className="container mx-auto">
      <ul>
        {tratamientos.map((Tratamiento, index) => (
          <li key={index} className="border border-gray-300 rounded p-4 mb-4 bg-gray-500 bg-opacity-50 mx-5">
            <p><strong>ID Cita:</strong> {Tratamiento.ID_Cita}</p>
            <p><strong>ID Paciente:</strong> {Tratamiento.ID_Paciente}</p>
            <p><strong>Tipo de Procedimiento:</strong> {Tratamiento.Tipo_procedimiento}</p>
            <p><strong>Notas Adicionales:</strong> {Tratamiento.Notas_adicionales}</p>
            <p><strong>Fecha de la cita:</strong> {Tratamiento.fecha_cita}</p>
            <p><strong>Hora de la cita:</strong> {Tratamiento.hora_cita}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TratamientosPage;
