import { Header } from '../header';
import { useEffect, useState } from 'react';

export default function Catalog() {
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
  }, []);

  const addCart = (item) => {
    setCart([...cart, item]);
  }

  useEffect(() => {
    console.log(cart);
  }, [cart]);
  
  const displayedItems = items.map((item, idx) => {
    return (<li className="bg-zinc-200 p-4" key={idx}>
      <h2 className="text-lg font-bold">{item.name}</h2>
      <div>{item.price / 100}</div>
      <button onClick={() => addCart({ name: item.name, price: item.price })}>Add To Cart</button>
    </li>)
  });
  return (
  <div>
    <Header cart={cart} />
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-4">Catalog Page</h2>
      <div><ul className="flex flex-wrap gap-4">{displayedItems}</ul></div>
      <div>Reserve Button should cause dropdown to fill out Reserve Date and Time</div>
      <div>Price is daily rate, date and time should calculate total price</div>
    </div>
  </div>);
}
