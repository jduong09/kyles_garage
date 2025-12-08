const Drawer = ({ deleteItem, cart, setOpen, isOpen}) => {
  const displayedItems = cart.map((item, idx) => {
    return (
      <li key={idx} className="flex flex-wrap justify-between items-center">
        <h3 className="flex-1/2 text-lg font-bold text-chocolate dark:text-latte">{item.name}</h3>
        <div className="flex-1/2 text-end font-bold text-chocolate dark:text-latte">${item.finalPrice}</div>
        <div className="flex-1/2">Rate: ${item.price / 100} / {item.days}</div>
        <button className="flex-1/2 text-end text-red-500 font-bold hover:text-red-400" onClick={() => deleteItem(item)}>Remove</button>
      </li>);
  });

  return (
    <div
      id="cart-drawer" 
      className={`w-1/3 h-screen fixed text-black bg-light-chocolate dark:bg-neutral-900
        transform transition-transform duration-300 
        ease-in-out top-0 right-0 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex justify-between items-center border-b-2 p-4">
        <h2 className="font-bold text-lg">Cart</h2>
        <button onClick={() => setOpen(false)}>X</button>
      </div>
      <ul className="p-4 border-b-2">{displayedItems.length === 0 ? "Cart is Empty" : displayedItems}</ul>
      <div className="p-4 flex flex-wrap justify-between items-center">
        <h3 className="flex-1/2 font-bold">Total</h3>
        <div className="flex-1/2 text-end font-bold">${cart.reduce((total, curr) => total += Number(curr.finalPrice), 0)}</div>
        <button className="flex-1 items-center rounded-full bg-chocolate hover:bg-latte mt-4 px-1 py-2 font-medium dark:bg-latte dark:text-gray-300 dark:hover:bg-chocolate">Checkout</button>
      </div>
    </div>
  )
}

export default Drawer;