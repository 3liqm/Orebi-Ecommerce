import React from "react";
import "./SearchResultBox.css";
import { useSelector } from "react-redux";
import { getSearchProducts } from "../../Store/SearchSlice";
import { formatPrice } from "../../Utils/helpers";

const SearchResultBox = ({ handleItemClick }) => {
  const searchProducts = useSelector(getSearchProducts);

  // Render a message if no products are found, otherwise display the product list
  if (searchProducts.length === 0) {
    return (
      <div className="search-box-result">
        <h1 className="search-box-result-noproduct"> No Product Found.</h1>
      </div>
    );
  }

    // Main content of the search box result component

  return (
    <div className="search-box-result">
      {searchProducts.map((product) => (
        <div
          key={product.id}
          onClick={() => handleItemClick(product)}
          className="search-box-result-menu"
        >
          <div>
            <img src={product.images[0]} />
          </div>
          <div>
            <h1 className="menu-product-desc">{product.title}</h1>
            <p>{product?.description}</p>
            <span className="menu-product-price">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResultBox;
