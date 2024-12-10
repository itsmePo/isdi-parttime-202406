import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { tw } from 'nativewind';

const ProgressCounter = () => {
  const [startDate, setStartDate] = useState(new Date('2023-12-01')); // Cambia a la fecha de inicio deseada
  const [daysWithout, setDaysWithout] = useState(0);

  useEffect(() => {
    const calculateDays = () => {
      const now = new Date();
      const diff = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
      setDaysWithout(diff);
    };
    calculateDays();
  }, [startDate]);

  return (
    <View style={tw`flex-1 justify-center items-center bg-blue-100`}>
      <Text style={tw`text-xl font-bold text-gray-800`}>
        ¡Llevas {daysWithout} días sin ataques de ansiedad!
      </Text>
      <Button
        title="Reiniciar contador"
        onPress={() => setStartDate(new Date())} // Actualiza la fecha de inicio al reiniciar
      />
    </View>
  );
};

export default ProgressCounter;