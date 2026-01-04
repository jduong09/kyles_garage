import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { Header } from '../header';

const Profile = () => {
  const location = useLocation();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (location.state.cart) {
      setCart(location.state.cart)
    }
  }, []);
  
  return (
    <div className="p-4">
      <div>This is the Profile Page</div>
    </div>
  );
}

export default Profile;