import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import MainSlider from '../MainSlider/MainSlider';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider.tsx';
import { Product } from '../Interface/Products';
import { WishlistContext } from '../../Context/WishlistContext';


export default function Home() {
  //let baseUrl = "https://route-ecommerce.onrender.com";
  let baseUrl = "https://ecommerce.routemisr.com";

  let { AddToWishlist, removeProductFromWishlist, getUserWishlist, favouriteList, isFavourite }: any = useContext(WishlistContext);

  /*
    let [pagesArr,setPagesArr] = useState([]);
    and changed .tsx for Home to .jsx
  */
  let [productsList, setProductsList] = useState<Product[]>([]);
  let [pagesArr, setPagesArr] = useState<any | null>([]);
  // create element ref
  const ref = useRef<HTMLElement>(null);
  //ref.current?.focus();
  //const ref =  useRef(document.createElement("i"))
  useEffect(() => {
    if (ref.current !== null) {
      // Now TypeScript knows that myRef.current is not null
      // const handleClick = event => {
      //   console.log('Button clicked');
      //   console.log('bobbyhadz.com');
      // };
      // const element:any = ref.current;
      // element.addEventListener('click', handleClick);
      // return () => {
      //   element.removeEventListener('click', handleClick);
      // };
      console.log(ref.current);

    }


  }, []);


  useEffect(() => {
    getProducts(1);
  }, []);

  useEffect(() => {
    getUserWishlist();
    console.log(favouriteList);
    //getSimilarities();
  }, [favouriteList, isFavourite]);
  // let favBtn = document.querySelector('.fa-heart');
  //   favBtn.addEventListener('click',function(el,id){
  //       if(this.classList.contains('fa-regular')){
  //           AddToWishlist(el,id)
  //       }
  //       else if(this.classList.contains('fa-regular')){
  //           removeProductFromWishlist(el,id)
  //       }
  //   })
  function getSimilarities() {
    // if(favouriteList.length>0){
    //   let isSameUser = favouriteList.filter(productsList => favouriteList._id === productsList._id);
    //   console.log(isSameUser);
    // }
    // else{console.log("favolist is empty or zerooo");
    // }
    if (favouriteList.data && favouriteList.data.length > 0) {
      let favoIds = favouriteList.data.map(el => el._id);
      let prodIds = productsList.map(el => el._id);
      let isSameUser = favoIds.filter(prodIds => favoIds._id === prodIds._id);
      console.log(isSameUser);

    }



    // const isSameUser = (favouriteList, productsList) => favouriteList._id === productsList._id;
  }


  async function getProducts(pageNumber) {
    let { data } = await axios.get(`${baseUrl}/api/v1/products?page=${pageNumber}`);
    //console.log(data.metadata.numberOfPages);
    // console.log(data.data);
    // console.log("favouries list from context");
    // console.log(favouriteList);
    /**/
    //keepBtnsColoured(data.data)
    // let idArr = [];
    // data.data.forEach(el =>{
    //           let Id= el.id;
    //           //favouriteList.includes(Id) ? console.log(Id) : console.log("not found");
    //           //console.log(Id);
    //           //let savedfavorite= JSON.parse(localStorage.getItem("myfavouriteList"));
    //           //console.log(savedfavorite);
    //           // for(let i=0;i<favouriteList.length;i++){
    //           //   if(favouriteList[i] === Id){
    //           //     console.log(favouriteList[i]);
    //           //   }
    //           // }
    //           // let result = favouriteList.filter((element)=>{element === Id});
    //           // console.log(result);
    //           // console.log(favouriteList);
    //       });
    /**/
    setProductsList(data.data);
    let pArr: number[] = [];
    for (let i = 0; i < data.metadata.numberOfPages; i++) {
      pArr.push(i + 1);
      setPagesArr(pArr);
    }
    console.log(pagesArr);
    /*
    let count = 0;
    let arry = [];
    for(let i=0;i<data.metadata.numberOfPages;i++){
      count = i+1;
      arry.push(count);
    }
    setPagesArr(arry);
    */
    $(".loading").fadeOut(2000);
  }

  function getPage(pageNumber: number) {
    console.log(pageNumber);
    getProducts(pageNumber);
  }


  /*
  {favouriteList.data?.map((el)=>{
                    el.id === product._id ?
                    <i className="fa fa-xl fa-solid fa-heart" onClick={(e)=>{removeProductFromWishlist(e.target,product._id)}}></i> :
                    <i className=" fa fa-xl fa-regular fa-heart"  onClick={(e)=>{AddToWishlist(e.target,product._id)}}></i>
                  })
                }
  */
  /*
  {(favouriteList.data || favouriteList.data?.length > 0)?favouriteList.data.map((el)=>{
                    if(el.id === product._id){
                      return <i className="fa fa-xl fa-solid fa-heart" onClick={(e)=>{removeProductFromWishlist(e.target,product._id)}}></i>
                    }
  
                    })
                    : ""
                  }
  */
  return (
    <>
      <div style={{ display: 'flex' }} className="loading position-fixed top-0 bottom-0 start-0 end-0 align-items-center justify-content-center">
        <i className="fa-solid fa-spinner fa-spin fa-4x"></i>
      </div>
      <MainSlider />
      <CategoriesSlider />
      <div className='row g-3'>
        {productsList.map((product, i) => {
          // {favouriteList.includes(product._id) ? addToFavourites(product,product._id)}
          return <div className="col-md-2" key={i}>
            <div className="product px-2">

              <img src={product.imageCover} className='w-100' alt="product" />
              <span className="text-category">{product.category.name}</span>
              <div className="top d-flex justify-content-between">
                <h2 className='h6'>{product.title?.split(" ").slice(0, 2).join(" ")}</h2>
                {/* <Link to={"/wishlist/"+product._id}> */}
                <button className='btn btn-transparent border-0 btn-favourite'>

                  {/* {favouriteList.data?.includes(product)?
                    <i className="fa fa-xl fa-solid fa-heart" onClick={(e)=>{removeProductFromWishlist(e.target,product._id)}}></i>  :
                    <i className=" fa fa-xl fa-regular fa-heart"  onClick={(e)=>{AddToWishlist(e.target,product._id)}}></i>
                    } */}

                  {/* {isFavourite ? <i className="fa fa-xl fa-solid fa-heart" onClick={(e)=>{removeProductFromWishlist(e.target,product._id)}}></i>  :
                    <i className=" fa fa-xl fa-regular fa-heart"  onClick={(e)=>{AddToWishlist(e.target,product._id)}}></i>} */}



                  {/* {favouriteList.data?.length > 0 ?
                    favouriteList.data.map(el =>{
                      if (el.id === product._id){
                        return <i className="fa fa-xl fa-solid fa-heart" onClick={(e)=>{removeProductFromWishlist(e.target,product._id)}}></i> }
                      
                      return <i className=" fa fa-xl fa-regular fa-heart"  onClick={(e)=>{AddToWishlist(e.target,product._id)}}></i>
                      
                      
                    })
                    : <i className=" fa fa-xl fa-regular fa-heart"  onClick={(e)=>{AddToWishlist(e.target,product._id)}}></i>
                    } */}

                  <i ref={ref} className="fa fa-xl fa-regular fa-heart"></i>

                </button>
                {/* </Link> */}
              </div>
              <div className="d-flex justify-content-between mt-2">
                <p>{product.price}EGP</p>
                <div>
                  <i className="fa-solid fa-star text-warning"></i>
                  {product.ratingsAverage}
                </div>
              </div>
              <Link to={"/productDetails/" + product._id}>
                <button className='btn btn-info px-4 w-100'>Explore Now!</button>
              </Link>
            </div>


          </div>;
        })}
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          {pagesArr.map((el: number) => {
            return <li key={el} className="page-item" onClick={() => { getPage(el); }}><a className="page-link text-dark">{el}</a></li>;
          })}

        </ul>
      </nav>
    </>
  );
}
