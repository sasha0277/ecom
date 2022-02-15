import { Slider, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useAlert } from "react-alert";
import Pagination from 'react-js-pagination';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import ProductCard from '../home/ProductCard';
import Loader from './../layout/loader/Loader';
import MetaData from './../layout/MetaData';
import './Products.css';



const categories = [
    "Laptop",
   "Footwear",
   "Bottom",
   "Tops",
   "Mens",
   "Womens",
   "SmartPhone",
];




const Products = ({ match }) => {
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [price ,setPrice] = useState([0,30000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);
    const alert = useAlert();
 
    const { products, loading, error, productsCount, resultPerPage } = useSelector(state => state.products);

    const keyword = match.params.keyword;

    const setCurrentPageNo = (e) => {

        setCurrentPage(e);

    }

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);

    }


    useEffect(() => {
        window.scrollTo(0, 0);
        if(error){
            alert.error(error);
            dispatch(clearErrors());
           }

        dispatch(getProduct(keyword,currentPage,price,category,ratings));

    }, [dispatch, keyword,currentPage,error,price,category,ratings,alert]);


   

    return (
        <>
            {
                loading ? <Loader /> : (
                    <>
                    <MetaData title="PRODUCTS--ECOMMERCE"/>
                        <h2 className="productsHeading">Products</h2>

                        <div className="products">
                            {
                                products &&
                                products.map(product => (
                                    <ProductCard key={product._id} product={product} />

                                ))
                            }

                        </div>

                        <div className="filterBox">
                        <Typography>Price</Typography>
                        <Slider value={price}
                            onChange={priceHandler}
                            valueLabelDisplay='auto'
                            aria-labelledby='range-slider'
                            min={0} 
                            max={30000}
                        />

                        <Typography>Categories</Typography>
                        <ul className="categoryBox">
                            {
                                categories.map((category) =>(

                                    <li
                                    className="category-link"
                                    key={category}
                                    onClick={()=>setCategory(category)}
                                    
                                   >
                                    {category}


                                    </li>

                                ))
                            }
                        </ul>

                        <fieldset>
                            <Typography component="legend">Ratings</Typography>
                            <Slider
                            value={ratings}
                            onChange={(e,newRating)=>{
                               setRatings(newRating); 
                            }}
                            aria-labelledby="continous-slider"
                            min={0}
                            max={5}
                            valueLabelDisplay='auto'



                            />

                        </fieldset>

                        </div>

                       {
                           resultPerPage< productsCount && ( 
                               <div className="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="1st"
                                lastPageText="Last"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />
                        </div>
                        )
                       }

                    </>
                )
            }
        </>

    );
};

export default Products;
