import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/HeaderTop/Header";
import HeaderBottom from "./components/Header/Headerbottom/HeaderBottom";
import { Provider } from "react-redux";
import Store from "./Store/Store";
import { useEffect, useState } from "react";
import Footer from "./components/Footer/Footer";
import Shop from "./pages/Shop/Shop";
import CategoryProductPage from "./pages/CategoryProductPage/CategoryProductPage";
import CartPage from "./pages/CartPage/CartPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductSinglePage from "./pages/ProductSinglePage/ProductSinglePage";
import SearchProductPage from "./pages/SearchProductPage/SearchProductPage";

function App() {
  const currentTheme = localStorage.getItem("currentTheme");
  const [theme, setTheme] = useState(currentTheme ? currentTheme : "light");

  useEffect(() => {
    localStorage.setItem("currentTheme", theme);
  }, [theme]);
  return (
    <div className={`container ${theme}`}>
      <Provider store={Store}>
        <BrowserRouter>
          <Header theme={theme} />
          <HeaderBottom theme={theme} setTheme={setTheme} />
          <ToastContainer />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/category/:category" element={<CategoryProductPage />}/>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/product/:id" element={<ProductSinglePage />} />
            <Route path="/search/:searchTerm" element={<SearchProductPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
