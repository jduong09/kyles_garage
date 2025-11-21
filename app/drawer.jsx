const Drawer = ({isOpen}) => {
  return (
    <div id="cart-drawer" className={`w-1/3 h-full bg-green-500 fixed transform transition-transform duration-300 ease-in-out right-0 ${isOpen ? "translate-x-0" : "translate-x-full"}`}></div>
  )
}

export default Drawer;