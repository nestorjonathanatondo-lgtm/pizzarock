
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import AuthScreen from './src/screens/AuthScreen';
import MenuScreen from './src/screens/MenuScreen';
import TrackingScreen from './src/screens/TrackingScreen';

export default function App() {
  const [userVerified, setUserVerified] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [screen, setScreen] = useState('auth'); // auth, menu, tracking

  if (!userVerified) {
    return <AuthScreen onVerified={() => { setUserVerified(true); setScreen('menu'); }} />;
  }
  if (screen === 'tracking') {
    return <TrackingScreen order={currentOrder} onBack={() => setScreen('menu')} />;
  }
  return <MenuScreen onOrderCreated={(order) => { setCurrentOrder(order); setScreen('tracking'); }} />;
}
