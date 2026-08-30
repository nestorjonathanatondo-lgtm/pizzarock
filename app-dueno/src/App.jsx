
import React, { useState, useEffect } from 'react';

const initialMenu = [
  { id: 1, name: 'Lemmy', price: 295, photo: '', desc: 'Pepperoni premium', available: true },
  { id: 2, name: 'Dave Mustaine', price: 320, photo: '', desc: 'Camarón salteado', available: true },
  { id: 3, name: 'Rob Zombie', price: 320, photo: '', desc: 'Pepperoni, lomo, chorizo', available: true },
  { id: 4, name: 'Halford', price: 236, photo: '', desc: 'Alcachofa, tomate, aceitunas', available: true },
  { id: 5, name: 'Juan Brujo', price: 185, photo: '', desc: 'Milanesa de res y champiñones', available: true },
  { id: 6, name: 'Hendrix', price: 310, photo: '', desc: 'Jamón serrano, tocino', available: true },
  { id: 7, name: 'Michael Jackson', price: 349, photo: '', desc: 'Chicharrón Alanis', available: true },
];

export default function App() {
  const [menu, setMenu] = useState(initialMenu);
  const [orders, setOrders] = useState([
    { id: '1023', customer: 'Ana López', address: 'Col. República 123, Saltillo', total: 320, status: 'Nuevo', fraudScore: 92 },
    { id: '1024', customer: 'Carlos R.', address: 'Mirasierra, Saltillo', total: 185, status: 'Nuevo', fraudScore: 35, fraud: true }
  ]);

  const updatePrice = (id, newPrice) => {
    setMenu(menu.map(p => p.id === id ? { ...p, price: parseInt(newPrice) || 0 } : p));
    // firestore().collection('menu').doc(id).update({ price: newPrice }) - se refleja al instante en app cliente
  };

  const updatePhoto = (id, file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setMenu(menu.map(p => p.id === id ? { ...p, photo: e.target.result } : p));
      // En producción: storage().ref(`pizzas/${id}`).put(file)
    };
    reader.readAsDataURL(file);
  };

  const advanceOrder = (id) => {
    const flow = { 'Nuevo': 'En Horno', 'En Horno': 'En Camino', 'En Camino': 'Entregado' };
    setOrders(orders.map(o => o.id === id ? { ...o, status: flow[o.status] || o.status } : o));
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F6F7F9', fontFamily: 'sans-serif' }}>
      <div style={{ width: 240, background: '#0F0F0F', color: 'white', padding: 20 }}>
        <h2 style={{ color: '#E53935' }}>THE PIZZA ROCK CO.</h2>
        <p>Panel Dueño Saltillo</p>
        <div style={{ marginTop: 20 }}>Dashboard | Pedidos | Menú | Repartidores</div>
      </div>
      <div style={{ flex: 1, padding: 20 }}>
        <h1>Pedidos en Vivo ({orders.length})</h1>
        <div style={{ display: 'flex', gap: 20, marginBottom: 30 }}>
          {['Nuevo','En Horno','En Camino','Entregado'].map(status => (
            <div key={status} style={{ flex: 1, background: 'white', padding: 10, borderRadius: 8 }}>
              <h3>{status}</h3>
              {orders.filter(o => o.status === status).map(o => (
                <div key={o.id} style={{ border: '1px solid #ddd', padding: 8, marginTop: 8, borderRadius: 6, background: o.fraud ? '#FFE0E0' : 'white' }}>
                  <strong>{o.customer}</strong> {o.fraudScore < 50 && <span style={{ color: 'red' }}>⚠️ Sospechoso {o.fraudScore}%</span>}
                  <div>{o.address} - ${o.total}</div>
                  <button onClick={() => advanceOrder(o.id)} style={{ marginTop: 6, background: '#FF6B00', color: 'white', border: 0, padding: '4px 8px', borderRadius: 4 }}>Avanzar</button>
                </div>
              ))}
            </div>
          ))}
        </div>
        <h1>Menú - Edita precio y foto (se refleja al instante en app cliente)</h1>
        <button onClick={() => setMenu(menu.map(p => ({ ...p, price: 150 })))} style={{ background: '#E53935', color: 'white', padding: '8px 12px', borderRadius: 6, border: 0, marginBottom: 10 }}>Poner todas a $150</button>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
          {menu.map(pizza => (
            <div key={pizza.id} style={{ background: 'white', padding: 15, borderRadius: 12, border: '1px solid #E53935' }}>
              {pizza.photo && <img src={pizza.photo} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 8 }} />}
              <input value={pizza.name} onChange={e => setMenu(menu.map(m => m.id === pizza.id ? { ...m, name: e.target.value } : m))} style={{ width: '100%', fontWeight: 'bold', fontSize: 16, marginTop: 8 }} />
              <input type="number" value={pizza.price} onChange={e => updatePrice(pizza.id, e.target.value)} style={{ width: '100%', marginTop: 6 }} />
              <input type="file" accept="image/*" onChange={e => e.target.files[0] && updatePhoto(pizza.id, e.target.files[0])} style={{ marginTop: 6 }} />
              <textarea value={pizza.desc} onChange={e => setMenu(menu.map(m => m.id === pizza.id ? { ...m, desc: e.target.value } : m))} style={{ width: '100%', marginTop: 6 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
