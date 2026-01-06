import { Header } from '../header';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import CatalogItem from './catalogItem';
import DeleteItemModal from './deleteItemModal';

const Catalog = () => {
  const location = useLocation();
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [itemToDelete, setItemToDelete] = useState('');
  const [boolDeleteModal, setBoolDeleteModal] = useState(false);

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/inventory');
    
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

    if (location.state && location.state.cart) {
      setCart(location.state.cart);
    }
  }, []);

  const deleteItem = (e, cartId) => {
    e.preventDefault();
    setCart(cart => cart.filter(cartItem => cartItem.cartId !== cartId));
  }

  const openDeleteModal = (item) => {
    setItemToDelete(item);
    setBoolDeleteModal(true);
  } 

  const displayedItems = items.map((item) => {
    return (
      <li key={item.sku}>
        <CatalogItem
          cart={cart}
          setCart={setCart}
          item={item}
          openDeleteModal={openDeleteModal}
        />
      </li>);
  });

  return (
    <div>
      <Header cart={cart} loginPage={false}/>
      <div className="p-4 bg-light-chocolate dark:bg-dark-bg">
        <h2 className="text-3xl font-bold mb-4 text-chocolate dark:text-latte">Inventory</h2>
        <div><ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">{displayedItems}</ul></div>
      </div>
      <DeleteItemModal cart={cart} item={itemToDelete} deleteItem={deleteItem} boolDeleteModal={boolDeleteModal} setBoolDeleteModal={setBoolDeleteModal} />
      <div id="drawer-overlay"
          className={`w-full h-full absolute top-0 left-0 z-4 bg-black opacity-75 ${boolDeleteModal === true ? "visible" : "invisible"}`}
          onClick={() => setBoolDeleteModal(false)}>
      </div>
    </div>
  );
}

export default Catalog;