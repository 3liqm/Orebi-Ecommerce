import React, { useEffect, useState } from "react";
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
  const dispatch = useDispatch();
  const product = useSelector(getProductSingle);
  const productSingleStatus = useSelector(getSingleProductStatus);
  const [currentImage, setCurrentImage] = useState(null);
  const [quantity, setQuantity] = useState(1);


  useEffect(() => {
    dispatch(fetchAsyncProductSingle(id));
  }, []);

  // Calculating discounted price
  let discountedPrice =
    product?.price - product?.price * (product?.discountPercentage / 100);
  if (productSingleStatus === STATUS.LOADING) {
    return <Loader />;
  }
     // Handling quantity increase
     const increaseQty = () => {
        setQuantity((prevQty) => {
          let tempQty = prevQty + 1;
          if (tempQty > product?.stock) tempQty = product?.stock;
          return tempQty;
        });
      };
    
        // Handling quantity decrease
      const decreaseQty = () => {
        setQuantity((prevQty) => {
          let tempQty = prevQty - 1;
          if (tempQty < 1) tempQty = 1;
          return tempQty;
        });
      };
    
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
    <div className="product-single">
        <div className="product-single-title">Product/{product?.title}</div>
      <div className="product-single-main">
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
        <div className="product-single-right">
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
                <div className="old-price">
                    {formatPrice(product?.price)}
                </div>
                <span>Inclusive of all taxes</span>
              </div>
              <div className="new-price-content">
                <div className="new-price">
                    {formatPrice(discountedPrice)}
                </div>
                <span className="discount">
                  {product?.discountPercentage}% OFF
                </span>
              </div>
            </div>
            <div className="right-content-qty">
                  <div className="qty-text">Quantity:</div>
                  <div className="qty-change ">
                    <button
                      type="button"
                      className="qty-decrease "
                      onClick={() => decreaseQty()}
                    >
                      <FaMinus size={20} />
                    </button>
                    <div className="qty-value">{quantity}</div>
                    <button
                      type="button"
                      className="qty-increase"
                      onClick={() => increaseQty()}
                    >
                      <FaPlus size={20} />
                    </button>
                  </div>
                  {product?.stock === 0 ? (
                    <div className="qty-error">out of stock</div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="right-content-button">
                  <button type="button" className="button">
                    <span
                      onClick={() => {
                        addToCartHandler(product);
                      }}
                    >
                      add to cart
                    </span>
                    <FaCartShopping size={17} className="cart-icon"/>
                  </button>
                  <button type="button" className="button">
                    buy now
                  </button>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSinglePage;
