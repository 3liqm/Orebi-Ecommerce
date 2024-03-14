import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import {
  fetchAsyncProducts,
  getAllProducts,
  getAllProductsStatus,
} from "../../Store/ProductSlice";
import ProductList from "../ProductList/ProductList";
import Loader from "../Loader/Loader";
import { STATUS } from "../../Utils/Status";
import { useDispatch, useSelector } from "react-redux";

// Pagination component for displaying products with pagination controls
const Pagination = ({ itemsPerPage }) => {
  //state 
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);

  const dispatch = useDispatch();
  const products = useSelector(getAllProducts);
  const productsStatus = useSelector(getAllProductsStatus);

  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchAsyncProducts());
  }, [dispatch]);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  // Handle page click event
  const handlePageClick = (selected) => {
    const newOffset = selected * itemsPerPage;
    setItemOffset(newOffset);
    setItemStart(newOffset + 1);
  };

  return (
    <div className="pagination">
      <div className="paginatiion-product">
         {/* Display loader or product list based on loading status */}
        {productsStatus === STATUS.LOADING ? (
          <Loader />
        ) : (
          <ProductList products={currentItems} />
        )}
      </div>
      <div className="pagination-element">
         {/* ReactPaginate component for pagination controls */}
        <ReactPaginate
          nextLabel=""
          onPageChange={(selected) => handlePageClick(selected.selected)}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="pagination-page-link"
          pageClassName="mr-6"
          containerClassName="pagination-container"
          activeClassName="pagination-active"
        />
      </div>
    </div>
  );
};

export default Pagination;