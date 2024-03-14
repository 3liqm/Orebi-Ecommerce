import React, { useState, useEffect } from "react";
import "./ProductSinglePage.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchAsyncProductSingle,
  getProductSingle,
  getSingleProductStatus,
} from "../../Store/ProductSlice";
import { addToCart } from "../../Store/CartSlice";
import { STATUS } from "../../Utils/Status";
import Loader from "../../components/Loader/Loader";
import { formatPrice } from "../../Utils/helpers";
import { FaCartShopping, FaPlus, FaMinus } from "react-icons/fa6";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductSinglePage = () => {
  const { id } = useParams();
  // Redux hook
  const dispatch = useDispatch();
  const product = useSelector(getProductSingle);
  const productSingleStatus = useSelector(getSingleProductStatus);
  //state Variables
  const [currentImage, setCurrentImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  //show product 
  useEffect(() => {
    dispatch(fetchAsyncProductSingle(id))
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [id]);

  const addToCartHandler = () => {
    const discountedPrice =
      product?.price - product?.price * (product?.discountPercentage / 100);
    const totalPrice = quantity * discountedPrice;

    dispatch(addToCart({ ...product, quantity, totalPrice, discountedPrice }));

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

  // Helper function to calculate discounted price
  const calculateDiscountedPrice = () => {
    return (
      product?.price - product?.price * (product?.discountPercentage / 100)
    );
  };

  // Helper function to increase quantity
  const increaseQty = () => {
    setQuantity((prevQty) => Math.min(prevQty + 1, product?.stock));
  };

  // Helper function to decrease quantity
  const decreaseQty = () => {
    setQuantity((prevQty) => Math.max(prevQty - 1, 1));
  };
  if (isLoading || productSingleStatus === STATUS.LOADING) {
    return <Loader />;
  }
  return (
    <div className="product-single">
      <div className="product-single-title">Product/{product?.title}</div>
      <div className="product-single-main">
        {/* left section (pictures) */}
        <div className="product-single-left">
          <div className="left-main-img">
            <img
              src={
                currentImage ||
                (product ? (product.images ? product.images[0] : "") : "")
              }
              alt=""
            />
          </div>
          <div className="left-main-img-thumbs">
            {product.images &&
              product.images.map((thumbImage, index) => (
                <div
                  className="thumb-item"
                  key={index}
                  onClick={() => setCurrentImage(thumbImage)}
                >
                  <img src={thumbImage} alt="" className="img-cover" />
                </div>
              ))}
          </div>
        </div>
         {/* right section (content) */}
        <div className="product-single-right">
         {/* content */}
          <div className="product-single-right-content">
            <div className="title">{product?.title}</div>
            <div>
              <p className="desc">{product?.description}</p>
            </div>
            <div className="right-content-types">
              <div className="product-types-main">
                <p className="text-orange">Rating:</p>
                <span>{product?.rating}</span>
                <p>|</p>
              </div>
              <div className="product-types-main">
                <p>Brand:</p>
                <span>{product?.brand}</span>
                <p>|</p>
              </div>
              <div className="product-types-main">
                <p>Category:</p>
                <span>
                  {product?.category ? product.category.replace("-", " ") : ""}
                </span>
              </div>
            </div>
            <div className="right-content-price">
              <div className="old-price-content">
                <div className="old-price">{formatPrice(product?.price)}</div>
                <span>Inclusive of all taxes</span>
              </div>
              <div className="new-price-content">
                <div className="new-price">
                  {formatPrice(calculateDiscountedPrice())}
                </div>
                <span className="discount">
                  {product?.discountPercentage}% OFF
                </span>
              </div>
            </div>
            {/* quantity */}
            <div className="right-content-qty">
              <div className="qty-text">Quantity:</div>
              <div className="qty-change ">
                <button
                  type="button"
                  className="qty-decrease "
                  onClick={decreaseQty}
                >
                  <FaMinus size={20} />
                </button>
                <div className="qty-value">{quantity}</div>
                <button
                  type="button"
                  className="qty-increase"
                  onClick={increaseQty}
                >
                  <FaPlus size={20} />
                </button>
              </div>
              {product?.stock === 0 && (
                <div className="qty-error">out of stock</div>
              )}
            </div>
            <div className="right-content-button">
              <button
                type="button"
                className="button"
                onClick={addToCartHandler}
              >
                <span>add to cart</span>
                <FaCartShopping size={17} className="cart-icon" />
              </button>
              <button type="button" className="button">
                Check Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSinglePage;

