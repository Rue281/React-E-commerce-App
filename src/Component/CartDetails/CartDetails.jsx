import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import { Link } from 'react-router-dom';


/*TODO: 
  1-updateQuantity(less than 0 should be remove the item completely)
  2- clear btn (to clear shopping cart once) */
export default function CartDetails() {
  let {cartData,getAllCartData,removeItem,updateQuantity,decreaseQuantity,increaseQuantity,itemCount} = useContext(CartContext);

  //const [itemCount, setItemCount] = useState(1);
  

  useEffect(()=>{
    getAllCartData()
  },[])

  //decrease item quantity
//   function decreaseQuantity(count){
//     count<0 ? count = 0 : count =count - 1;
//     setItemCount(count)
//     console.log("count = "+ count);
// }
  return (
    <>
      {cartData? <div className='bg-white'>

<table style={{verticalAlign:'middle'}} className='table table-striped table-bordered my-3 text-center'>
  <thead>
    <tr>
      <th>Image</th>
      <th>Name</th>
      <th>Quantity</th>
      <th>Price</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {cartData.data.products.map((el,i)=>{
      return <tr key={i}>
      <td>
        <img src={el.product.imageCover} className='w-75' height={100} alt=''/>
      </td>
      <td>{el.product.title}</td>
      <td>
      {/* updateQuantity(el.product._id,el.count-=1) */}
        <button className='btn btn-danger btn-sm rounded 
        cursor'onClick={()=>{decreaseQuantity(el.product._id,el.count)}}>-</button>
        {/* {el.count} */}
        <span className='mx-4'>{el.count}</span>
        <button className='btn btn-success btn-sm rounded cursor' onClick={()=>{increaseQuantity(el.product._id,el.count)}}>+</button>
      </td>
      <td>{el.price}EGP</td>
      <td>
        <i className='fa-solid fa-trash text-danger cursor' onClick={()=>{removeItem(el.product._id)}}></i>
      </td>
    </tr>
    })}
    
    <tr className='table-danger'>
      <td colSpan={4}>Total</td>
      <td>{cartData.data.totalCartPrice}</td>
    </tr>
  </tbody>
</table>
<Link to={"/checkout/"+cartData.data._id} className='btn btn-success mt-3'>Checkout</Link>
</div> : ""}
      
    </>
  )
}
