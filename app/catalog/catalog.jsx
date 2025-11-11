import { Header } from '../header';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import CatalogItem from './catalogItem';

export default function Catalog() {
  const location = useLocation();
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/inventory");
    
        if (!response.ok) {
          throw new Error (`Response Status: ${response.status}`);
        }
  
        const result = await response.json();
        await setItems(result.items);
      } catch (error) {
        console.log(error.message);
      }
    }
    getItems();

    if (location.state.cart.length) {
      setCart(location.state.cart);
    }
  }, []);

  const deleteItem = (item) => {
    setCart(cart.filter(cartItem => {
      return cartItem.inventory_uuid !== item.inventory_uuid;
    }));
  }
  const displayedItems = items.map((item, idx) => {
    return (
      <li key={idx}>
        <CatalogItem
          cart={cart}
          setCart={setCart}
          item={item}
          idx={idx}
          deleteItem={deleteItem}
        />
      </li>);
  });

  return (
    <div>
      <Header cart={cart}/>
      <div className="p-4 bg-white">
        <h2 className="text-3xl font-bold mb-4 text-chocolate">Inventory</h2>
        <div><ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">{displayedItems}</ul></div>
      </div>
    </div>
  );
}
