
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';

export default function App() {
  const [orders, setOrders] = useState([
    { id: '1023', customer: 'Ana López', address: 'Col. República 123', total: 320, status: 'En Camino', fraud: false },
    { id: '1024', customer: 'Carlos R.', address: 'Mirasierra', total: 185, status: 'Nuevo', fraud: true, fraudScore: 35 }
  ]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [sendingLocation, setSendingLocation] = useState(true);

  useEffect(() => {
    // Envía ubicación cada 5s a Realtime DB - es lo que ve cliente en mapa
    const interval = setInterval(() => {
      console.log('Enviando ubicación... lat 25.4232 lng -101.0053');
      // realtime().ref(`rider_locations/JuanR`).set({ lat: 25.4232 + Math.random()*0.01, lng: -101.0053, timestamp: Date.now() })
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const advance = () => {
    const flow = { 'Nuevo': 'En Camino', 'En Camino': 'Entregado' };
    setCurrentOrder({ ...currentOrder, status: flow[currentOrder.status] });
    if (flow[currentOrder.status] === 'Entregado') {
      Alert.alert('Pedido entregado', 'Foto de entrega requerida');
      setCurrentOrder(null);
    }
  };

  if (currentOrder) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0A0A0A', padding: 20 }}>
        {currentOrder.fraud && <View style={{ backgroundColor: '#E53935', padding: 10, borderRadius: 8 }}><Text style={{ color: 'white' }}>⚠️ Alerta antifraude - Cliente {currentOrder.fraudScore}% - Cobra antes de entregar</Text></View>}
        <Text style={{ color: 'white', fontSize: 20, marginTop: 10 }}>Pedido {currentOrder.id} - {currentOrder.status}</Text>
        <View style={{ height: 250, backgroundColor: '#111', marginTop: 20, borderRadius: 12, borderColor: '#FF6B00', borderWidth: 1 }} />
        <Text style={{ color: '#00FF00', marginTop: 10 }}>{sendingLocation ? '● Enviando ubicación... lat 25.4232 lng -101.0053' : ''}</Text>
        <Text style={{ color: 'white', marginTop: 10 }}>{currentOrder.address} - ${currentOrder.total}</Text>
        <Button title={currentOrder.status === 'Nuevo' ? 'Recogí pedido' : currentOrder.status === 'En Camino' ? 'Entregado' : 'Finalizar'} color="#FF6B00" onPress={advance} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#0A0A0A', padding: 20 }}>
      <Text style={{ color: '#E53935', fontSize: 24, fontWeight: 'bold' }}>Juan R. - En línea ●</Text>
      <Text style={{ color: 'white' }}>$340 hoy - 6 entregas - 4.9★</Text>
      {orders.map(o => (
        <View key={o.id} style={{ backgroundColor: o.fraud ? '#330000' : '#1A1A1A', padding: 12, borderRadius: 10, marginTop: 10, borderColor: o.fraud ? '#E53935' : '#333', borderWidth: 1 }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>{o.id} - {o.customer} - ${o.total}</Text>
          <Text style={{ color: '#AAA' }}>{o.address}</Text>
          {o.fraud && <Text style={{ color: '#E53935' }}>Sospechoso 35% - Cobra antes</Text>}
          <Button title="Tomar pedido" color="#FF6B00" onPress={() => setCurrentOrder(o)} />
        </View>
      ))}
    </View>
  );
}
