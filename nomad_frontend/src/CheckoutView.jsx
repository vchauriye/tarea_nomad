import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import { processCart } from './api';  

const CheckoutView = ({ cart, setCart }) => {
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();  

  const handleProcessCart = async () => {
    setProcessing(true);
    try {
      const response = await processCart(cart);
      if (response.can_process_cart) {
        setResult('Envío Nomad ⚡️ - $3670');
      } else {
        setResult('No hay envíos disponibles :(');
      }
    } catch (error) {
      setResult('Failed to process the cart.');
    } finally {
      setProcessing(false);
    }
  };

  const handleClearCart = () => {
    setCart([]);
    navigate('/', { state: { cart: [] } }); 
  };

  const handleBack = () => {
    navigate('/', { state: { cart } });
  };

  return (
    <div style={styles.container}>
      <div style={styles.checkoutSection}>
        <h1 style={styles.heading}>Checkout</h1>

        {result && (
          <p style={result.includes('Nomad') ? styles.successResult : styles.errorResult}>
            {result}
          </p>
        )}

        <button onClick={handleProcessCart} disabled={processing} style={styles.button}>
          {processing ? 'Procesando...' : 'Cotizar Despacho'}
        </button>

        <button onClick={handleClearCart} style={styles.button}>Limpiar carrito</button>

        <button onClick={handleBack} style={styles.button}>Volver</button>
      </div>

      <div style={styles.cartSection}>
        <h2 style={styles.cartHeading}>Tu Carrtio</h2>
        <div style={styles.cartItems}>
          {cart.map((item, index) => (
            <div key={index} style={styles.cartItem}>
              <p><strong>ID Producto:</strong> {item.productId}</p>
              <p><strong>Precio:</strong> ${item.price}</p>
              <p><strong>Cantidad:</strong> {item.quantity}</p>
              <p><strong>Descuento:</strong> {item.discount}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    height: '100vh',
    textAlign: 'center',
  },
  checkoutSection: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: '36px',
    marginBottom: '20px',
  },
  successResult: {
    color: 'green',
    margin: '20px 0',
  },
  errorResult: {
    color: 'red',
    margin: '20px 0',
  },
  button: {
    backgroundColor: '#4CAF50',  
    color: 'white',
    padding: '15px 30px',
    margin: '10px 0',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '60%',
  },
  cartSection: {
    width: '40%',
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflowY: 'auto',
  },
  cartHeading: {
    fontSize: '28px',
    marginBottom: '20px',
    borderBottom: '2px solid #4CAF50',
    paddingBottom: '10px',
  },
  cartItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  cartItem: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
};

export default CheckoutView;
