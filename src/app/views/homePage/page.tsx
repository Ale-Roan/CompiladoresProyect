'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import LoginForm from './LoginForm';

const ClinicDashboard: React.FC = () => {
  const [time, setTime] = useState<string>('');
  const [searchResult, setSearchResult] = useState<any[]>([]);

  const logged = localStorage.getItem('user')

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
    fetch('http://localhost:4000/citas')
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

  const handleTerminar = (id:string) => {
    fetch('http://localhost:4000/terminar/'+id)
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudieron obtener los datos');
        }
        location.reload();
      })
      .catch(error => {
        console.error('Error fetching historial:', error);
      });
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    location.reload();
  }

  return (
    <div className="container mx-auto relative bg-[#00a0de]">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 h-screen">
        <Image
          src="/image/Back.jpg"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>


      <div className="relative z-10">
        <div id="clock">{time}</div>
        {
          logged &&
          <div className='flex justify-between'>
            <h1 className="animate__backInLeft">Bienvenido Doctor </h1>
            <button onClick={handleLogout} className='bg-red-500 rounded-full px-4 py-2 mb-3 text-white'>Cerrar Sesión</button>
          </div>
          
        }

        
        
        <div className="bg-blue-500 text-white p-4">
          <h1 className="text-3xl font-bold">Clínica Odontológica</h1>
          <p>Bienvenido al Sistema de Historial Clínico Digital</p>
        </div>

        {
          logged ?
          <>
            <div className="flex flex-wrap justify-center mt-8">
            {/* Botones */}
            <div className="w-full md:w-1/3 px-4 mb-4">
              <a href="/views/registro">
                <button className="bg-white shadow-lg p-6 rounded-lg h-full w-full">
                  <h2 className="text-xl font-bold mb-2 text-black text-center">Registro de Pacientes</h2>
                </button>
              </a>
            </div>

            <div className="w-full md:w-1/3 px-4 mb-4">
            <a href="/views/programacion">
              <button className="bg-white shadow-lg p-6 rounded-lg h-full w-full">
                <h2 className="text-xl font-bold mb-2 text-black text-center">Control de Citas</h2>
              </button>
              </a>
            </div>
          </div>
          <h1 className='mx-4'>Citas Pendientes</h1>

          <div className="container mx-auto">
            <ul>
              {searchResult.map((Tratamiento, index) => (
                <li key={index} className="border border-gray-300 rounded p-4 mb-4 bg-gray-500 bg-opacity-50 mx-5">
                  <p><strong>ID Cita:</strong> {Tratamiento.ID_Cita}</p>
                  <p><strong>ID Paciente:</strong> {Tratamiento.ID_Paciente}</p>
                  <p><strong>Tipo de Procedimiento:</strong> {Tratamiento.Tipo_procedimiento}</p>
                  <p><strong>Notas Adicionales:</strong> {Tratamiento.Notas_adicionales}</p>
                  <p><strong>Fecha de la cita:</strong> {Tratamiento.fecha_cita}</p>
                  <p><strong>Hora de la cita:</strong> {Tratamiento.hora_cita}</p>
                  <div className='flex justify-center items-center text-center'>
                    <p style={{cursor: 'pointer'}} onClick={() => handleTerminar(Tratamiento.ID_Cita)} className="w-full bg-green-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-green-600">
                      Finalizar Cita
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          </>
          :
          <LoginForm />
        }

      </div>
    </div>
  );
};

export default ClinicDashboard;

