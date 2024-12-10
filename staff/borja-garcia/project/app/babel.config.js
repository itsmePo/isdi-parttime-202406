module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'nativewind/babel'], // Usamos babel-preset-expo para manejar expo-router
    //plugins: ['nativewind/babel'], // Si usas Nativewind
  };
};