const Drawer = ({ cart, isOpen}) => {
  const displayedItems = cart.map((item, idx) => {
    return (
      <li key={idx}>
        <div>{item.name}</div>
      </li>);
  });

  return (
    <div 
      id="cart-drawer" 
      className={`w-1/3 h-screen fixed bg-light-chocolate dark:bg-neutral-900
        transform transition-transform duration-300 
        ease-in-out top-0 right-0 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    ><ul>{displayedItems}</ul></div>
  )
}

export default Drawer;