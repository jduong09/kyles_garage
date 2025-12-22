import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { RequireAuth } from '../../requireAuth';
import { Header } from '../../header';

const PaymentPage = () => {
  const [cart, setCart] = useState([]);
  const location = useLocation();
  
  useEffect(() => {
    if (location.state.cart.length) {
      setCart(location.state.cart);
    }
  }, []);

  return (
    <div className="p-4">
      <Header cart={cart} loginPage={false} />
      <div>
        <h2>Payment</h2>
        <span>Total: {cart.length && cart.reduce((total, current) => total + parseFloat(current.price), 0).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default RequireAuth(PaymentPage, 'external');