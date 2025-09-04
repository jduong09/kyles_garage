import { Header } from '../header';
import { useEffect, useState } from 'react';

export default function Catalog() {
  const [items, setItems] = useState([]);
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

  const displayedItems = items.map((item, idx) => {
    return (<li className="w-1/4" key={idx}>
      <h2>{item.name}</h2>
      <div>{item.price / 100}</div>
    </li>)
  });
  return (
  <div>
    <Header />
    <div>Catalog Page</div>
    <div className={"p-4"}><ul className="flex flex-wrap">{displayedItems}</ul></div>
  </div>);
}
