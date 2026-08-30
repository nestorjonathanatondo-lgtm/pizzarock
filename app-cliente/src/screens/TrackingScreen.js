
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

export default function TrackingScreen({ order, onBack }) {
  const [riderPos, setRiderPos] = useState({ x: 10, y: 50 });
  const [status, setStatus] = useState('En Horno');

  useEffect(() => {
    // En producción: realtime().ref(`order_tracking/${order.id}/rider_location`).on('value', snap => setRiderPos(snap.val()))
    // Simula movimiento moto Saltillo cada 2 seg
    const interval = setInterval(() => {
      setRiderPos(prev => ({ x: prev.x + 5, y: prev.y }));
      if (prev.x > 70) setStatus('En Camino');
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#0A0A0A', padding: 20 }}>
      <Text style={{ color: 'white', fontSize: 20 }}>Pedido #{order?.id} - {status}</Text>
      <View style={{ height: 300, backgroundColor: '#111', marginTop: 20, borderRadius: 12, position: 'relative', borderWidth: 1, borderColor: '#E53935' }}>
        <Text style={{ color: '#AAA', position: 'absolute', top: 10, left: 10 }}>Mapa Saltillo - Blvd. Carranza</Text>
        <View style={{ position: 'absolute', left: `${riderPos.x}%`, top: `${riderPos.y}%`, width: 12, height: 12, backgroundColor: '#00FF00', borderRadius: 6 }} />
        <Text style={{ color: '#FF6B00', position: 'absolute', bottom: 10, left: 10 }}>Moto en movimiento - Tracking real cada 5s</Text>
      </View>
      <Text style={{ color: 'white', marginTop: 20 }}>Total: ${order?.total} - Dirección: {order?.address}</Text>
    </View>
  );
}
