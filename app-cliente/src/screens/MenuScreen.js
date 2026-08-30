
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';

// Menu real The Pizza Rock con fotos mejoradas
const MENU = [
  { id: '1', name: 'Lemmy', price: 295, desc: 'Pepperoni premium, carne y salchicha', photo: 'lemmy' },
  { id: '2', name: 'Dave Mustaine', price: 320, desc: 'Camarón salteado con espinacas y champiñones', photo: 'dave' },
  { id: '3', name: 'Rob Zombie', price: 320, desc: 'Pepperoni, lomo canadiense, chorizo y doble queso', photo: 'rob' },
  { id: '4', name: 'Halford', price: 236, desc: 'Alcachofa, tomate, aceitunas negras, portobellos y doble queso', photo: 'halford' },
  { id: '5', name: 'Juan Brujo', price: 185, desc: 'Milanesa de res y champiñones en chile habanero', photo: 'juan' },
  { id: '6', name: 'Hendrix', price: 310, desc: 'Jamón serrano, tocino, champiñones y portobellos', photo: 'hendrix' },
  { id: '7', name: 'Michael Jackson', price: 349, desc: 'Chicharrón Alanis, champiñones y salchicha italiana', photo: 'michael' },
];

export default function MenuScreen({ onOrderCreated }) {
  const [cart, setCart] = useState([]);
  const [menu, setMenu] = useState(MENU);

  useEffect(() => {
    // En producción: firestore().collection('menu').onSnapshot(snapshot => setMenu(snapshot.docs...))
    // Así cuando dueño edita precio, se refleja al instante aquí
  }, []);

  const addToCart = (pizza) => setCart([...cart, pizza]);
  const total = cart.reduce((s, p) => s + p.price, 0);

  const checkout = () => {
    const order = {
      id: Date.now().toString(),
      items: cart,
      total,
      status: 'Nuevo',
      customer: 'Cliente Saltillo',
      address: 'Col. República, Blvd. Carranza 123, Saltillo',
      fraudScore: 92,
      createdAt: new Date()
    };
    // firestore().collection('orders').add(order)
    onOrderCreated(order);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0A0A0A', padding: 10 }}>
      <Text style={{ color: '#E53935', fontSize: 22, fontWeight: 'bold', textAlign: 'center' }}>THE PIZZA ROCK CO.</Text>
      <FlatList
        data={menu}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ flex: 1, margin: 5, backgroundColor: '#1A1A1A', borderRadius: 12, padding: 10, borderColor: '#E53935', borderWidth: 1 }}>
            <View style={{ height: 100, backgroundColor: '#333', borderRadius: 8, marginBottom: 8 }} />
            <Text style={{ color: 'white', fontFamily: 'serif', fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
            <Text style={{ color: '#AAA', fontStyle: 'italic', fontSize: 12 }}>{item.desc}</Text>
            <Text style={{ color: '#E53935', fontWeight: 'bold', marginTop: 4 }}>${item.price}</Text>
            <TouchableOpacity onPress={() => addToCart(item)} style={{ backgroundColor: '#FF6B00', padding: 6, borderRadius: 8, marginTop: 6 }}>
              <Text style={{ color: 'white', textAlign: 'center' }}>+ Agregar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {cart.length > 0 && (
        <TouchableOpacity onPress={checkout} style={{ backgroundColor: '#FF6B00', padding: 15, borderRadius: 12, marginTop: 10 }}>
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Pagar ${total} - {cart.length} pizzas</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
