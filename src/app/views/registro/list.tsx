"use client"

import React, { useState, useEffect } from 'react';

interface MiComponenteProps {
  pacientes: any[];
}

const PacientesPage: React.FC<MiComponenteProps> = ({pacientes}) => {

  return (
    <div className="container mx-auto ">
      <h1 className="text-3xl font-bold mb-4">Pacientes:</h1>
      <ul>
        {pacientes.map((paciente, index) => (
          <li key={index} className="border border-gray-300 rounded p-4 mb-4 bg-gray-500 bg-opacity-50 mx-5">
            <p><strong>ID Paciente:</strong> {paciente.ID_Paciente}</p>
            <p><strong>Nombre:</strong> {paciente.Nombre}</p>
            <p><strong>Fecha de Nacimiento:</strong> {paciente.Fecha_nacimiento}</p>
            <p><strong>Género:</strong> {paciente.Genero}</p>
            <p><strong>Teléfono:</strong> {paciente.Telefono}</p>
            <p><strong>Correo Electrónico:</strong> {paciente.Correo_electronico}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PacientesPage;