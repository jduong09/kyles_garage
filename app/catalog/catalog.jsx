import { Header } from '../header';
import { useEffect, useState } from 'react';

export default function Catalog() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/inventory");
        console.log(response);
    
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
    return (<div key={idx}>
      <h2>{item.name}</h2>
      <div>{item.price / 100}</div>
    </div>)
  });
  return (
  <div>
    <Header />
    <div>Catalog Page</div>
    <div>{displayedItems}</div>
  </div>);
}
