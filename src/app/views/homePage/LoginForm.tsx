import React, { useState } from 'react'

const LoginForm = () => {

interface FormState {
    usuario: string;
    password: string;
}

const [formState, setFormState] = useState<FormState>({
    usuario: '',
    password: '',
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
        !formState.usuario ||
        !formState.password
    ) {
        alert('Por favor complete todos los campos.');
        return;
    }

    try {
        console.log(formState);
        const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
        });

        if (!response.ok) {
        throw new Error('Error al iniciar sesión');
        }

        localStorage.setItem('user', 'true')
        location.reload()
        // Puedes redirigir al usuario a otra página o realizar alguna acción adicional aquí
    } catch (error: unknown) {
        console.error('Error al registrar el paciente:', (error as Error).message);
        alert('Hubo un error al registrar el paciente. Por favor, inténtelo de nuevo.');
    }
    };
  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
        <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <div className="flex items-start flex-col justify-start">
            <label htmlFor="Nombre" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Usuario:</label>
            <input
                type="text"
                id="usuario"
                name="usuario"
                value={formState.usuario}
                onChange={handleInputChange}
                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            </div>

            <div className="flex items-start flex-col justify-start">
            <label htmlFor="Telefono" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Contraseña:</label>
            <input
                type="password"
                id="password"
                name="password"
                value={formState.password}
                onChange={handleInputChange}
                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            </div>


            <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600">
            Iniciar Sesión
            </button>

        </form>
        </div>
  )
}

export default LoginForm
