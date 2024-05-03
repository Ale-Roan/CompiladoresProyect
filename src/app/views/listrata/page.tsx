'use client'
import React, { useState, useEffect } from 'react';
import TratamientosPage from './apiTratamientos';
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
    fetch('http://localhost:4000/historial')
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
        <h1 className="text-3xl font-bold">CITAS ATENDIDAS EN LA CLINICA</h1>
        
      </div>
      
      <div className="flex flex-wrap justify-center mt-8 py-6">
        <div className="w-full md:w-1/3 px-4">
          <a href="/views/homePage">
          <button className="bg-white shadow-lg p-6 rounded-lg h-full w-full" > 
            <h2 className="text-xl font-bold mb-2 text-black text-center">Volver al Menu</h2>
          </button>
          </a>
      </div>
      
      </div>

    <TratamientosPage tratamientos={searchResult}/>
    </div>
      </div>
    </div>
  );
};

export default ClinicDashboard;


