import React, { useContext } from 'react'
import { CategoriesDataContext } from '../../Context/CategoriesDataStore'

/*TODO: create the same for brands */
export default function Categories() {
    let {categoriesList} = useContext(CategoriesDataContext);
    console.log(categoriesList);
  return (
    <div className='row'>
        {categoriesList.map((el,index)=>{
            return <div className="col-md-2" key={index}>
                        <img src={el.image} className='w-100'/>
                        <h5>{el.name}</h5>
                    </div>
        })}
        
    </div>
  )
}
