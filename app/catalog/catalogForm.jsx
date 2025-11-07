import { useState} from "react";

const CatalogItem = ({cart, item, idx, divRef, inputStart, inputEnd, addToCart, setInputStart, setInputEnd, deleteItem}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleAvailability = () => {
    divRef.current.className = (isOpen === true) ? 'hidden' : '';
    setIsOpen(!isOpen);
  }

  return (<li className="flex flex-col justify-start items-start m-2 p-3 bg-gray-400/20 rounded-lg" key={idx}>
    <div className="w-full flex justify-between items-center mb-2">
      <h2 className="font-bold text-lg">{item.name}</h2>
      {cart.find((cartItem) => cartItem.inventory_uuid === item.inventory_uuid) && <div onMouseEnter={(e) => e.target.innerText = 'Remove'} onMouseLeave={(e) => e.target.innerText = 'Added'} onClick={() => deleteItem(item)} className="rounded-full bg-orange-50 px-2 py-1 text-xs font-bold text-orange-700 inset-ring inset-ring-orange-600/20 dark:bg-orange-400/10 dark:text-orange-400 dark:inset-ring-orange-500/20">Added</div>}
    </div>
    <div className="mb-2">{item.description}</div>
    <div className="mb-2 inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 inset-ring inset-ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:inset-ring-green-500/20">Daily Rate: ${Number(item.price / 100).toFixed(2)}</div>
    <button className={`self-end items-center rounded-full w-8 h-8 bg-yellow-300 hover:bg-yellow-600 px-1 py-1 font-medium dark:bg-orange-600 dark:hover:bg-orange-900 ${divRef.current.className === 'hidden' ? '' : 'rotate-45'}`} onClick={() => toggleAvailability()}>+</button>
    <div ref={divRef} className="hidden">
      <form className="flex flex-col">
        <label className="font-bold mb-1" htmlFor="reserve-start-ts">
          Start Date:
        </label>
        <input className="rounded-full bg-white px-2 py-1 mb-2 dark:bg-gray-600" type="date" id="reserve-start-ts" name="reserve-start-ts" onChange={(e) => setInputStart(e.target.value)} value={inputStart} required/>
        <span className="hidden"></span>
        <label className="font-bold" htmlFor="reserve-end-ts">
          End Date:
        </label>
        <input className="rounded-full bg-white px-2 py-1 mb-2 dark:bg-gray-600" type="date" id="reserve-end-ts" name="reserve-end-ts" onChange={(e) => setInputEnd(e.target.value)} value={inputEnd} required/>
        <span className="hidden"></span>
        <button type="submit" className="items-center rounded-full bg-blue-600 hover:bg-blue-700 px-2 py-1 font-medium dark:bg-blue-500" onClick={(e) => addToCart(e, idx, item)}>Add To Cart</button>
      </form>
    </div>
  </li>);
}

export default CatalogItem;