import React, { useEffect, useState } from "react";
import "./Header.css";
import { logo, logoLight } from "../../../assets/images/index";
import { HiMenuAlt2 } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { motion } from "framer-motion";
import { navBarList } from "../../../constants/index";
import { Link } from "react-router-dom";

const Header = ({ theme }) => {
  const [showMenu, setShowMenu] = useState(true);
  // State variable for controlling the visibility of the side navigation menu
  const [sidenav, setSidenav] = useState(false);
  // State variables for controlling the visibility of line bottom
  const [activeLink, setActiveLink] = useState(1001);

  const handleItemClick = (_id, link) => {
    setActiveLink(_id);
  };
  useEffect(() => {
    // Define a function ResponsiveMenu to check window width and update showMenu state accordingly
    let ResponsiveMenu = () => {
      if (window.innerWidth < 667) {
        setShowMenu(false); // Hide the menu if window width is less than 667px
      } else {
        setShowMenu(true); // Show the menu if window width is 667px or more
      }
    };

    ResponsiveMenu(); // Call ResponsiveMenu function initially to set initial state based on window width

    // Add an event listener to listen for window resize event and call ResponsiveMenu function
    window.addEventListener("resize", ResponsiveMenu);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", ResponsiveMenu);
    };
  }, []);

  return (
    <div className="header">
      <div className="header-main">
        <div className="navbar-main">
          <div className="logo">
            <Link to={"/"}>
              {theme == "light" ? <img src={logo} /> : <img src={logoLight} />}
            </Link>
          </div>

          <div className="navbar">
            {showMenu && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="navbar-motion"
              >
                <>
                  {/* show the navBar list in motion */}
                  {navBarList.map(({ _id, title, link }) => (
                    <Link
                      key={_id}
                      className="navbar-links"
                      to={link}
                      state={{ data: location.pathname.split("/")[1] }}
                    >
                      <li
                        key={_id}
                        className={_id === activeLink ? "active" : ""}
                        onClick={() => handleItemClick(_id, link)}
                      >
                        {title}
                      </li>{" "}
                    </Link>
                  ))}
                </>
              </motion.ul>
            )}
          </div>
        </div>
        <div className="sidebar">
          <HiMenuAlt2
            size={25}
            onClick={() => setSidenav(!sidenav)}
            className="sidebar-open-icon"
          />
          {/* show the SideBar list in motion */}

          {sidenav && (
            <div className="menu">
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="menu-main">
                  <div className="menu-list">
                    <div className="logo-menu">
                      <Link href={"/"}>
                        <img src={logoLight} />
                      </Link>
                    </div>
                    <ul className="sidebar-list">
                      {navBarList.map((item) => (
                        <li key={item._id}>
                          <Link
                            className="sidebar-links"
                            to={item.link}
                            state={{ data: location.pathname.split("/")[1] }}
                            onClick={() => setSidenav(false)}
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* the sideBar colse icon */}
                <span
                  className="menu-close-icon"
                  onClick={() => setSidenav(false)}
                >
                  <MdClose size={25} />
                </span>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
