import React from "react";
import "./Sale.css";
import {
  saleImgOne,
  saleImgTwo,
  saleImgThree,
} from "../../assets/images/index";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Sale = () => {
  return (
    <div className="sale">
      <div className="sale-left">
        <motion.div
          whileInView={{ x: [-100, 0], opacity: [0, 1] }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/shop">
            <img src={saleImgOne} />
          </Link>
        </motion.div>
      </div>

      <div className="sale-right">
        <div className="sale-right-main">
          <motion.div
            whileInView={{ x: [100, 0], opacity: [0, 1] }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/shop">
              <img src={saleImgTwo} />
            </Link>
          </motion.div>
        </div>
        <div className="sale-right-main">
          <motion.div
            whileInView={{ x: [100, 0], opacity: [0, 1] }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/shop">
              <img src={saleImgThree} />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Sale;
