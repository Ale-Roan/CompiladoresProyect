'use client'
import React, { useState } from 'react';
import Image from 'next/image';

interface FormState {
  Nombre: string;
  Fecha_nacimiento: string;
  Genero: string;
  Telefono: string;
  Correo_electronico: string;
}

const Form: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    Nombre: '',
    Fecha_nacimiento: '',
    Genero: '',
    Telefono: '',
    Correo_electronico: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validar si los campos están completos
    if (
      !formState.Nombre ||
      !formState.Fecha_nacimiento ||
      !formState.Genero ||
      !formState.Telefono ||
      !formState.Correo_electronico
    ) {
      alert('Por favor complete todos los campos.');
      return;
    }

    try {
      console.log(formState);
      const response = await fetch('http://localhost:4000/nuevo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error('Error al registrar el paciente');
      }

      alert('Paciente registrado exitosamente');
      // Puedes redirigir al usuario a otra página o realizar alguna acción adicional aquí
    } catch (error: unknown) {
      console.error('Error al registrar el paciente:', (error as Error).message);
      alert('Hubo un error al registrar el paciente. Por favor, inténtelo de nuevo.');
    }
  };

  return (

    <div className='bg-[#00a0de]'>
      {/* Imagen de fondo */}
      <div className="relative h-screen ">
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
            <h1 className="text-3xl font-bold">REGISTRO DE PACIENTES</h1>
          </div>
          <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
            <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Registrar nuevo Paciente</h1>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
              <div className="flex items-start flex-col justify-start">
                <label htmlFor="Nombre" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Nombre:</label>
                <input
                  type="text"
                  id="Nombre"
                  name="Nombre"
                  value={formState.Nombre}
                  onChange={handleInputChange}
                  className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-start flex-col justify-start">
                <label htmlFor="Fecha_nacimiento" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Fecha de Nacimiento:</label>
                <input
                  type="text"
                  id="Fecha_nacimiento"
                  name="Fecha_nacimiento"
                  value={formState.Fecha_nacimiento}
                  onChange={handleInputChange}
                  className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-start flex-col justify-start">
                <label htmlFor="Genero" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Género:</label>
                <input
                  type="text"
                  id="Genero"
                  name="Genero"
                  value={formState.Genero}
                  onChange={handleInputChange}
                  className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-start flex-col justify-start">
                <label htmlFor="Telefono" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Teléfono:</label>
                <input
                  type="text"
                  id="Telefono"
                  name="Telefono"
                  value={formState.Telefono}
                  onChange={handleInputChange}
                  className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-start flex-col justify-start">
                <label htmlFor="Correo_electronico" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Correo electrónico:</label>
                <input
                  type="text"
                  id="Correo_electronico"
                  name="Correo_electronico"
                  value={formState.Correo_electronico}
                  onChange={handleInputChange}
                  className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600">
                Registrar
              </button>

              <div className='flex justify-center items-center text-center'>
                <a href="/views/lista" className="w-full bg-green-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-green-600">
                  Lista de Pacientes
                </a>
              </div>

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
