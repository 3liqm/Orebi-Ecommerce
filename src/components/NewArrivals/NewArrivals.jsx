import React, { useEffect, useState } from "react";
import "./NewArrivals.css";
import {
  CarouselProvider,
  Slider,
  ButtonFirst,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncProducts,
  getAllProducts,
  getAllProductsStatus,
} from "../../Store/ProductSlice";
import ProductList from "../ProductList/ProductList";
import Loader from "../Loader/Loader";
import { getAllCategories } from "../../Store/CategorySlice";
import { STATUS } from "../../Utils/Status";

const NewArrivals = () => {
  // Redux Hooks
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);
  // state variable to manage slides in responsive
  const [visibleSlides, setVisibleSlides] = useState(1);

  useEffect(() => {
    // Fetch a list of products with a limit of 100 items.
    dispatch(fetchAsyncProducts(50));
  }, [dispatch]);

  const products = useSelector(getAllProducts);
  const productStatus = useSelector(getAllProductsStatus);

  // Randomizing the products in the list to display a variety.
  const getRandomizedProducts = (count) => {
    const tempProducts = [...products.slice(0, 40)];
    const selectedProducts = [];

    for (let i = 0; i < count && tempProducts.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * tempProducts.length);
      selectedProducts.push(tempProducts.splice(randomIndex, 1)[0]);
    }

    return selectedProducts;
  };

  // responsive slides
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 600) {
        setVisibleSlides(1);
      } else if (screenWidth >= 600 && screenWidth < 930) {
        setVisibleSlides(2);
      } else if (screenWidth >= 930 && screenWidth < 1324) {
        setVisibleSlides(3);
      } else if (screenWidth >= 1324) {
        setVisibleSlides(4);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div className="new-arrivals">
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={125}
          totalSlides={12}
          visibleSlides={visibleSlides}
          lockOnWindowScroll={true}
          isPlaying={true}
        >
          <div className="arrows">
            <ButtonFirst className="back-arrow">
              <IoIosArrowBack size={20} />
            </ButtonFirst>
            <ButtonNext className="next-arrow">
              <IoIosArrowForward size={20} />
            </ButtonNext>
          </div>
          <Slider>
            {/* Displaying a generic product list */}
            <div>
              {productStatus === STATUS.LOADING ? (
                <Loader />
              ) : (
                <ProductList products={getRandomizedProducts(12)} />
              )}
            </div>
          </Slider>
        </CarouselProvider>
      </div>
    </div>
  );
};

export default NewArrivals;
