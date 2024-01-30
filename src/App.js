import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, totalAmount } from "./redux/slices/cart/cartSlice";
import Modal from "./components/Modal";

function App() {
  
  const {cartItems, isLoading} = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const {isOpen} = useSelector((state) => state.modal)

  useEffect(() => {
    dispatch(totalAmount());
  }, [dispatch ,cartItems])

  useEffect(() => {
    dispatch(getCartItems())
  }, [])

  if(isLoading){
    return <div className="loading"><h1>Loading...</h1></div>
  }

  

  return(
    <>
      {isOpen && <Modal/>}
      <Navbar/>
      <CartContainer/>
    </>
  );
}
export default App;
