const Drawer = ({ deleteItem, cart, setOpen, isOpen}) => {
  const displayedItems = cart.map((item, idx) => {
    return (
      <li key={idx} className="flex flex-wrap justify-between items-center">
        <h3 className="flex-1/2 text-lg font-bold text-chocolate dark:text-latte">{item.name}</h3>
        <div className="flex-1/2 text-end font-bold text-chocolate dark:text-latte">${item.finalPrice}</div>
        <div className="flex-1/2 dark:text-white">Rate: ${item.price / 100} / {item.days}</div>
        <button className="flex-1/2 text-end text-red-500 font-bold hover:text-red-400" onClick={() => deleteItem(item)}>Remove</button>
      </li>);
  });

  return (
    <div
      id="cart-drawer" 
      className={`sm:w-full h-screen md:w-1/3 md:h-screen fixed z-10
        flex flex-col
        text-black bg-light-chocolate dark:bg-neutral-900
        transform transition-transform duration-300 
        ease-in-out top-0 right-0 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex justify-between items-center border-b-2 p-4">
        <h2 className="font-bold text-lg dark:text-latte">Cart</h2>
        <button className="dark:text-latte" onClick={() => setOpen(false)}>X</button>
      </div>
      {displayedItems.length === 0 ? 
      <div className="p-4 dark:text-latte">Cart is Empty</div> :
      <div className="flex-1 flex flex-col">
        <ul className="p-4 border-b-2">{displayedItems}</ul>
        <div className="p-4 flex flex-wrap justify-between items-center mt-auto">
          <h3 className="flex-1/2 font-bold dark:text-latte">Total</h3>
          <div className="flex-1/2 text-end font-bold dark:text-white">${cart.reduce((total, curr) => Math.floor((total + Number(curr.finalPrice)) * 100) / 100, 0)}</div>
          <button className="flex-1 items-center rounded-full bg-chocolate hover:bg-latte mt-4 px-1 py-2 font-medium dark:bg-latte dark:text-gray-300 dark:hover:bg-chocolate">Checkout</button>
        </div>
      </div>}
    </div>
  )
}

export default Drawer;