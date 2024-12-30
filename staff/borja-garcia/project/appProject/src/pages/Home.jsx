const Home = () => {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-900 via-purple-700 to-pink-800">
        <div className="max-w-md bg-slate-200 rounded-lg p-6 shadow-2xl">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">¡Hola de nuevo! 🎉</h1>
            <p className="text-gray-600 mt-2">
              Bienvenido a tu espacio personal. Navega y explora las opciones.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <button
              className="h-12 bg-blue-600 text-white font-semibold rounded cursor-pointer hover:animate-pulse"
              onClick={() => console.log("Ir a perfil")}
            >
              Ir a mi Perfil
            </button>
            <button
              className="h-12 bg-purple-600 text-white font-semibold rounded cursor-pointer hover:animate-pulse"
              onClick={() => console.log("Explorar opciones")}
            >
              Explorar Opciones
            </button>
            <button
              className="h-12 bg-red-600 text-white font-semibold rounded cursor-pointer hover:animate-pulse"
              onClick={() => console.log("Cerrar sesión")}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Home;
  