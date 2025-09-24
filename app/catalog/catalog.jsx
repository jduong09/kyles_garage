import { Header } from '../header';
import { createRef, useEffect, useState } from 'react';
import { useLocation } from "react-router";

export default function Catalog() {
  const location = useLocation();
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [refLength, setRefLength] = useState(0);
  const [refs, setRefs] = useState([]);

  useEffect(() => {
    setRefs((refs) => Array(refLength).fill().map((_, i) => refs[i] || createRef()));
  }, [refLength]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/inventory");
    
        if (!response.ok) {
          throw new Error (`Response Status: ${response.status}`);
        }
  
        const result = await response.json();
        await setRefLength(result.items.length);
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

  const toggleAvailability = (idx) => {
    refs[idx].current.className = (refs[idx].current.className === "hidden") ? "" : "hidden";
  }

  const addToCart = (e, idx, item) => {
    e.preventDefault();
    const [inputStart, inputEnd] = refs[idx].current.children[0].getElementsByTagName("input");
    const endDate = new Date (inputEnd.value.slice(0, 4), inputEnd.value.slice(5, 7) - 1, inputEnd.value.slice(8, 10));
    const startDate = new Date (inputStart.value.slice(0, 4), inputStart.value.slice(5, 7) - 1, inputStart.value.slice(8, 10));
    const numOfReservedDays = (endDate - startDate === 0) ? 1 : ((endDate - startDate) / 86400000);
    setCart([...cart, { inventory_uuid: item.inventory_uuid, name: item.name, price: Number((item.price / 100) * numOfReservedDays).toFixed(2), startDate, endDate }]);
    toggleAvailability(idx);
  }

  const deleteItem = (item) => {
    setCart(cart.filter(cartItem => {
      return cartItem.inventory_uuid !== item.inventory_uuid;
    }));
  }
  
  const displayedItems = items.map((item, idx) => {
    return (<li className="flex flex-col justify-start items-start m-2 p-3 bg-gray-400/20 rounded-lg" key={idx}>
      <div className="w-full flex justify-between items-center">
        <h2 className="font-bold text-lg mb-2">{item.name}</h2>
        {cart.find((cartItem) => cartItem.inventory_uuid === item.inventory_uuid) && <div onMouseEnter={(e) => e.target.innerText = 'Remove'} onMouseLeave={(e) => e.target.innerText = 'Reserved'} onClick={() => deleteItem(item)} className="rounded-full bg-orange-50 px-2 py-1 text-xs font-bold text-orange-700 inset-ring inset-ring-orange-600/20 dark:bg-orange-400/10 dark:text-orange-400 dark:inset-ring-orange-500/20">Reserved</div>}
      </div>
      <div className="mb-2">{item.description}</div>
      <div className="mb-2 inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 inset-ring inset-ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:inset-ring-green-500/20">Daily Rate: {Number(item.price / 100).toFixed(2)}</div>
      <button className="items-center rounded-full bg-yellow-100 px-2 py-1 font-medium" onClick={() => toggleAvailability(idx)}>Check Availability</button>
      <div ref={refs[idx]} className="hidden">
        <form className="flex flex-col">
          <label className="font-bold" htmlFor="reserve-start-ts">
            Start Date:
          </label>
          <input className="bg-white p-1" type="date" id="reserve-start-ts" name="reserve-start-ts" />
          <label className="font-bold" htmlFor="reserve-end-ts">
            End Date:
          </label>
          <input className="bg-white p-1" type="date" id="reserve-end-ts" name="reserve-end-ts" />
          <button type="submit" className="items-center rounded-full bg-yellow-100 px-2 py-1 font-medium" onClick={(e) => addToCart(e, idx, item)}>Add To Cart</button>
        </form>
      </div>
    </li>)
  });
  return (
  <div className="p-4">
    <Header cart={cart}/>
    <div>
      <h2 className="text-3xl font-bold mb-4">Inventory</h2>
      <div><ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">{displayedItems}</ul></div>
    </div>
  </div>);
}
