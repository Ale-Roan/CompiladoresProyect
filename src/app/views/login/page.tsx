'use client'
import React, { useState } from 'react';

interface Props {}



const LoginComponent: React.FC<Props> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) { // Corregido: Utilizando 'email' y 'password'
      setError('Por favor, complete todos los campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  email, password }), // Corregido: Utilizando 'email' y 'password'
      });

      if (response.ok) {
        console.log('Inicio de sesión exitoso');
        // Redireccionar o realizar alguna acción adicional después del inicio de sesión exitoso
      } else {
        setError('Credenciales inválidas. Por favor, inténtelo de nuevo.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error de red. Por favor, inténtelo de nuevo más tarde.');
    }
  };

  return (
    <div className="font-sans text-black">
      <div className="relative min-h-screen flex flex-col sm:justify-center items-center to-black">
        <div className="relative sm:max-w-sm w-full">
          <div className="card bg-blue-300 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
          <div className="card bg-green-300 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
          <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
            <label htmlFor="" className="block mt-3 text-sm text-gray-700 text-center font-semibold">
              Login
            </label>
            <form onSubmit={handleLogin} className="mt-10">
              <div>
                <input type="email" placeholder="Correo electrónico" className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="mt-7">
                <input type="password" placeholder="Contraseña" className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="mt-2 text-red-500">{error}</div>
              <div className="mt-7 flex">
                <label htmlFor="remember_me" className="inline-flex items-center w-full cursor-pointer">
                </label>
                <div className="w-full text-right">
                  <a className="underline text-sm text-gray-600 hover:text-gray-900" href="#">
                    ¿Olvidó su contraseña?
                  </a>
                </div>
              </div>
              <div className="mt-7">
                <button type="submit" className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                  Login
                </button>
              </div>
              <div className="flex mt-7 items-center text-center">
                <hr className="border-gray-300 border-1 w-full rounded-md" />
                <hr className="border-gray-300 border-1 w-full rounded-md" />
              </div>
              <div className="flex mt-7 justify-center w-full">
              </div>
              <div className="mt-7">
                <div className="flex justify-center items-center">
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
