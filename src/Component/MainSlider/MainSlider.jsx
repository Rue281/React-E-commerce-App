import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import mainImg from '../../assets/mainSliderBanner-1.jpg'
import mainImg2 from '../../assets/mainSliderBanner-2.jpg'
import '../MainSlider/MainSlider.css'
import '../MainSlider/ResponsiveMainSlider.css'


export default function MainSlider() {
  return (
    <div className='row mb-5 g-0'>
        <div className="col-md-12">
        <OwlCarousel className='owl-theme' loop autoplay items={1}>
          <div className='overlayContainer first'>
            <div className="owl-overlay ">
              <div className="text">
                {/* <h3>T-shirt / Tops</h3> */}
                <h2 className="owl-title">WE MADE YOUR EVERYDAY FASHION BETTER!</h2>
                {/* <h3>cool / colorful / comfy</h3> */}
              </div>
            </div>
            <img className='w-100 h-100 silderImg' src={mainImg} alt="" />
          </div>

          <div className='overlayContainer second'>
            <div className="owl-overlay ">
              <div className="text">
              <h2 className="owl-title">Find clothes that matches your style</h2>
              <h3>Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</h3>
              </div>
            </div>
            <img className='w-100 h-100 silderImg' src={mainImg2} alt="" />
          </div>
        
        </OwlCarousel>
            
        </div>
        {/* <div className="col-md-3">
        <img className='w-100' height={200} src={mainImg} alt="" />
        <img className='w-100' height={200} src={mainImg2} alt="" />
        </div> */}
    </div>
  )
}
