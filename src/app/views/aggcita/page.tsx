'use client'
import React, { useState } from 'react';
import Image from 'next/image';

interface FormState {
  ID_Paciente: string;
  Tipo_procedimiento: string;
  Notas_adicionales: string;
  fecha_cita: string;
  hora_cita: string;
}

const Form: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    ID_Paciente: '',
    Tipo_procedimiento: '',
    Notas_adicionales: '',
    fecha_cita: '',
    hora_cita: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !formState.ID_Paciente ||
      !formState.Tipo_procedimiento ||
      !formState.Notas_adicionales ||
      !formState.fecha_cita||
      !formState. hora_cita
    ) {
      alert('Por favor complete todos los campos.');
      return;
    }

    try {
      console.log(formState);
      const response = await fetch('http://localhost:4000/citanuevo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error('Error al registrar la cita');
      }

      alert('Paciente registrado exitosamente');
    } catch (error: unknown) {
      console.error('Error al registrar la cita:', (error as Error).message);
      alert('Hubo un error al registrar la cita. Por favor, inténtelo de nuevo.');
    }
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
      <div className="bg-blue-500 text-white p-4">
        <h1 className="text-3xl font-bold">REGISTRAR NUEVA CITA</h1>
      </div>
      <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
        <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Registrar nueva cita</h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex items-start flex-col justify-start">
            <label htmlFor="ID_Paciente" className="text-sm text-gray-700 dark:text-gray-200 mr-2"> ID del Paciente:</label>
            <input
              type="text"
              id="ID_Paciente"
              name="ID_Paciente"
              value={formState.ID_Paciente}
              onChange={handleInputChange}
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Repeat the above code for each input field */}
          <div className="flex items-start flex-col justify-start">
            <label htmlFor="Tipo_procedimiento" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Tipo de Procedimiento:</label>
            <input
              type="text"
              id="Tipo_procedimiento"
              name="Tipo_procedimiento"
              value={formState.Tipo_procedimiento}
              onChange={handleInputChange}
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-start flex-col justify-start">
            <label htmlFor="username" className="text-sm text-gray-700 dark:text-gray-200 mr-2"> Notas adicionales:</label>
            <input
              type="text"
              id="Notas_adicionales"
              name="Notas_adicionales"
              value={formState.Notas_adicionales}
              onChange={handleInputChange}
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-start flex-col justify-start">
            <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Fecha cita:</label>
            <input
              type="text"
              id="fecha_cita"
              name="fecha_cita"
              value={formState.fecha_cita}
              onChange={handleInputChange}
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-start flex-col justify-start">
            <label htmlFor="password" className="text-sm text-gray-700 dark:text-gray-200 mr-2">hora cita:</label>
            <input
              type="text"
              id="hora_cita"
              name="hora_cita"
              value={formState.hora_cita}
              onChange={handleInputChange}
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>


          <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600">
            Hacer Cita
          </button>
          
          <div className='flex justify-center items-center text-center'>
            <a href="/views/homePage" className="w-full bg-cyan-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-cyan-600">
              Volver al inicio
            </a>
          </div>

        </form>
        </div>
      </div>
    </div>  

  </div>
  );
};

export default Form;
