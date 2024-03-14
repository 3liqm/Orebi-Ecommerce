import React, { useEffect, useState } from "react";
import "./Shop.css";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { IoMdArrowDropup } from "react-icons/io";
import { MdArrowDropDown } from "react-icons/md";
import Titles from "../../components/SectionsTitles/Titles";
import Loader from "../../components/Loader/Loader";
import Pagination from "../../components/shopPage/Pagination";
import { STATUS } from "../../Utils/Status";
import {
  fetchAsyncCategories,
  fetchAsyncProductsOfCategory,
  getAllCategories,
  getAllProductsByCategory,
  getCategoryProductsStatus,
} from "../../Store/CategorySlice";

import { fetchAsyncProducts } from "../../Store/ProductSlice";
import ProductBanner from "../../components/shopPage/ProductBanner";
import ProductList from "../../components/ProductList/ProductList";

const Shop = () => {
  const dispatch = useDispatch();
  // State variables
  const categories = useSelector(getAllCategories);
  const categoryProducts = useSelector(getAllProductsByCategory);
  const productStatus = useSelector(getCategoryProductsStatus);

  //states to open and close lists
  const [isCategoriesListOpen, setIsCategoriesListOpen] = useState(true);
  const [isColorListOpen, setIsColorListOpen] = useState(true);
  const [isBrandListOpen, setIsBrandListOpen] = useState(true);
  const [isPriceListOpen, setIsPriceListOpen] = useState(true);
  //states to open and close lists end

  //state to make in single page 12 product
  const [itemsPerPage, setItemsPerPage] = useState(12);

  //state to open select categories and start with all product
  const [selectedSort, setSelectedSort] = useState("All Product");
  
  //state to open and hover select categories 
  const [selectedOption, setSelectedOption] = useState(null);

  // Set items per page from banner
  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };

  // Fetch categories and all products on component mount
  useEffect(() => {
    dispatch(fetchAsyncCategories());
    handleAllProductsClick();
  }, [dispatch]);

  // Handle click on a specific category
  const handleCategoryClick = (selectedCategory) => {
    setSelectedOption(selectedCategory);
    dispatch(fetchAsyncProductsOfCategory(selectedCategory));
    setSelectedSort(selectedCategory);
  };

  // Handle click on "All Product" category
  const handleAllProductsClick = () => {
    setSelectedOption(null);
    dispatch(fetchAsyncProducts(50));
    setSelectedSort("All Product");
  };

  // Handle pagination click
  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
    setItemStart(newOffset + 1);

    // Update items per page when changing the page
    setItemsPerPage(itemsPerPage); // Set itemsPerPage based on the new page
  };

  // Open "All Product" on initial page load
  useEffect(() => {
    handleAllProductsClick();
  }, []);
  return (
    <div className="shop">
      <Titles title={"Products In Our Shop"} />
      {/* Toggle categories dropdown */}
      <div className="shop-main">
        {/*-------------sidebar lists section--------------------- */}
        <div className="shop-categoies">
          <div>
            <div
              className="shop-lists-title"
              onClick={() => setIsCategoriesListOpen(!isCategoriesListOpen)}
            >
              <h1>Shop by Category</h1>
              <span>
                {isCategoriesListOpen ? (
                  <MdArrowDropDown size={26} className="shop-icon" />
                ) : (
                  <IoMdArrowDropup size={26} className="shop-icon" />
                )}
              </span>
            </div>
            {/* Display categories if open */}
            {isCategoriesListOpen && (
              <motion.ul
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="motions"
              >
                <ul className="motion-categories-list">
                  {/* Clicking "All Product" sets the sort to display all products */}
                  <li onClick={handleAllProductsClick} className="selected">
                    All Product
                  </li>
                  {/* Map through categories and handle click for each */}
                  {categories.map((category, idx) => (
                    <li
                      key={idx}
                      onClick={() => handleCategoryClick(category)}
                      className={selectedOption === category ? "selected" : ""}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </motion.ul>
            )}
          </div>
          <div>
            <div
              className="shop-lists-title"
              onClick={() => setIsColorListOpen(!isColorListOpen)}
            >
              <h1>Shop by Color</h1>
              <span>
                {isColorListOpen ? (
                  <MdArrowDropDown size={26} className="shop-icon" />
                ) : (
                  <IoMdArrowDropup size={26} className="shop-icon" />
                )}
              </span>
            </div>
            {/* Display list if open */}
            {isColorListOpen && (
              <motion.ul
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="motions"
              >
                <ul className="motion-color-brand-price-list">
                  <li>
                    <span className="green"> </span> Green
                  </li>
                  <li>
                    <span className="gray"></span> Gray
                  </li>{" "}
                  <li>
                    <span className="red"></span> Red
                  </li>{" "}
                  <li>
                    <span className="yellow"></span> Yellow
                  </li>{" "}
                  <li>
                    <span className="blue"></span> Blue
                  </li>
                </ul>
              </motion.ul>
            )}
          </div>
          <div>
            <div
              className="shop-lists-title"
              onClick={() => setIsBrandListOpen(!isBrandListOpen)}
            >
              <h1>Shop by Brand</h1>
              <span>
                {isBrandListOpen ? (
                  <MdArrowDropDown size={26} className="shop-icon" />
                ) : (
                  <IoMdArrowDropup size={26} className="shop-icon" />
                )}
              </span>
            </div>
            {/* Display list if open */}
            {isBrandListOpen && (
              <motion.ul
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="motions"
              >
                <ul className="motion-color-brand-price-list">
                  <li>Apple</li>
                  <li>Ultron</li>
                  <li>Hoichoi</li>
                  <li>Shoppers Home</li>
                  <li>Unknown</li>
                </ul>
              </motion.ul>
            )}
          </div>
          <div>
            <div
              className="shop-lists-title"
              onClick={() => setIsPriceListOpen(!isPriceListOpen)}
            >
              <h1>Shop by Price</h1>
              <span>
                {isPriceListOpen ? (
                  <MdArrowDropDown size={26} className="shop-icon" />
                ) : (
                  <IoMdArrowDropup size={26} className="shop-icon" />
                )}
              </span>
            </div>
            {/* Display list if open */}
            {isPriceListOpen && (
              <motion.ul
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="motions"
              >
                <ul className="motion-color-brand-price-list">
                  <li>$0.00 - $49.99</li>
                  <li>$50.00 - $99.99</li>
                  <li>$100.00 - $199.99</li>
                  <li>$200.00 - $399.99</li>
                  <li>$400.00 - $599.99</li>
                  <li>$600.00 - $1000.00</li>
                </ul>
              </motion.ul>
            )}
          </div>
        </div>
        {/*------------------sidebar lists section end---------------- */}

        {/*--------------shop product and dropdown section----------- */}

        <div className="shop-content">
          <div className="shop-content-control">
            {/* Display product banner with items per page */}
            <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner} />
          </div>
          {/*-------------- products--------------- */}
          <div className="shop-product">
            {/* Show loader while products are loading, otherwise display appropriate component based on sorting option */}
            {productStatus === STATUS.LOADING ? (
              <Loader />
            ) : (
              <div>
                {/* Check the selected sort to determine which component to display */}
                {selectedSort === "All Product" ? (
                  <Pagination itemsPerPage={itemsPerPage} />
                ) : (
                  <ProductList products={categoryProducts} />
                )}
              </div>
            )}
          </div>
          {/*-------------- products end--------------- */}
        </div>
        {/*--------------shop product and dropdown section end----------- */}
      </div>
    </div>
  );
};

export default Shop;
