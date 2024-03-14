import React from "react";
import './ShopPage.css'

// ProductBanner component to display a banner with controls for showing and sorting products
const ProductBanner = ({ itemsPerPageFromBanner }) => {

  return (
    <div className="product-banner">     
        <div className="product-banner-control">
          <label>Show:</label>
         {/* Control for selecting the number of products to show */}
          <select
            onChange={(e) => itemsPerPageFromBanner(+e.target.value)}
            className="numper-list"
          >
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="36">36</option>
            <option value="48">48</option>
          </select>
        </div>
        <div className="product-banner-control">
              <label>Sort by:</label>
              {/* Control for selecting the sorting option */}
              <select className="section-list">
                <option value="Best Sellers">Best Sellers</option>
                <option value="New Arrival">Special Offers</option>
                <option value="Featured">Featured</option>
                <option value="Final Offer">Final Offer</option>
              </select>
            </div>
    </div>
  );
};

export default ProductBanner;
