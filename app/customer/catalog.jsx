import { useEffect, useState } from 'react';
import CatalogItem from './catalogItem';
import { useOutletContext } from 'react-router';

const Catalog = () => {
  const [items, setItems] = useState([]);
  const { cart, setCart, deleteItem } = useOutletContext();
  
  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/inventory');
    
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
      <div className="p-4 bg-light-chocolate dark:bg-dark-bg">
        <h2 className="text-3xl font-bold mb-4 text-chocolate dark:text-latte">Inventory</h2>
        <div><ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">{displayedItems}</ul></div>
      </div>
    </div>
  );
}

export default Catalog;