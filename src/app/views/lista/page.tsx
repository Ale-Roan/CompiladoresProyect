'use client'
import React, { useState, useEffect } from 'react';
import PacientesPage from '../registro/list';

import Image from 'next/image';


const ClinicDashboard: React.FC = () => {
  const [time, setTime] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResult, setSearchResult] = useState<any[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();
      setTime(`${hour}:${minute}:${second}`);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    fetch('http://localhost:4000/datos')
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudieron obtener los datos');
        }
        return response.json();
      })
      .then(data => {
        setSearchResult(data);
      })
      .catch(error => {
        console.error('Error fetching historial:', error);
      });
  }, [])
  

  const handleSearch = () => {
    fetch('http://localhost:4000/datos/'+ searchTerm)
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudieron obtener los datos');
        }
        return response.json();
      })
      .then(data => {
        setSearchResult(data);
      })
      .catch(error => {
        console.error('Error fetching historial:', error);
      });
  };

  return (
    <div>
      {/* Imagen de fondo */}
      <div className="relative h-screen">
        <Image
          src="/image/Back.jpg"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          quality={100}
          className='absolute inset-0 z-0 opacity-3'
        />
        <div className='absolute inset-0'>
        <div id="clock">{time}</div>

<div className="bg-blue-500 text-white p-4">
  <h1 className="text-3xl font-bold">LISTADO DE PACIENTES</h1>
</div>

<div className="flex justify-center mt-8 text-black ">
  <input
    type="text"
    value={searchTerm}
    onChange={e => setSearchTerm(e.target.value)}
    placeholder="Ingrese el ID del paciente"
    className="border border-gray-400 rounded-md px-4 py-2 mr-2"
  />
  <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded-md">
    Buscar
  </button>
</div>

<div className="flex flex-wrap justify-center mt-8">
  <div className="w-full md:w-1/3 px-4">
    <a href="/views/homePage">
      <button className="bg-white shadow-lg p-6 rounded-lg h-full w-full">
        <h2 className="text-xl font-bold mb-2 text-black text-center">Volver al Menu</h2>
      </button>
    </a>
  </div>
</div>
<PacientesPage  pacientes={searchResult} />
        </div>
      
        </div>
      
    </div>
  );
};

export default ClinicDashboard;

