import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Brands() {
  let baseUrl = "https://ecommerce.routemisr.com";
    let [brandsList,setBrandsList] = useState([]);
    useEffect(()=>{
        getBrands();
    },[]);
    async function getBrands(){
        let{data} = await axios.get(`${baseUrl}/api/v1/brands`);
        console.log(data.data);
        setBrandsList(data.data);
    }
return (
  <div className='row'>
      {brandsList.map((el,index)=>{
          return <div className="col-md-2" key={index}>
                      <img src={el.image} className='w-100'/>
                      <h5>{el.name}</h5>
                  </div>
      })}
      
  </div>
)
}
