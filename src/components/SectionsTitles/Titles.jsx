import React from "react";
import './Titles.css'
import { motion } from "framer-motion";
const HomeListsTitle = ({ title }) => {
  return (
    <motion.div
      whileInView={{ x: [0, 0], opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
    >
      <div className="sections-title">
        <h3>{title}</h3>
      </div>
    </motion.div>
  );
};

export default HomeListsTitle;
