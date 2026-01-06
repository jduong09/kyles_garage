const DeleteItemModal = ({cart, item, deleteItem, boolDeleteModal, setBoolDeleteModal}) => {
  const items = cart.filter((cartItem) => cartItem.name === item.name);
  return (<div className={boolDeleteModal ? 'px-2 py-4 w-1/2 absolute top-1/4 left-1/2 -translate-x-1/2 z-10 bg-light-brown border-light-chocolate border-2 rounded-lg' : 'hidden'}>
    <div className="flex justify-between items-center mb-2">
      <h2 className="font-bold text-lg text-chocolate dark:text-latte">Current Reservations for {item.name}</h2>
      <button onClick={() => setBoolDeleteModal(false)}>x</button>
    </div>
    <ul>{items.map((item, idx) => 
      <li key={idx} className="mb-4 last:mb-0">
        <div className="flex justify-between no-wrap">
          <div><span>{new Date(item.startDate).toLocaleDateString()}</span> to <span>{new Date(item.endDate).toLocaleDateString()}</span></div>
          <button className="items-center rounded-full bg-red-600 text-white hover:bg-red-700 px-2 py-1 font-medium dark:bg-latte dark:text-gray-300 dark:hover:bg-chocolate" onClick={(e) => deleteItem(e, item.cartId)}>Delete</button>
        </div>
      </li>)}
    </ul>
  </div>)
}

export default DeleteItemModal;