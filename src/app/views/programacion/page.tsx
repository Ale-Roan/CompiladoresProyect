'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
const ClinicDashboard: React.FC = () => {
  const [time, setTime] = useState<string>('');
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


  return (
    <div className="container mx-auto relative">
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

        <div className="bg-blue-500 text-white p-4">
            <h1 className="text-3xl font-bold">GESTIÓN DE CITAS</h1>

        </div>

        <div className="flex flex-wrap justify-center mt-8">
            <div className="w-full md:w-1/3 px-4">
                <a href="/views/aggcita">
                    <button className="bg-white shadow-lg p-6 rounded-lg h-full w-full" >
                        <h2 className="text-xl font-bold mb-2 text-black text-center">Agregar cita</h2>
                    </button>
                </a>


            </div>

            <div className="w-full md:w-1/3 px-4">
                <a href="/views/editcita">
                    <button className="bg-white shadow-lg p-6 rounded-lg h-full w-full" >
                        <h2 className="text-xl font-bold mb-2 text-black text-center">Editar Citas</h2>
                    </button>
                </a>
            </div>
            

            <div className="w-full md:w-1/3 px-4">
                <a href="/views/listrata">
                    <button className="bg-white shadow-lg p-6 rounded-lg h-full w-full" >
                        <h2 className="text-xl font-bold mb-2 text-black text-center">Historial de Citas</h2>
                    </button>
                </a>
            </div>

            <div className="w-full md:w-1/3 px-4 mt-5">
                <a href="/views/homePage">
                    <button className="bg-white shadow-lg p-6 rounded-lg h-full w-full" >
                        <h2 className="text-xl font-bold mb-2 text-black text-center">Volver al Menu</h2>
                    </button>
                </a>


            </div>

        </div>

</div>
      
        


    </div>
);
};

export default ClinicDashboard;