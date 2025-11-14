import React, { useEffect } from 'react'
import {getData } from '../context/DataContext'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Category from './Category';

const Carousel = () => {
    const { data, fetchAllProducts } = getData()
    console.log(data);

    useEffect(() => {
        fetchAllProducts()
    }, [])  //bas first render pe chalega useEffect without dependency 


// e ek functional React component hai jo custom previous arrow banane ke liye likha gaya hai (slider ke liye like react-slick).
    const SamplePrevArrow = (props) => {
        const {className, style, onClick} = props;   
        //Agar parent kuch pass nahi karta toh props empty object {} hoga.Lekin react-slick jaise libraries jab custom component expect karti hain (jaise arrow), wo apne special props us component me bhejti hain (className, style, onClick).Matlab normal component me tumhe props khud dene padte hain, library wale component me library deta hai.    
        // props ek object hai jisme kuch properties (keys) hoti hain  className, style, onClick


        //className, style, onClick  Ye sab react-slick (slider library) ne tumhare component ko props ke through diye.
        // onClick = slider ke "next/prev slide" karne wala function ( Library ne already ek function banaya jo tumhe use karna hai).
        //className = default classes jo slider arrows pe apply karta hai (slick-prev, slick-next).
        // style = inline styles jo slider apply karta hai (jaise position, display).

        // Matlab tum apna custom arrow bana rahe ho, aur library tumhe ye cheezein de rahi hai taaki arrow sahi kaam kare.
        // className={arrow ${className}} -> mera custom class arrow(css dene k liye ) + library ka diya hua className  Iska fayda ye hai ki tumhara arrow apni custom styling bhi lega aur slider ki default positioning bhi. bas khud ka class dalke style karna ho isiliye extra flexibility deta hai yaha pe bas dikhane k liye lagaya hai
        //style={{zIndex:3}} bas normal style hai props ka diya hua niche hai ...style
        //...style ka matlab hai → jo style library bhejti hai, usko bhi rakh lo.
        //className='arrows' ye mene diya hai react-slick se nhi aya hai, Iska matlab: tum apne CSS me .arrows { ... } likh ke sirf icon ke style ko target kar sakte ho. iska style index.css me hai direct style me iske baju me dalta toh bhi chalta

       // sirf <AiOutlineArrowLeft /> use karte:Tum usme onClick={onClick}, className, aur style sab daal sakte ho.Lekin problem ye hai ki react-slick apne arrow ke liye ek wrapper div expect karta hai jo clickable area hota hai.Agar tum wrapper div hata doge, kabhi kabhi clickable area sirf icon jitna chhota ho jaata hai.Div wrapper se tum zIndex, hover effect, cursor:pointer, aur bada clickable box de sakte ho.
        return (
            <div onClick={onClick} className={`arrow ${className}`} style={{zIndex:3}}>    
                <AiOutlineArrowLeft className='arrows' 
                style={{...style, // jo slick slider style bhejta hai use bhi apply karenge
                 display: "block", borderRadius:"50px", background:"#f53347" , color:"white" , position:"absolute", padding:"2px", left:"50px"}} />
            </div>
        )
    }
    const SampleNextArrow = (props) => {
        const {className, style, onClick} = props;
        return (
            <div onClick={onClick} className={`arrow ${className}`}>
                <AiOutlineArrowRight className='arrows' style={{...style, display: "block", borderRadius:"50px", background:"#f53347" , color:"white" , position:"absolute", padding:"2px", right:"50px"}} />
            </div>
        )
    }

    var settings = {
        dots: false,    //carousel k niche dots arahe the woh nhi chahiye isiliye false
        autoplay: true,
        autoplaySpeed:2000,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover:false,
        nextArrow: <SampleNextArrow to="next" />, //ye ese hi to prop pass kiyahai
        prevArrow: <SamplePrevArrow to="prev" />,
    };

    return (
        <div>
            <Slider {...settings}>
                {
                    data?.slice(0,7)?.map((item, index) => {
                        return <div key={index} className='bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] -z-10'>
                            <div className='flex flex-col md:flex-row gap-10 justify-center h-[600px] my-20 md:my-0 items-center px-4'>
                                <div className='md:space-y-6 space-y-3'>
                                    <h3 className='text-red-500 font-semibold font-sans text-sm'>Powering Your World with the Best in Electronics</h3>
                                    <h1 className='md:text-4xl text-xl font-bold uppercase line-clamp-2 md:line-clamp-3 md:w-[500px] text-white'>{item.title}</h1>
                                    <p className='md:w-[500px] line-clamp-3 text-gray-400 pr-7'>{item.description}</p>
                                    <button className='bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-2 rounded-md cursor-pointer mt-2'>Shop Now</button>
                                </div>
                                <div>
                                    <img src={item.image} alt={item.title} className='rounded-full w-[550px] hover:scale-105 transition-all shadow-2xl shadow-red-400'/>
                                </div>
                            </div>
                        </div>
                    })
                }              
            </Slider>
            <Category/>
        </div>
    )
}

export default Carousel
