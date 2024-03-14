import React from "react";
import "./YearProduct.css";
import { Link } from "react-router-dom";
import { productOfTheYear } from "../../assets/images/index";
import { motion } from "framer-motion";

const YearProduct = () => {
  return (
    <Link to="/shop">
      <div className="year-product">
        <motion.div
          whileInView={{ x: [0, 0], opacity: [0, 1] }}
          transition={{ duration: 0.5 }}
        >
          <img src={productOfTheYear} className="year-product-img" />
          <div className="year-product-main">
            <h1>Product of The year</h1>
            <p>
             This year, the "Clock of the Year" has
             been unveiled, capturing the essence of precision, elegance, 
             and innovation in the world of horology.
            </p>
          </div>
        </motion.div>
      </div>
    </Link>
  );
};

export default YearProduct;
