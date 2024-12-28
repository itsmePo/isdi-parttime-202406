const Form = () => {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-900 via-purple-700 to-pink-800">
        <div className="login max-w-xs bg-slate-200 rounded-lg p-6 shadow-2xl">
          <div className="header text-center mb-4">
            <span className="text-xl font-bold">¡Únete ahora!</span>
            <p className="text-gray-600">Regístrate y comienza a disfrutar</p>
          </div>
          <form className="flex flex-col gap-4">
            <input
              className="h-10 border border-gray-300 rounded px-3"
              type="text"
              placeholder="Nombre de Usuari@"
              required
            />
            <input
              className="h-10 border border-gray-300 rounded px-3"
              type="email"
              placeholder="E-Mail"
              required
            />
            <input
              className="h-10 border border-gray-300 rounded px-3"
              type="password"
              placeholder="Contraseña"
              required
            />
            <input
              className="h-10 border border-gray-300 rounded px-3"
              type="password"
              placeholder="Repite la contraseña"
              required
            />
            <input
              className="h-10 bg-blue-600 text-white font-semibold rounded cursor-pointer hover:animate-pulse"
              type="submit"
              value="¡Regístrate!"
            />
            <span className="text-center text-gray-600">
              ¿Ya eres miembro?{" "}
              <a href="#" className="text-blue-600 font-medium">
                ¡Inicia sesión aquí!
              </a>
            </span>
          </form>
        </div>
      </div>
    );
  };

  export default Form;