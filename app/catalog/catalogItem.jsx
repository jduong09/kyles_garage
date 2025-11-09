import { useState, useRef } from "react";

const SECONDS_IN_DAY = 86400000;

const CatalogItem = ({ cart, setCart, item, idx, deleteItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [errorInputStart, setErrorInputStart] = useState('');
  const [errorInputEnd, setErrorInputEnd] = useState('');
  const [inputStart, setInputStart] = useState('');
  const [inputEnd, setInputEnd] = useState('');
  const errSpanStartRef = useRef();
  const errSpanEndRef = useRef();
  
  const toggleAvailability = () => {
    setIsOpen(!isOpen);
  }

  const validateStartDate = (date) => {
    const dateStart = new Date(date.slice(0, 4), date.slice(5, 7) - 1, date.slice(8, 10));
    const today = new Date();

    // Validation Check: Empty --> Date Set is in the Past --> Valid Date
    if (date === '') {
      setErrorInputStart('Date Not Set');
      errSpanStartRef.current.className = 'text-red-500 text-xs mb-2 mt-[-8px]'
      return false;
    } else if (dateStart - today < 0) {
      setErrorInputStart('Date In Past');
      errSpanStartRef.current.className = 'text-red-500 text-xs mb-2 mt-[-8px]'
      return false;
    } else {
      setErrorInputStart('');
      errSpanStartRef.current.className = 'hidden';
      return true;
    }
  }

  const validateEndDate = (date) => {
    const dateEnd = new Date (date.slice(0, 4), date.slice(5, 7) - 1, date.slice(8, 10));
    const dateStart = new Date(inputStart.slice(0, 4), inputStart.slice(5, 7) - 1, inputStart.slice(8, 10));
    const today = new Date();

    // Validation Check: Empty --> Date Set is in the Past --> Date is earlier date than start date --> Date outside of resevation required dates (7 days) --> Valid
    if (date === '') {
      setErrorInputEnd('Date Not Set');
      errSpanEndRef.current.className = 'text-red-500 text-xs mb-2 mt-[-8px]'
      return false;
    } else if (dateEnd - today < 0) {
      setErrorInputEnd('Error: Date In Past');
      errSpanEndRef.current.className = 'text-red-500 text-xs mb-2 mt-[-8px]'
      return false;
    } else if (inputStart && (dateEnd - dateStart < 0)) {
      setErrorInputEnd(`${dateEnd.toLocaleDateString()} earlier than ${dateStart.toLocaleDateString()}`);
      errSpanEndRef.current.className = 'text-red-500 text-xs mb-2 mt-[-8px]'
      return false;
    } else if (inputStart && ((dateEnd - dateStart) / SECONDS_IN_DAY > 7)) {
      setErrorInputEnd(`Cannot set to ${dateEnd.toLocaleDateString()}. Max reservation time is 7 days.`);
      errSpanEndRef.current.className = 'text-red-500 text-xs mb-2 mt-[-8px]'
      return false;
    } else {
      setErrorInputEnd('');
      errSpanEndRef.current.className = 'hidden';
      return true;
    }
  }

  const handleAddCart = (e) => {
    e.preventDefault();

    if (!validateStartDate(inputStart) || !validateEndDate(inputEnd)) {
      return;
    }

    const endDate = new Date (inputEnd.slice(0, 4), inputEnd.slice(5, 7) - 1, inputEnd.slice(8, 10));
    const startDate = new Date (inputStart.slice(0, 4), inputStart.slice(5, 7) - 1, inputStart.slice(8, 10));

    const numOfReservedDays = (endDate - startDate === 0) ? 1 : ((endDate - startDate) / SECONDS_IN_DAY);
    setCart([...cart, { inventory_uuid: item.inventory_uuid, name: item.name, price: Number((item.price / 100) * numOfReservedDays).toFixed(2), startDate, endDate }]);
    setInputStart('');
    setInputEnd('');
    toggleAvailability();
  }

  return (
    <div className="flex flex-col justify-start items-start p-3 bg-latte rounded-lg">
      <div className="w-full flex justify-between items-center mb-2">
        <h2 className="font-bold text-lg text-chocolate">{item.name}</h2>
        {cart.find((cartItem) => cartItem.inventory_uuid === item.inventory_uuid) && <div onMouseEnter={(e) => e.target.innerText = 'Remove'} onMouseLeave={(e) => e.target.innerText = 'Added'} onClick={() => deleteItem(item)} className="rounded-full bg-orange-50 px-2 py-1 text-xs font-bold text-orange-700 inset-ring inset-ring-orange-600/20 dark:bg-orange-400/10 dark:text-orange-400 dark:inset-ring-orange-500/20">Added</div>}
      </div>
      <div className="mb-2">{item.description}</div>
      <div className="mb-2 inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-800 inset-ring inset-ring-green-600/20 dark:bg-green-600/10 dark:text-green-700 dark:inset-ring-green-700/20">Daily Rate: ${Number(item.price / 100).toFixed(2)}</div>
      <button className={`self-end items-center rounded-full w-8 h-8 bg-yellow-300 hover:bg-yellow-600 px-1 py-1 font-medium dark:bg-cinnamon dark:hover:bg-chocolate ${isOpen ? 'rotate-45' : ''}`} onClick={() => toggleAvailability()}>+</button>
      <div className={isOpen ? '' : 'hidden'}>
        <form className="flex flex-col">
          <label className="font-bold mb-1 text-chocolate" htmlFor="reserve-start-ts">
            Start Date:
          </label>
          <input className="rounded-full bg-white px-2 py-1 mb-2 dark:bg-light-brown" type="date" id="reserve-start-ts" name="reserve-start-ts" onChange={(e) => setInputStart(e.target.value)} value={inputStart} required/>
          <span ref={errSpanStartRef} className="hidden">{errorInputStart}</span>
          <label className="font-bold mb-1 text-chocolate" htmlFor="reserve-end-ts">
            End Date:
          </label>
          <input className="rounded-full bg-white px-2 py-1 mb-2 dark:bg-light-brown" type="date" id="reserve-end-ts" name="reserve-end-ts" onChange={(e) => setInputEnd(e.target.value)} value={inputEnd} required/>
          <span ref={errSpanEndRef} className="hidden">{errorInputEnd}</span>
          <button type="submit" className="items-center rounded-full bg-light-brown hover:bg-chocolate px-2 py-1 font-medium dark:bg-cinnamon" onClick={(e) => handleAddCart(e)}>Add To Cart</button>
        </form>
      </div>
    </div>
  );
}

export default CatalogItem;