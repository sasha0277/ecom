import MouseIcon from '@material-ui/icons/Mouse';
import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/loader/Loader";
import "./Home.css";
import ProductCard from "./ProductCard.js";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products} = useSelector((state) => state.products);

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
     }

    dispatch(getProduct());
  }, [dispatch, error,alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {/* <MetaData title="ECOMMERCE" /> */}

          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <MouseIcon />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;