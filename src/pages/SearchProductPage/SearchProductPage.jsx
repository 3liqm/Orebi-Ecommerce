import React, { useEffect } from 'react'
import './SearchProductPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Titles from '../../components/SectionsTitles/Titles'
import { clearSearch, fetchAsyncSearchProduct, getSearchProducts, getSearchProductsStatus } from '../../Store/SearchSlice'
import Loader from '../../components/Loader/Loader';
import { STATUS } from '../../Utils/Status';
import ProductList from '../../components/ProductList/ProductList';
const SearchProductPage = () => {
      // Redux hooks to dispatch actions and select data from the store
  const dispatch = useDispatch();
  const { searchTerm } = useParams();
  const searchProducts = useSelector(getSearchProducts);
  const searchProductsStatus = useSelector(getSearchProductsStatus);

    // useEffect to clear previous search results and fetch new ones based on the search term
    useEffect(() => {
        dispatch(clearSearch());
        dispatch(fetchAsyncSearchProduct(searchTerm));
      }, [searchTerm]);

      
  // Render a message if no products are found, otherwise display the product list
  if (searchProducts.length === 0) {
    return (
      <div
        className="container">
        <Titles title={'No Products Found.'}/>
      </div>
    );
  }

  // Main content of the SearchPage component
  return (
      <div className="search-page">
         <Titles title={'Search results:'}/>
        <div className="search-page-content">
          {/* Display loader while fetching data, otherwise render the ProductList */}
          {searchProductsStatus === STATUS.LOADING ? (
            <Loader />
          ) : (
            <ProductList products={searchProducts} />
          )}
        </div>
      </div>
  )
}

export default SearchProductPage
