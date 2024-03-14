import React, { useEffect } from "react";
import "./CategoryProductPage.css";
import Titles from "../../components/SectionsTitles/Titles";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchAsyncProductsOfCategory,
  getAllProductsByCategory,
  getCategoryProductsStatus,
} from "../../Store/CategorySlice";
import { STATUS } from "../../Utils/Status";
import Loader from "../../components/Loader/Loader";
import ProductList from "../../components/ProductList/ProductList";

const CategoryProductPage = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const categoryProducts = useSelector(getAllProductsByCategory);
  const categoryProductsStatus = useSelector(getCategoryProductsStatus);

  useEffect(() => {
    // Fetch products of the specified category when the component mounts or when the category changes.
    dispatch(fetchAsyncProductsOfCategory(category));
  }, [dispatch, category]);
  return (
    <div className="category-product-page">
      <div className="category-product-page-content">
        <div className="category-product-title">
          {/* Displaying the category name in a user-friendly format */}
          <p>Our</p>
          <span className="category-name">{category.replace("-", " ")}</span>
        </div>
        <div className="category-product-page-product">
          {
            // Display a loader while products are being fetched, or show the product list
            categoryProductsStatus === STATUS.LOADING ? (
              <Loader />
            ) : (
              <ProductList products={categoryProducts} />
            )
          }
        </div>
      </div>
    </div>
  );
};

export default CategoryProductPage;
