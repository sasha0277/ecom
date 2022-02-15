import React, { useState } from 'react';
import MetaData from './../layout/MetaData';
// import { useHistory } from 'react-router-dom';
import './Search.css';

const Search = ({history}) => {
const [keyword,setKeyword] = useState("");
// const history = useHistory();

const searchSubmitHandler = (e)=>{

    e.preventDefault();
    if(keyword.trim()){
        history.push(`/products/${keyword}`);

    } else{
        history.push(`/products`);
    }
}

  return (
  <>
  <MetaData title={`Search A Product`}/>
      <form onSubmit={searchSubmitHandler} action="" className="searchBox">

        <input type="text"  placeholder="Search products..."
            onChange={(e)=>setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />



      </form>
  </>
    );
};

export default Search;
