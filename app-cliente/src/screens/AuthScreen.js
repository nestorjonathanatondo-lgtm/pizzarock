
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
// Firebase Auth Phone - antifraude Saltillo

export default function AuthScreen({ onVerified }) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState(null);

  const sendCode = () => {
    // En producción: auth().signInWithPhoneNumber(phone)
    Alert.alert('Código enviado', 'Usa 1234 para demo The Pizza Rock');
    setStep(2);
  };

  const verifyCode = () => {
    if (otp === '1234') {
      // Verifica GPS Saltillo 25.4232, -101.0053
      setStep(3);
    } else {
      Alert.alert('Código incorrecto');
    }
  };

  const verifyLocation = async () => {
    // expo-location getCurrentPosition
    // Valida que esté en Saltillo radius 15km
    setLocation({ lat: 25.4232, lng: -101.0053 });
    onVerified();
  };

  return (
    <View style={{ padding: 20, flex: 1, backgroundColor: '#0A0A0A' }}>
      <Text style={{ color: '#E53935', fontSize: 28, fontWeight: 'bold' }}>THE PIZZA ROCK CO.</Text>
      <Text style={{ color: 'white', marginBottom: 20 }}>Verificación antifraude Saltillo</Text>
      {step === 1 && <>
        <TextInput placeholder="+52 Celular" style={{ backgroundColor: 'white', padding: 10 }} value={phone} onChangeText={setPhone} />
        <Button title="Enviar SMS" color="#FF6B00" onPress={sendCode} />
      </>}
      {step === 2 && <>
        <TextInput placeholder="Código SMS (1234)" style={{ backgroundColor: 'white', padding: 10, marginTop: 20 }} value={otp} onChangeText={setOtp} />
        <Button title="Verificar" color="#FF6B00" onPress={verifyCode} />
      </>}
      {step === 3 && <>
        <Text style={{ color: 'white', marginTop: 20 }}>Verificando ubicación Saltillo...</Text>
        <Button title="Permitir GPS y continuar" color="#FF6B00" onPress={verifyLocation} />
      </>}
    </View>
  );
}
