import React from "react";
import "./BannerBottom.css";
import { MdLocalShipping } from "react-icons/md";
import { CgRedo } from "react-icons/cg";
import { motion } from "framer-motion";

const BannerBottom = () => {
  return (
    <div className="banner-bottom">
      <motion.div
        whileInView={{ x: [0, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
      >
        <div className="banner-bottom-main">
          <div className="banner-bottom-content">
            <p>2</p>
            <p>Two years warranty</p>
          </div>
          <div className="banner-bottom-content">
            <span>
              <MdLocalShipping size={19} className="icon" />
            </span>
            <p>Free shipping</p>
          </div>
          <div className="banner-bottom-content">
            <span>
              <CgRedo size={19} className="icon" />
            </span>
            <p>Return policy in 30 days</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BannerBottom;
