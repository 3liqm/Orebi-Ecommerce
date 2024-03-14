import "./HeaderBottom.css";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { IoMdSunny } from "react-icons/io";
import { Link } from "react-router-dom";
import {
  fetchAsyncCategories,
  getAllCategories,
} from "../../../Store/CategorySlice";
import { useDispatch, useSelector } from "react-redux";
import { getCartItemsCount } from "../../../Store/CartSlice";
import Search from "../../Search/Search";

const HeaderBottom = ({ theme, setTheme }) => {
  // Redux Hooks
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);
  const itemsCount = useSelector(getCartItemsCount);

  // state variables
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const ref = useRef();
  const userRef = useRef();

  //fetch categories
  useEffect(() => {
    dispatch(fetchAsyncCategories());
  }, [dispatch]);

  // Function to toggle between light and dark theme
  const toggleMode = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  // Effect hook to handle click outside the component
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShow(false); 
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setShowUser(false); 
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [ref, userRef]);

  // State variable to hover selected option
  const [selectedOption, setSelectedOption] = useState(null);

  // Handle click on a specific category
  const handleCategoryClick = (selectedCategory) => {
    setSelectedOption(selectedCategory);
  };
  return (
    <div className="header-bottom">
      <div className="header-bottom-main">
        <div className="header-bottom-left">
          <motion.div
            whileInView={{ x: [-100, 0], opacity: [0, 1] }}
            transition={{ duration: 0.5 }}
          >
            {/* category part */}
            <div
              onClick={() => setShow(!show)}
              ref={ref}
              className="header-bottom-left-main"
            >
              {/* category part icon*/}
              <HiOutlineMenuAlt4 size={25} className="icons" />
              <p className="icons">Shop by Category</p>

              {show && (
                <motion.ul
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="header-bottom-category-motion"
                >
                  <ul className="category-motion-list">
                    {/* Map through categories and handle click for each */}
                    {categories.map((category, idx) => (
                      <Link
                        key={idx}
                        to={`category/${category}`}
                        className="category-motion-list-link"
                      >
                        <li
                          onClick={() => handleCategoryClick(category)}
                          className={
                            selectedOption === category ? "selected" : ""
                          }
                        >
                          {category}
                        </li>
                      </Link>
                    ))}
                  </ul>
                </motion.ul>
              )}
            </div>
          </motion.div>
        </div>
        {/*-------- search part---------- */}
        <div className="header-bottom-center">
          <motion.div
            whileInView={{ x: [0, 0], opacity: [0, 1] }}
            transition={{ duration: 0.5 }}
          >
            <Search />
          </motion.div>
        </div>
        {/* this div have Dark Mode, cart and user icons */}
        <div className="header-bottom-right">
          <motion.div
            whileInView={{ x: [100, 0], opacity: [0, 1] }}
            transition={{ duration: 0.5 }}
          >
            <div className="header-bottom-right-main">
              {/* user Icon and motion */}
              <div
                onClick={() => setShowUser(!showUser)}
                className="header-bottom-right-user-icon"
                ref={userRef}
              >
                <FaUser size={20} className="icons" />
                <FaCaretDown size={20} className="icons" />
              </div>
              {showUser && (
                <motion.ul
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="header-bottom-right-motion"
                >
                  <Link
                    className="header-bottom-right-motion-links"
                    to="/signin"
                  >
                    <li>Login</li>
                  </Link>
                  <Link
                    className="header-bottom-right-motion-links"
                    onClick={() => setShowUser(false)}
                    to="/signup"
                  >
                    <li>Sign Up</li>
                  </Link>
                  <li>Profile</li>
                  <li>Others</li>
                </motion.ul>
              )}
              {/* cart Icon */}
              <Link to="/cart">
                <div className="header-bottom-right-cart-icon">
                  <FaShoppingCart size={23} className="icons" />
                  <span>{itemsCount}</span>
                </div>
              </Link>
              {/* Dark Mode Icons */}
              <div
                className="toggle-mode"
                onClick={() => {
                  toggleMode();
                }}
              >
                {theme === "light" ? (
                  <FaMoon size={23} className="icons" />
                ) : (
                  <IoMdSunny size={23} className="icons" />
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;
