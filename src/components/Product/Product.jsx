import React, { useState } from "react";
import "./Product.css";
import { Link } from "react-router-dom";
import { formatPrice } from "../../Utils/helpers";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import { MdDoubleArrow } from "react-icons/md";
import { addToCart } from "../../Store/CartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = ({ product }) => {
  // Redux hook
  const dispatch = useDispatch();
  // state variables to show list operations of product and quantity
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Handling add to cart button click
  const addToCartHandler = (product) => {
    let discountedPrice =
      product?.price - product?.price * (product?.discountPercentage / 100);
    let totalPrice = quantity * discountedPrice;

    dispatch(
      addToCart({ ...product, quantity: quantity, totalPrice, discountedPrice })
    );

    // Show custom notification
    showCustomNotification();
  };

  const showCustomNotification = () => {
    toast("🦄 Wow so easy!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="product-link">
      <div className="product-item">
        {/* Display the category of the product. */}
        <div className="category">{product?.category}</div>
        {/* Display the main product image. */}
        <div className="product-item-img">
          {/* Display the main product image and list operations */}
          <img
            className="img-cover"
            src={product?.images[0]}
            alt={product.title}
          />
          {/* list operations */}
          <div className={`icon-container ${isHovered ? "visible" : ""}`}>
            <ul>
              <li
                onClick={() => {
                  addToCartHandler(product);
                }}
              >
                <p>Add to Cart</p>
                <FaCartPlus className="icon-operation" />
              </li>

              <Link
                to={`/product/${product?.id}`}
                key={product?.id}
                className="product-details-link"
              >
                <li>
                  <p>View Details</p>
                  <MdDoubleArrow className="icon-operation" />
                </li>
              </Link>

              <li>
                <p>Add to Wish List</p>
                <FaHeart className="icon-operation" />
              </li>
            </ul>
          </div>
        </div>
        {/* Display detailed information about the product. */}
        <div className="product-item-info">
          <div className="product-brand">
            <p>Brand :</p>
            <span>{product?.brand}</span>
          </div>
          {/* Display the title of the product. */}
          <div className="product-title">
            <p>{product?.title}</p>
          </div>
          {/* Display the price information. */}
          <div className="price">
            <span className="product-old-price">
              {formatPrice(product?.discountedPrice)}
            </span>
            {/* Display the discounted price. */}
            <span className="product-new-price">
              {formatPrice(product?.discountedPrice)}
            </span>
            {/* Display the discount percentage. */}
            <span className="discount-price">
              {product?.discountPercentage}% OFF
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
