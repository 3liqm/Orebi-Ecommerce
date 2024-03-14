import React, { useState } from "react";
import "./Footer.css";
import { FaFacebook, FaYoutube, FaLinkedin, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import paymentCard from "../../assets/images/payment.png";
import { AiOutlineCopyright } from "react-icons/ai";

const Footer = () => {
  const [emailInfo, setEmailInfo] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const emailValidation = () => {
    return String(emailInfo)
      .toLocaleLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleSubscription = () => {
    if (emailInfo === "") {
      setErrMsg("Please provide an Email !");
    } else if (!emailValidation(emailInfo)) {
      setErrMsg("Please give a valid Email!");
    } else {
      setSubscription(true);
      setErrMsg("");
      setEmailInfo("");
    }
  };
  return (
    <div className="footer">
      {/* footer motion  */}
      <motion.div
        whileInView={{ x: [0, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
      >
        {/* footer top section  */}
        <div className="footer-top">
          {/* footer top-left section  */}
          <div className="footer-top-left">
            <div>
              <h1 className="footer-top-titles">More about Orebi Shop</h1>
              <p className="footer-top-pargraf">
                Orebi is one of the world's leading ecommerce brands and is
                internationally recognized for celebrating the essence of
                classic Worldwide cool looking style.
              </p>
            </div>
            <ul className="footer-top-left-list">
              <a href="https://www.youtube.com" target="_blank" rel="">
                <li>
                  <FaYoutube />
                </li>
              </a>
              <a href="https://github.com/3liqm" target="_blank" rel="">
                <li>
                  <FaGithub />
                </li>
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="">
                <li>
                  <FaFacebook />
                </li>
              </a>
              <a
                href="https://www.linkedin.com/in/3liqm"
                target="_blank"
                rel=""
              >
                <li>
                  <FaLinkedin />
                </li>
              </a>
            </ul>
          </div>
          {/* footer top-center section  */}
          <div className="footer-top-center">
            <div>
              <h1 className="footer-top-titles">Shop</h1>
              <ul className="footer-top-center-list">
                <li>Accesories</li>
                <li>Clothes</li>
                <li>Electronics</li>
                <li>Home appliances</li>
                <li>New Arrivals</li>
              </ul>
            </div>
            <div>
              <h1 className="footer-top-titles">Your account</h1>
              <ul className="footer-top-center-list">
                <li>Profile</li>
                <li>Orders</li>
                <li>Addresses</li>
                <li>Account Details</li>
                <li>Payment Options</li>
              </ul>
            </div>
          </div>
          {/* footer top-right section  */}
          <div className="footer-top-right">
            <div>
              <h1 className="footer-top-titles">
                Subscribe to our newsletter.
              </h1>
              <p className="footer-top-pargraf">
                Subscribe to our newsletter inorder to the first to recieve news
                about our amazing deals and offers.
              </p>
            </div>
            <div>
              {subscription ? (
                <motion.p
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="footer-top-right-motion"
                >
                  Subscribed Successfully !
                </motion.p>
              ) : (
                <div className="footer-top-right-subs">
                  <div className="fotter-top-right-email">
                    <input
                      onChange={(e) => setEmailInfo(e.target.value)}
                      value={emailInfo}
                      type="text"
                      placeholder="Insert your email "
                    />
                    {errMsg && <p className="err-message">{errMsg}</p>}
                  </div>
                  <button
                    onClick={handleSubscription}
                    className="footer-top-right-subs-btn"
                  >
                    Subscribe
                  </button>
                </div>
              )}
              <div>
                <img
                  className="footer-top-right-pay"
                  src={paymentCard}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        {/* footer bottom section  */}
        <div className="footer-bottom">
          <AiOutlineCopyright />
          <p>Copyright 2024 | Orebi shopping | All Rights Reserved</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Footer;
