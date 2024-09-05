import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';  
import { generateRandomCart } from './api';  

const InitialView = ({ setCart }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cartReady, setCartReady] = useState(false);  
  const [localCart, setLocalCart] = useState([]);  
  const navigate = useNavigate();  
  const location = useLocation();  

  useEffect(() => {
    if (location.state?.cart) {
      setLocalCart(location.state.cart);  
      setCart(location.state.cart);  
      setCartReady(location.state.cart.length > 0);  
    }
  }, [location.state, setCart]);

  useEffect(() => {
    setCartReady(localCart.length > 0);
  }, [localCart]);

  const handleGenerateCart = async () => {
    setLoading(true);
    setError(null);
    setCartReady(false);  
    try {
      const generatedCart = await generateRandomCart();
      setLocalCart(generatedCart);  
      setCart(generatedCart); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToCheckout = () => {
    navigate('/checkout', { state: { cart: localCart } }); 
  };

  return (
    <div style={styles.container}>
      <h1>Nomad E-commerce</h1>

      {error && <p style={styles.error}>{error}</p>}

      <button onClick={handleGenerateCart} disabled={loading} style={styles.button}>
        {loading ? 'Generando Carrito...' : 'Generar Carrito'}
      </button>

      <button onClick={handleNavigateToCheckout} disabled={!cartReady} style={styles.button}>
      Finalizar compra
      </button>

      {cartReady && localCart.length > 0 && (
        <p style={styles.cartReadyMessage}>¡Tu carrito está listo! Ya puedes finalizar tu compra.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
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
  },
  error: {
    color: 'red',
    margin: '10px 0',
  },
  cartReadyMessage: {
    color: 'green',
    marginTop: '20px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
};

export default InitialView;
