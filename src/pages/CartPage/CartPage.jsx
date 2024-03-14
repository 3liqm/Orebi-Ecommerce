import React from "react";
import "./CartPage.css";
import { useDispatch, useSelector } from "react-redux";
import shopping_cart from "../../assets/images/shopping_cart.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  getAllCarts,
  removeFromCart,
  toggleCartQty,
  clearCart,
} from "../../Store/CartSlice";
import { formatPrice } from "../../Utils/helpers";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartPage = () => {
  // Redux variable
  const dispatch = useDispatch();
  const carts = useSelector(getAllCarts);

  // delete single product
  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));

    //  Toastify when the product has been deleted
    toast.error("The product has been deleted", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  // delete all product
  const handleClearCart = () => {
    dispatch(clearCart());

    // Toastify when shopping cart has emptied
    toast.info("Your shopping cart has been emptied", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const getTotalAmount = () => {
    // total price by addition the items in cart
    const totalAmount = carts.reduce((accumulator, cart) => {
      return accumulator + cart.totalPrice;
    }, 0);

    return totalAmount;
  };
  // total price by addition shipping charge and subtotal
  const total = () => {
    const totalAmount = getTotalAmount();
    return totalAmount + 25;
  };

  /*------ if cart is empty---------*/
  if (carts.length === 0) {
    return (
      <div className="container">
        <motion.div
          whileInView={{ x: [0, 0], opacity: [0, 1] }}
          transition={{ duration: 0.5 }}
        >
          <div className="empty-cart">
            <img src={shopping_cart} alt="" />
            <p>Your shopping cart is empty.</p>
            <button className="button">
              <Link className="button-link" to="/shop">
                Go shopping Now
              </Link>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }
  return (
    <div className="cart">
      <motion.div
        whileInView={{ y: [20, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
      >
        <div className="cart-page-table">
          {/* table head section */}
          <div className="cart-page-table-head">
            <div className="page-table-main">
              <div>
                <span>S.N.</span>
              </div>
              <div>
                <span>Product</span>
              </div>
              <div>
                <span>Unit Price</span>
              </div>
              <div>
                <span>Quantity</span>
              </div>
              <div>
                <span>Total Price</span>
              </div>
              <div>
                <span>Actions</span>
              </div>
            </div>
          </div>
          {/* table body section to show product details  */}
          <div className="cart-page-table-body">
            {carts.map((cart, idx) => {
              return (
                <div className="page-table-main" key={cart?.id}>
                  {/* Display cart item details */}
                  <div>
                    <span>{idx + 1}</span>
                  </div>
                  <div>
                    <span>{cart?.title}</span>
                  </div>
                  <div>
                    <span>{formatPrice(cart?.discountedPrice)}</span>
                  </div>
                  <div>
                    {/* Quantity to increas and deacrice */}
                    <div className="qty-change">
                      <button
                        type="button"
                        className="qty-decrease "
                        onClick={() =>
                          dispatch(toggleCartQty({ id: cart?.id, type: "DEC" }))
                        }
                      >
                        <FaMinus size={20} />
                      </button>

                      <div className="qty-value">{cart?.quantity}</div>

                      <button
                        type="button"
                        className="qty-increase "
                        onClick={() =>
                          dispatch(toggleCartQty({ id: cart?.id, type: "INC" }))
                        }
                      >
                        <FaPlus size={20} />
                      </button>
                    </div>
                  </div>
                  {/* Quantity to increas and deacrice end */}
                  {/*----- total price ---- */}
                  <div className="price">
                    <span>{formatPrice(cart?.totalPrice)}</span>
                  </div>
                  {/*---- Button to remove item from cart----*/}
                  <div className="cart-ctd">
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleRemoveFromCart(cart?.id)}
                    >
                      <AiFillDelete size={20} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Cart footer with total and checkout buttons */}
          <div className="cart-page-table-foot">
            <div className="table-foot-main">
              {/*---- coupon and reset cart----*/}
              <div className="table-foot-main-left">
                <button
                  type="button"
                  className="button"
                  onClick={handleClearCart}
                  style={{ background: "red" }}
                >
                  <span>Reset Cart</span>
                </button>
                <div className="main-left-coupon">
                  <input type="text" placeholder="Coupon number" />
                  <p>Apply Coupon</p>
                </div>
              </div>
              {/*----------- total ---------------*/}
              <div className="table-foot-main-right">
                <div className="main-right-total">
                  <p>Subtotal</p>
                  <span>{formatPrice(getTotalAmount())}</span>
                </div>
                <div className="main-right-total">
                  <p>Shipping Charge</p>
                  <span>$25</span>
                </div>
                <div className="main-right-total">
                  <p>Total</p>
                  <span>{formatPrice(total())}</span>
                </div>
                {/* Button for checkout */}
                <button type="button" className="button">
                  Proceed CheckOut
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CartPage;
