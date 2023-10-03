import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Category } from '../Interface/Categories';
import { CategoriesDataContext } from '../../Context/CategoriesDataStore';



export default function CategoriesSlider() {
    // let baseUrl = "https://route-ecommerce.onrender.com";
    // let [categoriesList,setCategoriesList] = useState<Category[]>([]);
    // useEffect(()=>{
    //     getCategories();
    // },[]);
    // async function getCategories(){
    //     let{data} = await axios.get(`${baseUrl}/api/v1/categories`);
    //     console.log(data.data);
    //     setCategoriesList(data.data);
    // }    
    let data:any = useContext(CategoriesDataContext);
    let categoriesList:Category[] = data.categoriesList
    //console.log(categoriesList);
    
  return (
    <div className='mb-5'>
        <OwlCarousel className='owl-theme' autoplay loop items={7}>
        {categoriesList.map((el,i)=>{
            return <div key={i}>
                <img src={el.image} height={200} alt="" />
                <h6 className='py-3'>{el.name}</h6>
            </div>
        })}
        </OwlCarousel>
    </div>
  )
}
