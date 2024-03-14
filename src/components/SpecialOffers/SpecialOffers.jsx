import React, { useEffect } from "react";
import './SpecialOffers.css'
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncProducts,
  getAllProducts,
  getAllProductsStatus,
} from "../../Store/ProductSlice";
import ProductList from "../ProductList/ProductList";
import Loader from "../Loader/Loader";
import { getAllCategories } from "../../Store/CategorySlice";
import { STATUS } from "../../Utils/Status";
const SpecialOffers = () => {
    const dispatch = useDispatch();
    const categories = useSelector(getAllCategories);
  
    useEffect(() => {
      dispatch(fetchAsyncProducts(50));
    }, [dispatch]);
    const products = useSelector(getAllProducts);
    const productStatus = useSelector(getAllProductsStatus);
  
    // Randomizing the products in the list to display a variety.
    const getRandomizedProducts = (count) => {
      const tempProducts = [...products.slice(0, 40)];
      const selectedProducts = [];
  
      for (let i = 0; i < count && tempProducts.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * tempProducts.length);
        selectedProducts.push(tempProducts.splice(randomIndex, 1)[0]);
      }
  
      return selectedProducts;
    };
    return (
      <div className="spiecial-offers">
          <div>
            {productStatus === STATUS.LOADING ? (
              <Loader />
            ) : (
              <ProductList products={getRandomizedProducts(4)} />
            )}
          </div>
      </div>
    );
}

export default SpecialOffers
