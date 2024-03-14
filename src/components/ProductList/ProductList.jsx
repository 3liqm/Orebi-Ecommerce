import React from "react";
import "./ProductList.css";
import Product from "../Product/Product";
import { motion } from "framer-motion";
const ProductList = ({ products }) => {
  return (
    <motion.div
      whileInView={{ x: [0, 0], opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
    >
      <div className="product-list">
        {/* Map through the products array and render a Product component for each product */}
        {products?.map((product) => {
          // Calculate the discounted price for each product
          let discountedPrice =
            product.price - product.price * (product.discountPercentage / 100);

          // Render a Product component with the product details
          return (
            <Product
              key={product.id}
              product={{ ...product, discountedPrice }}
            />
          );
        })}
      </div>
    </motion.div>
  );
};

export default ProductList;
